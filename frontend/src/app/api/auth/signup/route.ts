import type { SignupRequest } from "@/app/api/.common/types";

import {
  fetchBackendApi as fetchAuthApi,
  handleApiError as handleAuthError
} from "@/app/api/.common/utils";

  /**
   * POST /api/auth/signup
   * 회원가입
   * @param {Request} request - 이메일, 비밀번호, 닉네임을 포함한 요청
   * @returns { success: true, message: string } 생성 메시지 반환
   */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as SignupRequest;

    // 백엔드 응답 (두 형태를 모두 허용):
    // 1) ApiResponse + 래퍼 내부 문자열 { success: true, data: string }
    // 2) ApiResponse + @JsonUnwrapped DTO { success: true, successMessage: string }
    type BackendSignupUnwrapped = { success: boolean; successMessage?: string };
    type BackendSignupWrapped = { success: boolean; data?: string };
    type BackendSignupResponse = BackendSignupUnwrapped | BackendSignupWrapped;

    const result = await fetchAuthApi<BackendSignupResponse>({
      method: "POST",
      url: "/api/auth/signup",
      body
    });

    if (!result.success) {
      return handleAuthError(result.error, "회원가입 실패");
    }

    // 백엔드 응답을 프론트 컨벤션에 맞춰 message로 반환
    const payload = result.data;
    const message =
      (payload && "data" in payload && (payload as BackendSignupWrapped).data) ||
      (payload && "successMessage" in payload && (payload as BackendSignupUnwrapped).successMessage) ||
      "회원가입이 완료되었습니다";
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
