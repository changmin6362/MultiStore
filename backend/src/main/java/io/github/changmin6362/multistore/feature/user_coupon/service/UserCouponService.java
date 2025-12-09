package io.github.changmin6362.multistore.feature.user_coupon.service;

import io.github.changmin6362.multistore.domain.usercoupon.UserCouponEntity;
import io.github.changmin6362.multistore.domain.usercoupon.UserCouponRepository;
import io.github.changmin6362.multistore.feature.user_coupon.web.UserCouponMapper;
import io.github.changmin6362.multistore.feature.user_coupon.web.request.UserCouponRequest;
import io.github.changmin6362.multistore.feature.user_coupon.web.response.UserCouponResponse;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

/**
 * 사용자 쿠폰 관련 Service
 */
@Service
public class UserCouponService {

    private final UserCouponRepository repo;

    public UserCouponService(UserCouponRepository repo) {
        this.repo = repo;
    }

    /**
     * 사용 가능한 쿠폰 조회
     *
     * @param userId 사용자 ID
     * @return 사용 가능한 쿠폰 응답 DTO 목록
     */
    public List<UserCouponResponse> getAvailableCoupons(BigInteger userId) {
        return repo.findValidCoupons(userId).stream()
                .map(UserCouponMapper::toResponse)
                .toList();
    }

    /**
     * 만료된 쿠폰 조회
     *
     * @param userId 사용자 ID
     * @return 만료된 쿠폰 응답 DTO 목록
     */
    public List<UserCouponResponse> getExpiredCoupons(BigInteger userId) {
        return repo.findExpiredCoupons(userId).stream()
                .map(UserCouponMapper::toResponse)
                .toList();
    }

    /**
     * 사용된 쿠폰 조회
     *
     * @param userId 사용자 ID
     * @return 사용된 쿠폰 응답 DTO 목록
     */
    public List<UserCouponResponse> getUsedCoupons(BigInteger userId) {
        return repo.findUsedCoupons(userId).stream()
                .map(UserCouponMapper::toResponse)
                .toList();
    }

    /**
     * 쿠폰 발급
     *
     * @param request 쿠폰 발급 요청 DTO
     * @return 쿠폰 발급 성공 여부
     */
    public boolean issueCoupon(UserCouponRequest request) {
        UserCouponEntity entity = UserCouponMapper.toEntity(null, request);
        return repo.save(entity) > 0;
    }

    /**
     * 쿠폰 사용
     *
     * @param userCouponId 쿠폰 ID
     * @param request 쿠폰 사용 요청 DTO
     * @return 쿠폰 사용 성공 여부
     */
    public boolean useCoupon(BigInteger userCouponId, UserCouponRequest request) {
        UserCouponEntity entity = UserCouponMapper.toEntity(userCouponId, request);
        return repo.update(entity) > 0;
    }

    /**
     * 쿠폰 취소
     *
     * @param userCouponId 쿠폰 ID
     * @return 쿠폰 취소 성공 여부
     */
    public boolean revokeCoupon(BigInteger userCouponId) {
        return repo.softDelete(userCouponId) > 0;
    }
}
