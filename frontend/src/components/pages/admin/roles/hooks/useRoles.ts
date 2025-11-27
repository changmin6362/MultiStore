"use client";

import { useState, useEffect } from "react";
import type { RoleDto, RolesResponse } from "@/app/api/.common/types";
import { fetchBackendApi } from "@/app/api/.common/utils";

interface UseRolesReturn {
  roles: RoleDto[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useRoles = (): UseRolesReturn => {
  const [roles, setRoles] = useState<RoleDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchRoles = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchBackendApi<RolesResponse>({
        method: "GET",
        url: "/api/rbac/roles"
      });

      if (!result.success) {
        throw new Error(result.error.message || result.error.error);
      }

      // result.data는 백엔드 응답 { success: true, data: RoleDto[] }
      // 따라서 (result.data as RolesResponse).data에 실제 배열이 있음
      const rolesData = (result.data as RolesResponse).data || [];
      setRoles(Array.isArray(rolesData) ? rolesData : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "역할 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  return { roles, loading, error, refetch: fetchRoles };
};
