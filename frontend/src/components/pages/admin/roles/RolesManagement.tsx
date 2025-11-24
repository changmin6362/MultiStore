"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button/Button";
import { useRoles } from "./hooks/useRoles";
import { usePermissions } from "./hooks/usePermissions";
import { usePermissionManagement } from "./hooks/usePermissionManagement";
import { RolesTable } from "./table/RolesTable";
import { RoleCreateModal } from "./modals/RoleCreateModal";
import { PermissionCreateModal } from "./modals/PermissionCreateModal";
import { RoleUpdateModal } from "./modals/RoleUpdateModal";
import { PermissionUpdateModal } from "./modals/PermissionUpdateModal";
import type { RoleDto, PermissionDto } from "@/app/api/.common/types";

export const RolesManagement = () => {
  const router = useRouter();
  const { roles, loading, error, refetch: refetchRoles } = useRoles();
  const { permissions, refetch: refetchPermissions } = usePermissions();
  const { deletePermission } = usePermissionManagement();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);
  const [isRoleUpdateModalOpen, setIsRoleUpdateModalOpen] = useState(false);
  const [isPermissionUpdateModalOpen, setIsPermissionUpdateModalOpen] =
    useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState<number | null>(null);
  const [selectedEditingRole, setSelectedEditingRole] =
    useState<RoleDto | null>(null);
  const [selectedEditingPermission, setSelectedEditingPermission] =
    useState<PermissionDto | null>(null);

  const handleRoleCreateSuccess = async () => {
    await refetchRoles();
  };

  const handlePermissionCreateSuccess = async () => {
    await refetchPermissions();
  };

  const handleDeletePermission = async (permissionId: number) => {
    if (confirm("정말 이 권한을 삭제하시겠습니까?")) {
      const success = await deletePermission(permissionId);
      if (success) {
        await refetchPermissions();
      } else {
        alert("권한 삭제에 실패했습니다");
      }
    }
  };

  const handleEditRole = (role: RoleDto) => {
    setSelectedEditingRole(role);
    setIsRoleUpdateModalOpen(true);
  };

  const handleEditPermission = (permission: PermissionDto) => {
    setSelectedEditingPermission(permission);
    setIsPermissionUpdateModalOpen(true);
  };

  const handleRoleUpdateSuccess = async () => {
    setIsRoleUpdateModalOpen(false);
    setSelectedEditingRole(null);
    await refetchRoles();
  };

  const handlePermissionUpdateSuccess = async () => {
    setIsPermissionUpdateModalOpen(false);
    setSelectedEditingPermission(null);
    await refetchPermissions();
  };

  return (
    <div className="min-h-screen bg-white">
      {/* 헤더 */}
      <div className="flex flex-col gap-4 border-b border-gray-200 bg-white px-8 py-6">
        <div className="flex max-w-7xl items-center justify-between">
          <h1 className="text-2xl font-semibold text-gray-900">역할 및 권한</h1>
        </div>
        <Button
          label="사용자 관리"
          onClick={() => router.push("/admin/users")}
          state="Navigation"
        />
      </div>

      {/* 메인 컨텐츠 */}
      <div className="mx-auto max-w-7xl p-8">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-col gap-8">
          {/* 좌측: 역할 테이블 (2열) */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">역할 목록</h2>
            </div>
            <Button
              label="+ 역할 추가"
              onClick={() => setIsRoleModalOpen(true)}
              state="Submit"
            />

            {loading ? (
              <div className="flex items-center justify-center rounded-lg border border-gray-200 bg-gray-50 py-12">
                <div className="text-center">
                  <div className="mx-auto mb-3 h-6 w-6 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                  <p className="text-sm text-gray-600">역할을 불러오는 중...</p>
                </div>
              </div>
            ) : (
              <RolesTable
                roles={roles}
                selectedRoleId={selectedRoleId}
                onSelectRole={setSelectedRoleId}
                onEditRole={handleEditRole}
              />
            )}
          </div>

          {/* 우측: 권한 패널 (1열) */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">권한 목록</h2>
            </div>
            <Button
              label="+ 권한 추가"
              onClick={() => setIsPermissionModalOpen(true)}
              state="Submit"
            />

            {/* 모든 권한 표시 - 테이블 형태 */}
            <div
              className="overflow-auto rounded-lg border border-gray-200 bg-white"
              style={{ maxHeight: "600px" }}
            >
              {permissions.length === 0 ? (
                <div className="flex h-full items-center justify-center">
                  <div className="text-center">
                    <p className="text-sm text-gray-500">권한이 없습니다</p>
                  </div>
                </div>
              ) : (
                <table className="w-full border-collapse text-sm">
                  <thead className="sticky top-0 border-b border-gray-200 bg-gray-50">
                    <tr>
                      <th className="border-r border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                        권한명
                      </th>
                      <th className="border-r border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                        리소스
                      </th>
                      <th className="border-r border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                        액션
                      </th>
                      <th className="border-r border-gray-200 px-4 py-3 text-left font-semibold text-gray-900">
                        설명
                      </th>
                      <th className="px-4 py-3 text-center font-semibold text-gray-900">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {permissions.map((permission) => (
                      <tr
                        key={permission.permissionId}
                        className="transition-colors hover:bg-blue-50"
                      >
                        <td className="border-r border-gray-200 px-4 py-3 text-xs font-medium text-gray-900">
                          {permission.permissionName}
                        </td>
                        <td className="border-r border-gray-200 px-4 py-3 text-xs text-gray-600">
                          {permission.resourceType}
                        </td>
                        <td className="border-r border-gray-200 px-4 py-3 text-xs text-gray-600">
                          {permission.actionType}
                        </td>
                        <td className="border-r border-gray-200 px-4 py-3 text-xs text-gray-500">
                          {permission.permissionDescription || "-"}
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-center gap-2">
                            <button
                              onClick={() => handleEditPermission(permission)}
                              className="rounded-md bg-blue-100 px-2 py-1 text-xs text-blue-700 transition-colors hover:bg-blue-200"
                            >
                              수정
                            </button>
                            <button
                              onClick={() =>
                                handleDeletePermission(permission.permissionId)
                              }
                              className="rounded-md bg-red-100 px-2 py-1 text-xs text-red-700 transition-colors hover:bg-red-200"
                            >
                              삭제
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      <RoleCreateModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
        onSuccess={handleRoleCreateSuccess}
      />

      <PermissionCreateModal
        isOpen={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        onSuccess={handlePermissionCreateSuccess}
      />

      <RoleUpdateModal
        isOpen={isRoleUpdateModalOpen}
        role={selectedEditingRole}
        onClose={() => {
          setIsRoleUpdateModalOpen(false);
          setSelectedEditingRole(null);
        }}
        onSuccess={handleRoleUpdateSuccess}
      />

      <PermissionUpdateModal
        isOpen={isPermissionUpdateModalOpen}
        permission={selectedEditingPermission}
        onClose={() => {
          setIsPermissionUpdateModalOpen(false);
          setSelectedEditingPermission(null);
        }}
        onSuccess={handlePermissionUpdateSuccess}
      />
    </div>
  );
};
