package io.github.changmin6362.multistore.domain.permission;

import io.github.changmin6362.multistore.domain.permission.dto.PermissionDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 인가(RDBC) - 권한(Permission) 테이블 전용 Repository
 * 인증은 UserRepository, 인가는 본 레포지토리에서 담당합니다.
 */
@Repository
public class PermissionRepository {

    private final JdbcTemplate jdbcTemplate;

    public PermissionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<PermissionDto> PERMISSION_MAPPER = (rs, rowNum) ->
            new PermissionDto(rs.getLong("permission_id"), rs.getString("permission_name"));

    public List<PermissionDto> findAll() {
        String sql = "SELECT permission_id, permission_name FROM permission";
        return jdbcTemplate.query(sql, PERMISSION_MAPPER);
    }

    public PermissionDto findById(Long permissionId) {
        String sql = "SELECT permission_id, permission_name FROM permission WHERE permission_id = ?";
        List<PermissionDto> results = jdbcTemplate.query(sql, PERMISSION_MAPPER, permissionId);
        return results.isEmpty() ? null : results.get(0);
    }

    public PermissionDto findByName(String permissionName) {
        String sql = "SELECT permission_id, permission_name FROM permission WHERE permission_name = ?";
        List<PermissionDto> results = jdbcTemplate.query(sql, PERMISSION_MAPPER, permissionName);
        return results.isEmpty() ? null : results.get(0);
    }

    public boolean existsByName(String permissionName) {
        String sql = "SELECT COUNT(1) FROM permission WHERE permission_name = ?";
        Long count = jdbcTemplate.queryForObject(sql, Long.class, permissionName);
        return count != null && count > 0L;
    }

    public int save(String permissionName, String permissionDescription, String resourceType, String actionType) {
        String sql = "INSERT INTO permission (permission_name, permission_description, resource_type, action_type, created_at, updated_at) " +
                "VALUES (?, ?, ?, ?, NOW(), NOW())";
        return jdbcTemplate.update(sql, permissionName, permissionDescription, resourceType, actionType);
    }

    public int update(Long permissionId, String permissionName) {
        String sql = "UPDATE permission SET permission_name = ? WHERE permission_id = ?";
        return jdbcTemplate.update(sql, permissionName, permissionId);
    }

    public int delete(Long permissionId) {
        String sql = "DELETE FROM permission WHERE permission_id = ?";
        return jdbcTemplate.update(sql, permissionId);
    }
}
