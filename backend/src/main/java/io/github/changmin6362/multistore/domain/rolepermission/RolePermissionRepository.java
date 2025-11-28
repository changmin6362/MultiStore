package io.github.changmin6362.multistore.domain.rolepermission;

import io.github.changmin6362.multistore.domain.permission.PermissionEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
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

    /**
     * 역할 - 권한 관계 정보 할당
     * @param roleId 역할 ID
     * @param permissionId 권한 ID
     * @return 영향 받은 행의 수
     */
    public int assignPermissionToRole(int roleId, int permissionId) {
        String sql = "INSERT INTO role_permission (role_id, permission_id) VALUES (?, ?)";
        return jdbcTemplate.update(sql, roleId, permissionId);
    }

    /**
     * 역할 - 권한 관계 정보 제거
     * @param roleId 역할 ID
     * @param permissionId 권한 ID
     * @return 영향 받은 행의 수
     */
    public int removePermissionFromRole(int roleId, int permissionId) {
        String sql = "DELETE FROM role_permission WHERE role_id = ? AND permission_id = ?";
        return jdbcTemplate.update(sql, roleId, permissionId);
    }

    /**
     * 역할 ID로 권한 정보 조회
     * @param roleId 역할 ID
     * @return 권한 정보 목록
     */
    public List<PermissionEntity> findPermissionsByRoleId(int roleId) {
        String sql = "SELECT p.permission_id, p.permission_name, p.permission_description, p.resource_type, p.action_type, p.created_at, p.updated_at " +
                "FROM role_permission rp " +
                "JOIN permission p ON p.permission_id = rp.permission_id " +
                "WHERE rp.role_id = ?";
        return jdbcTemplate.query(sql, PERMISSION_MAPPER, roleId);
    }


    /**
     * 사용자별 권한 상세(조인 체인)
     * @param userId 사용자 ID
     * @return 권한 정보 목록
     */
    public List<PermissionEntity> findPermissionsByUserId(BigInteger userId) {
        String sql = "SELECT DISTINCT p.permission_id, p.permission_name, p.permission_description, p.resource_type, p.action_type " +
                "FROM user_role ur " +
                "JOIN role_permission rp ON rp.role_id = ur.role_id " +
                "JOIN permission p ON p.permission_id = rp.permission_id " +
                "WHERE ur.user_id = ?";
        return jdbcTemplate.query(sql, PERMISSION_MAPPER, userId);
    }

    // 존재 여부 체크
    public boolean exists(int roleId, int permissionId) {
        String sql = "SELECT COUNT(1) FROM role_permission WHERE role_id = ? AND permission_id = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, roleId, permissionId);
        return count != null && count > 0;
    }

    /**
     * 사용자가 특정 권한명(permission_name)을 보유하는지 여부 확인
     * user_roles → role_permissions → permissions 조인 후 COUNT 체크
     */
    public boolean userHasPermissionByName(BigInteger userId, String permissionName) {
        String sql = "SELECT COUNT(1) " +
                "FROM user_role ur " +
                "JOIN role_permission rp ON rp.role_id = ur.role_id " +
                "JOIN permission p ON p.permission_id = rp.permission_id " +
                "WHERE ur.user_id = ? AND p.permission_name = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId, permissionName);
        return count != null && count > 0;
    }

    /**
     * 사용자가 특정 리소스/액션 조합 권한을 보유하는지 여부 확인
     */
    public boolean userHasPermissionByResourceAction(BigInteger userId, String resourceType, String actionType) {
        String sql = "SELECT COUNT(1) " +
                "FROM user_role ur " +
                "JOIN role_permission rp ON rp.role_id = ur.role_id " +
                "JOIN permission p ON p.permission_id = rp.permission_id " +
                "WHERE ur.user_id = ? AND p.resource_type = ? AND p.action_type = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, userId, resourceType, actionType);
        return count != null && count > 0;
    }
}
