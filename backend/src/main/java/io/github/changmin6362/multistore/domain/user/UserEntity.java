package io.github.changmin6362.multistore.domain.user;

import java.math.BigInteger;
import java.sql.Timestamp;

/**
 * User 테이블의 개별 행을 표현하는 Record
 *
 * @param userId
 * @param emailAddress
 * @param passwordHash
 * @param nickName
 * @param createdAt
 * @param updatedAt
 * @param deletedAt
 */
public record UserEntity(
        BigInteger userId,
        String emailAddress,
        String passwordHash,
        String nickName,
        Timestamp createdAt,
        Timestamp updatedAt,
        Timestamp deletedAt
) {
}
