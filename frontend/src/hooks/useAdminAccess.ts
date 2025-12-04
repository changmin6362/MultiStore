"use client";

import { useState, useEffect } from "react";

interface AdminAccessState {
  isLoading: boolean;
  hasAccess: boolean;
  error: string | null;
}

interface PermissionResponse {
  success?: boolean;
  data?: {
    allowed?: boolean;
  };
  allowed?: boolean;
  error?: string;
  status?: number;
}

/**
 * Admin 페이지 접근 권한 확인 훅
 * Next.js API 라우트를 거쳐 백엔드 권한을 확인합니다
 *
 * 흐름:
 * 1. useAdminAccess 호출
 * 2. /api/auth/check-admin-access 호출 (Next.js API 라우트)
 * 3. 서버: HttpOnly 쿠키 → JWT 디코딩 → userId 추출
 * 4. 서버: 백엔드 /api/rbac/users/{userId}/permissions/check 호출
 * 5. 결과 반환
 */
export const useAdminAccess = (): AdminAccessState => {
  const [state, setState] = useState<AdminAccessState>({
    isLoading: true,
    hasAccess: false,
    error: null
  });

  useEffect(() => {
    const checkAdminAccess = async () => {
      try {
        // Next.js API 라우트를 거쳐 백엔드 권한 확인
        const response = await fetch("/api/auth/check-admin-access", {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        });

        if (!response.ok) {
          const errorData = (await response.json()) as PermissionResponse;
          console.error(
            "[useAdminAccess] Permission check failed:",
            errorData.error || `Status ${response.status}`
          );
          setState({
            isLoading: false,
            hasAccess: false,
            error: "권한 확인에 실패했습니다"
          });
          return;
        }

        const data = (await response.json()) as PermissionResponse;

        // 응답 형식: { success: true, data: { allowed: true } }
        const hasAccessAdminPage = data.data?.allowed === true;

        setState({
          isLoading: false,
          hasAccess: hasAccessAdminPage,
          error: hasAccessAdminPage ? null : "관리자 권한이 없습니다"
        });
      } catch (err) {
        console.error("[useAdminAccess] Error:", err);
        setState({
          isLoading: false,
          hasAccess: false,
          error:
            err instanceof Error
              ? err.message
              : "권한 확인 중 오류가 발생했습니다"
        });
      }
    };

    checkAdminAccess();
  }, []);

  return state;
};
