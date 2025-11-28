"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { SignupRequest, AuthResponse } from "@/app/api/.common/types";

interface UseSignupReturn {
  signup: (data: SignupRequest) => Promise<void>;
  loading: boolean;
  error: string | null;
}

/**
 * 회원가입 커스텀 훅
 * API 호출, 토큰 관리, 네비게이션을 처리합니다
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
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        // 백엔드 에러 응답: { error: string, status: number, message?: string }
        const errorMessage =
          result.message ||
          result.error?.message ||
          result.error?.error ||
          "회원가입 실패";
        setError(errorMessage);
        return;
      }

      // 백엔드 응답: { success: true, userId, emailAddress, nickName, accessToken, refreshToken, ... }
      const authData: AuthResponse = result;

      // 토큰 저장 (localStorage 또는 쿠키)
      localStorage.setItem("accessToken", authData.accessToken);
      if (authData.refreshToken) {
        localStorage.setItem("refreshToken", authData.refreshToken);
      }

      // 사용자 정보 저장
      localStorage.setItem(
        "currentUser",
        JSON.stringify({
          userId: authData.userId,
          emailAddress: authData.emailAddress,
          nickName: authData.nickName
        })
      );

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
