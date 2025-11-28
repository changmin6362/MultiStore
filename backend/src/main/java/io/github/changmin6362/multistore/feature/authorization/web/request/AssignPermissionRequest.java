package io.github.changmin6362.multistore.feature.authorization.web.request;

/**
 * 역할에 권한을 부여할 때 사용하는 요청 DTO
 */
public record AssignPermissionRequest(
        int permissionId
) {
}
