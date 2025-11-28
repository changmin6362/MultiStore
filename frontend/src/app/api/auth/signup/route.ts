import type { SignupRequest, AuthResponse } from "@/app/api/.common/types";

import {
  fetchBackendApi as fetchAuthApi,
  handleApiError as handleAuthError
} from "@/app/api/.common/utils";

/**
 * POST /api/auth/signup
 * 회원가입
 * @param {Request} request - 이메일, 비밀번호, 닉네임을 포함한 요청
 * @returns {AuthResponse} 생성된 사용자 정보 및 토큰
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupRequest;

    // fetchAuthApi<AuthResponse>는 ApiResult<AuthResponse>를 반환
    // { success, data: AuthResponse, error, status }
    const result = await fetchAuthApi<AuthResponse>({
      method: "POST",
      url: "/api/auth/signup",
      body
    });

    if (!result.success) {
      return handleAuthError(result.error, "회원가입 실패");
    }

    // result.data는 이미 AuthResponse 형식
    return Response.json(
      {
        success: true,
        ...result.data
      },
      { status: 201 }
    );
  } catch (error) {
    return handleAuthError(
      {
        error: "요청 처리 중 오류가 발생했습니다",
        status: 500,
        message: error instanceof Error ? error.message : "Unknown error"
      },
      "회원가입 실패"
    );
  }
}
