"use client";

import { useState, useEffect } from "react";
import { useRoleManagement } from "../hooks/useRoleManagement";
import type { RoleDto } from "@/app/api/.common/types";

interface RoleUpdateModalProps {
  isOpen: boolean;
  role: RoleDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const RoleUpdateModal = ({
  isOpen,
  role,
  onClose,
  onSuccess
}: RoleUpdateModalProps) => {
  const { updateRole } = useRoleManagement();
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (role) {
      setRoleName(role.roleName || "");
      setRoleDescription(role.roleDescription || "");
      setError("");
    }
  }, [role]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!role) {
      setError("역할 정보를 로드할 수 없습니다");
      return;
    }

    if (!roleName.trim()) {
      setError("역할 이름은 필수입니다");
      return;
    }

    setIsLoading(true);
    try {
      const success = await updateRole(role.roleId, roleName, roleDescription);
      if (success) {
        onSuccess();
        setRoleName("");
        setRoleDescription("");
      } else {
        setError("역할 수정에 실패했습니다");
      }
    } catch {
      setError("오류가 발생했습니다");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-6 text-lg font-semibold text-gray-900">역할 수정</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              역할 이름 *
            </label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="예: ROLE_ADMIN"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              설명
            </label>
            <textarea
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              placeholder="역할에 대한 설명"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              rows={4}
            />
          </div>

          <div className="flex gap-2 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isLoading ? "저장 중..." : "저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
