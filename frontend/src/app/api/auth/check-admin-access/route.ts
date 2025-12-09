import { extractUserIdFromJwt } from "@/lib/auth/extractUserIdFromJwt";

/**
 * Admin 페이지 접근 권한 확인 API 라우트
 *
 * 프로세스:
 * 1. extractUserIdFromJwt로 userId 추출
 * 2. 백엔드 UserRoleController API 호출
 * 3. ACCESS_ADMIN_PAGE 권한 확인 결과 반환
 */
export async function GET() {
  try {
    // Step 1: userId 추출
    const { userId, error } = await extractUserIdFromJwt();

    if (!userId || error) {
      return Response.json(
        {
          success: false,
          error: error || "로그인 정보를 찾을 수 없습니다"
        },
        { status: 401 }
      );
    }

    // Step 2: 백엔드 UserRoleController API 호출
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
    const permissionCheckUrl = `${backendUrl}/api/rbac/users/${userId}/permissions/check?permissionName=ACCESS_ADMIN_PAGE`;

    const backendResponse = await fetch(permissionCheckUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      console.error("[/api/auth/check-admin-access] Backend error:", errorData);
      return Response.json(
        {
          success: false,
          error: "권한 확인에 실패했습니다"
        },
        { status: backendResponse.status }
      );
    }

    // Step 3: 백엔드 응답 파싱
    const backendData = await backendResponse.json();

    // 응답 형식: { success: true, allowed: true }
    // AllowedResponse는 @JsonUnwrapped로 직접 필드 노출
    const allowed = backendData.allowed === true;

    return Response.json(
      {
        success: true,
        data: {
          allowed
        }
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[/api/auth/check-admin-access] Error:", err);
    return Response.json(
      {
        success: false,
        error:
          err instanceof Error
            ? err.message
            : "권한 확인 중 오류가 발생했습니다"
      },
      { status: 500 }
    );
  }
}
