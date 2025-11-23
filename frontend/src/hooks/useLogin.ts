"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginRequest } from "@/app/api/auth/types";

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

      // 로그인 성공 후 대시보드로 이동 + 서버 컴포넌트 재검증으로 쿠키 반영
      router.push("/");
      router.refresh();
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
