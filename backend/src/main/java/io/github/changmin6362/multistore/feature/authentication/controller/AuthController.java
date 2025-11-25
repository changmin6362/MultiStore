package io.github.changmin6362.multistore.feature.authentication.controller;

import io.github.changmin6362.multistore.common.web.ApiResponse;
import io.github.changmin6362.multistore.feature.authentication.service.AuthService;
import io.github.changmin6362.multistore.feature.authentication.api.LoginRequest;
import io.github.changmin6362.multistore.feature.authentication.api.RefreshRequest;
import io.github.changmin6362.multistore.feature.authentication.api.SignupRequest;
import io.github.changmin6362.multistore.feature.authentication.api.TokenVerifyResponse;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000"})
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    /**
     * POST /api/auth/signup
     * 회원가입 처리 (DTO + ApiResponse)
     */
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@RequestBody SignupRequest body) {
        if (body == null || !StringUtils.hasText(body.emailAddress()) ||
                !StringUtils.hasText(body.password()) || !StringUtils.hasText(body.nickName())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "요청 데이터가 올바르지 않습니다"));
        }
        var result = authService.signup(body.emailAddress(), body.password(), body.nickName());
        if (result == null) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ApiResponse.error(409, "이미 존재하는 회원정보입니다"));
        }
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(result));
    }

    /**
     * POST /api/auth/login
     * 로그인 처리 (DTO + ApiResponse)
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest body) {
        if (body == null || !StringUtils.hasText(body.emailAddress()) || !StringUtils.hasText(body.password())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "요청 데이터가 올바르지 않습니다"));
        }
        var result = authService.login(body.emailAddress(), body.password());
        if (result == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(401, "인증 정보가 올바르지 않습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(result));
    }

    /**
     * POST /api/auth/logout
     * 로그아웃 처리 (refreshToken 무효화)
     */
    @PostMapping("/logout")
    public ResponseEntity<ApiResponse> logout(@RequestBody(required = false) RefreshRequest body) {
        String token = body != null ? body.refreshToken() : null;
        authService.logout(token);
        return ResponseEntity.ok(ApiResponse.ok(new io.github.changmin6362.multistore.feature.authentication.api.LogoutResponse(true, "로그아웃되었습니다")));
    }

    /**
     * POST /api/auth/verify
     * Authorization: Bearer <accessToken>
     */
    @PostMapping("/verify")
    public ResponseEntity<ApiResponse> verify(@RequestHeader(value = HttpHeaders.AUTHORIZATION, required = false) String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "토큰이 없습니다"));
        }
        TokenVerifyResponse res = authService.verify(authHeader.substring(7));
        if (!res.valid()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(401, "토큰이 유효하지 않습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(res));
    }

    /**
     * POST /api/auth/refresh
     * body: { refreshToken: string }
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse> refresh(@RequestBody RefreshRequest body) {
        String provided = body != null ? body.refreshToken() : null;
        if (!StringUtils.hasText(provided)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "리프레시 토큰이 없습니다"));
        }
        var tokens = authService.refresh(provided);
        if (tokens == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(401, "리프레시 토큰이 유효하지 않습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(tokens));
    }
}
