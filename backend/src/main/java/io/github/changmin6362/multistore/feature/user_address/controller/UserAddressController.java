package io.github.changmin6362.multistore.feature.user_address.controller;

import io.github.changmin6362.multistore.common.web.ApiResponse;
import io.github.changmin6362.multistore.feature.user_address.service.UserAddressService;
import io.github.changmin6362.multistore.feature.user_address.web.request.UserAddressRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;

/**
 * 사용자 주소 관련 HTTP 요청을 처리하는 REST 컨트롤러
 */
@RestController
@RequestMapping("/api/user-address")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserAddressController {

    private final UserAddressService service;

    public UserAddressController(UserAddressService service) {
        this.service = service;
    }

    /**
     * GET /api/user-address
     * <p>
     * 사용자의 모든 배송 주소 조회
     */
    @GetMapping
    public ResponseEntity<ApiResponse> getAddresses(@RequestParam BigInteger userId) {
        return ResponseEntity.ok(ApiResponse.ok(service.getAddresses(userId)));
    }

    /**
     * POST /api/user-address
     * <p>
     * 새로운 배송 주소 추가
     */
    @PostMapping
    public ResponseEntity<ApiResponse> addAddress(@RequestBody UserAddressRequest request) {
        return ResponseEntity.ok(ApiResponse.ok(service.addAddress(request)));
    }

    /**
     * PUT /api/user-address/{addressId}
     * <p>
     * 배송 주소 수정
     */
    @PutMapping("/{addressId}")
    public ResponseEntity<ApiResponse> modifyAddress(
            @PathVariable BigInteger addressId,
            @RequestBody UserAddressRequest request
    ) {
        return ResponseEntity.ok(ApiResponse.ok(service.modifyAddress(addressId, request)));
    }

    /**
     * GET /api/user-address/default
     * <p>
     * 기본 배송 주소 조회
     */
    @GetMapping("/default")
    public ResponseEntity<ApiResponse> getDefaultAddress(@RequestParam BigInteger userId) {
        return ResponseEntity.ok(ApiResponse.ok(service.getDefaultAddress(userId)));
    }

    /**
     * PUT /api/user-address/default
     * <p>
     * 기본 배송 주소 변경
     */
    @PutMapping("/default")
    public ResponseEntity<ApiResponse> changeDefault(
            @RequestParam BigInteger userId,
            @RequestParam BigInteger addressId
    ) {
        return ResponseEntity.ok(ApiResponse.ok(service.changeDefaultAddress(userId, addressId)));
    }

    /**
     * DELETE /api/user-address/{addressId}
     * <p>
     * 배송 주소 삭제
     */
    @DeleteMapping("/{addressId}")
    public ResponseEntity<ApiResponse> deleteAddress(@PathVariable BigInteger addressId) {
        return ResponseEntity.ok(ApiResponse.ok(service.deleteAddress(addressId)));
    }
}
