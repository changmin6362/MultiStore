package io.github.changmin6362.multistore.domain.useraddress;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

/**
 * UserAddress 도메인 엔티티에 대한 데이터 접근을 담당하는 Repository
 */
@Repository
public class UserAddressRepository {

    /**
     * ResultSet을 UserAddress로 매핑하는 구현체
     */
    private static final RowMapper<UserAddressEntity> USER_ADDRESS_ENTITY_MAPPER = (rs, rowNum) ->
            new UserAddressEntity(
                    toBigInteger(rs.getObject("address_id")),
                    toBigInteger(rs.getObject("user_id")),
                    rs.getString("postal_code"),
                    rs.getString("address_default"),
                    rs.getString("address_detail"),
                    rs.getBoolean("is_default"),
                    rs.getString("recipient_name"),
                    rs.getString("recipient_phone"),
                    rs.getTimestamp("created_at"),
                    rs.getTimestamp("updated_at"),
                    rs.getTimestamp("deleted_at")
            );

    private final JdbcTemplate jdbcTemplate;

    public UserAddressRepository(JdbcTemplate jdbcTemplate) {
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
     * 사용자 ID 기준으로 사용자의 모든 주소 정보 조회 (삭제된 주소 제외)
     *
     * @param userId 사용자 ID
     * @return 사용자의 주소 정보 목록
     */
    public List<UserAddressEntity> findAllByUserId(BigInteger userId) {
        String sql = """
                    SELECT address_id, user_id, postal_code, address_default, address_detail,
                           is_default, recipient_name, recipient_phone, created_at, updated_at, deleted_at
                    FROM user_address
                    WHERE user_id = ? AND deleted_at IS NULL
                """;

        return jdbcTemplate.query(sql, USER_ADDRESS_ENTITY_MAPPER, userId);
    }


    /**
     * 사용자의 주소 정보 저장
     *
     * @param entity 저장할 사용자 주소 정보 객체
     * @return 영향 받은 행의 수
     */
    public int save(UserAddressEntity entity) {
        String sql = """
                    INSERT INTO user_address
                        (user_id, postal_code, address_default, address_detail,
                         is_default, recipient_name, recipient_phone, created_at, updated_at)
                    VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())
                """;

        return jdbcTemplate.update(sql,
                entity.userId(),
                entity.postalCode(),
                entity.addressDefault(),
                entity.addressDetail(),
                entity.isDefault(),
                entity.recipientName(),
                entity.recipientPhone()
        );
    }

    /**
     * ID 기준으로 주소 정보 갱신
     *
     * @param entity 갱신할 사용자 주소 정보 객체
     * @return 영향 받은 행의 수
     */
    public int update(UserAddressEntity entity) {
        String sql = """
                    UPDATE user_address
                    SET postal_code = ?, address_default = ?, address_detail = ?,
                        recipient_name = ?, recipient_phone = ?, updated_at = NOW()
                    WHERE address_id = ? AND deleted_at IS NULL
                """;

        return jdbcTemplate.update(sql,
                entity.postalCode(),
                entity.addressDefault(),
                entity.addressDetail(),
                entity.recipientName(),
                entity.recipientPhone(),
                entity.addressId()
        );
    }

    /**
     * ID 기준으로 사용자의 기본 주소 조회
     *
     * @param userId 사용자 ID
     * @return 사용자의 주소 정보
     */
    public UserAddressEntity findDefaultAddress(BigInteger userId) {
        String sql = """
                    SELECT address_id, user_id, postal_code, address_default, address_detail,
                           is_default, recipient_name, recipient_phone, created_at, updated_at, deleted_at
                    FROM user_address
                    WHERE user_id = ? AND is_default = true AND deleted_at IS NULL
                """;

        return jdbcTemplate.queryForObject(sql, USER_ADDRESS_ENTITY_MAPPER, userId);
    }

    /**
     * ID 기준으로 사용자의 기본 주소 여부를 false로 갱신
     *
     * @param userId 사용자 ID
     * @return 영향 받은 행의 수
     */
    public int unsetDefaultAddress(BigInteger userId) {
        String sql = """
                    UPDATE user_address
                    SET is_default = false, updated_at = NOW()
                    WHERE user_id = ? AND is_default = true
                """;

        return jdbcTemplate.update(sql, userId);
    }

    /**
     * ID 기준으로 사용자의 기본 주소 여부를 true로 갱신
     *
     * @param userId    사용자 ID
     * @param addressId 주소 ID
     * @return 영향 받은 행의 수
     */
    public int setDefaultAddress(BigInteger userId, BigInteger addressId) {
        String sql = """
                    UPDATE user_address
                    SET is_default = true, updated_at = NOW()
                    WHERE user_id = ? AND address_id = ?
                """;

        return jdbcTemplate.update(sql, userId, addressId);
    }

    /**
     * 단일 주소 삭제
     *
     * @param addressId 주소 ID
     * @return 영향 받은 행의 수
     */
    public int delete(BigInteger addressId) {
        String sql = "UPDATE user_address SET deleted_at = NOW() WHERE address_id = ?";
        return jdbcTemplate.update(sql, addressId);
    }
}
