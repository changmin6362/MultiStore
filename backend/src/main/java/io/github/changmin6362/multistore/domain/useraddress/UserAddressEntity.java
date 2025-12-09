package io.github.changmin6362.multistore.domain.useraddress;

import java.math.BigInteger;
import java.sql.Timestamp;

/**
 * UserAddress 테이블의 개별 행을 표현하는 Record
 *
 * @param addressId      Biginteger
 * @param userId         Biginteger
 * @param postalCode     String
 * @param addressDefault String
 * @param addressDetail  String
 * @param isDefault      boolean
 * @param recipientName  String
 * @param recipientPhone String
 * @param createdAt      Timestamp
 * @param updatedAt      Timestamp
 * @param deletedAt      Timestamp
 */
public record UserAddressEntity(
        BigInteger addressId,
        BigInteger userId,
        String postalCode,
        String addressDefault,
        String addressDetail,
        boolean isDefault,
        String recipientName,
        String recipientPhone,
        Timestamp createdAt,
        Timestamp updatedAt,
        Timestamp deletedAt

) {
}
