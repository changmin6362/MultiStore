package io.github.changmin6362.multistore.feature.user_address.service;

import io.github.changmin6362.multistore.domain.useraddress.UserAddressEntity;
import io.github.changmin6362.multistore.domain.useraddress.UserAddressRepository;
import io.github.changmin6362.multistore.feature.user_address.web.UserAddressMapper;
import io.github.changmin6362.multistore.feature.user_address.web.request.UserAddressRequest;
import io.github.changmin6362.multistore.feature.user_address.web.response.UserAddressResponse;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigInteger;
import java.util.List;

/**
 * 사용자 주소 관련 Service
 */
@Service
public class UserAddressService {

    private final UserAddressRepository repository;

    public UserAddressService(UserAddressRepository repository) {
        this.repository = repository;
    }

    /**
     * 사용자의 모든 배송 주소 조회
     *
     * @param userId 사용자 ID
     * @return 배송 주소 응답 DTO 목록
     */
    public List<UserAddressResponse> getAddresses(BigInteger userId) {
        return repository.findAllByUserId(userId)
                .stream()
                .map(UserAddressMapper::toResponse)
                .toList();
    }

    /**
     * 새로운 배송 주소 추가
     *
     * @param request 배송 주소 생성 요청 DTO
     * @return 주소 추가 성공 여부
     */
    public boolean addAddress(UserAddressRequest request) {
        UserAddressEntity entity = UserAddressMapper.toEntity(null, request);
        return repository.save(entity) > 0;
    }

    /**
     * 배송 주소 수정
     *
     * @param addressId 주소 ID
     * @param request 배송 주소 수정 요청 DTO
     * @return 주소 수정 성공 여부
     */
    public boolean modifyAddress(BigInteger addressId, UserAddressRequest request) {
        UserAddressEntity entity = UserAddressMapper.toEntity(addressId, request);
        return repository.update(entity) > 0;
    }

    /**
     * 기본 배송 주소 조회
     *
     * @param userId 사용자 ID
     * @return 기본 배송 주소 응답 DTO
     */
    public UserAddressResponse getDefaultAddress(BigInteger userId) {
        return UserAddressMapper.toResponse(repository.findDefaultAddress(userId));
    }

    /**
     * 기본 배송 주소 변경
     *
     * @param userId 사용자 ID
     * @param addressId 새로운 기본 주소 ID
     * @return 기본 주소 변경 성공 여부
     */
    @Transactional
    public boolean changeDefaultAddress(BigInteger userId, BigInteger addressId) {
        repository.unsetDefaultAddress(userId);
        return repository.setDefaultAddress(userId, addressId) == 1;
    }

    /**
     * 배송 주소 삭제
     *
     * @param addressId 주소 ID
     * @return 주소 삭제 성공 여부
     */
    public boolean deleteAddress(BigInteger addressId) {
        return repository.delete(addressId) > 0;
    }
}
