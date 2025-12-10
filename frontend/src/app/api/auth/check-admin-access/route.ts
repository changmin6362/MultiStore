import { extractUserIdFromJwt } from "@/lib/auth/extractUserIdFromJwt";
import { fetchBackendApi } from "@/app/api/.common/utils";

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

    // Step 2: 백엔드 UserRoleController API 호출 (공용 fetch 유틸 사용)
    type BackendAllowedNew = { success: boolean; data?: { allowed?: boolean } };
    type BackendAllowedLegacy = { success: boolean; allowed?: boolean };
    type BackendAllowed = BackendAllowedNew | BackendAllowedLegacy;

    const result = await fetchBackendApi<BackendAllowed>({
      method: "GET",
      url: `/api/rbac/users/${userId}/permissions/check?permissionName=ACCESS_ADMIN_PAGE`
    });

    if (!result.success) {
      return Response.json(
        {
          success: false,
          error: result.error?.message || result.error?.error || "권한 확인에 실패했습니다"
        },
        { status: result.status }
      );
    }

    // Step 3: 백엔드 응답 파싱
    const backendData = result.data;

    const allowed =
      ("data" in (backendData || {}) && (backendData as BackendAllowedNew).data?.allowed === true) ||
      (backendData as BackendAllowedLegacy)?.allowed === true;

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
