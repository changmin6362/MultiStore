package io.github.changmin6362.multistore.domain.usercoupon;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.math.BigInteger;
import java.util.List;

/**
 * UserCoupon 도메인 엔티티에 대한 데이터 접근을 담당하는 Repository
 */
@Repository
public class UserCouponRepository {

    /**
     * ResultSet을 UserCoupon으로 매핑하는 구현체
     */
    private static final RowMapper<UserCouponEntity> USER_COUPON_ENTITY_MAPPER = (rs, rowNum) ->
            new UserCouponEntity(
                    toBigInteger(rs.getObject("user_coupon_id")),
                    toBigInteger(rs.getObject("coupon_id")),
                    toBigInteger(rs.getObject("user_id")),
                    rs.getTimestamp("issued_at"),
                    rs.getTimestamp("expired_at"),
                    rs.getString("used_order_number"),
                    rs.getTimestamp("deleted_at")
            );

    private final JdbcTemplate jdbcTemplate;

    public UserCouponRepository(JdbcTemplate jdbcTemplate) {
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
     * 사용자 ID 기준으로 사용자의 쿠폰 정보 조회 (만료되지 않은 쿠폰만)
     *
     * @param userId 사용자 ID
     * @return 사용자의 쿠폰 정보 목록
     */
    public List<UserCouponEntity> findValidCoupons(BigInteger userId) {
        String sql = """
        SELECT user_coupon_id, coupon_id, user_id, issued_at, expired_at, used_order_number, deleted_at
        FROM user_coupon
        WHERE user_id = ?
          AND expired_at > NOW()
          AND used_order_number IS NULL
          AND deleted_at IS NULL
        """;
        return jdbcTemplate.query(sql, USER_COUPON_ENTITY_MAPPER, userId);
    }

    /**
     * 사용자 ID 기준으로 사용자의 쿠폰 정보 조회 (만료된 쿠폰만)
     *
     * @param userId 사용자 ID
     * @return 사용자의 쿠폰 정보 목록
     */
    public List<UserCouponEntity> findExpiredCoupons(BigInteger userId) {
        String sql = """
        SELECT user_coupon_id, coupon_id, user_id, issued_at, expired_at, used_order_number, deleted_at
        FROM user_coupon
        WHERE user_id = ?
          AND expired_at <= NOW()
          AND deleted_at IS NULL
        """;
        return jdbcTemplate.query(sql, USER_COUPON_ENTITY_MAPPER, userId);
    }

    /**
     * 사용자 ID 기준으로 사용자의 쿠폰 정보 조회 (사용된 쿠폰만)
     *
     * @param userId 사용자 ID
     * @return 사용자의 쿠폰 정보 목록
     */
    public List<UserCouponEntity> findUsedCoupons(BigInteger userId) {
        String sql = """
        SELECT user_coupon_id, coupon_id, user_id, issued_at, expired_at, used_order_number, deleted_at
        FROM user_coupon
        WHERE user_id = ?
          AND used_order_number IS NOT NULL
          AND deleted_at IS NULL
        """;
        return jdbcTemplate.query(sql, USER_COUPON_ENTITY_MAPPER, userId);
    }

    /**
     * 사용자의 쿠폰 정보를 저장
     *
     * @param entity 사용자의 쿠폰 정보 객체
     * @return 영향 받은 행의 수
     */
    public int save(UserCouponEntity entity) {
        String sql = """
                INSERT INTO user_coupon
                    (coupon_id, user_id, issued_at, expired_at, used_order_number, deleted_at)
                VALUES ( ?, ?, ?, ?, NULL, NULL)
                """;
        return jdbcTemplate.update(sql,
                entity.couponId(),
                entity.userId(),
                entity.issuedAt(),
                entity.expiredAt()
        );
    }

    /**
     * 사용자의 쿠폰을 사용
     * @param userCouponId 사용자의 쿠폰 ID
     * @param orderNumber 주문 번호
     * @return 영향 받은 행의 수
     */
    public int markAsUsed(BigInteger userCouponId, String orderNumber) {
        String sql = """
        UPDATE user_coupon
        SET used_order_number = ?
        WHERE user_coupon_id = ? AND deleted_at IS NULL
        """;
        return jdbcTemplate.update(sql, orderNumber, userCouponId);
    }

    /**
     * ID 기준으로 사용자의 쿠폰 정보를 갱신
     *
     * @param entity 갱신할 사용자의 쿠폰 정보 객체
     * @return 영향 받은 행의 수
     */
    public int update(UserCouponEntity entity) {
        String sql = """
                UPDATE user_coupon
                SET coupon_id = ?,
                    user_id = ?,
                    issued_at = ?,
                    expired_at = ?
                WHERE user_coupon_id = ?
                """;

        return jdbcTemplate.update(sql,
                entity.couponId(),
                entity.userId(),
                entity.issuedAt(),
                entity.expiredAt(),
                entity.userCouponId()
        );
    }

    /**
     * ID 기준으로 사용자의 쿠폰 정보 삭제
     *
     * @param userCouponId 사용자의 쿠폰 ID
     * @return 영향 받은 행의 수
     */
    public int softDelete(BigInteger userCouponId) {
        String sql = """
                    UPDATE user_coupon
                SET deleted_at = NOW()
                WHERE user_coupon_id = ?
                """;
        return jdbcTemplate.update(sql, userCouponId);
    }
}
