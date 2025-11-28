package io.github.changmin6362.multistore.domain.user;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

/**
 * User Entity 도메인 엔티티에 대한 데이터 접근을 담당하는 Repository
 */
@Repository
public class UserRepository {

    /**
     * ResultSet을 UserEntity으로 매핑하는 구현체
     */
    private static final RowMapper<UserEntity> USER_ENTITY_MAPPER = (rs, rowNum) ->
            new UserEntity(
                    toBigInteger(rs.getObject("user_id")),
                    rs.getString("email_address"),
                    rs.getString("password_hash"),
                    rs.getString("nick_name"),
                    rs.getTimestamp("created_at"),
                    rs.getTimestamp("updated_at"),
                    rs.getTimestamp("deleted_at")
            );


    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * BigInteger 변환 유틸리티 메서드
     */
    private static BigInteger toBigInteger(Object v) {
        if (v == null) return null;
        if (v instanceof BigInteger b) return b;
        if (v instanceof Number n) return new BigInteger(n.toString());
        return new BigInteger(v.toString());
    }


    /**
     * 모든 사용자 정보 조회 (삭제된 사용자 제외)
     *
     * @return 사용자 정보 목록
     */
    public List<UserEntity> findAll() {
        String sql = "SELECT user_id, email_address, password_hash, nick_name, created_at, updated_at, deleted_at FROM user WHERE deleted_at IS NULL";
        return jdbcTemplate.query(sql, USER_ENTITY_MAPPER);
    }

    /**
     * ID 기준으로 사용자 정보 조회
     *
     * @param userId 사용자 ID
     * @return 사용자 정보
     */
    public UserEntity findById(BigInteger userId) {
        String sql = "SELECT user_id, email_address, password_hash, nick_name, created_at, updated_at, deleted_at FROM user WHERE user_id = ? AND deleted_at IS NULL";
        List<UserEntity> results = jdbcTemplate.query(sql, USER_ENTITY_MAPPER, userId);
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * 사용자 정보 저장
     *
     * @param emailAddress 이메일 주소
     * @param passwordHash 해시화된 비밀번호
     * @param nickName     닉네임
     * @return 영향 받은 행의 수
     */
    public int save(String emailAddress, String passwordHash, String nickName) {
        String sql = "INSERT INTO user (email_address, password_hash, nick_name, created_at, updated_at, deleted_at) VALUES (?, ?, ?, NOW(), NOW(), NULL)";
        return jdbcTemplate.update(sql, emailAddress, passwordHash, nickName);
    }

    /**
     * 이메일 기준으로 사용자 정보 조회 (비밀번호 제외)
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
     * 사용자의 정보 갱신
     *
     * @param userId       사용자 ID
     * @param emailAddress 이메일 주소
     * @param nickName     닉네임
     * @return 영향 받은 행의 수
     */
    public int update(BigInteger userId, String emailAddress, String nickName) {
        String sql = "UPDATE user SET email_address = ?, nick_name = ?, updated_at = NOW() WHERE user_id = ?";
        return jdbcTemplate.update(sql, emailAddress, nickName, userId);
    }

    /**
     * 사용자 삭제
     *
     * @param userId 사용자 ID
     * @return 영향 받은 행의 수
     */
    public int delete(BigInteger userId) {
        String sql = "UPDATE user SET deleted_at = NOW() WHERE user_id = ?";
        return jdbcTemplate.update(sql, userId);
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