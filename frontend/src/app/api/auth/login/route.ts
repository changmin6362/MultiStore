import type { LoginRequest } from "@/app/api/.common/types";
import { handleApiError as handleAuthError } from "@/app/api/.common/utils";
import { NextResponse } from "next/server";

/**
 * POST /api/auth/login
 * 로그인
 *
 * 백엔드에서는:
 * - Response Body: { success: true, data: "로그인이 완료되었습니다" }
 * - Authorization 헤더: Bearer <accessToken>
 *
 * 이 라우트에서는:
 * - Authorization 헤더에서 accessToken 추출
 * - HttpOnly 쿠키로 저장
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as LoginRequest;

    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";
    const backendResponse = await fetch(`${backendUrl}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json().catch(() => ({}));
      return handleAuthError(
        {
          error: errorData.message || "로그인 실패",
          status: backendResponse.status
        },
        "로그인 실패"
      );
    }

    // Authorization 헤더에서 accessToken 추출
    const authHeader = backendResponse.headers.get("authorization") || "";
    const accessToken = authHeader.replace("Bearer ", "");

    // refresh_token 헤더에서 refreshToken 추출
    const refreshToken = backendResponse.headers.get("refresh_token") || "";

    if (!accessToken || !refreshToken) {
      return handleAuthError(
        { error: "토큰을 받지 못했습니다", status: 500 },
        "로그인 실패"
      );
    }

    // HttpOnly 쿠키로 토큰 저장
    const res = new NextResponse(
      JSON.stringify({
        success: true,
        data: {
          message: "로그인이 완료되었습니다"
        }
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const maxAge = 60 * 60; // 1시간 (access token)
    const isProd = process.env.NODE_ENV === "production";
    res.cookies.set("access_token", accessToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge
    });

    // Refresh Token 쿠키 (7일)
    const refreshMaxAge = 60 * 60 * 24 * 7; // 7일
    res.cookies.set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: isProd,
      sameSite: "lax",
      path: "/",
      maxAge: refreshMaxAge
    });

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
