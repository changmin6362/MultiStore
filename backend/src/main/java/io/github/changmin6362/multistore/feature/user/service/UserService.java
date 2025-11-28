package io.github.changmin6362.multistore.feature.user.service;

import io.github.changmin6362.multistore.domain.user.UserEntity;
import io.github.changmin6362.multistore.domain.user.UserRepository;
import io.github.changmin6362.multistore.feature.common.response.UserResponse;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> findAll() {
        return userRepository.findAll().stream().map(this::toResponse).collect(Collectors.toList());
    }

    public UserResponse findById(BigInteger userId) {
        UserEntity e = userRepository.findById(userId);
        return e == null ? null : toResponse(e);
    }

    public boolean update(BigInteger userId, String emailAddress, String nickName) {
        return userRepository.update(userId, emailAddress, nickName) > 0;
    }

    public boolean delete(BigInteger userId) {
        return userRepository.delete(userId) > 0;
    }

    private UserResponse toResponse(UserEntity e) {
        if (e == null) return null;
        BigInteger id = e.userId();
        String created = e.createdAt() == null ? null : e.createdAt().toString();
        return new UserResponse(id, e.emailAddress(), e.nickName(), created);
    }

}
