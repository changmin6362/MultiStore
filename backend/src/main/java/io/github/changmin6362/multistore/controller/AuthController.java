package io.github.changmin6362.multistore.controller;

import io.github.changmin6362.multistore.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000"})
public class AuthController {

    private final UserRepository userRepository;

    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
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
        Map<String, Object> res = new HashMap<>();
        res.put("success", true);
        res.put("message", "로그아웃되었습니다");
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
        // 개발용 토큰(랜덤 UUID). 실제 운영에서는 JWT 발급으로 대체하세요.
        res.put("accessToken", UUID.randomUUID().toString());
        res.put("refreshToken", UUID.randomUUID().toString());
        return res;
    }

    private ResponseEntity<Map<String, Object>> error(String message, int status, HttpStatus httpStatus) {
        Map<String, Object> err = new HashMap<>();
        err.put("error", message);
        err.put("status", status);
        return ResponseEntity.status(httpStatus).body(err);
    }
}
