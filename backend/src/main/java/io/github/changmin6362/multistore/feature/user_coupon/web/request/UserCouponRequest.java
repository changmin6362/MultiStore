package io.github.changmin6362.multistore.feature.user_coupon.web.request;

import java.math.BigInteger;
import java.sql.Timestamp;

/**
 * UserCoupon 생성/수정 요청 DTO
 *
 * @param couponId        BigInteger
 * @param userId          BigInteger
 * @param issuedAt        Timestamp
 * @param expiredAt       Timestamp
 * @param usedOrderNumber String
 */
public record UserCouponRequest(
        BigInteger couponId,
        BigInteger userId,
        Timestamp issuedAt,
        Timestamp expiredAt,
        String usedOrderNumber
) {
}
