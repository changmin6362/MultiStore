// 백엔드 ApiResponse { success, data, ... } 스키마를 투명 패스스루하지 않고
// 프론트 클라이언트가 바로 배열을 받도록 정규화합니다.
import { fetchBackendApi, handleApiError } from "@/app/api/.common/utils";

/**
 * GET /api/rbac/users/[userId]/roles
 * 특정 사용자의 역할 목록 조회
 * @param {string} userId - 사용자 ID
 * @returns {RolesResponse} 역할 목록
 */
export async function GET(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  const { userId } = await params;

  const result = await fetchBackendApi<any>({
    method: "GET",
    url: `/api/rbac/users/${userId}/roles`
  });

  if (!result.success) {
    return handleApiError(result.error, "역할 조회 실패");
  }

  // 백엔드는 { success, data: RoleDto[] } 형태를 반환하므로 클라이언트에는 배열만 전달
  const payload = (result as any).data?.data ?? (result as any).data?.roles ?? [];
  return Response.json(payload);
}

/**
 * POST /api/rbac/users/[userId]/roles
 * 사용자에게 역할 부여
 * @param {string} userId - 사용자 ID
 * @param {Request} request - { roleId: number }
 * @returns { success: boolean, assigned: boolean }
 */
export async function POST(
  request: Request,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const body = await request.json();
    const { roleId } = body;

    if (!roleId) {
      return Response.json(
        { error: "roleId는 필수입니다", status: 400 },
        { status: 400 }
      );
    }

    const result = await fetchBackendApi<{ assigned: boolean }>({
      method: "POST",
      url: `/api/rbac/users/${userId}/roles`,
      body: { roleId }
    });

    if (!result.success) {
      return handleApiError(result.error, "역할 부여 실패");
    }

    return Response.json(result.data);
  } catch (error) {
    return Response.json(
      {
        error: "요청 처리 중 오류가 발생했습니다",
        status: 500,
        message: error instanceof Error ? error.message : "Unknown error"
      },
      { status: 500 }
    );
  }
}
