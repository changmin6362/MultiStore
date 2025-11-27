package io.github.changmin6362.multistore.feature.user.web.response;

import io.github.changmin6362.multistore.feature.common.response.UserResponse;
import java.util.List;

/**
 * 사용자 목록 응답 DTO
 */
public record UsersResponse(List<UserResponse> users) {}
