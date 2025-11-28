package io.github.changmin6362.multistore.feature.authorization.web.request;

/**
 * 역할 생성 요청 DTO
 */
public record RoleCreateRequest(
        String roleName,
        String roleDescription
) {
}
