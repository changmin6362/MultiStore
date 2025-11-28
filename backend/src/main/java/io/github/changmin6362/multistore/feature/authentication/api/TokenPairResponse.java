package io.github.changmin6362.multistore.feature.authentication.api;

public record TokenPairResponse(
        String accessToken,
        String refreshToken
) {
}
