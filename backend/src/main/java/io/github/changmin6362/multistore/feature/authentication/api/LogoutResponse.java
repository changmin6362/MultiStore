package io.github.changmin6362.multistore.feature.authentication.api;

public record LogoutResponse(
        boolean loggedOut,
        String message
) {
}
