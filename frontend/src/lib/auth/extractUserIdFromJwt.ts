import { headers } from "next/headers";
import { decodeJwtUserId } from "@/utils/jwt";

interface ExtractUserIdResult {
  userId: string | null;
  error: string | null;
}

/**
 * JWT 토큰에서 userId 추출
 * HttpOnly 쿠키에서 accessToken을 읽고 JWT를 디코딩하여 userId 추출
 * 서버 함수 또는 Server Action에서 호출 가능
 *
 * @returns { userId: string | null, error: string | null }
 */
export async function extractUserIdFromJwt(): Promise<ExtractUserIdResult> {
  try {
    const headersList = await headers();

    // HttpOnly 쿠키에서 accessToken 추출
    const cookieString = headersList.get("cookie") || "";

    const cookies: Record<string, string> = {};
    cookieString.split(";").forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key && value) {
        cookies[key] = value;
      }
    });

    let accessToken = cookies.access_token;

    if (!accessToken) {
      return {
        userId: null,
        error: "로그인 정보를 찾을 수 없습니다"
      };
    }

    // 쿠키 값이 URL 인코딩되었을 수 있으므로 디코딩
    try {
      accessToken = decodeURIComponent(accessToken);
    } catch (e) {
      console.error("[extractUserIdFromHeaders] URL 디코딩 실패:", e);
    }

    // JWT에서 userId 추출
    const userId = decodeJwtUserId(accessToken);

    if (!userId) {
      return {
        userId: null,
        error: "토큰에서 사용자 ID를 추출할 수 없습니다"
      };
    }

    return {
      userId,
      error: null
    };
  } catch (err) {
    console.error("[extractUserIdFromHeaders] Error:", err);
    return {
      userId: null,
      error:
        err instanceof Error
          ? err.message
          : "userId 추출 중 오류가 발생했습니다"
    };
  }
}
