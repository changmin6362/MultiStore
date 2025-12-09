package io.github.changmin6362.multistore.feature.user_profile.service;

import io.github.changmin6362.multistore.domain.userprofile.UserProfileRepository;
import io.github.changmin6362.multistore.feature.user_profile.web.UserProfileMapper;
import io.github.changmin6362.multistore.feature.user_profile.web.request.UserProfileRequest;
import io.github.changmin6362.multistore.feature.user_profile.web.response.UserProfileResponse;
import org.springframework.stereotype.Service;

import java.math.BigInteger;

/**
 * 사용자 프로필 관련 Service
 */
@Service
public class UserProfileService {

    private final UserProfileRepository repository;

    public UserProfileService(UserProfileRepository repository) {
        this.repository = repository;
    }

    /**
     * 사용자 프로필 조회
     *
     * @param userId 조회할 사용자 ID
     * @return 사용자 프로필 응답 DTO
     */
    public UserProfileResponse get(BigInteger userId) {
        return UserProfileMapper.toResponse(repository.findByUserId(userId));
    }

    /**
     * 사용자 프로필을 생성
     *
     * @param userId  사용자 ID
     * @param request 프로필 생성 요청 DTO
     * @return 생성 성공 여부
     */
    public boolean create(BigInteger userId, UserProfileRequest request) {
        return repository.save(UserProfileMapper.toEntity(userId, request)) > 0;
    }

    /**
     * 사용자 프로필을 수정
     *
     * @param userId  사용자 ID
     * @param request 프로필 수정 요청 DTO
     * @return 수정 성공 여부
     */
    public boolean update(BigInteger userId, UserProfileRequest request) {
        return repository.update(UserProfileMapper.toEntity(userId, request)) > 0;
    }

    /**
     * 사용자 프로필을 삭제
     *
     * @param userId 삭제할 사용자 ID
     * @return 삭제 성공 여부
     */
    public boolean delete(BigInteger userId) {
        return repository.delete(userId) > 0;
    }
}
