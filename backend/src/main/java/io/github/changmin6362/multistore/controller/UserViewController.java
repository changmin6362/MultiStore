package io.github.changmin6362.multistore.controller;

import io.github.changmin6362.multistore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
public class UserViewController {

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/")
    public List<Map<String, Object>> index() {
        return userRepository.findAll();
    }
}