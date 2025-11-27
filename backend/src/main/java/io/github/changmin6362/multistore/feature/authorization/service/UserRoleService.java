package io.github.changmin6362.multistore.feature.authorization.service;

import io.github.changmin6362.multistore.feature.authorization.web.response.RoleResponse;
import io.github.changmin6362.multistore.domain.userrole.UserRoleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserRoleService {

    private final UserRoleRepository userRoleRepository;

    public UserRoleService(UserRoleRepository userRoleRepository) {
        this.userRoleRepository = userRoleRepository;
    }

    public List<RoleResponse> findRolesByUserId(Long userId) {
        List<?> entities = userRoleRepository.findRolesByUserId(userId);
        return entities.stream().map(this::toDto).collect(Collectors.toList());
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

    private RoleResponse toDto(Object e) {
        if (e == null) return null;
        try {
            Object idObj = e.getClass().getMethod("roleId").invoke(e);
            Object nameObj = e.getClass().getMethod("roleName").invoke(e);
            Object descObj = e.getClass().getMethod("roleDescription").invoke(e);

            Long id = null;
            if (idObj instanceof Number n) id = n.longValue();
            else if (idObj != null) id = Long.parseLong(idObj.toString());

            return new RoleResponse(
                    id,
                    nameObj == null ? null : nameObj.toString(),
                    descObj == null ? null : descObj.toString()
            );
        } catch (ReflectiveOperationException ex) {
            throw new IllegalStateException("Role 엔티티를 RoleResponse로 변환하는 중 오류", ex);
        }
    }
}
