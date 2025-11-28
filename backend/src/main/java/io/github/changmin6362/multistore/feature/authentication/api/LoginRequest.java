package io.github.changmin6362.multistore.feature.authentication.api;

public record LoginRequest(
        String emailAddress,
        String password
) {
}
