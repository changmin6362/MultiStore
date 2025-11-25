package io.github.changmin6362.multistore.feature.authentication.api;

import java.util.Date;

public record TokenVerifyResponse(boolean valid, String subject, Date expiresAt) {}
