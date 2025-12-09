package io.github.changmin6362.multistore.feature.user_profile.controller;

import io.github.changmin6362.multistore.common.web.ApiResponse;
import io.github.changmin6362.multistore.feature.user_profile.service.UserProfileService;
import io.github.changmin6362.multistore.feature.user_profile.web.request.UserProfileRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

/**
 * 사용자 프로필 관련 HTTP 요청을 처리하는 REST 컨트롤러
 */
@RestController
@RequestMapping("/api/user-profile")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserProfileController {

    private final UserProfileService service;

    public UserProfileController(UserProfileService service) {
        this.service = service;
    }

    /**
     * GET /api/user-profile
     * <p>
     * 사용자 프로필 조회
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getUserProfile(@RequestParam BigInteger userId) {
        return ResponseEntity.ok(ApiResponse.ok(service.get(userId)));
    }

    /**
     * POST /api/user-profile
     * <p>
     * 사용자 프로필 생성
     */
    @PostMapping
    public ResponseEntity<ApiResponse> createUserProfile(
            @RequestParam BigInteger userId,
            @RequestBody UserProfileRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.ok(service.create(userId, request)));
    }

    /**
     * PUT /api/user-profile
     * <p>
     * 사용자 프로필 수정
     */
    @PutMapping
    public ResponseEntity<ApiResponse> modifyUserProfile(
            @RequestParam BigInteger userId,
            @RequestBody UserProfileRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.ok(service.update(userId, request)));
    }

    /**
     * DELETE /api/user-profile
     * <p>
     * 사용자 프로필 삭제
     */
    @DeleteMapping
    public ResponseEntity<ApiResponse> deleteUserProfile(@RequestParam BigInteger userId) {
        return ResponseEntity.ok(ApiResponse.ok(service.delete(userId)));
    }
}
