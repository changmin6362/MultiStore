package io.github.changmin6362.multistore.feature.user_profile.web.response;

import java.math.BigInteger;
import java.time.LocalDate;

/**
 * UserProfile의 응답용 Record
 *
 * @param userId          BigInteger
 * @param firstName       String
 * @param lastName        String
 * @param phone           String
 * @param birthDate       LocalDate
 * @param gender          String
 * @param profileImageUrl String
 */
public record UserProfileResponse(
        BigInteger userId,
        String firstName,
        String lastName,
        String phone,
        LocalDate birthDate,
        String gender,
        String profileImageUrl
) {
}
