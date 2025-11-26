"use client";

/**
 * Admin 권한 확인 로딩 화면
 */
export const AdminAccessLoader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-blue-50 to-indigo-50">
      <div className="flex flex-col items-center gap-6">
        {/* 로딩 스피너 */}
        <div className="relative h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-blue-200"></div>
          <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-blue-600"></div>
        </div>

        {/* 텍스트 */}
        <div className="text-center">
          <h2 className="mb-2 text-lg font-semibold text-gray-800">
            권한 확인 중입니다
          </h2>
          <p className="text-sm text-gray-600">
            관리자 페이지 접근 권한을 확인하는 중입니다...
          </p>
        </div>

        {/* 진행 표시 */}
        <div className="h-1 w-48 overflow-hidden rounded-full bg-gray-200">
          <div className="h-full animate-pulse rounded-full bg-linear-to-r from-blue-400 to-indigo-600"></div>
        </div>
      </div>
    </div>
  );
};
