"use client";

import { useState } from "react";
import { useRoleManagement } from "../hooks/useRoleManagement";

interface RoleCreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => Promise<void>;
}

export const RoleCreateModal = ({
  isOpen,
  onClose,
  onSuccess
}: RoleCreateModalProps) => {
  const { createRole, loading, error } = useRoleManagement();
  const [roleName, setRoleName] = useState("");
  const [roleDescription, setRoleDescription] = useState("");
  const [formError, setFormError] = useState<string | null>(null);

  const handleClose = () => {
    // 상태 초기화
    setRoleName("");
    setRoleDescription("");
    setFormError(null);
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!roleName.trim()) {
      setFormError("역할 이름은 필수입니다");
      return;
    }

    const result = await createRole(roleName, roleDescription);
    if (result) {
      // 성공 시 모달 닫기 (상태 초기화는 handleClose에서)
      await onSuccess();
      handleClose();
    } else {
      setFormError(error || "역할 생성 실패");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-900">역할 생성</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {(formError || error) && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
              {formError || error}
            </div>
          )}

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              역할 이름 *
            </label>
            <input
              type="text"
              value={roleName}
              onChange={(e) => setRoleName(e.target.value)}
              placeholder="예: ROLE_ADMIN"
              className="w-full rounded border border-gray-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
              disabled={loading}
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              역할 설명
            </label>
            <textarea
              value={roleDescription}
              onChange={(e) => setRoleDescription(e.target.value)}
              placeholder="역할 설명을 입력하세요"
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
