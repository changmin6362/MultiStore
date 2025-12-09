package io.github.changmin6362.multistore.feature.user_address.web.response;

import java.math.BigInteger;
import java.sql.Timestamp;

/**
 * UserAddress 응답 DTO
 *
 * @param addressId      BigInteger
 * @param userId         BigInteger
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
public record UserAddressResponse(
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
