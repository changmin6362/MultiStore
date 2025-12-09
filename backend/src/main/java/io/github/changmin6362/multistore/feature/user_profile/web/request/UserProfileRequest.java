package io.github.changmin6362.multistore.feature.user_profile.web.request;

import java.time.LocalDate;

/**
 * UserProfile의 요청용 Record
 *
 * @param firstName       String
 * @param lastName        String
 * @param phone           String
 * @param birthDate       LocalDate
 * @param gender          String
 * @param profileImageUrl String
 */
public record UserProfileRequest(
        String firstName,
        String lastName,
        String phone,
        LocalDate birthDate,
        String gender,
        String profileImageUrl
) {
}
