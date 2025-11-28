package io.github.changmin6362.multistore.domain.userrole;

import io.github.changmin6362.multistore.domain.role.RoleEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

/**
 * UserRole 도메인 엔티티에 대한 데이터 접근을 담당하는 Repository
 */
@Repository
public class UserRoleRepository {

    /**
     * ResultSet을 RoleEntity으로 매핑하는 구현체
     */
    private static final RowMapper<RoleEntity> ROLE_MAPPER = (rs, rowNum) ->
            new RoleEntity(
                    rs.getInt("role_id"),
                    rs.getString("role_name"),
                    rs.getString("role_description"),
                    rs.getTimestamp("created_at"),
                    rs.getTimestamp("updated_at")
            );

    /**
     * ResultSet을 UserRoleEntity으로 매핑하는 구현체
     */
    private static final RowMapper<UserRoleEntity> USER_ROLE_MAPPER = (rs, rowNum) ->
            new UserRoleEntity(
                    toBigInteger(rs.getObject("user_id")),
                    rs.getInt("role_id")
            );
    private final JdbcTemplate jdbcTemplate;

    public UserRoleRepository(JdbcTemplate jdbcTemplate) {
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
     * 특정 사용자에 대한 역할을 할당
     * @param userId 사용자 ID
     * @param roleId 역할 ID
     * @return 영향 받은 행의 수
     */
    public int assignRoleToUser(BigInteger userId, int roleId) {
        String sql = "INSERT INTO user_role (user_id, role_id) VALUES (?, ?)";
        return jdbcTemplate.update(sql, userId, roleId);
    }

    /**
     * 특정 사용자에 대한 역할을 해제
     * @param userId 사용자 ID
     * @param roleId 역할 ID
     * @return 영향 받은 행의 수
     */
    public int removeRoleFromUser(BigInteger userId, int roleId) {
        String sql = "DELETE FROM user_role WHERE user_id = ? AND role_id = ?";
        return jdbcTemplate.update(sql, userId, roleId);
    }

    /**
     * 특정 사용자에 대한 모든 역할을 조회
     * @param userId 사용자 ID
     * @return user_role 매핑 엔티티 리스트
     */
    public List<RoleEntity> findRolesByUserId(BigInteger userId) {
        String sql = "SELECT r.role_id, r.role_name, r.role_description, r.created_at, r.updated_at FROM user_role ur JOIN role r ON r.role_id = ur.role_id WHERE ur.user_id = ?";
        return jdbcTemplate.query(sql, ROLE_MAPPER, userId);
    }

    /**
     * 특정 사용자에 대한 역할 존재 여부 조회
     * @param userId 사용자 ID
     * @param roleId 역할 ID
     * @return 역할 존재 여부
     */
    public boolean exists(BigInteger userId, int roleId) {
        String sql = "SELECT COUNT(1) FROM user_role WHERE user_id = ? AND role_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId, roleId);
        return count != null && count > 0;
    }
}
