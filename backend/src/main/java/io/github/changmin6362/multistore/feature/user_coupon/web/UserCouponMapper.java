package io.github.changmin6362.multistore.feature.user_coupon.web;

import io.github.changmin6362.multistore.domain.usercoupon.UserCouponEntity;
import io.github.changmin6362.multistore.feature.user_coupon.web.request.UserCouponRequest;
import io.github.changmin6362.multistore.feature.user_coupon.web.response.UserCouponResponse;

import java.math.BigInteger;

/**
 * UserCoupon Entity와 DTO 간 변환을 담당하는 Mapper
 */
public class UserCouponMapper {

    /**
     * UserCouponEntity -> UserCouponResponse 변환
     */
    public static UserCouponResponse toResponse(UserCouponEntity e) {
        if (e == null) return null;

        return new UserCouponResponse(
                e.userCouponId(),
                e.couponId(),
                e.userId(),
                e.issuedAt(),
                e.expiredAt(),
                e.usedOrderNumber(),
                e.deletedAt()
        );
    }

    /**
     * UserCouponRequest -> UserCouponEntity 변환
     */
    public static UserCouponEntity toEntity(BigInteger userCouponId, UserCouponRequest r) {
        return new UserCouponEntity(
                userCouponId,
                r.couponId(),
                r.userId(),
                r.issuedAt(),
                r.expiredAt(),
                r.usedOrderNumber(),
                null
        );
    }
}
