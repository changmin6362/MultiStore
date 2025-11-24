package io.github.changmin6362.multistore.feature.authorization.web.response;

import io.github.changmin6362.multistore.domain.permission.dto.PermissionDto;
import java.util.List;

/**
 * 권한 목록 응답 DTO
 */
public record PermissionsResponse(List<PermissionDto> permissions) {}
