package io.github.changmin6362.multistore.domain.user;

import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

/**
 * User Entity에 대한 DB 연산을 수행하는 Repository Class; JdbcTemplate 사용
 */
@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * 모든 사용자 정보 조회 (삭제된 사용자 제외)
     * @return 사용자 정보 List
     * @throws DataAccessException Query 실패 시 발생
     */
    public List<Map<String, Object>> findAll() {
        String sql = "SELECT user_id, email_address, nick_name, created_at, updated_at FROM user WHERE deleted_at IS NULL";
        return jdbcTemplate.queryForList(sql);
    }

    /**
     * 모든 사용자 정보 조회 (삭제된 사용자 포함)
     * @return 사용자 정보 List
     * @throws DataAccessException Query 실패 시 발생
     */
    public List<Map<String, Object>> findDeleted() {
        String sql = "SELECT user_id, email_address, nick_name, created_at, updated_at, deleted_at FROM user WHERE deleted_at IS NOT NULL";
        return jdbcTemplate.queryForList(sql);
    }

    /**
     * 사용자 ID로 사용자 정보 조회
     * @param userId 사용자 ID
     * @return 사용자 정보 (존재하지 않을 경우 null)
     * @throws DataAccessException Query 실패 시 발생
     */
    public Map<String, Object> findById(Long userId) {
        String sql = "SELECT user_id, email_address, nick_name, created_at, updated_at FROM user WHERE user_id = ? AND deleted_at IS NULL";
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql, userId);
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * DB에 사용자 정보를 등록
     * @param emailAddress 이메일 주소
     * @param passwordHash 해시화된 비밀번호
     * @param nickName 닉네임
     * @return 성공 여부
     */
    public boolean save(String emailAddress, String passwordHash, String nickName) {
        String sql = "INSERT INTO user (email_address, password_hash, nick_name, created_at, updated_at, deleted_at) VALUES (?, ?, ?, NOW(), NOW(), NULL)";
        return jdbcTemplate.update(sql, emailAddress, passwordHash, nickName) > 0;
    }

    /**
     * 이메일로 사용자 정보 조회 (비밀번호 제외)
     * @param emailAddress 이메일 주소
     * @return 사용자 정보
     */
    public Map<String, Object> findByEmail(String emailAddress) {
        String sql = "SELECT user_id, email_address, nick_name, created_at, updated_at FROM user WHERE email_address = ? AND deleted_at IS NULL";
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql, emailAddress);
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * 이메일로 사용자 정보 조회 (비밀번호 포함)
     * @param emailAddress 이메일 주소
     * @return 사용자 정보
     */
    public Map<String, Object> findByEmailWithPassword(String emailAddress) {
        String sql = "SELECT user_id, email_address, nick_name, password_hash, created_at, updated_at FROM user WHERE email_address = ? AND deleted_at IS NULL";
        List<Map<String, Object>> results = jdbcTemplate.queryForList(sql, emailAddress);
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * 사용자의 정보 갱신
     * @param userId 사용자 ID
     * @param emailAddress 이메일 주소
     * @param nickName 닉네임
     * @return 성공 여부
     */
    public boolean update(Long userId, String emailAddress, String nickName) {
        String sql = "UPDATE user SET email_address = ?, nick_name = ?, updated_at = NOW() WHERE user_id = ?";
        return jdbcTemplate.update(sql, emailAddress, nickName, userId) > 0;
    }

    /**
     * 사용자 삭제
     * @param userId 사용자 ID
     * @return 성공 여부
     */
    public boolean delete(Long userId) {
        String sql = "UPDATE user SET deleted_at = NOW() WHERE user_id = ?";
        return jdbcTemplate.update(sql, userId) > 0;
    }
}