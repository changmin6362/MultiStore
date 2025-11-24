"use client";

import { useState, useEffect } from "react";
import { useRolePermissions } from "../hooks/useRolePermissions";
import { usePermissions } from "../hooks/usePermissions";

interface PermissionsListProps {
  roleId: number;
}

export const PermissionsList = ({ roleId }: PermissionsListProps) => {
  const {
    permissions: assignedPermissions,
    error,
    fetchRolePermissions,
    assignPermission,
    removePermission
  } = useRolePermissions();
  const { permissions: availablePermissions } = usePermissions();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadPermissions = async () => {
      setIsLoading(true);
      await fetchRolePermissions(roleId);
      setIsLoading(false);
    };
    loadPermissions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roleId]);

  const handleAssignPermission = async (permissionId: number) => {
    const success = await assignPermission(roleId, permissionId);
    if (success) {
      // 전체 새로고침 대신 해당 역할의 권한만 다시 로드
      await fetchRolePermissions(roleId);
    }
  };

  const handleRemovePermission = async (permissionId: number) => {
    const success = await removePermission(roleId, permissionId);
    if (success) {
      // 전체 새로고침 대신 해당 역할의 권한만 다시 로드
      await fetchRolePermissions(roleId);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-6">
        <div className="text-center">
          <div className="mx-auto mb-2 h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
          <p className="text-sm text-gray-600">권한 로드 중...</p>
        </div>
      </div>
    );
  }

  const unassignedPermissions = availablePermissions.filter(
    (p) => !assignedPermissions.some((ap) => ap.permissionId === p.permissionId)
  );

  return (
    <div className="grid grid-cols-2 gap-4">
      {error && (
        <div className="col-span-2 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      )}

      {/* 좌측: 할당된 권한 */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-900">
          할당됨 ({assignedPermissions.length})
        </h4>
        <div className="space-y-2">
          {assignedPermissions.length === 0 ? (
            <div className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
              <p className="text-xs text-gray-500">할당된 권한이 없습니다</p>
            </div>
          ) : (
            assignedPermissions.map((permission) => (
              <div
                key={permission.permissionId}
                className="group rounded-md border border-green-200 bg-green-50 p-3 transition-colors hover:bg-green-100"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-gray-900">
                      {permission.permissionName}
                    </p>
                    <p className="mt-1 text-xs text-gray-600">
                      {permission.resourceType} / {permission.actionType}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleRemovePermission(permission.permissionId)
                    }
                    className="shrink-0 rounded-md bg-red-200 px-2 py-1 text-xs font-medium text-red-700 transition-colors hover:bg-red-300"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 우측: 할당 가능한 권한 */}
      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-gray-900">
          가능 ({unassignedPermissions.length})
        </h4>
        <div className="space-y-2">
          {unassignedPermissions.length === 0 ? (
            <div className="rounded-md border border-dashed border-gray-300 bg-gray-50 p-4 text-center">
              <p className="text-xs text-gray-500">
                할당 가능한 권한이 없습니다
              </p>
            </div>
          ) : (
            unassignedPermissions.map((permission) => (
              <div
                key={permission.permissionId}
                className="group rounded-md border border-gray-300 bg-white p-3 transition-colors hover:bg-gray-50"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-gray-900">
                      {permission.permissionName}
                    </p>
                    <p className="mt-1 text-xs text-gray-600">
                      {permission.resourceType} / {permission.actionType}
                    </p>
                  </div>
                  <button
                    onClick={() =>
                      handleAssignPermission(permission.permissionId)
                    }
                    className="shrink-0 rounded-md bg-blue-200 px-2 py-1 text-xs font-medium text-blue-700 transition-colors hover:bg-blue-300"
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
