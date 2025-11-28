package io.github.changmin6362.multistore.feature.authentication.web;

public record LoginRequest(
        String emailAddress,
        String password
) {
}
