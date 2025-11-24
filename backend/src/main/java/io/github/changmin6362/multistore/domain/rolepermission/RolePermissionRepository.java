package io.github.changmin6362.multistore.domain.rolepermission;

import io.github.changmin6362.multistore.domain.permission.dto.PermissionDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 인가(RDBC) - 역할-권한 매핑(role_permission) 테이블 전용 Repository
 * 인증은 UserRepository, 인가는 본 레포지토리에서 담당합니다.
 */
@Repository
public class RolePermissionRepository {

    private final JdbcTemplate jdbcTemplate;

    public RolePermissionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    // 매핑 부여
    public int assignPermissionToRole(Long roleId, Long permissionId) {
        String sql = "INSERT INTO role_permission (role_id, permission_id) VALUES (?, ?)";
        return jdbcTemplate.update(sql, roleId, permissionId);
    }

    // 매핑 회수
    public int removePermissionFromRole(Long roleId, Long permissionId) {
        String sql = "DELETE FROM role_permission WHERE role_id = ? AND permission_id = ?";
        return jdbcTemplate.update(sql, roleId, permissionId);
    }


    // 역할별 권한 상세(조인)
    private static final RowMapper<PermissionDto> PERMISSION_MAPPER = (rs, rowNum) ->
            new PermissionDto(rs.getLong("permission_id"), rs.getString("permission_name"));

    public List<PermissionDto> findPermissionsByRoleId(Long roleId) {
        String sql = "SELECT p.permission_id, p.permission_name " +
                "FROM role_permission rp " +
                "JOIN permission p ON p.permission_id = rp.permission_id " +
                "WHERE rp.role_id = ?";
        return jdbcTemplate.query(sql, PERMISSION_MAPPER, roleId);
    }

    // 사용자별 권한 상세(조인 체인)
    public List<PermissionDto> findPermissionsByUserId(Long userId) {
        String sql = "SELECT DISTINCT p.permission_id, p.permission_name " +
                "FROM user_role ur " +
                "JOIN role_permission rp ON rp.role_id = ur.role_id " +
                "JOIN permission p ON p.permission_id = rp.permission_id " +
                "WHERE ur.user_id = ?";
        return jdbcTemplate.query(sql, PERMISSION_MAPPER, userId);
    }

    // 존재 여부 체크
    public boolean exists(Long roleId, Long permissionId) {
        String sql = "SELECT COUNT(1) FROM role_permission WHERE role_id = ? AND permission_id = ?";
        Long count = jdbcTemplate.queryForObject(sql, Long.class, roleId, permissionId);
        return count != null && count > 0L;
    }
}
