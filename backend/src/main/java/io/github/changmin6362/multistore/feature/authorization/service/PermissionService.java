package io.github.changmin6362.multistore.feature.authorization.service;

import io.github.changmin6362.multistore.domain.permission.PermissionRepository;
import io.github.changmin6362.multistore.domain.permission.dto.PermissionDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PermissionService {

    private final PermissionRepository permissionRepository;

    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public List<PermissionDto> findAll() {
        return permissionRepository.findAll();
    }

    public PermissionDto findById(Long permissionId) {
        return permissionRepository.findById(permissionId);
    }

    public PermissionDto findByName(String permissionName) {
        return permissionRepository.findByName(permissionName);
    }

    public boolean existsByName(String permissionName) {
        return permissionRepository.existsByName(permissionName);
    }

    public boolean create(String permissionName, String description, String resourceType, String actionType) {
        int saved = permissionRepository.save(permissionName, description, resourceType, actionType);
        return saved > 0;
    }

    public boolean updateName(Long permissionId, String permissionName) {
        return permissionRepository.update(permissionId, permissionName) > 0;
    }

    public boolean updateNameAndDetails(Long permissionId, String permissionName, String resourceType, String actionType, String permissionDescription) {
        return permissionRepository.updateNameAndDetails(permissionId, permissionName, resourceType, actionType, permissionDescription) > 0;
    }

    public boolean delete(Long permissionId) {
        return permissionRepository.delete(permissionId) > 0;
    }
}
