import type { LoginRequest, AuthResponse } from "../types";
import { fetchAuthApi, handleAuthError } from "../utils";
import { NextResponse } from "next/server";

/**
 * POST /api/auth/login
 * 로그인
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginRequest;

    const result = await fetchAuthApi<AuthResponse>({
      method: "POST",
      url: "/api/auth/login",
      body
    });

    if (!result.success) {
      return handleAuthError(result.error, "로그인 실패");
    }

    // JWT를 HttpOnly 쿠키로 저장
    const res = NextResponse.json(
      {
        success: true,
        data: {
          userId: result.data.userId,
          emailAddress: result.data.emailAddress,
          nickName: result.data.nickName,
          createdAt: result.data.createdAt
        }
      },
      { status: 200 }
    );

    const maxAge = 60 * 60; // 1시간 (access token)
    const isProd = process.env.NODE_ENV === "production";
    res.cookies.set("access_token", result.data.accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge
    });

    // Refresh Token 쿠키 (7일)
    if (result.data.refreshToken) {
      const refreshMaxAge = 60 * 60 * 24 * 7; // 7일
      res.cookies.set("refresh_token", result.data.refreshToken, {
        httpOnly: true,
        secure: isProd,
        sameSite: "lax",
        path: "/",
        maxAge: refreshMaxAge
      });
    }

    return res;
  } catch (error) {
    return handleAuthError(
      {
        error: "요청 처리 중 오류가 발생했습니다",
        status: 500,
        message: error instanceof Error ? error.message : "Unknown error"
      },
      "로그인 실패"
    );
  }
}
