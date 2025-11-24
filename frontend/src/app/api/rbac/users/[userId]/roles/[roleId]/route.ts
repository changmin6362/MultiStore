import type { RemovedResponse } from "@/app/api/.common/types";
import { fetchBackendApi, handleApiError } from "@/app/api/.common/utils";

/**
 * DELETE /api/rbac/users/[userId]/roles/[roleId]
 * 사용자로부터 역할 회수
 * @param {string} userId - 사용자 ID
 * @param {string} roleId - 역할 ID
 * @returns { success: boolean, removed: boolean }
 */
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ userId: string; roleId: string }> }
) {
  const { userId, roleId } = await params;

  const result = await fetchBackendApi<RemovedResponse>({
    method: "DELETE",
    url: `/api/rbac/users/${userId}/roles/${roleId}`
  });

  if (!result.success) {
    return handleApiError(result.error, "역할 회수 실패");
  }

  return Response.json(result.data);
}
