import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * POST /api/auth/refresh
 * 쿠키의 refresh_token을 사용해 백엔드에서 access_token 재발급
 * 성공 시 access_token/refresh_token 쿠키를 재설정
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return Response.json(
        { error: "리프레시 토큰이 없습니다", status: 400 },
        { status: 400 }
      );
    }

    const BACKEND_URL =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

    const response = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken })
    });

    if (!response.ok) {
      return Response.json(
        { error: "토큰 재발급 실패", status: response.status },
        { status: response.status }
      );
    }

    const data = (await response.json()) as {
      accessToken: string;
      refreshToken: string;
      success: boolean;
    };

    const isProd = process.env.NODE_ENV === "production";
    const accessMaxAge = 60 * 60; // 1시간
    const refreshMaxAge = 60 * 60 * 24 * 7; // 7일

    const res = NextResponse.json({ success: true }, { status: 200 });
    // 새 액세스 토큰 세팅
    res.cookies.set("access_token", data.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: accessMaxAge
    });
    // 회전된 리프레시 토큰 세팅
    res.cookies.set("refresh_token", data.refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: refreshMaxAge
    });
    return res;
  } catch (error) {
    return Response.json(
      {
        error: "토큰 재발급 중 오류가 발생했습니다",
        status: 500,
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
