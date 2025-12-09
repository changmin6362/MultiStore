package io.github.changmin6362.multistore.feature.user_address.web;

import io.github.changmin6362.multistore.domain.useraddress.UserAddressEntity;
import io.github.changmin6362.multistore.feature.user_address.web.request.UserAddressRequest;
import io.github.changmin6362.multistore.feature.user_address.web.response.UserAddressResponse;

import java.math.BigInteger;
import java.sql.Timestamp;

/**
 * UserAddress Entity와 DTO 간 변환을 담당하는 Mapper
 */
public class UserAddressMapper {

    /**
     * UserAddressEntity -> UserAddressResponse 변환
     */
    public static UserAddressResponse toResponse(UserAddressEntity e) {
        if (e == null) return null;

        return new UserAddressResponse(
                e.addressId(),
                e.userId(),
                e.postalCode(),
                e.addressDefault(),
                e.addressDetail(),
                e.isDefault(),
                e.recipientName(),
                e.recipientPhone(),
                e.createdAt(),
                e.updatedAt(),
                e.deletedAt()
        );
    }

    /**
     * UserAddressRequest -> UserAddressEntity 변환
     */
    public static UserAddressEntity toEntity(BigInteger addressId, UserAddressRequest r) {
        return new UserAddressEntity(
                addressId,
                r.userId(),
                r.postalCode(),
                r.addressDefault(),
                r.addressDetail(),
                r.isDefault(),
                r.recipientName(),
                r.recipientPhone(),
                new Timestamp(System.currentTimeMillis()),
                new Timestamp(System.currentTimeMillis()),
                null
        );
    }
}
