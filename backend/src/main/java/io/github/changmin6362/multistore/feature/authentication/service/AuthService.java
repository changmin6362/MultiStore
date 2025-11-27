package io.github.changmin6362.multistore.feature.authentication.service;

import io.github.changmin6362.multistore.domain.user.UserRepository;
import io.github.changmin6362.multistore.feature.authentication.api.*;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.Instant;
import java.util.Date;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final SecretKey jwtKey;
    private final long accessTokenTtlSeconds;
    private final long refreshTokenTtlSeconds;
    private final Map<String, RefreshTokenRecord> refreshTokenStore = new ConcurrentHashMap<>();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
        String secret = System.getenv().getOrDefault("JWT_SECRET", "dev-secret-change-me-dev-secret-change-me");
        byte[] keyBytes = secret.length() >= 32 ? secret.getBytes(StandardCharsets.UTF_8)
                : (secret + "_padding_to_32_bytes________________________________").substring(0, 32).getBytes(StandardCharsets.UTF_8);
        this.jwtKey = Keys.hmacShaKeyFor(keyBytes);
        this.accessTokenTtlSeconds = 60L * 60L; // 1시간
        this.refreshTokenTtlSeconds = 60L * 60L * 24L * 7L; // 7일
    }

    public AuthResponse signup(String emailAddress, String password, String nickName) {
        // findByEmail() 사용 - 기본 정보만 필요 (비밀번호 제외)
        Map<String, Object> existingUser = userRepository.findByEmail(emailAddress);
        if (existingUser != null) {
            return null; // 컨트롤러에서 409 처리
        }
        String passwordHash = hashPassword(password);
        boolean saved = userRepository.save(emailAddress, passwordHash, nickName);
        if (!saved) {
            return null; // 500로 바꾸고 싶다면 예외로 던지는 것도 가능
        }
        Map<String, Object> user = userRepository.findByEmailWithPassword(emailAddress);
        return buildAuthResponse(user);
    }

    public AuthResponse login(String emailAddress, String password) {
        Map<String, Object> user = userRepository.findByEmailWithPassword(emailAddress);
        if (user == null) return null;
        String storedHash = (String) user.get("password_hash");
        String providedHash = hashPassword(password);
        if (storedHash == null || !storedHash.equals(providedHash)) return null;
        return buildAuthResponse(user);
    }

    public void logout(String refreshToken) {
        if (refreshToken != null) {
            refreshTokenStore.remove(refreshToken);
        }
    }

    public TokenPairResponse refresh(String providedRefreshToken) {
        RefreshTokenRecord record = refreshTokenStore.get(providedRefreshToken);
        if (record == null || record.expiresAt().before(new Date())) {
            if (record != null) refreshTokenStore.remove(providedRefreshToken);
            return null;
        }
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

        refreshTokenStore.remove(providedRefreshToken);
        String newRefreshToken = generateRefreshToken();
        Date refreshExpiry = Date.from(now.plusSeconds(refreshTokenTtlSeconds));
        refreshTokenStore.put(newRefreshToken, new RefreshTokenRecord(subject, refreshExpiry));
        return new TokenPairResponse(newAccessToken, newRefreshToken);
    }

    public TokenVerifyResponse verify(String accessToken) {
        try {
            Jws<Claims> jws = Jwts.parserBuilder()
                    .setSigningKey(jwtKey)
                    .build()
                    .parseClaimsJws(accessToken);
            Claims claims = jws.getBody();
            return new TokenVerifyResponse(true, claims.getSubject(), claims.getExpiration());
        } catch (Exception e) {
            return new TokenVerifyResponse(false, null, null);
        }
    }

    // 내부 유틸
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

    private AuthResponse buildAuthResponse(Map<String, Object> user) {
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

        String refreshToken = generateRefreshToken();
        Date refreshExpiry = Date.from(now.plusSeconds(refreshTokenTtlSeconds));
        refreshTokenStore.put(refreshToken, new RefreshTokenRecord(subject, refreshExpiry));

        return new AuthResponse(
                toLong(user.get("user_id")),
                (String) user.get("email_address"),
                (String) user.get("nick_name"),
                user.get("created_at") != null ? user.get("created_at").toString() : null,
                accessToken,
                refreshToken
        );
    }

    private Long toLong(Object v) {
        if (v == null) return null;
        if (v instanceof Number n) return n.longValue();
        return Long.parseLong(v.toString());
    }

    private String generateRefreshToken() {
        return UUID.randomUUID().toString() + UUID.randomUUID();
    }

    private record RefreshTokenRecord(String subject, Date expiresAt) {}
}
