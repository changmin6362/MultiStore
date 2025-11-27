package io.github.changmin6362.multistore.feature.authorization.web.response;

/**
 * 권한 정보를 담는 응답 전용 레코드
 *
 * @param permissionId
 * @param permissionName
 * @param permissionDescription
 * @param resourceType
 * @param actionType
 */
public record PermissionResponse(
        Long permissionId,
        String permissionName,
        String permissionDescription,
        String resourceType,
        String actionType
) {
}
