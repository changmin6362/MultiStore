"use client";

import { useState } from "react";
import type { UserResponse } from "../types";
import { useUserRoles, UserRolesDisplay } from "../rbac";

interface UserRowProps {
  user: UserResponse;
}

export const UserRow = ({ user }: UserRowProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { roles, loading, assignRole, removeRole } = useUserRoles(user.userId);

  return (
    <>
      <tr className="hover:bg-gray-50">
        <td className="px-6 py-4 text-sm">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-blue-500 hover:text-blue-700"
          >
            {isExpanded ? "▼" : "▶"}
          </button>
        </td>
        <td className="px-6 py-4 text-sm text-gray-900">{user.userId}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{user.emailAddress}</td>
        <td className="px-6 py-4 text-sm text-gray-900">{user.nickName}</td>
        <td className="px-6 py-4 text-sm text-gray-500">
          {new Date(user.createdAt).toLocaleDateString("ko-KR")}
        </td>
        <td className="px-6 py-4 text-sm text-gray-500">
          {new Date(user.updatedAt).toLocaleDateString("ko-KR")}
        </td>
        <td className="px-6 py-4 text-sm">
          {user.deletedAt ? (
            <span className="rounded-full bg-red-100 px-3 py-1 text-red-700">
              삭제됨
            </span>
          ) : (
            <span className="rounded-full bg-green-100 px-3 py-1 text-green-700">
              활성
            </span>
          )}
        </td>
      </tr>
      {isExpanded && (
        <tr className="bg-gray-50">
          <td colSpan={7} className="px-6 py-4">
            <UserRolesDisplay
              roles={roles}
              onAssign={assignRole}
              onRemove={removeRole}
              loading={loading}
            />
          </td>
        </tr>
      )}
    </>
  );
};
