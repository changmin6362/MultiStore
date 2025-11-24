package io.github.changmin6362.multistore.feature.authorization.service;

import io.github.changmin6362.multistore.domain.permission.dto.PermissionDto;
import io.github.changmin6362.multistore.domain.rolepermission.RolePermissionRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RolePermissionService {

    private final RolePermissionRepository rolePermissionRepository;

    public RolePermissionService(RolePermissionRepository rolePermissionRepository) {
        this.rolePermissionRepository = rolePermissionRepository;
    }

    public List<PermissionDto> findPermissionsByRoleId(Long roleId) {
        return rolePermissionRepository.findPermissionsByRoleId(roleId);
    }

    public List<PermissionDto> findPermissionsByUserId(Long userId) {
        return rolePermissionRepository.findPermissionsByUserId(userId);
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
}
