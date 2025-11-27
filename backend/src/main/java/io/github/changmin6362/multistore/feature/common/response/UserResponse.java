package io.github.changmin6362.multistore.feature.common.response;

/**
 * 사용자 정보를 담는 응답 전용 레코드
 *
 * <p>도메인 엔티티(UserEntity)에서 외부 노출이 허용된 정보만을 추출하여 구성한다.
 * 비밀번호, 삭제일시 등 민감한 정보나 내부 데이터는 포함하지 않는다.</p>
 *
 * @param userId       사용자 ID
 * @param emailAddress 이메일 주소
 * @param nickName     닉네임
 * @param createdAt    사용자가 생성된 타임스탬프
 */
public record UserResponse(
        Long userId,
        String emailAddress,
        String nickName,
        String createdAt
) {
}
