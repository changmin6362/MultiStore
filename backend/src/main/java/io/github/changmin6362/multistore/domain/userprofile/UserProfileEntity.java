package io.github.changmin6362.multistore.domain.userprofile;

import java.math.BigInteger;
import java.sql.Date;

/**
 * UserProfile 테이블의 개별 행을 표현하는 Record
 *
 * @param userId            Biginteger
 * @param first_name        String
 * @param last_name         String
 * @param phone             String
 * @param birthDate         Date
 * @param gender            String
 * @param profile_image_url String
 */
public record UserProfileEntity(
        BigInteger userId,
        String first_name,
        String last_name,
        String phone,
        Date birthDate,
        String gender,
        String profile_image_url
) {

}
