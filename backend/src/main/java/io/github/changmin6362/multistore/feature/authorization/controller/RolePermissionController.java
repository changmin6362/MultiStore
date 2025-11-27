package io.github.changmin6362.multistore.feature.authorization.controller;

import io.github.changmin6362.multistore.common.web.ApiResponse;
import io.github.changmin6362.multistore.feature.authorization.web.response.PermissionResponse;
import io.github.changmin6362.multistore.feature.authorization.web.request.AssignPermissionRequest;
import io.github.changmin6362.multistore.feature.authorization.service.RolePermissionService;
import io.github.changmin6362.multistore.common.web.flags.AssignedResponse;
import io.github.changmin6362.multistore.common.web.flags.RemovedResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rbac/roles/{roleId}/permissions")
@CrossOrigin(origins = {"http://localhost:3000"})
public class RolePermissionController {

    private final RolePermissionService rolePermissionService;

    public RolePermissionController(RolePermissionService rolePermissionService) {
        this.rolePermissionService = rolePermissionService;
    }

    /**
     * GET /api/rbac/roles/{roleId}/permissions
     * 특정 역할에 부여된 권한 목록 조회
     * 응답: { success: true, permissions: [...] }
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getRolePermissions(@PathVariable Long roleId) {
        List<PermissionResponse> permissions = rolePermissionService.findPermissionsByRoleId(roleId);
        // PermissionsResponse 래퍼 제거: 권한 리스트를 직접 반환
        return ResponseEntity.ok(ApiResponse.ok(permissions));
    }

    /**
     * POST /api/rbac/roles/{roleId}/permissions
     * 역할에 권한 부여
     * 요청 바디: { "permissionId": 1 }
     * - 이미 매핑 존재 시 409
     */
    @PostMapping
    public ResponseEntity<ApiResponse> assignPermissionToRole(@PathVariable Long roleId,
                                                              @RequestBody AssignPermissionRequest body) {
        Long permissionId = body != null ? body.permissionId() : null;
        if (permissionId == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "permissionId는 필수입니다"));
        }
        if (rolePermissionService.exists(roleId, permissionId)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ApiResponse.error(409, "이미 부여된 권한입니다"));
        }
        boolean saved = rolePermissionService.assignPermissionToRole(roleId, permissionId);
        if (!saved) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(500, "권한 부여에 실패했습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(new AssignedResponse(true)));
    }

    /**
     * DELETE /api/rbac/roles/{roleId}/permissions/{permissionId}
     * 역할로부터 권한 회수 (없으면 404)
     */
    @DeleteMapping("/{permissionId}")
    public ResponseEntity<ApiResponse> removePermissionFromRole(@PathVariable Long roleId,
                                                                @PathVariable Long permissionId) {
        boolean deleted = rolePermissionService.removePermissionFromRole(roleId, permissionId);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "해당 권한이 역할에 존재하지 않습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(new RemovedResponse(true)));
    }
}
