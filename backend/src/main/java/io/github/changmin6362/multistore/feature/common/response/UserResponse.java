package io.github.changmin6362.multistore.feature.common.response;

/**
 * 사용자 정보를 담는 응답 전용 레코드
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
