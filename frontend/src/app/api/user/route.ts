import { NextResponse } from "next/server";
import { fetchBackendApi } from "../.common/utils";

type BackendApiResponse<T> = {
  success: boolean;
  status?: number;
  message?: string;
  data?: T;
};

/**
 * GET /api/user - 모든 사용자 목록 조회 (백엔드 경로와 일치)
 * 백엔드의 GET /api/user를 호출하고 ApiResponse를 변형 없이 그대로 반환합니다.
 */
export async function GET() {
  try {
    const result = await fetchBackendApi<BackendApiResponse<unknown>>({
      method: "GET",
      url: "/api/user"
    });

    if (!result.success) {
      return NextResponse.json(result.error, { status: result.status });
    }

    // 백엔드 ApiResponse를 변형 없이 그대로 반환
    return NextResponse.json(result.data);
  } catch (e) {
    console.error("[GET /api/user] Error:", e);
    return NextResponse.json(
      { error: "사용자 목록 조회 중 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
