package io.github.changmin6362.multistore.feature.authorization.service;

import io.github.changmin6362.multistore.domain.role.RoleRepository;
import io.github.changmin6362.multistore.feature.authorization.web.response.RoleResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {

    private final RoleRepository roleRepository;

    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public List<RoleResponse> findAll() {
        List<?> entities = roleRepository.findAll();
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public RoleResponse findById(int roleId) {
        Object entity = roleRepository.findById(roleId);
        return entity == null ? null : toDto(entity);
    }

    public RoleResponse findByName(String roleName) {
        Object entity = roleRepository.findByName(roleName);
        return entity == null ? null : toDto(entity);
    }

    public boolean existsByName(String roleName) {
        return roleRepository.existsByName(roleName);
    }

    public boolean create(String roleName, String roleDescription) {
        return roleRepository.save(roleName, roleDescription) > 0;
    }

    public boolean updateNameAndDescription(int roleId, String roleName, String roleDescription) {
        return roleRepository.updateNameAndDescription(roleId, roleName, roleDescription) > 0;
    }

    public boolean delete(int roleId) {
        return roleRepository.delete(roleId) > 0;
    }

    private RoleResponse toDto(Object e) {
        if (e == null) return null;
        try {
            Object idObj = e.getClass().getMethod("roleId").invoke(e);
            Object nameObj = e.getClass().getMethod("roleName").invoke(e);
            Object descObj = e.getClass().getMethod("roleDescription").invoke(e);

            int id = 0;
            if (idObj instanceof Number n) id = n.intValue();
            else if (idObj != null) id = Integer.parseInt(idObj.toString());

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
