package io.github.changmin6362.multistore.controller;

import io.github.changmin6362.multistore.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = {"http://localhost:3000"})
public class UserController {

    @Autowired
    private UserRepository userRepository;

    /**
     * GET /api/user
     * 모든 사용자 조회
     */
    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
        List<Map<String, Object>> user = userRepository.findAll();
        return ResponseEntity.ok(user);
    }

    /**
     * GET /api/user/{userId}
     * 특정 사용자 조회
     */
    @GetMapping("/{userId}")
    public ResponseEntity<Map<String, Object>> getUserById(@PathVariable Long userId) {
        Map<String, Object> user = userRepository.findById(userId);
        if (user == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(user);
    }

    /**
     * PUT /api/user/{userId}
     * 사용자 정보 수정
     */
    @PutMapping("/{userId}")
    public ResponseEntity<Map<String, String>> updateUser(
            @PathVariable Long userId,
            @RequestBody Map<String, String> updateData) {
        String emailAddress = updateData.get("emailAddress");
        String nickName = updateData.get("nickName");

        int result = userRepository.update(userId, emailAddress, nickName);
        if (result == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Map.of("message", "사용자 정보가 수정되었습니다"));
    }

    /**
     * DELETE /api/user/{userId}
     * 사용자 삭제 (soft delete)
     */
    @DeleteMapping("/{userId}")
    public ResponseEntity<Map<String, String>> deleteUser(@PathVariable Long userId) {
        int result = userRepository.delete(userId);
        if (result == 0) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(Map.of("message", "사용자가 삭제되었습니다"));
    }
}