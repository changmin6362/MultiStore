package io.github.changmin6362.multistore.domain.role;

import java.sql.Timestamp;

/**
 * Role 테이블의 개별 행을 표현하는 레코드
 *
 * @param roleId
 * @param roleName
 * @param roleDescription
 * @param createdAt
 * @param updatedAt
 */
public record RoleEntity(
        int roleId,
        String roleName,
        String roleDescription,
        Timestamp createdAt,
        Timestamp updatedAt
) {
}
