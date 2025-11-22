import type { LoginRequest, AuthResponse } from "../types";
import { fetchAuthApi, handleAuthError } from "../utils";

/**
 * POST /api/auth/login
 * 로그인
 * @param {Request} request - 이메일, 비밀번호를 포함한 요청
 * @returns {AuthResponse} 사용자 정보 및 토큰
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

    return Response.json(result.data, { status: 200 });
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
