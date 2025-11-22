/**
 * POST /api/auth/logout
 * 로그아웃 (토큰 무효화)
 */
export async function POST(request: Request) {
  try {
    const { refreshToken } = (await request.json()) as {
      refreshToken?: string;
    };

    const BACKEND_URL =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

    const response = await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: refreshToken ? JSON.stringify({ refreshToken }) : undefined
    });

    if (!response.ok) {
      return Response.json(
        {
          error: "로그아웃 중 오류가 발생했습니다",
          status: response.status
        },
        { status: response.status }
      );
    }

    return Response.json(
      { success: true, message: "로그아웃되었습니다" },
      { status: 200 }
    );
  } catch (error) {
    return Response.json(
      {
        error: "로그아웃 중 오류가 발생했습니다",
        status: 500,
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
