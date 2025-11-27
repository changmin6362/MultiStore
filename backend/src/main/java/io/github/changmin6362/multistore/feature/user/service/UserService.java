package io.github.changmin6362.multistore.feature.user.service;

import io.github.changmin6362.multistore.domain.user.UserEntity;
import io.github.changmin6362.multistore.domain.user.UserRepository;
import io.github.changmin6362.multistore.feature.common.response.UserResponse;
import org.springframework.stereotype.Service;

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

    public UserResponse findById(Long userId) {
        UserEntity e = userRepository.findById(userId);
        return e == null ? null : toResponse(e);
    }

    public boolean update(Long userId, String emailAddress, String nickName) {
        return userRepository.update(userId, emailAddress, nickName);
    }

    public boolean delete(Long userId) {
        return userRepository.delete(userId);
    }

    private UserResponse toResponse(UserEntity e) {
        if (e == null) return null;
        Long id = e.userId() == null ? null : e.userId().longValue();
        String created = e.createdAt() == null ? null : e.createdAt().toString();
        return new UserResponse(id, e.emailAddress(), e.nickName(), created);
    }

}
