"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginRequest, AuthResponse } from "@/app/api/auth/types";

interface UseLoginReturn {
  login: (credentials: LoginRequest) => Promise<void>;
  loading: boolean;
  error: string | null;
}

/**
 * 로그인 커스텀 훅
 * API 호출, 토큰 관리, 네비게이션을 처리합니다
 */
export const useLogin = (): UseLoginReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (credentials: LoginRequest): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(credentials)
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error?.message || result.error?.error || "로그인 실패");
        return;
      }

      const authData: AuthResponse = result.data;

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

      // 로그인 성공 후 대시보드로 이동
      router.push("/");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "로그인 중 오류가 발생했습니다"
      );
    } finally {
      setLoading(false);
    }
  };

  return { login, loading, error };
};
