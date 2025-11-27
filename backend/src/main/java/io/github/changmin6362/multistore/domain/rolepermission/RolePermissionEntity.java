package io.github.changmin6362.multistore.domain.rolepermission;

/**
 * RolePermission 테이블의 개별 행을 표현하는 레코드
 *
 * @param roleId
 * @param permissionId
 */
public record RolePermissionEntity(
        int roleId,
        int permissionId
) {
}
