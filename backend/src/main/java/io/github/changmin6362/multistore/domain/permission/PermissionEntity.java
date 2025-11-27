package io.github.changmin6362.multistore.domain.permission;

import java.sql.Timestamp;

/**
 * Permission 테이블의 개별 행을 표현하는 레코드
 *
 * @param permissionId
 * @param permissionName
 * @param permissionDescription
 * @param resource_type
 * @param action_type
 * @param createdAt
 * @param updatedAt
 */
public record PermissionEntity(
        int permissionId,
        String permissionName,
        String permissionDescription,
        String resource_type,
        String action_type,
        Timestamp createdAt,
        Timestamp updatedAt
) {
}
