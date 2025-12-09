package io.github.changmin6362.multistore.domain.userprofile;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;

/**
 * UserProfile 도메인 엔티티에 대한 데이터 접근을 담당하는 Repository
 */
@Repository
public class UserProfileRepository {

    /**
     * ResultSet을 UserProfile로 매핑하는 구현체
     */
    private static final RowMapper<UserProfileEntity> USER_PROFILE_ENTITY_MAPPER = (rs, rowNum) ->
            new UserProfileEntity(
                    toBigInteger(rs.getObject("user_id")),
                    rs.getString("first_name"),
                    rs.getString("last_name"),
                    rs.getString("phone"),
                    rs.getDate("birth_date"),
                    rs.getString("gender"),
                    rs.getString("profile_image_url")
            );

    private final JdbcTemplate jdbcTemplate;

    public UserProfileRepository(JdbcTemplate jdbcTemplate) {
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
     * 사용자 ID 기준으로 사용자의 프로필 정보 조회
     *
     * @param userId 사용자 ID
     * @return 사용자의 프로필 정보
     */
    public UserProfileEntity findByUserId(BigInteger userId) {
        String sql = """
                SELECT user_id, first_name, last_name, phone, birth_date, gender, profile_image_url
                FROM user_profile
                WHERE user_id = ?
                """;

        return jdbcTemplate.queryForObject(sql, USER_PROFILE_ENTITY_MAPPER, userId);
    }

    /**
     * ID 기준으로 사용자의 프로필 정보를 저장
     *
     * @param entity 저장할 사용자 프로필 정보 객체
     * @return 영향 받은 행의 수
     */
    public int save(UserProfileEntity entity) {
        String sql = """
                INSERT INTO user_profile
                    (user_id, first_name, last_name, phone, birth_date, gender, profile_image_url)
                VALUES(?, ?, ?, ?, ?, ?, ?)
                """;

        return jdbcTemplate.update(sql,
                entity.userId(),
                entity.first_name(),
                entity.last_name(),
                entity.phone(),
                entity.birthDate(),
                entity.gender(),
                entity.profile_image_url()
        );
    }

    /**
     * ID 기준으로 사용자의 프로필 정보 갱신
     *
     * @param entity 갱신할 사용자 프로필 정보 객체
     * @return 영향 받은 행의 수
     */
    public int update(UserProfileEntity entity) {
        String sql = """
                UPDATE user_profile
                SET first_name = ?,
                    last_name = ?,
                    phone = ?,
                    birth_date = ?,
                    gender = ?,
                    profile_image_url = ?
                WHERE user_id = ?
                """;

        return jdbcTemplate.update(sql,
                entity.first_name(),
                entity.last_name(),
                entity.phone(),
                entity.birthDate(),
                entity.gender(),
                entity.profile_image_url(),
                entity.userId()
        );
    }

    /**
     * ID 기준으로 사용자 정보 삭제
     *
     * @param userId 사용자 ID
     * @return 영향 받은 행의 수
     */
    public int delete(BigInteger userId) {
        String sql = """
                UPDATE user_profile
                SET first_name = NULL,
                    last_name = NULL,
                    phone = NULL,
                    birth_date = NULL,
                    gender = NULL,
                    profile_image_url = NULL
                WHERE user_id = ?
                """;

        return jdbcTemplate.update(sql, userId);
    }
}
