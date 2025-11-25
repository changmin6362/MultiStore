import type { UserResponse } from "@/app/api/.common/types";
import { fetchBackendApi, handleApiError } from "@/app/api/.common/utils";

/**
 * GET /api/user/[userId]
 * 특정 사용자 조회
 * @param {string} userId - 사용자 ID
 * @returns {UserResponse} 사용자 데이터
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  const result = await fetchBackendApi<UserResponse>({
    method: "GET",
    url: `/api/user/${userId}`
  });

  if (!result.success) {
    return handleApiError(result.error, "사용자 조회 실패");
  }

  return Response.json(result.data);
}

/**
 * PUT /api/user/[userId]
 * 사용자 정보 수정
 * @param {string} userId - 사용자 ID
 * @param {Request} request - 수정할 사용자 정보
 * @returns {UserResponse} 수정된 사용자 데이터
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();

    const result = await fetchBackendApi<UserResponse>({
      method: "PUT",
      url: `/api/user/${userId}`,
      body
    });

    if (!result.success) {
      return handleApiError(result.error, "사용자 수정 실패");
    }

    return Response.json(result.data);
  } catch (error) {
    return handleApiError(
      {
        error: "요청 데이터 파싱 실패",
        status: 400,
        message: error instanceof Error ? error.message : "Unknown error"
      },
      "사용자 수정 실패"
    );
  }
}

/**
 * DELETE /api/user/[userId]
 * 사용자 삭제 (소프트 삭제)
 * @param {string} userId - 사용자 ID
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  const result = await fetchBackendApi<void>({
    method: "DELETE",
    url: `/api/user/${userId}`
  });

  if (!result.success) {
    return handleApiError(result.error, "사용자 삭제 실패");
  }

  return Response.json({ message: "사용자가 삭제되었습니다" }, { status: 200 });
}
