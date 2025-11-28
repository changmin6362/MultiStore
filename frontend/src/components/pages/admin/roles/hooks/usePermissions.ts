"use client";

import { useState, useEffect } from "react";
import type {
  PermissionDto,
  PermissionsListResponse
} from "@/app/api/.common/types";
import { fetchBackendApi } from "@/app/api/.common/utils";

interface UsePermissionsReturn {
  permissions: PermissionDto[];
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const usePermissions = (): UsePermissionsReturn => {
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPermissions = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchBackendApi<PermissionsListResponse>({
        method: "GET",
        url: "/api/rbac/permissions"
      });

      if (!result.success) {
        throw new Error(result.error.message || result.error.error);
      }

      // result.data는 PermissionsListResponse 객체 { success, data: PermissionDto[] }
      setPermissions(result.data.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "권한 조회 실패");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  return { permissions, loading, error, refetch: fetchPermissions };
};
