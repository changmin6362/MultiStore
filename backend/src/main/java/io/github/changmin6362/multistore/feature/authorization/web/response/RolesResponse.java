package io.github.changmin6362.multistore.feature.authorization.web.response;

import io.github.changmin6362.multistore.domain.role.dto.RoleDto;
import java.util.List;

/**
 * 역할 목록 응답 DTO
 */
public record RolesResponse(List<RoleDto> roles) {}
