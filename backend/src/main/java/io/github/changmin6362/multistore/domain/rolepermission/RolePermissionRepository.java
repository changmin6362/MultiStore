package io.github.changmin6362.multistore.domain.rolepermission;

import io.github.changmin6362.multistore.domain.permission.PermissionEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * RolePermission 도메인 엔티티에 대한 데이터 접근을 담당하는 Repository
 */
@Repository
public class RolePermissionRepository {

    /**
     * ResultSet을 PermissionEntity으로 매핑하는 구현체
     */
    private static final RowMapper<PermissionEntity> PERMISSION_MAPPER = (rs, rowNum) ->
            new PermissionEntity(
                    rs.getInt("permission_id"),
                    rs.getString("permission_name"),
                    rs.getString("permission_description"),
                    rs.getString("resource_type"),
                    rs.getString("action_type"),
                    rs.getTimestamp("created_at"),
                    rs.getTimestamp("updated_at")
            );

    /**
     * ResultSet을 RolePermissionEntity으로 매핑하는 구현체
     */
    private static final RowMapper<RolePermissionEntity> ROLE_PERMISSION_MAPPER = (rs, rowNum) ->
            new RolePermissionEntity(
                    rs.getInt("role_id"),
                    rs.getInt("permission_id")
            );
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

    /**
     * 특정 역할에 매핑된 role_permissions 행들을 엔티티로 조회
     */
    public List<RolePermissionEntity> findAllByRoleId(Long roleId) {
        String sql = "SELECT role_id, permission_id FROM role_permission WHERE role_id = ?";
        return jdbcTemplate.query(sql, ROLE_PERMISSION_MAPPER, roleId);
    }

    /**
     * 특정 권한에 매핑된 role_permissions 행들을 엔티티로 조회
     */
    public List<RolePermissionEntity> findAllByPermissionId(Long permissionId) {
        String sql = "SELECT role_id, permission_id FROM role_permission WHERE permission_id = ?";
        return jdbcTemplate.query(sql, ROLE_PERMISSION_MAPPER, permissionId);
    }

    public List<PermissionEntity> findPermissionsByRoleId(Long roleId) {
        String sql = "SELECT p.permission_id, p.permission_name, p.permission_description, p.resource_type, p.action_type, p.created_at, p.updated_at " +
                "FROM role_permission rp " +
                "JOIN permission p ON p.permission_id = rp.permission_id " +
                "WHERE rp.role_id = ?";
        return jdbcTemplate.query(sql, PERMISSION_MAPPER, roleId);
    }

    // 사용자별 권한 상세(조인 체인)
    public List<PermissionEntity> findPermissionsByUserId(Long userId) {
        String sql = "SELECT DISTINCT p.permission_id, p.permission_name, p.permission_description, p.resource_type, p.action_type " +
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

    /**
     * 사용자가 특정 권한명(permission_name)을 보유하는지 여부 확인
     * user_roles → role_permissions → permissions 조인 후 COUNT 체크
     */
    public boolean userHasPermissionByName(Long userId, String permissionName) {
        String sql = "SELECT COUNT(1) " +
                "FROM user_role ur " +
                "JOIN role_permission rp ON rp.role_id = ur.role_id " +
                "JOIN permission p ON p.permission_id = rp.permission_id " +
                "WHERE ur.user_id = ? AND p.permission_name = ?";
        Long count = jdbcTemplate.queryForObject(sql, Long.class, userId, permissionName);
        return count != null && count > 0L;
    }

    /**
     * 사용자가 특정 리소스/액션 조합 권한을 보유하는지 여부 확인
     */
    public boolean userHasPermissionByResourceAction(Long userId, String resourceType, String actionType) {
        String sql = "SELECT COUNT(1) " +
                "FROM user_role ur " +
                "JOIN role_permission rp ON rp.role_id = ur.role_id " +
                "JOIN permission p ON p.permission_id = rp.permission_id " +
                "WHERE ur.user_id = ? AND p.resource_type = ? AND p.action_type = ?";
        Long count = jdbcTemplate.queryForObject(sql, Long.class, userId, resourceType, actionType);
        return count != null && count > 0L;
    }
}
