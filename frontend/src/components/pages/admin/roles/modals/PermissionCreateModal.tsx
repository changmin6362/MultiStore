"use client";

import { useState } from "react";
import { usePermissionManagement } from "../hooks/usePermissionManagement";

interface PermissionCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export const PermissionCreateModal = ({
  isOpen,
  onClose,
  onSuccess
}: PermissionCreateModalProps) => {
  const { createPermission, loading, error } = usePermissionManagement();
  const [permissionName, setPermissionName] = useState("");
  const [resourceType, setResourceType] = useState("");
  const [actionType, setActionType] = useState("");
  const [permissionDescription, setPermissionDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleClose = () => {
    // 상태 초기화
    setPermissionName("");
    setResourceType("");
    setActionType("");
    setPermissionDescription("");
    setFormError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!permissionName.trim() || !resourceType.trim() || !actionType.trim()) {
      setFormError("필수 필드를 모두 입력하세요");
      return;
    }

    const result = await createPermission(
      permissionName,
      resourceType,
      actionType,
      permissionDescription
    );

    if (result !== null) {
      // 성공 시 모달 닫기 (상태 초기화는 handleClose에서)
      await onSuccess();
      handleClose();
    } else {
      // 실패 시 훅의 error 상태 확인
      setFormError(error || "권한 생성 실패");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-900">권한 생성</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(formError || error) && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {formError || error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              권한 이름 *
            </label>
            <input
              type="text"
              value={permissionName}
              onChange={(e) => setPermissionName(e.target.value)}
              placeholder="예: CREATE_STORE"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              disabled={loading}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              리소스 유형 *
            </label>
            <input
              type="text"
              value={resourceType}
              onChange={(e) => setResourceType(e.target.value)}
              placeholder="예: STORE"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              disabled={loading}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              액션 유형 *
            </label>
            <input
              type="text"
              value={actionType}
              onChange={(e) => setActionType(e.target.value)}
              placeholder="예: CREATE"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              disabled={loading}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              권한 설명
            </label>
            <textarea
              value={permissionDescription}
              onChange={(e) => setPermissionDescription(e.target.value)}
              placeholder="권한 설명을 입력하세요"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              rows={3}
              disabled={loading}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 rounded bg-gray-200 py-2 font-semibold hover:bg-gray-300 disabled:opacity-50"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded bg-blue-600 py-2 font-semibold text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? "생성 중..." : "생성"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
