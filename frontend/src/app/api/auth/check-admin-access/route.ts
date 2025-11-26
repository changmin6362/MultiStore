import { headers } from "next/headers";
import { decodeJwtUserId } from "@/utils/jwt";

/**
 * Admin 페이지 접근 권한 확인 API 라우트
 *
 * 프로세스:
 * 1. HttpOnly 쿠키에서 accessToken 추출
 * 2. JWT 디코딩하여 userId 추출
 * 3. 백엔드 UserRoleController API 호출
 * 4. ACCESS_ADMIN_PAGE 권한 확인 결과 반환
 */
export async function GET() {
  try {
    const headersList = await headers();

    // Step 1: HttpOnly 쿠키에서 accessToken 추출
    const cookieString = headersList.get("cookie") || "";
    console.log(
      "[/api/auth/check-admin-access] Cookie string:",
      cookieString ? "found" : "not found"
    );

    const cookies: Record<string, string> = {};
    cookieString.split(";").forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key && value) {
        cookies[key] = value;
      }
    });

    console.log(
      "[/api/auth/check-admin-access] Cookie keys:",
      Object.keys(cookies)
    );

    const accessToken = cookies.access_token;
    console.log(
      "[/api/auth/check-admin-access] access_token found:",
      !!accessToken
    );

    if (!accessToken) {
      console.warn("[/api/auth/check-admin-access] access_token not found");
      return Response.json(
        {
          success: false,
          error: "로그인 정보를 찾을 수 없습니다"
        },
        { status: 401 }
      );
    }

    // Step 2: JWT에서 userId 추출
    const userId = decodeJwtUserId(accessToken);
    console.log("[/api/auth/check-admin-access] Extracted userId:", userId);

    if (!userId) {
      console.warn("[/api/auth/check-admin-access] Failed to extract userId");
      return Response.json(
        {
          success: false,
          error: "토큰에서 사용자 ID를 추출할 수 없습니다"
        },
        { status: 401 }
      );
    }

    // Step 3: 백엔드 UserRoleController API 호출
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
    const permissionCheckUrl = `${backendUrl}/api/rbac/users/${userId}/permissions/check?permissionName=ACCESS_ADMIN_PAGE`;

    console.log(
      "[/api/auth/check-admin-access] Calling backend:",
      permissionCheckUrl
    );

    const backendResponse = await fetch(permissionCheckUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    console.log(
      "[/api/auth/check-admin-access] Backend response status:",
      backendResponse.status
    );

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

    // Step 4: 백엔드 응답 파싱
    const backendData = await backendResponse.json();
    console.log(
      "[/api/auth/check-admin-access] Backend response:",
      backendData
    );

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
