package io.github.changmin6362.multistore.feature.user.service;

import io.github.changmin6362.multistore.domain.user.UserRepository;
import io.github.changmin6362.multistore.domain.user.dto.UserDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<UserDto> findAll() {
        List<Map<String, Object>> rows = userRepository.findAll();
        List<UserDto> result = new ArrayList<>();
        for (Map<String, Object> row : rows) {
            result.add(toDto(row));
        }
        return result;
    }

    public UserDto findById(Long userId) {
        Map<String, Object> row = userRepository.findById(userId);
        return row == null ? null : toDto(row);
    }

    public boolean update(Long userId, String emailAddress, String nickName) {
        int updated = userRepository.update(userId, emailAddress, nickName);
        return updated > 0;
    }

    public boolean delete(Long userId) {
        int deleted = userRepository.delete(userId);
        return deleted > 0;
    }

    private UserDto toDto(Map<String, Object> row) {
        if (row == null) return null;
        Long id = toLong(row.get("user_id"));
        String email = (String) row.get("email_address");
        String nick = (String) row.get("nick_name");
        String createdAt = row.get("created_at") != null ? row.get("created_at").toString() : null;
        return new UserDto(id, email, nick, createdAt);
        
    }

    private Long toLong(Object v) {
        if (v == null) return null;
        if (v instanceof Number n) return n.longValue();
        return Long.parseLong(v.toString());
    }
}
