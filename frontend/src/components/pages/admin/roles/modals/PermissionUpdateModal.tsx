"use client";

import { useState, useEffect } from "react";
import { usePermissionManagement } from "../hooks/usePermissionManagement";
import type { PermissionDto } from "@/app/api/.common/types";

interface PermissionUpdateModalProps {
  isOpen: boolean;
  permission: PermissionDto | null;
  onClose: () => void;
  onSuccess: () => void;
}

export const PermissionUpdateModal = ({
  isOpen,
  permission,
  onClose,
  onSuccess
}: PermissionUpdateModalProps) => {
  const { updatePermission } = usePermissionManagement();
  const [permissionName, setPermissionName] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [actionType, setActionType] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (permission) {
      setPermissionName(permission.permissionName || "");
      setResourceType(permission.resourceType || "");
      setActionType(permission.actionType || "");
      setDescription(permission.permissionDescription || "");
      setError("");
    }
  }, [permission]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!permission) {
      setError("권한 정보를 로드할 수 없습니다");
      return;
    }

    if (!permissionName.trim() || !resourceType.trim() || !actionType.trim()) {
      setError("권한 이름, 리소스 유형, 액션 유형은 필수입니다");
      return;
    }

    setIsLoading(true);
    try {
      const success = await updatePermission(
        permission.permissionId,
        permissionName,
        resourceType,
        actionType,
        description
      );
      if (success) {
        onSuccess();
        setPermissionName("");
        setResourceType("");
        setActionType("");
        setDescription("");
      } else {
        setError("권한 수정에 실패했습니다");
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
        <h2 className="mb-6 text-lg font-semibold text-gray-900">권한 수정</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-md bg-red-50 p-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700">
              권한 이름 *
            </label>
            <input
              type="text"
              value={permissionName}
              onChange={(e) => setPermissionName(e.target.value)}
              placeholder="예: VIEW_USERS"
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                리소스 유형 *
              </label>
              <input
                type="text"
                value={resourceType}
                onChange={(e) => setResourceType(e.target.value)}
                placeholder="예: USER"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                액션 유형 *
              </label>
              <input
                type="text"
                value={actionType}
                onChange={(e) => setActionType(e.target.value)}
                placeholder="예: READ"
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              설명
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="권한에 대한 설명"
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
