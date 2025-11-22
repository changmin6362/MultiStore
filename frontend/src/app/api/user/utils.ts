import type { ApiErrorResponse } from "./types";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

interface FetchOptions {
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  body?: unknown;
}

/**
 * API 응답 결과 타입 (성공 케이스)
 * success: true일 때 data는 T 타입, error는 절대 undefined가 아님
 */
interface ApiSuccess<T> {
  success: true;
  data: T;
  error: null;
  status: number;
}

/**
 * API 응답 결과 타입 (실패 케이스)
 * success: false일 때 data는 null, error는 ApiErrorResponse
 */
interface ApiFailure {
  success: false;
  data: null;
  error: ApiErrorResponse;
  status: number;
}

/**
 * API 응답 결과 타입 (성공 | 실패)
 * success 필드로 타입 좁히기 가능
 */
type ApiResult<T> = ApiSuccess<T> | ApiFailure;

/**
 * 백엔드 API 요청 처리 유틸
 * 공통 에러 처리 및 타입 안전성 제공
 *
 * @template T - 성공 응답의 데이터 타입
 * @returns ApiResult<T> - data가 있으면 성공, error가 있으면 실패
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
 * API 응답 에러 처리 헬퍼
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
