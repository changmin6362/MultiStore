package io.github.changmin6362.multistore.feature.authorization.service;

import io.github.changmin6362.multistore.domain.rolepermission.RolePermissionRepository;
import io.github.changmin6362.multistore.feature.authorization.web.response.PermissionResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RolePermissionService {

    private final RolePermissionRepository rolePermissionRepository;

    public RolePermissionService(RolePermissionRepository rolePermissionRepository) {
        this.rolePermissionRepository = rolePermissionRepository;
    }

    public List<PermissionResponse> findPermissionsByRoleId(Long roleId) {
        List<?> entities = rolePermissionRepository.findPermissionsByRoleId(roleId);
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public List<PermissionResponse> findPermissionsByUserId(Long userId) {
        List<?> entities = rolePermissionRepository.findPermissionsByUserId(userId);
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public boolean exists(Long roleId, Long permissionId) {
        return rolePermissionRepository.exists(roleId, permissionId);
    }

    public boolean assignPermissionToRole(Long roleId, Long permissionId) {
        return rolePermissionRepository.assignPermissionToRole(roleId, permissionId) > 0;
    }

    public boolean removePermissionFromRole(Long roleId, Long permissionId) {
        return rolePermissionRepository.removePermissionFromRole(roleId, permissionId) > 0;
    }

    public boolean userHasPermissionByName(Long userId, String permissionName) {
        return rolePermissionRepository.userHasPermissionByName(userId, permissionName);
    }

    public boolean userHasPermissionByResourceAction(Long userId, String resourceType, String actionType) {
        return rolePermissionRepository.userHasPermissionByResourceAction(userId, resourceType, actionType);
    }

    private PermissionResponse toDto(Object e) {
        if (e == null) return null;
        try {
            Object idObj = e.getClass().getMethod("permissionId").invoke(e);
            Object nameObj = e.getClass().getMethod("permissionName").invoke(e);
            Object descObj = e.getClass().getMethod("permissionDescription").invoke(e);
            Object resTypeObj = e.getClass().getMethod("resourceType").invoke(e);
            Object actTypeObj = e.getClass().getMethod("actionType").invoke(e);

            Long id = null;
            if (idObj instanceof Number n) id = n.longValue();
            else if (idObj != null) id = Long.parseLong(idObj.toString());

            return new PermissionResponse(
                    id,
                    nameObj == null ? null : nameObj.toString(),
                    descObj == null ? null : descObj.toString(),
                    resTypeObj == null ? null : resTypeObj.toString(),
                    actTypeObj == null ? null : actTypeObj.toString()
            );
        } catch (ReflectiveOperationException ex) {
            throw new IllegalStateException("Permission 엔티티를 PermissionResponse로 변환하는 중 오류", ex);
        }
    }
}
