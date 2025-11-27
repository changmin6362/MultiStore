package io.github.changmin6362.multistore.domain.user;

import io.github.changmin6362.multistore.feature.common.response.UserResponse;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

/**
 * User Entity에 대한 DB 연산을 수행하는 Repository Class; JdbcTemplate 사용
 */
@Repository
public class UserRepository {

    /**
     * User Entity에 대한 RowMapper
     */
    private static final RowMapper<UserEntity> USER_ENTITY_MAPPER = (rs, rowNum) -> new UserEntity(
            toBigInteger(rs.getObject("user_id")),
            rs.getString("email_address"),
            rs.getString("password_hash"),
            rs.getString("nick_name"),
            rs.getTimestamp("created_at"),
            rs.getTimestamp("updated_at"),
            rs.getTimestamp("deleted_at")
    );

    // 별도의 비밀번호 포함 매퍼는 불필요합니다. USER_ENTITY_MAPPER가 이미 password_hash까지 포함합니다.

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static BigInteger toBigInteger(Object v) {
        if (v == null) return null;
        if (v instanceof BigInteger b) return b;
        if (v instanceof Number n) return BigInteger.valueOf(n.longValue());
        return new BigInteger(v.toString());
    }

    private static UserResponse toResponse(UserEntity e) {
        if (e == null) return null;
        Long id = toLong(e.userId());
        String created = e.createdAt() == null ? null : e.createdAt().toString();
        return new UserResponse(id, e.emailAddress(), e.nickName(), created);
    }

    private static Long toLong(BigInteger v) {
        return v == null ? null : v.longValue();
    }

    /**
     * 모든 사용자 정보 조회 (삭제된 사용자 제외)
     *
     * @return 사용자 정보 List
     * @throws DataAccessException Query 실패 시 발생
     */
    public List<UserEntity> findAll() {
        String sql = "SELECT user_id, email_address, password_hash, nick_name, created_at, updated_at, deleted_at FROM user WHERE deleted_at IS NULL";
        return jdbcTemplate.query(sql, USER_ENTITY_MAPPER);
    }

    /**
     * 모든 사용자 정보 조회 (삭제된 사용자 포함)
     *
     * @return 사용자 정보 List
     * @throws DataAccessException Query 실패 시 발생
     */
    public List<UserEntity> findDeleted() {
        String sql = "SELECT user_id, email_address, password_hash, nick_name, created_at, updated_at, deleted_at FROM user WHERE deleted_at IS NOT NULL";
        return jdbcTemplate.query(sql, USER_ENTITY_MAPPER);
    }

    /**
     * 사용자 ID로 사용자 정보 조회*
     *
     * @param userId 사용자 ID
     * @return 사용자 정보 (존재하지 않을 경우 null)
     * @throws DataAccessException Query 실패 시 발생
     */
    public UserEntity findById(Long userId) {
        String sql = "SELECT user_id, email_address, password_hash, nick_name, created_at, updated_at, deleted_at FROM user WHERE user_id = ? AND deleted_at IS NULL";
        List<UserEntity> results = jdbcTemplate.query(sql, USER_ENTITY_MAPPER, userId);
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * DB에 사용자 정보를 등록
     *
     * @param emailAddress 이메일 주소
     * @param passwordHash 해시화된 비밀번호
     * @param nickName     닉네임
     * @return 성공 여부
     */
    public boolean save(String emailAddress, String passwordHash, String nickName) {
        String sql = "INSERT INTO user (email_address, password_hash, nick_name, created_at, updated_at, deleted_at) VALUES (?, ?, ?, NOW(), NOW(), NULL)";
        return jdbcTemplate.update(sql, emailAddress, passwordHash, nickName) > 0;
    }

    /**
     * 이메일로 사용자 정보 조회 (비밀번호 제외)
     *
     * @param emailAddress 이메일 주소
     * @return 사용자 정보
     */
    public UserEntity findByEmail(String emailAddress) {
        String sql = "SELECT user_id, email_address, password_hash, nick_name, created_at, updated_at, deleted_at FROM user WHERE email_address = ? AND deleted_at IS NULL";
        List<UserEntity> results = jdbcTemplate.query(sql, USER_ENTITY_MAPPER, emailAddress);
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * 이메일로 사용자 정보 조회 (비밀번호 포함)
     * USER_ENTITY_MAPPER가 password_hash를 포함하므로 동일 매퍼를 재사용합니다.
     *
     * @param emailAddress 이메일 주소
     * @return 사용자 정보
     */
    public UserEntity findByEmailWithPassword(String emailAddress) {
        String sql = "SELECT user_id, email_address, password_hash, nick_name, created_at, updated_at, deleted_at FROM user WHERE email_address = ? AND deleted_at IS NULL";
        List<UserEntity> results = jdbcTemplate.query(sql, USER_ENTITY_MAPPER, emailAddress);
        return results.isEmpty() ? null : results.get(0);
    }

    // 아래부터는 서비스/컨트롤러 레이어에 UserEntity 노출을 피하기 위한 응답 전용 메서드들

    /**
     * 사용자의 정보 갱신
     *
     * @param userId       사용자 ID
     * @param emailAddress 이메일 주소
     * @param nickName     닉네임
     * @return 성공 여부
     */
    public boolean update(Long userId, String emailAddress, String nickName) {
        String sql = "UPDATE user SET email_address = ?, nick_name = ?, updated_at = NOW() WHERE user_id = ?";
        return jdbcTemplate.update(sql, emailAddress, nickName, userId) > 0;
    }

    /**
     * 사용자 삭제
     *
     * @param userId 사용자 ID
     * @return 성공 여부
     */
    public boolean delete(Long userId) {
        String sql = "UPDATE user SET deleted_at = NOW() WHERE user_id = ?";
        return jdbcTemplate.update(sql, userId) > 0;
    }

    public List<UserResponse> findAllResponses() {
        return findAll().stream().map(UserRepository::toResponse).toList();
    }

    public UserResponse findResponseById(Long userId) {
        UserEntity e = findById(userId);
        return e == null ? null : toResponse(e);
    }

    public UserResponse findResponseByEmail(String emailAddress) {
        UserEntity e = findByEmail(emailAddress);
        return e == null ? null : toResponse(e);
    }

    /**
     * 인증을 위한 비밀번호 해시 단독 조회 (상위 레이어에 엔티티 노출 없이)
     *
     * @param emailAddress 이메일 주소
     * @return password_hash 값 (없으면 null)
     */
    public String findPasswordHashByEmail(String emailAddress) {
        String sql = "SELECT password_hash FROM user WHERE email_address = ? AND deleted_at IS NULL";
        return jdbcTemplate.query(sql, rs -> rs.next() ? rs.getString(1) : null, emailAddress);
    }
}