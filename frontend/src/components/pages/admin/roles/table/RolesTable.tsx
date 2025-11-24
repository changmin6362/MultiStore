"use client";

import { useState, useCallback } from "react";
import type { RoleDto } from "@/app/api/.common/types";
import { PermissionsList } from "./PermissionsList";

interface RolesTableProps {
  roles: RoleDto[];
  selectedRoleId?: number | null;
  onSelectRole?: (roleId: number | null) => void;
  onEditRole?: (role: RoleDto) => void;
}

export const RolesTable = ({
  roles,
  selectedRoleId,
  onSelectRole,
  onEditRole
}: RolesTableProps) => {
  const [expandedPermissionsRoleId, setExpandedPermissionsRoleId] = useState<
    number | null
  >(null);

  const togglePermissions = useCallback(
    (roleId: number) => {
      setExpandedPermissionsRoleId(
        expandedPermissionsRoleId === roleId ? null : roleId
      );
    },
    [expandedPermissionsRoleId]
  );

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
      {roles.length === 0 ? (
        <div className="flex items-center justify-center py-12">
          <p className="text-sm text-gray-500">역할이 없습니다</p>
        </div>
      ) : (
        <div className="divide-y divide-gray-200">
          {roles.map((role) => (
            <div key={role.roleId}>
              <div
                onClick={() => onSelectRole?.(role.roleId)}
                className={`w-full cursor-pointer px-4 py-3 text-left transition-colors ${
                  selectedRoleId === role.roleId
                    ? "bg-blue-50 hover:bg-blue-100"
                    : "hover:bg-gray-50"
                }`}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    onSelectRole?.(role.roleId);
                  }
                }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-900">
                      {role.roleName}
                    </p>
                    {role.description && (
                      <p className="mt-1 text-xs text-gray-600">
                        {role.description}
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onEditRole?.(role);
                      }}
                      className="rounded-md bg-blue-100 px-2 py-1 text-xs text-blue-700 transition-colors hover:bg-blue-200"
                    >
                      수정
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePermissions(role.roleId);
                      }}
                      className="rounded-md bg-gray-100 px-2 py-1 text-xs text-gray-700 transition-colors hover:bg-gray-200"
                    >
                      {expandedPermissionsRoleId === role.roleId
                        ? "접기"
                        : "권한보기"}
                    </button>
                  </div>
                </div>
              </div>

              {expandedPermissionsRoleId === role.roleId && (
                <div className="border-t border-gray-100 bg-gray-50 p-4">
                  <PermissionsList roleId={role.roleId} />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
