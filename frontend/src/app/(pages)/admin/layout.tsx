"use client";

import { useRouter } from "next/navigation";
import { useAdminAccess } from "@/hooks/useAdminAccess";
import { AdminAccessLoader } from "@/components/common/AdminAccessLoader/AdminAccessLoader";

interface AdminLayoutProps {
  children: React.ReactNode;
}

/**
 * Admin 페이지 접근 제어 Layout
 * /admin 및 하위 경로에 대한 권한 확인 및 접근 제어
 *
 * 흐름:
 * 1. useAdminAccess(): Next.js API 라우트 호출
 * 2. 서버: HttpOnly 쿠키 → JWT 디코딩 → userId 추출 → 백엔드 권한 확인
 * 3. 권한 상태에 따라 컴포넌트 렌더링
 */
export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();

  // Admin 페이지 접근 권한 확인
  const { isLoading, hasAccess, error: accessError } = useAdminAccess();

  // 권한 확인 중
  if (isLoading) {
    return <AdminAccessLoader />;
  }

  // 권한 없음
  if (!hasAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-red-50 to-orange-50">
        <div className="flex max-w-md flex-col items-center gap-6">
          {/* 에러 메시지 */}
          <div className="text-center">
            <h2 className="mb-2 text-2xl font-bold text-gray-900">
              접근 권한이 없습니다
            </h2>
            <p className="mb-4 text-gray-600">
              {accessError || "관리자 페이지에 접근할 수 있는 권한이 없습니다."}
            </p>
          </div>

          {/* 버튼 */}
          <button
            onClick={() => router.push("/")}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
          >
            메인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  // 권한 있음 - 자식 컴포넌트 렌더링
  return <>{children}</>;
}
