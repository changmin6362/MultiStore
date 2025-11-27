package io.github.changmin6362.multistore.feature.authorization.service;

import io.github.changmin6362.multistore.domain.permission.PermissionRepository;
import io.github.changmin6362.multistore.feature.authorization.web.response.PermissionResponse;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PermissionService {

    private final PermissionRepository permissionRepository;

    public PermissionService(PermissionRepository permissionRepository) {
        this.permissionRepository = permissionRepository;
    }

    public List<PermissionResponse> findAll() {
        List<?> entities = permissionRepository.findAll();
        return entities.stream().map(this::toDto).collect(Collectors.toList());
    }

    public PermissionResponse findById(Long permissionId) {
        Object entity = permissionRepository.findById(permissionId);
        return entity == null ? null : toDto(entity);
    }

    public PermissionResponse findByName(String permissionName) {
        Object entity = permissionRepository.findByName(permissionName);
        return entity == null ? null : toDto(entity);
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

    private PermissionResponse toDto(Object e) {
        if (e == null) return null;
        try {
            // 리플렉션으로 엔티티 접근(서비스 레이어에서 엔티티 타입 의존 제거 목적)
            Object idObj = e.getClass().getMethod("permissionId").invoke(e);
            Object nameObj = e.getClass().getMethod("permissionName").invoke(e);
            Object descObj = e.getClass().getMethod("permissionDescription").invoke(e);
            Object resTypeObj = e.getClass().getMethod("resource_type").invoke(e);
            Object actTypeObj = e.getClass().getMethod("action_type").invoke(e);

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
