import { cookies } from "next/headers";
import { NextResponse } from "next/server";

/**
 * POST /api/auth/refresh
 * 쿠키의 refresh_token을 사용해 백엔드에서 access_token 재발급
 *
 * 백엔드 응답:
 * - Authorization 헤더: Bearer <accessToken>
 * - X-Refresh-Token 헤더: <refreshToken>
 * - Response Body: 메시지만
 *
 * 성공 시 access_token/refresh_token 쿠키를 재설정
 */
export async function POST() {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) {
      return Response.json(
        { success: false, error: "리프레시 토큰이 없습니다" },
        { status: 401 }
      );
    }

    const BACKEND_URL =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

    const response = await fetch(`${BACKEND_URL}/api/auth/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        refresh_token: refreshToken
      }
    });

    if (!response.ok) {
      return Response.json(
        { success: false, error: "토큰 재발급 실패" },
        { status: response.status }
      );
    }

    // Authorization 헤더에서 accessToken 추출
    const authHeader = response.headers.get("authorization") || "";
    const newAccessToken = authHeader.replace("Bearer ", "");

    // refresh_token 헤더에서 refreshToken 추출
    const newRefreshToken = response.headers.get("refresh_token") || "";

    if (!newAccessToken || !newRefreshToken) {
      return Response.json(
        { success: false, error: "토큰을 받지 못했습니다" },
        { status: 500 }
      );
    }

    const isProd = process.env.NODE_ENV === "production";
    const accessMaxAge = 60 * 60; // 1시간
    const refreshMaxAge = 60 * 60 * 24 * 7; // 7일

    const res = NextResponse.json(
      { success: true, message: "토큰이 재발급되었습니다" },
      { status: 200 }
    );

    // 새 액세스 토큰 세팅
    res.cookies.set("access_token", newAccessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: accessMaxAge
    });

    // 회전된 리프레시 토큰 세팅
    res.cookies.set("refresh_token", newRefreshToken, {
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
        success: false,
        error: "토큰 재발급 중 오류가 발생했습니다",
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
