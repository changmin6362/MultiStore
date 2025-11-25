import type { ApiErrorResponse, ApiResult, FetchOptions } from "./types";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

/**
 * 백엔드 API 요청 처리 유틸
 * @template T - 성공 응답의 데이터 타입
 * @returns ApiResult<T> - success가 true면 성공, false면 실패
 */
export async function fetchBackendApi<T>(
  options: FetchOptions
): Promise<ApiResult<T>> {
  try {
    const fetchOptions: RequestInit = {
      method: options.method,
      headers: {
        "Content-Type": "application/json"
      }
    };

    if (options.body) {
      fetchOptions.body = JSON.stringify(options.body);
    }

    const response = await fetch(`${BACKEND_URL}${options.url}`, fetchOptions);

    if (!response.ok) {
      const errorResponse: ApiErrorResponse = {
        error:
          response.status === 404
            ? "요청한 리소스를 찾을 수 없습니다"
            : response.status === 409
              ? "이미 존재하거나 충돌하는 요청입니다"
              : response.status === 400
                ? "잘못된 요청입니다"
                : response.status === 401
                  ? "인증 정보가 올바르지 않습니다"
                  : `요청 실패: ${response.status}`,
        status: response.status
      };

      try {
        const errorData = await response.json();
        errorResponse.message = errorData.message || errorData.error;
      } catch {
        // JSON 파싱 실패 시 무시
      }

      return {
        success: false,
        data: null,
        error: errorResponse,
        status: response.status
      };
    }

    const data: T = await response.json();
    return { success: true, data, error: null, status: response.status };
  } catch (error) {
    const errorResponse: ApiErrorResponse = {
      error: "서버 요청 중 오류가 발생했습니다",
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error"
    };
    return { success: false, data: null, error: errorResponse, status: 500 };
  }
}

/**
 * API 에러 응답 처리 헬퍼
 */
export function handleApiError(
  error: ApiErrorResponse,
  defaultMessage: string
): Response {
  const responseError: ApiErrorResponse = {
    error: error.error || defaultMessage,
    status: error.status,
    message: error.message
  };
  return Response.json(responseError, { status: error.status });
}
