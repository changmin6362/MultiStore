package io.github.changmin6362.multistore.feature.user_profile.web;

import io.github.changmin6362.multistore.domain.userprofile.UserProfileEntity;
import io.github.changmin6362.multistore.feature.user_profile.web.request.UserProfileRequest;
import io.github.changmin6362.multistore.feature.user_profile.web.response.UserProfileResponse;

import java.math.BigInteger;
import java.sql.Date;

/**
 * UserProfile Entity와 DTO 간 변환을 담당하는 Mapper
 */
public class UserProfileMapper {

    /**
     * UserProfileEntity -> UserProfileResponse 변환
     */
    public static UserProfileResponse toResponse(UserProfileEntity entity) {
        if (entity == null) return null;

        return new UserProfileResponse(
                entity.userId(),
                entity.first_name(),
                entity.last_name(),
                entity.phone(),
                entity.birthDate().toLocalDate(),
                entity.gender(),
                entity.profile_image_url()
        );
    }

    /**
     * UserProfileRequest -> UserProfileEntity 변환
     */
    public static UserProfileEntity toEntity(BigInteger userId, UserProfileRequest request) {
        return new UserProfileEntity(
                userId,
                request.firstName(),
                request.lastName(),
                request.phone(),
                Date.valueOf(request.birthDate()),
                request.gender(),
                request.profileImageUrl()
        );
    }
}
