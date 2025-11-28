package io.github.changmin6362.multistore.feature.authentication.service;

import io.github.changmin6362.multistore.domain.user.UserEntity;
import io.github.changmin6362.multistore.domain.user.UserRepository;
import io.github.changmin6362.multistore.feature.authentication.util.PasswordHasher;
import org.springframework.stereotype.Service;

/**
 * 인증 서비스
 */
@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordHasher passwordHasher;
    private final RefreshTokenService refreshTokenService;
    private final JwtTokenProvider jwtTokenProvider;

    public AuthService(UserRepository userRepository,
                       PasswordHasher passwordHasher,
                       RefreshTokenService refreshTokenService,
                       JwtTokenProvider jwtTokenProvider) {
        this.userRepository = userRepository;
        this.passwordHasher = passwordHasher;
        this.refreshTokenService = refreshTokenService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    private String[] createTokenPair(String subject) {
        String accessToken = jwtTokenProvider.createToken(subject, "", "");
        String refreshToken = refreshTokenService.createToken(subject);
        return new String[]{accessToken, refreshToken};
    }

    /**
     * 회원 가입
     *
     * @param email    이메일
     * @param password 비밀번호
     * @param nickName 닉네임
     * @return 가입 성공 시 true, 실패 시 false
     */
    public boolean signup(String email, String password, String nickName) {
        if (userRepository.findByEmail(email) != null) return false;

        String hash = passwordHasher.hash(password);
        return userRepository.save(email, hash, nickName) > 0;
    }

    /**
     * 로그인
     *
     * @param email    이메일
     * @param password 비밀번호
     * @return 액세스 토큰과 리프레시 토큰
     */
    public String[] login(String email, String password) {
        UserEntity user = userRepository.findByEmail(email);
        if (user == null) return null;

        String passwordHash = passwordHasher.hash(password);
        String storedHash = user.passwordHash();

        if (!storedHash.equals(passwordHash)) return null;

        String accessToken = jwtTokenProvider.createToken(String.valueOf(user.userId()), email, user.nickName());
        String refreshToken = refreshTokenService.createToken(String.valueOf(user.userId()));

        return new String[]{accessToken, refreshToken};
    }

    /**
     * 리프레시 토큰으로 액세스 토큰과 리프레시 토큰 재발급
     *
     * @param refreshToken 리프레시 토큰
     * @return 액세스 토큰과 리프레시 토큰
     */
    public String[] refresh(String refreshToken) {
        if (!refreshTokenService.isValid(refreshToken)) return null;
        String subject = refreshTokenService.getSubject(refreshToken);
        refreshTokenService.remove(refreshToken);
        return createTokenPair(subject);
    }
}
