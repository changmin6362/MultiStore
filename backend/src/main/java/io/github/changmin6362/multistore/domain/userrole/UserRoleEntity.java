package io.github.changmin6362.multistore.domain.userrole;

import java.math.BigInteger;

/**
 * UserRole 테이블의 개별 행을 표현하는 Record
 *
 * @param userId
 * @param roleId
 */
public record UserRoleEntity(
        BigInteger userId,
        int roleId
) {
}
