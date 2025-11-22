import type { AuthError } from "./types";

const BACKEND_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8080";

interface AuthFetchOptions {
  method: "POST";
  url: string;
  body: unknown;
}

/**
 * 인증 API 응답 결과 타입 (성공 케이스)
 */
interface AuthSuccess<T> {
  success: true;
  data: T;
  error: null;
  status: number;
}

/**
 * 인증 API 응답 결과 타입 (실패 케이스)
 */
interface AuthFailure {
  success: false;
  data: null;
  error: AuthError;
  status: number;
}

/**
 * 인증 API 응답 결과 타입 (성공 | 실패)
 */
type AuthResult<T> = AuthSuccess<T> | AuthFailure;

/**
 * 인증 API 요청 처리 유틸
 * @template T - 성공 응답의 데이터 타입
 * @returns AuthResult<T> - success가 true면 성공, false면 실패
 */
export async function fetchAuthApi<T>(
  options: AuthFetchOptions
): Promise<AuthResult<T>> {
  try {
    const response = await fetch(`${BACKEND_URL}${options.url}`, {
      method: options.method,
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(options.body)
    });

    if (!response.ok) {
      const errorResponse: AuthError = {
        error:
          response.status === 404
            ? "요청한 리소스를 찾을 수 없습니다"
            : response.status === 401
              ? "인증 정보가 올바르지 않습니다"
              : response.status === 409
                ? "이미 존재하는 회원정보입니다"
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
    const errorResponse: AuthError = {
      error: "서버 요청 중 오류가 발생했습니다",
      status: 500,
      message: error instanceof Error ? error.message : "Unknown error"
    };
    return { success: false, data: null, error: errorResponse, status: 500 };
  }
}

/**
 * 인증 에러 응답 처리 헬퍼
 */
export function handleAuthError(
  error: AuthError,
  defaultMessage: string
): Response {
  const responseError: AuthError = {
    error: error.error || defaultMessage,
    status: error.status,
    message: error.message
  };
  return Response.json(responseError, { status: error.status });
}
