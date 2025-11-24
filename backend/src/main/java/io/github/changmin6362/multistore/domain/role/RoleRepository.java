package io.github.changmin6362.multistore.domain.role;

import io.github.changmin6362.multistore.domain.role.dto.RoleDto;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * 인가(RDBC) - 역할(Role) 테이블 전용 Repository
 * 주의: UserRepository는 인증을 담당하고, 이 레포지토리는 인가만 담당합니다.
 */
@Repository
public class RoleRepository {

    private final JdbcTemplate jdbcTemplate;

    public RoleRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private static final RowMapper<RoleDto> ROLE_MAPPER = (rs, rowNum) ->
            new RoleDto(rs.getLong("role_id"), rs.getString("role_name"));

    public List<RoleDto> findAll() {
        String sql = "SELECT role_id, role_name FROM role";
        return jdbcTemplate.query(sql, ROLE_MAPPER);
    }

    public RoleDto findById(Long roleId) {
        String sql = "SELECT role_id, role_name FROM role WHERE role_id = ?";
        List<RoleDto> results = jdbcTemplate.query(sql, ROLE_MAPPER, roleId);
        return results.isEmpty() ? null : results.get(0);
    }

    public RoleDto findByName(String roleName) {
        String sql = "SELECT role_id, role_name FROM role WHERE role_name = ?";
        List<RoleDto> results = jdbcTemplate.query(sql, ROLE_MAPPER, roleName);
        return results.isEmpty() ? null : results.get(0);
    }

    public boolean existsByName(String roleName) {
        String sql = "SELECT COUNT(1) FROM role WHERE role_name = ?";
        Long count = jdbcTemplate.queryForObject(sql, Long.class, roleName);
        return count != null && count > 0L;
    }

    public int save(String roleName, String roleDescription) {
        String sql = "INSERT INTO role (role_name, role_description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())";
        return jdbcTemplate.update(sql, roleName, roleDescription);
    }

    public int update(Long roleId, String roleName) {
        String sql = "UPDATE role SET role_name = ? WHERE role_id = ?";
        return jdbcTemplate.update(sql, roleName, roleId);
    }

    public int updateNameAndDescription(Long roleId, String roleName, String roleDescription) {
        String sql = "UPDATE role SET role_name = ?, role_description = ?, updated_at = NOW() WHERE role_id = ?";
        return jdbcTemplate.update(sql, roleName, roleDescription, roleId);
    }

    public int delete(Long roleId) {
        String sql = "DELETE FROM role WHERE role_id = ?";
        return jdbcTemplate.update(sql, roleId);
    }
}
