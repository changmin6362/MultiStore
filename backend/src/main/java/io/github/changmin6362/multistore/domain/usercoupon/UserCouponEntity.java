package io.github.changmin6362.multistore.domain.usercoupon;

import java.math.BigInteger;
import java.sql.Timestamp;

/**
 * UserCoupon 행의 개별 테이블을 표현하는 Record
 *
 * @param userCouponId    BigInteger
 * @param couponId        BigInteger
 * @param userId          BigInteger
 * @param issuedAt        Timestamp
 * @param expiredAt       Timestamp
 * @param usedOrderNumber String
 * @param deletedAt       Timestamp
 */
public record UserCouponEntity(
        BigInteger userCouponId,
        BigInteger couponId,
        BigInteger userId,
        Timestamp issuedAt,
        Timestamp expiredAt,
        String usedOrderNumber,
        Timestamp deletedAt
) {

}
