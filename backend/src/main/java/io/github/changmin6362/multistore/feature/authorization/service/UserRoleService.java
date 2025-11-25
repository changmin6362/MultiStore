package io.github.changmin6362.multistore.feature.authorization.service;

import io.github.changmin6362.multistore.domain.role.dto.RoleDto;
import io.github.changmin6362.multistore.domain.userrole.UserRoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserRoleService {

    private final UserRoleRepository userRoleRepository;

    public UserRoleService(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    public List<RoleDto> findRolesByUserId(Long userId) {
        return userRoleRepository.findRolesByUserId(userId);
    }

    public boolean exists(Long userId, Long roleId) {
        return userRoleRepository.exists(userId, roleId);
    }

    public boolean assignRoleToUser(Long userId, Long roleId) {
        return userRoleRepository.assignRoleToUser(userId, roleId) > 0;
    }

    public boolean removeRoleFromUser(Long userId, Long roleId) {
        return userRoleRepository.removeRoleFromUser(userId, roleId) > 0;
    }
}
