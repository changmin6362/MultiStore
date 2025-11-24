package io.github.changmin6362.multistore.feature.user.web.response;

import io.github.changmin6362.multistore.domain.user.dto.UserDto;

/**
 * 사용자 단건 응답 DTO
 */
public record UserResponse(UserDto user) {}
