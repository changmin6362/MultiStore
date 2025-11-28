package io.github.changmin6362.multistore.domain.permission;

import java.sql.Timestamp;

/**
 * Permission 테이블의 개별 행을 표현하는 Record
 *
 * @param permissionId          int
 * @param permissionName        String
 * @param permissionDescription String
 * @param resourceType          String
 * @param actionType            String
 * @param createdAt             Timestamp
 * @param updatedAt             Timestamp
 */
public record PermissionEntity(
        int permissionId,
        String permissionName,
        String permissionDescription,
        String resourceType,
        String actionType,
        Timestamp createdAt,
        Timestamp updatedAt
) {
}
