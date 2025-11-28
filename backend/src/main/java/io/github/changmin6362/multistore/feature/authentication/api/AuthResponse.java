package io.github.changmin6362.multistore.feature.authentication.api;

import java.math.BigInteger;

/**
 * 로그인/회원가입 성공 시 내려주는 응답
 * { userId, emailAddress, nickName, createdAt, accessToken, refreshToken }
 */
public record AuthResponse(
        BigInteger userId,
        String emailAddress,
        String nickName,
        String createdAt,
        String accessToken,
        String refreshToken
) {
}
