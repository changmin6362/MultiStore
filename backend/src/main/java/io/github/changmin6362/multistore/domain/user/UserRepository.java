package io.github.changmin6362.multistore.domain.user;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Map<String, Object>> findAll() {
        String sql = "SELECT user_id, email_address, nick_name, created_at, updated_at, deleted_at FROM user WHERE deleted_at IS NULL";
        return jdbcTemplate.queryForList(sql);
    }

    public Map<String, Object> findById(Long userId) {
        String sql = "SELECT user_id, email_address, nick_name, created_at, updated_at, deleted_at FROM user WHERE user_id = ? AND deleted_at IS NULL";
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql, userId);
        return results.isEmpty() ? null : results.get(0);
    }

    public int save(String emailAddress, String passwordHash, String nickName) {
        String sql = "INSERT INTO user (email_address, password_hash, nick_name, created_at, updated_at, deleted_at) VALUES (?, ?, ?, NOW(), NOW(), NULL)";
        return jdbcTemplate.update(sql, emailAddress, passwordHash, nickName);
    }

    /**
     * 이메일로 사용자 조회 (비밀번호 포함)
     * password_hash 비교가 필요한 인증 시나리오에서 사용
     */
    public Map<String, Object> findByEmail(String emailAddress) {
        String sql = "SELECT user_id, email_address, password_hash, nick_name, created_at, updated_at, deleted_at FROM user WHERE email_address = ? AND deleted_at IS NULL";
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql, emailAddress);
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * 이메일 중복 여부 확인
     */
    public boolean existsByEmail(String emailAddress) {
        String sql = "SELECT COUNT(1) FROM user WHERE email_address = ? AND deleted_at IS NULL";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, emailAddress);
        return count != null && count > 0;
    }

    public int update(Long userId, String emailAddress, String nickName) {
        String sql = "UPDATE user SET email_address = ?, nick_name = ?, updated_at = NOW() WHERE user_id = ?";
        return jdbcTemplate.update(sql, emailAddress, nickName, userId);
    }

    public int delete(Long userId) {
        String sql = "UPDATE user SET deleted_at = NOW() WHERE user_id = ?";
        return jdbcTemplate.update(sql, userId);
    }
}