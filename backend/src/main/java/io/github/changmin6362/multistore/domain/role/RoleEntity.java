package io.github.changmin6362.multistore.domain.role;

import java.sql.Timestamp;

/**
 * Role 테이블의 개별 행을 표현하는 Record
 *
 * @param roleId          int
 * @param roleName        String
 * @param roleDescription String
 * @param createdAt       Timestamp
 * @param updatedAt       Timestamp
 */
public record RoleEntity(
        int roleId,
        String roleName,
        String roleDescription,
        Timestamp createdAt,
        Timestamp updatedAt
) {
}
