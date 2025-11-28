import { useState, useEffect, useCallback } from "react";
import type { RoleDto } from "@/app/api/.common/types";

export const useUserRoles = (userId: number) => {
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // 사용자의 현재 역할 조회
  // 사용자의 현재 역할 조회
  const fetchUserRoles = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch(`/api/rbac/users/${userId}/roles`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error("역할 조회 실패");
      }

      // 백엔드/프록시 응답 정규화: 배열을 직접 반환하도록 변경됨
      const rolesArray = Array.isArray(data)
        ? data
        : (data?.data as any[]) || data?.roles || [];
      setRoles(rolesArray);
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다");
    } finally {
      setLoading(false);
    }
  }, [userId]);
  // 역할 할당
  const assignRole = async (roleId: number) => {
    try {
      const response = await fetch(`/api/rbac/users/${userId}/roles`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roleId })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "역할 할당 실패");
      }

      // 역할 목록 새로고침
      await fetchUserRoles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다");
      throw err;
    }
  };

  // 역할 회수
  const removeRole = async (roleId: number) => {
    try {
      const response = await fetch(
        `/api/rbac/users/${userId}/roles/${roleId}`,
        {
          method: "DELETE"
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "역할 회수 실패");
      }

      // 역할 목록 새로고침
      await fetchUserRoles();
    } catch (err) {
      setError(err instanceof Error ? err.message : "오류가 발생했습니다");
      throw err;
    }
  };

  useEffect(() => {
    fetchUserRoles();
  }, [fetchUserRoles]);

  return {
    roles,
    loading,
    error,
    assignRole,
    removeRole,
    refetch: fetchUserRoles
  };
};
