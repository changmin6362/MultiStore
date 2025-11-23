"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface UseLogoutReturn {
  logout: () => Promise<void>;
  error: string | null;
}

/**
 * 로그아웃 커스텀 훅
 * - 내부적으로 Next API Route(`/api/auth/logout`)를 호출하여 서버에서 HttpOnly 쿠키를 제거합니다.
 * - 완료 후 홈으로 이동하고 router.refresh()로 서버 컴포넌트를 재검증하여 Header 상태를 즉시 반영합니다.
 */
export const useLogout = (): UseLogoutReturn => {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const logout = async () => {
    setError(null);

    try {
      const res = await fetch("/api/auth/logout", { method: "POST" });
      if (!res.ok) {
        try {
          const data = await res.json();
          setError(data?.message || data?.error || "로그아웃 실패");
        } catch {
          setError("로그아웃 실패");
        }
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "로그아웃 중 오류가 발생했습니다");
    } finally {
      // 성공/실패와 무관하게 쿠키 제거 시도를 했으므로, 홈으로 이동 후 서버 컴포넌트 재검증
      router.push("/");
      router.refresh();
    }
  };

  return { logout, error };
};
