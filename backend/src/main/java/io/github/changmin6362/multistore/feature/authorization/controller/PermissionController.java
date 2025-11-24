package io.github.changmin6362.multistore.feature.authorization.controller;

import io.github.changmin6362.multistore.common.web.ApiResponse;
import io.github.changmin6362.multistore.domain.permission.dto.PermissionDto;
import io.github.changmin6362.multistore.feature.authorization.service.PermissionService;
import io.github.changmin6362.multistore.feature.authorization.web.request.PermissionCreateRequest;
import io.github.changmin6362.multistore.feature.authorization.web.request.PermissionUpdateRequest;
import io.github.changmin6362.multistore.feature.authorization.web.response.PermissionResponse;
import io.github.changmin6362.multistore.feature.authorization.web.response.PermissionsResponse;
import io.github.changmin6362.multistore.common.web.flags.DeletedResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/rbac/permissions")
@CrossOrigin(origins = {"http://localhost:3000"})
public class PermissionController {

    private final PermissionService permissionService;

    public PermissionController(PermissionService permissionService) {
        this.permissionService = permissionService;
    }

    /**
     * GET /api/rbac/permissions
     * 전체 권한 목록 조회
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getPermissions() {
        List<PermissionDto> permissions = permissionService.findAll();
        return ResponseEntity.ok(ApiResponse.ok(new PermissionsResponse(permissions)));
    }

    /**
     * POST /api/rbac/permissions
     * 권한 생성 (permissionName 필수, 중복 409)
     */
    @PostMapping
    public ResponseEntity<ApiResponse> createPermission(@RequestBody PermissionCreateRequest body) {
        String permissionName = body != null ? body.permissionName() : null;
        String description = body != null ? body.permissionDescription() : null;
        String resourceType = body != null ? body.resourceType() : null;
        String actionType = body != null ? body.actionType() : null;
        if (!StringUtils.hasText(permissionName) || !StringUtils.hasText(resourceType) || !StringUtils.hasText(actionType)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "permissionName, resourceType, actionType은 필수입니다"));
        }
        if (permissionService.existsByName(permissionName)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ApiResponse.error(409, "이미 존재하는 권한입니다"));
        }
        boolean saved = permissionService.create(permissionName, description, resourceType, actionType);
        if (!saved) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(500, "권한 생성에 실패했습니다"));
        }
        PermissionDto permission = permissionService.findByName(permissionName);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(new PermissionResponse(permission)));
    }

    /**
     * GET /api/rbac/permissions/{permissionId}
     * 권한 단건 조회 (없으면 404)
     */
    @GetMapping("/{permissionId}")
    public ResponseEntity<ApiResponse> getPermission(@PathVariable Long permissionId) {
        PermissionDto permission = permissionService.findById(permissionId);
        if (permission == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "권한을 찾을 수 없습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(new PermissionResponse(permission)));
    }

    /**
     * PUT /api/rbac/permissions/{permissionId}
     * 권한 정보 수정 (없으면 404)
     * 요청 바디: { "permissionName": "...", "resourceType": "...", "actionType": "...", "permissionDescription": "..." }
     */
    @PutMapping("/{permissionId}")
    public ResponseEntity<ApiResponse> updatePermission(@PathVariable Long permissionId,
                                                                             @RequestBody PermissionUpdateRequest body) {
        String permissionName = body != null ? body.permissionName() : null;
        String resourceType = body != null ? body.resourceType() : null;
        String actionType = body != null ? body.actionType() : null;
        String description = body != null ? body.permissionDescription() : null;
        if (!StringUtils.hasText(permissionName) || !StringUtils.hasText(resourceType) || !StringUtils.hasText(actionType)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "permissionName, resourceType, actionType은 필수입니다"));
        }
        boolean updated = permissionService.updateNameAndDetails(permissionId, permissionName, resourceType, actionType, description);
        if (!updated) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "권한 수정에 실패했습니다"));
        }
        PermissionDto permission = permissionService.findById(permissionId);
        return ResponseEntity.ok(ApiResponse.ok(new PermissionResponse(permission)));
    }

    /**
     * DELETE /api/rbac/permissions/{permissionId}
     * 권한 삭제 (없으면 404)
     */
    @DeleteMapping("/{permissionId}")
    public ResponseEntity<ApiResponse> deletePermission(@PathVariable Long permissionId) {
        boolean deleted = permissionService.delete(permissionId);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "삭제할 권한이 없습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(new DeletedResponse(true)));
    }
}
