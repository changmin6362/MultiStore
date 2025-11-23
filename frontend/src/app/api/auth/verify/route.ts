import { cookies } from "next/headers";

/**
 * POST /api/auth/verify
 * 액세스 토큰 검증 (쿠키에서 access_token을 읽어 백엔드로 위임)
 */
export async function POST(request: Request) {
  try {
    let accessToken: string | undefined;
    try {
      const body = await request.json();
      accessToken = body?.accessToken;
    } catch {
      // body 없음
    }

    if (!accessToken) {
      const cookieStore = await cookies();
      accessToken = cookieStore.get("access_token")?.value;
    }

    if (!accessToken) {
      return Response.json(
        { error: "토큰이 없습니다", status: 400 },
        { status: 400 }
      );
    }

    const BACKEND_URL =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

    const response = await fetch(`${BACKEND_URL}/api/auth/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`
      }
    });

    if (!response.ok) {
      return Response.json(
        { error: "토큰이 유효하지 않습니다", status: 401 },
        { status: 401 }
      );
    }

    const data = await response.json();
    return Response.json({ success: true, data }, { status: 200 });
  } catch (error) {
    return Response.json(
      {
        error: "토큰 검증 중 오류가 발생했습니다",
        status: 500,
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
