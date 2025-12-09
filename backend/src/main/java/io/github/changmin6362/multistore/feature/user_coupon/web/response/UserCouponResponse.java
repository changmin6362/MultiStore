package io.github.changmin6362.multistore.feature.user_coupon.web.response;

import java.math.BigInteger;
import java.sql.Timestamp;

/**
 * UserCoupon 응답 DTO
 *
 * @param userCouponId    BigInteger
 * @param couponId        BigInteger
 * @param userId          BigInteger
 * @param issuedAt        Timestamp
 * @param expiredAt       Timestamp
 * @param usedOrderNumber String
 * @param deletedAt       Timestamp
 */
public record UserCouponResponse(
        BigInteger userCouponId,
        BigInteger couponId,
        BigInteger userId,
        Timestamp issuedAt,
        Timestamp expiredAt,
        String usedOrderNumber,
        Timestamp deletedAt
) {
}
