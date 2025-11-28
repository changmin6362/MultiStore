package io.github.changmin6362.multistore.domain.permission;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Permission Entity에 대한 DB 연산을 수행하는 Repository Class; JdbcTemplate 사용
 */
@Repository
public class PermissionRepository {

    /**
     * Permission Entity에 대한 RowMapper
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
    private final JdbcTemplate jdbcTemplate;

    public PermissionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     * 모든 권한 정보 조회
     *
     * @return 권한 정보 목록
     */
    public List<PermissionEntity> findAll() {
        String sql = "SELECT permission_id, permission_name, permission_description, resource_type, action_type, created_at, updated_at FROM permission";
        return jdbcTemplate.query(sql, PERMISSION_MAPPER);
    }

    /**
     * ID 기준으로 특정 권한 정보 조회
     *
     * @param permissionId 권한 ID
     * @return 권한 정보
     */
    public PermissionEntity findById(int permissionId) {
        String sql = "SELECT permission_id, permission_name, permission_description, resource_type, action_type, created_at, updated_at FROM permission WHERE permission_id = ?";
        List<PermissionEntity> results = jdbcTemplate.query(sql, PERMISSION_MAPPER, permissionId);
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * 이름 기준으로 특정 권한 정보 조회
     *
     * @param permissionName 권한 이름
     * @return 권한 정보
     */
    public PermissionEntity findByName(String permissionName) {
        String sql = "SELECT permission_id, permission_name, permission_description, resource_type, action_type, created_at, updated_at FROM permission WHERE permission_name = ?";
        List<PermissionEntity> results = jdbcTemplate.query(sql, PERMISSION_MAPPER, permissionName);
        return results.isEmpty() ? null : results.get(0);
    }

    /**
     * 권한 유무 조회
     *
     * @param permissionName 권한 이름
     * @return 권한 유무
     */
    public int existsByName(String permissionName) {
        String sql = "SELECT COUNT(1) FROM permission WHERE permission_name = ?";
        Integer count = jdbcTemplate.queryForObject(sql, Integer.class, permissionName);
        return count != null ? count : 0;
    }

    /**
     * 권한 정보 저장
     *
     * @param permissionName        권한 이름
     * @param permissionDescription 권한 설명
     * @param resourceType          리소스 타입
     * @param actionType            동작 타입
     * @return 영향 받은 행의 수
     */
    public int save(String permissionName, String permissionDescription, String resourceType, String actionType) {
        String sql = "INSERT INTO permission (permission_name, permission_description, resource_type, action_type, created_at, updated_at) " +
                "VALUES (?, ?, ?, ?, NOW(), NOW())";
        return jdbcTemplate.update(sql, permissionName, permissionDescription, resourceType, actionType);
    }

    /**
     * 권한 정보 갱신
     *
     * @param permissionId          권한 ID
     * @param permissionName        권한 이름
     * @param resourceType          리소스 타입
     * @param actionType            동작 타입
     * @param permissionDescription 권한 설명
     * @return 영향 받은 행의 수
     */
    public int updateNameAndDetails(int permissionId, String permissionName, String resourceType, String actionType, String permissionDescription) {
        String sql = "UPDATE permission SET permission_name = ?, resource_type = ?, action_type = ?, permission_description = ?, updated_at = NOW() WHERE permission_id = ?";
        return jdbcTemplate.update(sql, permissionName, resourceType, actionType, permissionDescription, permissionId);
    }

    /**
     * 권한 정보 삭제
     *
     * @param permissionId 권한 ID
     * @return 영향 받은 행 수
     */
    public int delete(int permissionId) {
        String sql = "DELETE FROM permission WHERE permission_id = ?";
        return jdbcTemplate.update(sql, permissionId);
    }
}
