package io.github.changmin6362.multistore.feature.authorization.controller;

import io.github.changmin6362.multistore.common.web.ApiResponse;
import io.github.changmin6362.multistore.domain.role.dto.RoleDto;
import io.github.changmin6362.multistore.feature.authorization.service.RoleService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import io.github.changmin6362.multistore.feature.authorization.web.request.RoleCreateRequest;
import io.github.changmin6362.multistore.feature.authorization.web.request.RoleUpdateRequest;
import io.github.changmin6362.multistore.feature.authorization.web.response.RoleResponse;
import io.github.changmin6362.multistore.feature.authorization.web.response.RolesResponse;
import io.github.changmin6362.multistore.common.web.flags.DeletedResponse;

@RestController
@RequestMapping("/api/rbac/roles")
@CrossOrigin(origins = {"http://localhost:3000"})
public class RoleController {

    private final RoleService roleService;

    public RoleController(RoleService roleService) {
        this.roleService = roleService;
    }

    /**
     * GET /api/rbac/roles
     * 전체 역할 목록 조회
     * 응답: { success: true, roles: [...] }
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getRoles() {
        List<RoleDto> roles = roleService.findAll();
        return ResponseEntity.ok(ApiResponse.ok(new RolesResponse(roles)));
    }

    /**
     * POST /api/rbac/roles
     * 역할 생성
     * 요청 바디: { "roleName": "ROLE_ADMIN" }
     * - roleName 필수, 중복 시 409
     */
    @PostMapping
    public ResponseEntity<ApiResponse> createRole(@RequestBody RoleCreateRequest body) {
        String roleName = body != null ? body.roleName() : null;
        String roleDescription = body != null ? body.roleDescription() : null;
        if (!StringUtils.hasText(roleName)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "roleName은 필수입니다"));
        }
        if (roleService.existsByName(roleName)) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body(ApiResponse.error(409, "이미 존재하는 역할입니다"));
        }
        boolean saved = roleService.create(roleName, roleDescription);
        if (!saved) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(ApiResponse.error(500, "역할 생성에 실패했습니다"));
        }
        RoleDto role = roleService.findByName(roleName);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok(new RoleResponse(role)));
    }

    /**
     * GET /api/rbac/roles/{roleId}
     * 역할 단건 조회 (없으면 404)
     */
    @GetMapping("/{roleId}")
    public ResponseEntity<ApiResponse> getRole(@PathVariable Long roleId) {
        RoleDto role = roleService.findById(roleId);
        if (role == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "역할을 찾을 수 없습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(new RoleResponse(role)));
    }

    /**
     * PUT /api/rbac/roles/{roleId}
     * 역할 이름 수정 (없으면 404)
     * 요청 바디: { "roleName": "ROLE_MANAGER" }
     */
    @PutMapping("/{roleId}")
    public ResponseEntity<ApiResponse> updateRole(@PathVariable Long roleId,
                                                                       @RequestBody RoleUpdateRequest body) {
        String roleName = body != null ? body.roleName() : null;
        if (!StringUtils.hasText(roleName)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(ApiResponse.error(400, "roleName은 필수입니다"));
        }
        boolean updated = roleService.updateName(roleId, roleName);
        if (!updated) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "역할 수정에 실패했습니다"));
        }
        RoleDto role = roleService.findById(roleId);
        return ResponseEntity.ok(ApiResponse.ok(new RoleResponse(role)));
    }

    /**
     * DELETE /api/rbac/roles/{roleId}
     * 역할 삭제 (없으면 404)
     */
    @DeleteMapping("/{roleId}")
    public ResponseEntity<ApiResponse> deleteRole(@PathVariable Long roleId) {
        boolean deleted = roleService.delete(roleId);
        if (!deleted) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(ApiResponse.error(404, "삭제할 역할이 없습니다"));
        }
        return ResponseEntity.ok(ApiResponse.ok(new DeletedResponse(true)));
    }
}
