"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SignupRequest } from "@/app/api/.common/types";

interface UseSignupReturn {
  signup: (data: SignupRequest) => Promise<void>;
  loading: boolean;
  error: string | null;
}

/**
 * 회원가입 커스텀 훅
 * API 호출, 네비게이션을 처리합니다
 *
 * 흐름:
 * 1. 클라이언트: /api/auth/signup에 요청
 * 2. 서버 라우트: 백엔드 /api/auth/signup에 요청
 * 3. 백엔드: Authorization 헤더에 토큰 반환
 * 4. 서버 라우트: 토큰을 HttpOnly 쿠키에 저장
 * 5. 클라이언트: 로그인 페이지로 이동
 */
export const useSignup = (): UseSignupReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const signup = async (data: SignupRequest): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
        // HttpOnly 쿠키는 자동으로 저장되므로 credentials 불필요
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        const errorMessage =
          result.message ||
          result.error?.message ||
          result.error?.error ||
          "회원가입 실패";
        setError(errorMessage);
        return;
      }

      // 회원가입 성공 후 로그인 페이지로 이동
      router.push("/auth/signin");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "회원가입 중 오류가 발생했습니다"
      );
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading, error };
};
