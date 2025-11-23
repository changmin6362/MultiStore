import { NextResponse } from "next/server";
import { cookies } from "next/headers";

/**
 * POST /api/auth/logout
 * 로그아웃 (토큰 무효화 + 쿠키 삭제)
 */
export async function POST() {
  const BACKEND_URL =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

  try {
    // 백엔드에도 로그아웃 요청 (선택적)
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;
    await fetch(`${BACKEND_URL}/api/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: refreshToken ? JSON.stringify({ refreshToken }) : undefined
    });

    const res = NextResponse.json(
      { success: true, message: "로그아웃되었습니다" },
      { status: 200 }
    );

    // access_token, refresh_token 쿠키 제거
    const isProd = process.env.NODE_ENV === "production";
    res.cookies.set("access_token", "", {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 0
    });
    res.cookies.set("refresh_token", "", {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 0
    });

    return res;
  } catch (error) {
    const res = NextResponse.json(
      {
        error: "로그아웃 중 오류가 발생했습니다",
        status: 500,
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );

    // 오류가 있어도 쿠키는 제거
    const isProd = process.env.NODE_ENV === "production";
    res.cookies.set("access_token", "", {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 0
    });
    res.cookies.set("refresh_token", "", {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: 0
    });
    return res;
  }
}
