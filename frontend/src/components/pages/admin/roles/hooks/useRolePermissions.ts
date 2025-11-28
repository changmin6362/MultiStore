"use client";

import { useState } from "react";
import type {
  PermissionDto,
  PermissionsListResponse
} from "@/app/api/.common/types";
import { fetchBackendApi } from "@/app/api/.common/utils";

interface UseRolePermissionsReturn {
  permissions: PermissionDto[];
  loading: boolean;
  error: string | null;
  fetchRolePermissions: (roleId: number) => Promise<void>;
  assignPermission: (roleId: number, permissionId: number) => Promise<boolean>;
  removePermission: (roleId: number, permissionId: number) => Promise<boolean>;
}

export const useRolePermissions = (): UseRolePermissionsReturn => {
  const [permissions, setPermissions] = useState<PermissionDto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRolePermissions = async (roleId: number) => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchBackendApi<PermissionsListResponse>({
        method: "GET",
        url: `/api/rbac/roles/${roleId}/permissions`
      });

      if (!result.success) {
        throw new Error(result.error.message || result.error.error);
      }

      // result.data는 PermissionsListResponse 객체 { success, data: PermissionDto[] }
      setPermissions(result.data.data);
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "권한 조회 실패";
      setError(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const assignPermission = async (
    roleId: number,
    permissionId: number
  ): Promise<boolean> => {
    try {
      setError(null);
      const result = await fetchBackendApi({
        method: "POST",
        url: `/api/rbac/roles/${roleId}/permissions`,
        body: { permissionId }
      });

      if (!result.success) {
        throw new Error(result.error.message || result.error.error);
      }

      await fetchRolePermissions(roleId);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "권한 할당 실패";
      setError(errorMsg);
      return false;
    }
  };

  const removePermission = async (
    roleId: number,
    permissionId: number
  ): Promise<boolean> => {
    try {
      setError(null);
      const result = await fetchBackendApi({
        method: "DELETE",
        url: `/api/rbac/roles/${roleId}/permissions/${permissionId}`
      });

      if (!result.success) {
        throw new Error(result.error.message || result.error.error);
      }

      await fetchRolePermissions(roleId);
      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "권한 회수 실패";
      setError(errorMsg);
      return false;
    }
  };

  return {
    permissions,
    loading,
    error,
    fetchRolePermissions,
    assignPermission,
    removePermission
  };
};
