import type { UserListResponse, UserResponse } from "./types";
import { fetchBackendApi, handleApiError } from "./utils";

/**
 * GET /api/user
 * 모든 사용자 목록 조회
 * @returns {UserListResponse} 사용자 목록 데이터
 */
export async function GET() {
  const result = await fetchBackendApi<UserListResponse>({
    method: "GET",
    url: "/api/users"
  });

  // success 필드로 타입 좁히기
  if (!result.success) {
    return handleApiError(result.error, "사용자 목록 조회 실패");
  }

  // 여기서 result.data는 UserListResponse 타입으로 정확히 인식됨
  return Response.json(result.data);
}

/**
 * POST /api/user
 * 새 사용자 생성
 * @param {Request} request - 사용자 정보를 포함한 요청
 * @returns {UserResponse} 생성된 사용자 데이터
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = await fetchBackendApi<UserResponse>({
      method: "POST",
      url: "/api/users",
      body
    });

    if (!result.success) {
      return handleApiError(result.error, "사용자 생성 실패");
    }

    // 여기서 result.data는 UserResponse 타입으로 정확히 인식됨
    return Response.json(result.data, { status: 201 });
  } catch (error) {
    return handleApiError(
      {
        error: "요청 데이터 파싱 실패",
        status: 400,
        message: error instanceof Error ? error.message : "Unknown error"
      },
      "사용자 생성 실패"
    );
  }
}
