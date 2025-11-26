"use client";

import { useState, useEffect } from "react";

interface ExtractUserIdState {
  userId: string | null;
  loading: boolean;
  error: string | null;
}

interface ExtractUserIdResponse {
  success: boolean;
  data?: {
    userId: string;
  };
  error?: string;
  userId?: string | null;
}

/**
 * JWT 토큰에서 userId를 추출하는 커스텀 훅
 *
 * 프로세스:
 * 1. /api/auth/extract-user-id 서버 라우트 호출
 * 2. 서버에서 HttpOnly 쿠키의 accessToken 가져오기
 * 3. JWT 디코딩하여 userId 추출
 * 4. userId 반환
 *
 * HttpOnly 쿠키는 JavaScript에서 직접 접근할 수 없으므로
 * 서버 라우트를 통해 headers()로 접근해야 합니다
 *
 * @returns { userId: string | null, loading: boolean, error: string | null }
 */
export const useExtractUserIdFromJwt = (): ExtractUserIdState => {
  const [state, setState] = useState<ExtractUserIdState>({
    userId: null,
    loading: true,
    error: null
  });

  useEffect(() => {
    const extractUserId = async () => {
      try {
        console.log(
          "[useExtractUserIdFromJwt] Calling /api/auth/extract-user-id..."
        );

        // 서버 라우트를 통해 userId 추출
        // useLogin/useLogout과 동일하게 credentials 설정 없이 요청
        const response = await fetch("/api/auth/extract-user-id", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        console.log(
          "[useExtractUserIdFromJwt] Response status:",
          response.status
        );

        if (!response.ok) {
          const errorData = (await response.json()) as ExtractUserIdResponse;
          console.warn(
            "[useExtractUserIdFromJwt] Failed to extract userId:",
            errorData.error
          );
          setState({
            userId: null,
            loading: false,
            error: errorData.error || "userId 추출에 실패했습니다"
          });
          return;
        }

        const data = (await response.json()) as ExtractUserIdResponse;
        console.log("[useExtractUserIdFromJwt] Response data:", data);

        const userId = data.data?.userId || data.userId;

        if (!userId) {
          console.warn("[useExtractUserIdFromJwt] userId is null or undefined");
          setState({
            userId: null,
            loading: false,
            error: "userId를 추출할 수 없습니다"
          });
          return;
        }

        // userId 상태 업데이트
        setState({
          userId,
          loading: false,
          error: null
        });
      } catch (err) {
        console.error("[useExtractUserIdFromJwt] Error:", err);
        setState({
          userId: null,
          loading: false,
          error:
            err instanceof Error
              ? err.message
              : "userId 추출 중 오류가 발생했습니다"
        });
      }
    };

    extractUserId();
  }, []);

  return state;
};
