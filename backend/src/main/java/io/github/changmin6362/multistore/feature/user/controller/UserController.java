package io.github.changmin6362.multistore.feature.user.controller;

import io.github.changmin6362.multistore.common.web.ApiResponse;
import io.github.changmin6362.multistore.common.web.flags.DeletedResponse;
import io.github.changmin6362.multistore.feature.user.web.request.UpdateUserRequest;
import io.github.changmin6362.multistore.feature.common.response.UserResponse;
import io.github.changmin6362.multistore.feature.user.web.response.UsersResponse;
import io.github.changmin6362.multistore.feature.user.service.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    /**
     * GET /api/user
     * 모든 사용자 조회 -> DTO + ApiResponse
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getAllUsers() {
        List<UserResponse> users = userService.findAll();
        return ResponseEntity.ok(ApiResponse.ok(new UsersResponse(users)));
    }

    /**
     * GET /api/user/{userId}
     * 특정 사용자 조회 -> DTO + ApiResponse
     */
    @GetMapping("/{userId}")
    public ResponseEntity<ApiResponse> getUserById(@PathVariable Long userId) {
        UserResponse user = userService.findById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "사용자를 찾을 수 없습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(new io.github.changmin6362.multistore.feature.user.web.response.UserResponse(user)));
    }

    /**
     * PUT /api/user/{userId}
     * 사용자 정보 수정 -> DTO + ApiResponse
     */
    @PutMapping("/{userId}")
    public ResponseEntity<ApiResponse> updateUser(
            @PathVariable Long userId,
            @RequestBody UpdateUserRequest body) {
        String emailAddress = body != null ? body.emailAddress() : null;
        String nickName = body != null ? body.nickName() : null;
        if (!StringUtils.hasText(emailAddress) || !StringUtils.hasText(nickName)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "emailAddress와 nickName은 필수입니다"));
        }
        boolean updated = userService.update(userId, emailAddress, nickName);
        if (!updated) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "수정할 사용자를 찾을 수 없습니다"));
        }
        UserResponse user = userService.findById(userId);
        return ResponseEntity.ok(ApiResponse.ok(new io.github.changmin6362.multistore.feature.user.web.response.UserResponse(user)));
    }

    /**
     * DELETE /api/user/{userId}
     * 사용자 삭제 (soft delete) -> DTO + ApiResponse
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long userId) {
        boolean deleted = userService.delete(userId);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "삭제할 사용자가 없습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(new DeletedResponse(true)));
    }
}