package io.github.changmin6362.multistore.feature.user_address.web.request;

import java.math.BigInteger;

/**
 * UserAddress 생성/수정 요청 DTO
 *
 * @param userId         BigInteger
 * @param postalCode     String
 * @param addressDefault String
 * @param addressDetail  String
 * @param isDefault      boolean
 * @param recipientName  String
 * @param recipientPhone String
 */
public record UserAddressRequest(
        BigInteger userId,
        String postalCode,
        String addressDefault,
        String addressDetail,
        boolean isDefault,
        String recipientName,
        String recipientPhone
) {
}
