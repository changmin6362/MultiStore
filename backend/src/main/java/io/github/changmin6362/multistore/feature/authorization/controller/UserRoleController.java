package io.github.changmin6362.multistore.feature.authorization.controller;

import io.github.changmin6362.multistore.common.web.ApiResponse;
import io.github.changmin6362.multistore.feature.authorization.web.response.PermissionResponse;
import io.github.changmin6362.multistore.domain.role.dto.RoleDto;
import io.github.changmin6362.multistore.feature.authorization.web.response.RolesResponse;
import io.github.changmin6362.multistore.feature.authorization.service.RolePermissionService;
import io.github.changmin6362.multistore.feature.authorization.web.request.AssignRoleRequest;
import io.github.changmin6362.multistore.feature.authorization.service.UserRoleService;
import io.github.changmin6362.multistore.common.web.flags.AssignedResponse;
import io.github.changmin6362.multistore.common.web.flags.RemovedResponse;
import io.github.changmin6362.multistore.common.web.flags.AllowedResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rbac/users")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserRoleController {

    private final UserRoleService userRoleService;
    private final RolePermissionService rolePermissionService;

    public UserRoleController(UserRoleService userRoleService,
                              RolePermissionService rolePermissionService) {
        this.userRoleService = userRoleService;
        this.rolePermissionService = rolePermissionService;
    }

    /**
     * GET /api/rbac/users/{userId}/roles
     * 특정 사용자의 역할 목록 조회(조인)
     * 응답: { success: true, roles: [...] }
     */
    @GetMapping("/{userId}/roles")
    public ResponseEntity<ApiResponse> getUserRoles(@PathVariable Long userId) {
        List<RoleDto> roles = userRoleService.findRolesByUserId(userId);
        return ResponseEntity.ok(ApiResponse.ok(new RolesResponse(roles)));
    }

    /**
     * POST /api/rbac/users/{userId}/roles
     * 사용자에게 역할 부여
     * 요청 바디: { "roleId": 1 }
     * - 이미 매핑 존재 시 409
     */
    @PostMapping("/{userId}/roles")
    public ResponseEntity<ApiResponse> assignRoleToUser(@PathVariable Long userId,
                                                       @RequestBody AssignRoleRequest body) {
        Long roleId = body != null ? body.roleId() : null;
        if (roleId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "roleId는 필수입니다"));
        }
        if (userRoleService.exists(userId, roleId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ApiResponse.error(409, "이미 부여된 역할입니다"));
        }
        boolean saved = userRoleService.assignRoleToUser(userId, roleId);
        if (!saved) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(500, "역할 부여에 실패했습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(new AssignedResponse(true)));
    }

    /**
     * DELETE /api/rbac/users/{userId}/roles/{roleId}
     * 사용자로부터 역할 회수 (없으면 404)
     */
    @DeleteMapping("/{userId}/roles/{roleId}")
    public ResponseEntity<ApiResponse> removeRoleFromUser(@PathVariable Long userId,
                                                         @PathVariable Long roleId) {
        boolean deleted = userRoleService.removeRoleFromUser(userId, roleId);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "해당 역할이 사용자에 존재하지 않습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(new RemovedResponse(true)));
    }

    /**
     * GET /api/rbac/users/{userId}/permissions
     * 사용자의 최종 권한 목록 조회(사용자 → 역할 → 권한 조인 체인)
     * 응답: { success: true, permissions: [...] }
     */
    @GetMapping("/{userId}/permissions")
    public ResponseEntity<ApiResponse> getUserPermissions(@PathVariable Long userId) {
        List<PermissionResponse> permissions = rolePermissionService.findPermissionsByUserId(userId);
        // PermissionsResponse 래퍼 제거: 권한 리스트를 직접 반환
        return ResponseEntity.ok(ApiResponse.ok(permissions));
    }

    /**
     * GET /api/rbac/users/{userId}/permissions/check
     * 사용자가 특정 권한을 보유하는지 여부 확인
     * - 쿼리 파라미터로 둘 중 하나 방식으로 확인
     *   1) permissionName=...
     *   2) resourceType=... & actionType=...
     * 응답: { success: true, allowed: boolean }
     */
    @GetMapping("/{userId}/permissions/check")
    public ResponseEntity<ApiResponse> checkUserPermission(
            @PathVariable Long userId,
            @RequestParam(required = false) String permissionName,
            @RequestParam(required = false) String resourceType,
            @RequestParam(required = false) String actionType
    ) {
        boolean allowed;
        if (permissionName != null && !permissionName.isBlank()) {
            allowed = rolePermissionService.userHasPermissionByName(userId, permissionName);
        } else if (resourceType != null && !resourceType.isBlank() && actionType != null && !actionType.isBlank()) {
            allowed = rolePermissionService.userHasPermissionByResourceAction(userId, resourceType, actionType);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "permissionName 또는 resourceType+actionType 중 하나를 제공해야 합니다"));
        }

        return ResponseEntity.ok(ApiResponse.ok(new AllowedResponse(allowed)));
    }
}
