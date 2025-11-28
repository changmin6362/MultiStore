package io.github.changmin6362.multistore.domain.role;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Role 도메인 엔티티에 대한 데이터 접근을 담당하는 Repository
 */
@Repository
public class RoleRepository {

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
    private final JdbcTemplate jdbcTemplate;

    public RoleRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * 모든 역할 정보 조회
     *
     * @return 역할 정보 목록
     */
    public List<RoleEntity> findAll() {
        String sql = "SELECT role_id, role_name, role_description, created_at, updated_at FROM role";
        return jdbcTemplate.query(sql, ROLE_MAPPER);
    }

    /**
     * ID 기준으로 역할 조회
     *
     * @param roleId 역할 ID
     * @return 역할 정보
     */
    public RoleEntity findById(int roleId) {
        String sql = "SELECT role_id, role_name, role_description, created_at, updated_at FROM role WHERE role_id = ?";
        List<RoleEntity> results = jdbcTemplate.query(sql, ROLE_MAPPER, roleId);
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * 이름 기준으로 역할 조회
     *
     * @param roleName 역할 이름
     * @return 역할 정보
     */
    public RoleEntity findByName(String roleName) {
        String sql = "SELECT role_id, role_name, role_description, created_at, updated_at FROM role WHERE role_name = ?";
        List<RoleEntity> results = jdbcTemplate.query(sql, ROLE_MAPPER, roleName);
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * 역할 유무 조회
     *
     * @param roleName 역할 이름
     * @return 역할 유무
     */
    public boolean existsByName(String roleName) {
        String sql = "SELECT COUNT(1) FROM role WHERE role_name = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, roleName);
        return count != null && count > 0L;
    }

    /**
     * 역할 정보 저장
     *
     * @param roleName        역할 이름
     * @param roleDescription 역할 설명
     * @return 영향 받은 행의 수
     */
    public int save(String roleName, String roleDescription) {
        String sql = "INSERT INTO role (role_name, role_description, created_at, updated_at) VALUES (?, ?, NOW(), NOW())";
        return jdbcTemplate.update(sql, roleName, roleDescription);
    }

    /**
     * 역할 정보 갱신
     *
     * @param roleId          역할 ID
     * @param roleName        역할 이름
     * @param roleDescription 역할 설명
     * @return 영향 받은 행의 수
     */
    public int updateNameAndDescription(int roleId, String roleName, String roleDescription) {
        String sql = "UPDATE role SET role_name = ?, role_description = ?, updated_at = NOW() WHERE role_id = ?";
        return jdbcTemplate.update(sql, roleName, roleDescription, roleId);
    }

    /**
     * 역할 정보 삭제
     *
     * @param roleId 역할 ID
     * @return 영향 받은 행의 수
     */
    public int delete(int roleId) {
        String sql = "DELETE FROM role WHERE role_id = ?";
        return jdbcTemplate.update(sql, roleId);
    }
}
