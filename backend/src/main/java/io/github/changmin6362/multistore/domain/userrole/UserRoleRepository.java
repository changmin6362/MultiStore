package io.github.changmin6362.multistore.domain.userrole;

import io.github.changmin6362.multistore.domain.role.dto.RoleDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 인가(RDBC) - 사용자-역할 매핑(user_role) 테이블 전용 Repository
 * 인증은 UserRepository, 인가는 본 레포지토리에서 담당합니다.
 */
@Repository
public class UserRoleRepository {

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

    private static final RowMapper<RoleDto> ROLE_MAPPER = (rs, rowNum) ->
            new RoleDto(rs.getLong("role_id"), rs.getString("role_name"), rs.getString("role_description"));

    // 사용자별 역할 상세(조인)
    public List<RoleDto> findRolesByUserId(Long userId) {
        // ROLE_MAPPER expects role_id, role_name, role_description
        String sql = "SELECT r.role_id, r.role_name, r.role_description " +
                "FROM user_role ur " +
                "JOIN role r ON r.role_id = ur.role_id " +
                "WHERE ur.user_id = ?";
        return jdbcTemplate.query(sql, ROLE_MAPPER, userId);
    }

    // 존재 여부 체크
    public boolean exists(Long userId, Long roleId) {
        String sql = "SELECT COUNT(1) FROM user_role WHERE user_id = ? AND role_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId, roleId);
        return count != null && count > 0;
    }
}
