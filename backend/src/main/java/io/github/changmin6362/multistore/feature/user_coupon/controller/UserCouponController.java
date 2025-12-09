package io.github.changmin6362.multistore.feature.user_coupon.controller;

import io.github.changmin6362.multistore.common.web.ApiResponse;
import io.github.changmin6362.multistore.feature.user_coupon.service.UserCouponService;
import io.github.changmin6362.multistore.feature.user_coupon.web.request.UserCouponRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

/**
 * 사용자 쿠폰 관련 HTTP 요청을 처리하는 REST 컨트롤러
 */
@RestController
@RequestMapping("/api/user-coupon")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserCouponController {

    private final UserCouponService service;

    public UserCouponController(UserCouponService service) {
        this.service = service;
    }

    /**
     * GET /api/user-coupon/available
     * <p>
     * 사용 가능한 쿠폰 조회
     */
    @GetMapping("/available")
    public ResponseEntity<ApiResponse> available(@RequestParam BigInteger userId) {
        return ResponseEntity.ok(ApiResponse.ok(service.getAvailableCoupons(userId)));
    }

    /**
     * GET /api/user-coupon/expired
     * <p>
     * 만료된 쿠폰 조회
     */
    @GetMapping("/expired")
    public ResponseEntity<ApiResponse> expired(@RequestParam BigInteger userId) {
        return ResponseEntity.ok(ApiResponse.ok(service.getExpiredCoupons(userId)));
    }

    /**
     * GET /api/user-coupon/used
     * <p>
     * 사용된 쿠폰 조회
     */
    @GetMapping("/used")
    public ResponseEntity<ApiResponse> used(@RequestParam BigInteger userId) {
        return ResponseEntity.ok(ApiResponse.ok(service.getUsedCoupons(userId)));
    }

    /**
     * POST /api/user-coupon
     * <p>
     * 쿠폰 발급
     */
    @PostMapping
    public ResponseEntity<ApiResponse> issue(@RequestBody UserCouponRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(service.issueCoupon(request)));
    }

    /**
     * PUT /api/user-coupon/{userCouponId}
     * <p>
     * 쿠폰 사용
     */
    @PutMapping("/{userCouponId}")
    public ResponseEntity<ApiResponse> use(
            @PathVariable BigInteger userCouponId,
            @RequestBody UserCouponRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.ok(service.useCoupon(userCouponId, request)));
    }

    /**
     * DELETE /api/user-coupon/{userCouponId}
     * <p>
     * 쿠폰 취소
     */
    @DeleteMapping("/{userCouponId}")
    public ResponseEntity<ApiResponse> revoke(@PathVariable BigInteger userCouponId) {
        return ResponseEntity.ok(ApiResponse.ok(service.revokeCoupon(userCouponId)));
    }
}
