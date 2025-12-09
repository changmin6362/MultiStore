import { extractUserIdFromJwt } from "@/lib/auth/extractUserIdFromJwt";

/**
 * HttpOnly 쿠키에서 userId 추출 API 라우트
 *
 * extractUserIdFromHeaders 함수를 통해 userId 추출
 */
export async function GET() {
  try {
    const { userId, error } = await extractUserIdFromJwt();

    if (!userId || error) {
      return Response.json(
        {
          success: false,
          error: error || "로그인 정보를 찾을 수 없습니다",
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
