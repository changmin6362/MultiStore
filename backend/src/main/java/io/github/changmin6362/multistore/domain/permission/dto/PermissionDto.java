package io.github.changmin6362.multistore.domain.permission.dto;

/**
 * 권한 엔티티 DTO
 */
public record PermissionDto(
    Long permissionId,
    String permissionName,
    String permissionDescription,
    String resourceType,
    String actionType
) {}
