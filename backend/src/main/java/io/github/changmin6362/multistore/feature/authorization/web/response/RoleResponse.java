package io.github.changmin6362.multistore.feature.authorization.web.response;

/**
 * 역할 정보를 담는 응답 전용 레코드
 */
public record RoleResponse(
        Long roleId,
        String roleName,
        String roleDescription
) {
}
