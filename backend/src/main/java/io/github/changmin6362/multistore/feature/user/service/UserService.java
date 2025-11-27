package io.github.changmin6362.multistore.feature.user.service;

import io.github.changmin6362.multistore.domain.user.UserRepository;
import io.github.changmin6362.multistore.feature.common.response.UserResponse;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserResponse> findAll() {
        return userRepository.findAllResponses();
    }

    public UserResponse findById(Long userId) {
        return userRepository.findResponseById(userId);
    }

    public boolean update(Long userId, String emailAddress, String nickName) {
        return userRepository.update(userId, emailAddress, nickName);
    }

    public boolean delete(Long userId) {
        return userRepository.delete(userId);
    }

}
