package io.github.changmin6362.multistore.feature.authorization.service;

import io.github.changmin6362.multistore.domain.role.RoleRepository;
import io.github.changmin6362.multistore.domain.role.dto.RoleDto;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<RoleDto> findAll() { return roleRepository.findAll(); }

    public RoleDto findById(Long roleId) { return roleRepository.findById(roleId); }

    public RoleDto findByName(String roleName) { return roleRepository.findByName(roleName); }

    public boolean existsByName(String roleName) { return roleRepository.existsByName(roleName); }

    public boolean create(String roleName, String roleDescription) {
        return roleRepository.save(roleName, roleDescription) > 0;
    }

    public boolean updateName(Long roleId, String roleName) {
        return roleRepository.update(roleId, roleName) > 0;
    }

    public boolean updateNameAndDescription(Long roleId, String roleName, String roleDescription) {
        return roleRepository.updateNameAndDescription(roleId, roleName, roleDescription) > 0;
    }

    public boolean delete(Long roleId) {
        return roleRepository.delete(roleId) > 0;
    }
}
