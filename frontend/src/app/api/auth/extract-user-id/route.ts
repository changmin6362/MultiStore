import { headers } from "next/headers";
import { decodeJwtUserId } from "@/utils/jwt";

/**
 * HttpOnly 쿠키에서 userId 추출 API 라우트
 *
 * 클라이언트에서 직접 HttpOnly 쿠키에 접근할 수 없으므로
 * 서버 라우트를 통해 headers()로 쿠키를 읽고 userId를 추출합니다
 */
export async function GET() {
  try {
    const headersList = await headers();

    // headers()에서 cookie 문자열 가져오기
    const cookieString = headersList.get("cookie") || "";

    // 쿠키 문자열에서 accessToken 추출
    const cookies: Record<string, string> = {};
    cookieString.split(";").forEach((cookie) => {
      const [key, value] = cookie.trim().split("=");
      if (key && value) {
        cookies[key] = value;
      }
    });

    const accessToken = cookies.access_token;

    if (!accessToken) {
      return Response.json(
        {
          success: false,
          error: "로그인 정보를 찾을 수 없습니다",
          userId: null
        },
        { status: 401 }
      );
    }

    // JWT에서 userId 추출
    const userId = decodeJwtUserId(accessToken);

    if (!userId) {
      return Response.json(
        {
          success: false,
          error: "토큰에서 사용자 ID를 추출할 수 없습니다",
          userId: null
        },
        { status: 401 }
      );
    }

    return Response.json(
      {
        success: true,
        data: {
          userId
        }
      },
      { status: 200 }
    );
  } catch (err) {
    console.error("[/api/auth/extract-user-id] Error:", err);
    return Response.json(
      {
        success: false,
        error: err instanceof Error ? err.message : "서버 오류 발생",
        userId: null
      },
      { status: 500 }
    );
  }
}
