package io.github.changmin6362.multistore.feature.authentication.controller;

import io.github.changmin6362.multistore.common.web.ApiResponse;
import io.github.changmin6362.multistore.feature.authentication.web.LoginRequest;
import io.github.changmin6362.multistore.feature.authentication.web.SignupRequest;
import io.github.changmin6362.multistore.feature.authentication.service.AuthService;
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
     * 토큰을 반환하지 않음 (로그인 후 토큰 획득)
     */
    @PostMapping("/signup")
    public ResponseEntity<ApiResponse> signup(@RequestBody SignupRequest body) {
        if (body == null || !StringUtils.hasText(body.emailAddress()) ||
                !StringUtils.hasText(body.password()) || !StringUtils.hasText(body.nickName())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "요청 데이터가 올바르지 않습니다"));
        }
        boolean result = authService.signup(body.emailAddress(), body.password(), body.nickName());
        if (!result) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ApiResponse.error(409, "이미 존재하는 회원정보입니다"));
        }
        // 회원가입 성공 - 토큰을 반환하지 않음
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.ok("회원가입이 완료되었습니다"));
    }

    /**
     * POST /api/auth/login
     * 로그인 처리 (DTO + ApiResponse)
     * Authorization 헤더로 토큰 반환
     */
    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest body) {
        if (body == null || !StringUtils.hasText(body.emailAddress()) || !StringUtils.hasText(body.password())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "요청 데이터가 올바르지 않습니다"));
        }
        String[] result = authService.login(body.emailAddress(), body.password());
        if (result == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(401, "인증 정보가 올바른지 않습니다"));
        }
        
        // 토큰을 헤더로 반환 (accessToken: Authorization, refreshToken: refresh_token)
        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + result[0])
                .header("refresh_token", result[1])
                .body(ApiResponse.ok("로그인이 완료되었습니다"));
    }

    /**
     * POST /api/auth/refresh
     * refresh_token 헤더로 리프레시 토큰 전달
     * Authorization 헤더로 새 accessToken 반환
     */
    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse> refresh(@RequestHeader(value = "refresh_token", required = false) String refreshToken) {
        if (!StringUtils.hasText(refreshToken)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "리프레시 토큰이 없습니다"));
        }
        var tokens = authService.refresh(refreshToken);
        if (tokens == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(ApiResponse.error(401, "리프래시 토큰이 유효하지 않습니다"));
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.AUTHORIZATION, "Bearer " + tokens[0])
                .header("refresh_token", tokens[1])
                .body(ApiResponse.ok("토큰이 갱신되었습니다"));
    }
}
