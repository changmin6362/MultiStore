package io.github.changmin6362.multistore.domain.userrole;

import io.github.changmin6362.multistore.domain.role.RoleEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

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
                    rs.getObject("user_id", java.math.BigInteger.class),
                    rs.getInt("role_id")
            );
    
    private final JdbcTemplate jdbcTemplate;

    public UserRoleRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 매핑 부여
    public int assignRoleToUser(Long userId, Long roleId) {
        String sql = "INSERT INTO user_role (user_id, role_id) VALUES (?, ?)";
        return jdbcTemplate.update(sql, userId, roleId);
    }

    // 매핑 회수
    public int removeRoleFromUser(Long userId, Long roleId) {
        String sql = "DELETE FROM user_role WHERE user_id = ? AND role_id = ?";
        return jdbcTemplate.update(sql, userId, roleId);
    }

    /**
     * 특정 사용자에 대한 user_role 매핑 행들을 엔티티로 조회
     */
    public List<UserRoleEntity> findAllByUserId(Long userId) {
        String sql = "SELECT user_id, role_id FROM user_role WHERE user_id = ?";
        return jdbcTemplate.query(sql, USER_ROLE_MAPPER, userId);
    }

    /**
     * 특정 역할에 대한 user_role 매핑 행들을 엔티티로 조회
     */
    public List<UserRoleEntity> findAllByRoleId(Long roleId) {
        String sql = "SELECT user_id, role_id FROM user_role WHERE role_id = ?";
        return jdbcTemplate.query(sql, USER_ROLE_MAPPER, roleId);
    }

    // 사용자별 역할 상세(조인)
    public List<RoleEntity> findRolesByUserId(Long userId) {
        // ROLE_MAPPER expects role_id, role_name, role_description
        String sql = "SELECT r.role_id, r.role_name, r.role_description, r.created_at, r.updated_at FROM user_role ur JOIN role r ON r.role_id = ur.role_id WHERE ur.user_id = ?";
        return jdbcTemplate.query(sql, ROLE_MAPPER, userId);
    }

    // 존재 여부 체크
    public boolean exists(Long userId, Long roleId) {
        String sql = "SELECT COUNT(1) FROM user_role WHERE user_id = ? AND role_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId, roleId);
        return count != null && count > 0;
    }
}
