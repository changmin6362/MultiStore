import type { SignupRequest } from "@/app/api/.common/types";

import {
  fetchBackendApi as fetchAuthApi,
  handleApiError as handleAuthError
} from "@/app/api/.common/utils";

/**
 * POST /api/auth/signup
 * 회원가입
 * @param {Request} request - 이메일, 비밀번호, 닉네임을 포함한 요청
 * @returns { success: true, message: string } 생성 메시지 반환 (백엔드 스키마에 맞춤)
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupRequest;

    // 백엔드 응답: { success: true, data: string }
    type BackendSignupResponse = { success: boolean; data: string };
    const result = await fetchAuthApi<BackendSignupResponse>({
      method: "POST",
      url: "/api/auth/signup",
      body
    });

    if (!result.success) {
      return handleAuthError(result.error, "회원가입 실패");
    }

    // 백엔드의 data(문자열 메시지)를 프론트 컨벤션에 맞춰 message로 반환
    const message = result.data?.data ?? "회원가입이 완료되었습니다";
    return Response.json({ success: true, message }, { status: 201 });
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
