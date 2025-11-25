package io.github.changmin6362.multistore.feature.authorization.web.request;

/**
 * 권한 생성 요청 DTO
 * 필드: 권한명, 설명, 리소스 유형, 액션 유형
 */
public record PermissionCreateRequest(
        String permissionName,
        String permissionDescription,
        String resourceType,
        String actionType
) {}
