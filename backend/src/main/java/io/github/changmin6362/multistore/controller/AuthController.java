package io.github.changmin6362.multistore.controller;

import io.github.changmin6362.multistore.repository.UserRepository;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000"})
public class AuthController {

    private final UserRepository userRepository;
    private final SecretKey jwtKey;
    private final long accessTokenTtlSeconds;
    private final long refreshTokenTtlSeconds;
    // 데모용 인메모리 리프레시 토큰 저장소 (실서비스에서는 DB/Redis 사용 권장)
    private final Map<String, RefreshTokenRecord> refreshTokenStore = new ConcurrentHashMap<>();

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
        // 간단한 JWT 시크릿 설정 (운영에서는 환경변수로 관리하세요)
        String secret = System.getenv().getOrDefault("JWT_SECRET", "dev-secret-change-me-dev-secret-change-me");
        // jjwt 0.11.x는 HMAC 키 최소 길이 권장. 256bit 이상 보장
        byte[] keyBytes = secret.length() >= 32 ? secret.getBytes(StandardCharsets.UTF_8) :
                (secret + "_padding_to_32_bytes________________________________").substring(0, 32).getBytes(StandardCharsets.UTF_8);
        this.jwtKey = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenTtlSeconds = 60L * 60L; // 1시간
        this.refreshTokenTtlSeconds = 60L * 60L * 24L * 7L; // 7일
    }

    /**
     * POST /api/auth/signup
     * 회원가입 처리
     */
    @PostMapping("/signup")
    public ResponseEntity<Map<String, Object>> signup(@RequestBody Map<String, String> body) {
        String emailAddress = body.get("emailAddress");
        String password = body.get("password");
        String nickName = body.get("nickName");

        if (isBlank(emailAddress) || isBlank(password) || isBlank(nickName)) {
            return error("요청 데이터가 올바르지 않습니다", 400, HttpStatus.BAD_REQUEST);
        }

        if (userRepository.existsByEmail(emailAddress)) {
            return error("이미 존재하는 회원정보입니다", 409, HttpStatus.CONFLICT);
        }

        String passwordHash = hashPassword(password);
        int saved = userRepository.save(emailAddress, passwordHash, nickName);
        if (saved == 0) {
            return error("사용자 생성에 실패했습니다", 500, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        Map<String, Object> user = userRepository.findByEmail(emailAddress);
        return ResponseEntity.status(HttpStatus.CREATED).body(buildAuthResponse(user));
    }

    /**
     * POST /api/auth/login
     * 로그인 처리
     */
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> body) {
        String emailAddress = body.get("emailAddress");
        String password = body.get("password");

        if (isBlank(emailAddress) || isBlank(password)) {
            return error("요청 데이터가 올바르지 않습니다", 400, HttpStatus.BAD_REQUEST);
        }

        Map<String, Object> user = userRepository.findByEmail(emailAddress);
        if (user == null) {
            return error("인증 정보가 올바르지 않습니다", 401, HttpStatus.UNAUTHORIZED);
        }

        String storedHash = (String) user.get("password_hash");
        String providedHash = hashPassword(password);
        if (storedHash == null || !storedHash.equals(providedHash)) {
            return error("인증 정보가 올바르지 않습니다", 401, HttpStatus.UNAUTHORIZED);
        }

        return ResponseEntity.ok(buildAuthResponse(user));
    }

    /**
     * POST /api/auth/logout
     * 로그아웃 처리 (개발용: 토큰 블랙리스트 저장 없이 성공 응답만 반환)
     */
    @PostMapping("/logout")
    public ResponseEntity<Map<String, Object>> logout(@RequestBody(required = false) Map<String, Object> body) {
        // 선택적으로 전달된 refreshToken을 무효화
        if (body != null && body.get("refreshToken") instanceof String token) {
            refreshTokenStore.remove(token);
        }
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("message", "로그아웃되었습니다");
        return ResponseEntity.ok(res);
    }

    /**
     * POST /api/auth/verify
     * Authorization: Bearer <accessToken>
     */
    @PostMapping("/verify")
    public ResponseEntity<Map<String, Object>> verify(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return error("토큰이 없습니다", 400, HttpStatus.BAD_REQUEST);
        }

        String token = authHeader.substring(7);
        try {
            Jws<Claims> jws = Jwts.parserBuilder()
                    .setSigningKey(jwtKey)
                    .build()
                    .parseClaimsJws(token);

            Claims claims = jws.getBody();
            Map<String, Object> res = new HashMap<>();
            res.put("valid", true);
            res.put("subject", claims.getSubject());
            res.put("expiresAt", claims.getExpiration());
            return ResponseEntity.ok(res);
        } catch (Exception e) {
            return error("토큰이 유효하지 않습니다", 401, HttpStatus.UNAUTHORIZED);
        }
    }

    /**
     * POST /api/auth/refresh
     * body: { refreshToken: string }
     * 유효한 refreshToken으로 accessToken 재발급 (refreshToken 회전)
     */
    @PostMapping("/refresh")
    public ResponseEntity<Map<String, Object>> refresh(@RequestBody Map<String, String> body) {
        String provided = body != null ? body.get("refreshToken") : null;
        if (isBlank(provided)) {
            return error("리프레시 토큰이 없습니다", 400, HttpStatus.BAD_REQUEST);
        }

        RefreshTokenRecord record = refreshTokenStore.get(provided);
        if (record == null || record.expiresAt().before(new Date())) {
            // 만료 또는 존재하지 않음
            if (record != null) {
                refreshTokenStore.remove(provided);
            }
            return error("리프레시 토큰이 유효하지 않습니다", 401, HttpStatus.UNAUTHORIZED);
        }

        // access 토큰 재발급
        Instant now = Instant.now();
        Date issuedAt = Date.from(now);
        Date expiry = Date.from(now.plusSeconds(accessTokenTtlSeconds));
        String subject = record.subject();

        String newAccessToken = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(issuedAt)
                .setExpiration(expiry)
                .signWith(jwtKey, SignatureAlgorithm.HS256)
                .compact();

        // refresh 토큰 회전: 기존 토큰 제거 후 새 토큰 발급
        refreshTokenStore.remove(provided);
        String newRefreshToken = generateRefreshToken();
        Date refreshExpiry = Date.from(now.plusSeconds(refreshTokenTtlSeconds));
        refreshTokenStore.put(newRefreshToken, new RefreshTokenRecord(subject, refreshExpiry));

        Map<String, Object> res = new HashMap<>();
        res.put("accessToken", newAccessToken);
        res.put("refreshToken", newRefreshToken);
        res.put("success", true);
        return ResponseEntity.ok(res);
    }

    // ----- 내부 유틸 -----

    private boolean isBlank(String s) {
        return s == null || s.trim().isEmpty();
    }

    private String hashPassword(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hash = digest.digest(password.getBytes(StandardCharsets.UTF_8));
            StringBuilder hexString = new StringBuilder();
            for (byte b : hash) {
                String hex = Integer.toHexString(0xff & b);
                if (hex.length() == 1) hexString.append('0');
                hexString.append(hex);
            }
            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException("패스워드 해시 생성 실패", e);
        }
    }

    private Map<String, Object> buildAuthResponse(Map<String, Object> user) {
        Map<String, Object> res = new HashMap<>();
        res.put("userId", user.get("user_id"));
        res.put("emailAddress", user.get("email_address"));
        res.put("nickName", user.get("nick_name"));
        res.put("createdAt", user.get("created_at") != null ? user.get("created_at").toString() : null);
        // JWT 액세스 토큰 발급
        Instant now = Instant.now();
        Date issuedAt = Date.from(now);
        Date expiry = Date.from(now.plusSeconds(accessTokenTtlSeconds));

        String subject = String.valueOf(user.get("user_id"));
        String accessToken = Jwts.builder()
                .setSubject(subject)
                .setIssuedAt(issuedAt)
                .setExpiration(expiry)
                .claim("email", user.get("email_address"))
                .claim("nickName", user.get("nick_name"))
                .signWith(jwtKey, SignatureAlgorithm.HS256)
                .compact();

        res.put("accessToken", accessToken);
        // 리프레시 토큰 발급 및 저장
        String refreshToken = generateRefreshToken();
        Date refreshExpiry = Date.from(now.plusSeconds(refreshTokenTtlSeconds));
        refreshTokenStore.put(refreshToken, new RefreshTokenRecord(subject, refreshExpiry));
        res.put("refreshToken", refreshToken);
        return res;
    }

    private ResponseEntity<Map<String, Object>> error(String message, int status, HttpStatus httpStatus) {
        Map<String, Object> err = new HashMap<>();
        err.put("error", message);
        err.put("status", status);
        return ResponseEntity.status(httpStatus).body(err);
    }

    private String generateRefreshToken() {
        // 간단히 UUID 기반 랜덤 토큰 사용 (실서비스에서는 길고 예측 불가능한 값 권장)
        return UUID.randomUUID().toString() + UUID.randomUUID();
    }

    private record RefreshTokenRecord(String subject, Date expiresAt) {}
}
