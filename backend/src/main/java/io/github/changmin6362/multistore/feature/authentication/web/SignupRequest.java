package io.github.changmin6362.multistore.feature.authentication.web;

public record SignupRequest(
        String emailAddress,
        String password,
        String nickName
) {
}
