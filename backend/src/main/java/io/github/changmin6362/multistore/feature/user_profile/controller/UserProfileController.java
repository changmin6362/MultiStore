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
        var profile = service.get(userId);
        if (profile == null) {
            // 프로필이 존재하지 않을 때는 404 반환
            return ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "프로필이 없습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(profile));
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
        boolean updated = service.update(userId, request);
        if (!updated) {
            // 대상 프로필이 존재하지 않는 경우 404 반환
            return ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "수정할 프로필이 없습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(true));
    }

    /**
     * DELETE /api/user-profile
     * <p>
     * 사용자 프로필 삭제
     */
    @DeleteMapping
    public ResponseEntity<ApiResponse> deleteUserProfile(@RequestParam BigInteger userId) {
        boolean deleted = service.delete(userId);
        if (!deleted) {
            return ResponseEntity.status(org.springframework.http.HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "삭제할 프로필이 없습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(true));
    }
}
