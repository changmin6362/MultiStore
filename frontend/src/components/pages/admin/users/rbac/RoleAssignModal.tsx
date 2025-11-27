import { useEffect, useMemo, useState } from "react";
import type { RoleDto } from "@/app/api/.common/types";

interface RoleAssignModalProps {
  assignedRoles: RoleDto[];
  onAssign: (roleId: number) => Promise<void>;
  onClose: () => void;
  isOpen: boolean;
}

export const RoleAssignModal = ({
  assignedRoles,
  onAssign,
  onClose,
  isOpen
}: RoleAssignModalProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [availableRoles, setAvailableRoles] = useState<RoleDto[]>([]);
  const [initialLoading, setInitialLoading] = useState(false);

  // 아직 할당되지 않은 역할
  const assignableRoles = useMemo(() => {
    const assignedIds = new Set((assignedRoles || []).map((r) => r.roleId));
    return (availableRoles || []).filter((r) => !assignedIds.has(r.roleId));
  }, [availableRoles, assignedRoles]);

  // 모달이 열릴 때 실제 역할 목록을 백엔드에서 조회
  useEffect(() => {
    if (!isOpen) return;

    const fetchRoles = async () => {
      try {
        setInitialLoading(true);
        setError(null);
        const base =
          process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8080";
        const res = await fetch(`${base}/api/rbac/roles`, {
          cache: "no-store"
        });
        if (!res.ok) {
          const text = await res.text();
          // 로컬에서 throw 후 곧바로 catch 되는 패턴을 제거하고, 상태로 처리
          setError(`역할 조회 실패 (${res.status}): ${text}`);
          setAvailableRoles([]);
          return; // 초기 로딩 종료는 finally에서 처리
        }
        const data = await res.json();
        // 새 응답 형식: { success: true, data: [{ roleId, roleName, ... }] }
        const roles: RoleDto[] = (data?.data || []).map(
          (r: {
            roleId: number;
            roleName: string;
            roleDescription?: string;
            description?: string;
          }) => ({
            roleId: Number(r.roleId),
            roleName: String(r.roleName),
            // UI와 공통 타입(RoleDto)의 스키마에 맞게 roleDescription으로 매핑
            roleDescription: r.roleDescription ?? r.description ?? ""
          })
        );
        setAvailableRoles(roles);
      } catch (e: Error | unknown) {
        const errorMessage =
          e instanceof Error ? e.message : "역할 목록을 가져오지 못했습니다";
        setError(errorMessage);
      } finally {
        setInitialLoading(false);
      }
    };

    // 반환된 프로미스를 명시적으로 무시하여 린트 경고 해소
    void fetchRoles();
  }, [isOpen]);

  const handleAssign = async (roleId: number) => {
    try {
      setLoading(true);
      setError(null);
      await onAssign(roleId);
      // 성공 시 자동으로 닫지 않음 (사용자가 추가로 할당할 수 있도록)
    } catch (err) {
      setError(err instanceof Error ? err.message : "역할 할당 실패");
    } finally {
      setLoading(false);
    }
  };

  // 모달이 닫혀 있으면 아무것도 렌더링하지 않음
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">역할 할당</h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        {initialLoading ? (
          <p className="text-gray-500">역할을 불러오는 중…</p>
        ) : assignableRoles.length === 0 ? (
          <p className="text-gray-500">할당 가능한 역할이 없습니다.</p>
        ) : (
          <div className="space-y-2">
            {assignableRoles.map((role) => (
              <button
                key={role.roleId}
                onClick={() => handleAssign(role.roleId)}
                disabled={loading}
                className="w-full rounded-lg border border-gray-200 p-3 text-left hover:bg-gray-50 disabled:opacity-50"
              >
                <div className="font-semibold">{role.roleName}</div>
                {role.roleDescription && (
                  <div className="text-sm text-gray-500">
                    {role.roleDescription}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-lg bg-gray-200 py-2 font-semibold hover:bg-gray-300"
        >
          닫기
        </button>
      </div>
    </div>
  );
};
