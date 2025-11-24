package io.github.changmin6362.multistore.feature.authorization.web.response;

import io.github.changmin6362.multistore.domain.permission.dto.PermissionDto;

/**
 * 권한 단건 응답 DTO
 */
public record PermissionResponse(PermissionDto permission) {}
