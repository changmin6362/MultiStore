"use client";

import { useState } from "react";
import type { RoleDto, RoleResponse } from "@/app/api/.common/types";
import { fetchBackendApi } from "@/app/api/.common/utils";

interface UseRoleManagementReturn {
  loading: boolean;
  error: string | null;
  createRole: (
    roleName: string,
    roleDescription?: string
  ) => Promise<RoleDto | null>;
  updateRole: (
    roleId: number,
    roleName: string,
    roleDescription?: string
  ) => Promise<boolean>;
  deleteRole: (roleId: number) => Promise<boolean>;
}

export const useRoleManagement = (): UseRoleManagementReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createRole = async (
    roleName: string,
    roleDescription?: string
  ): Promise<RoleDto | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchBackendApi<RoleResponse>({
        method: "POST",
        url: "/api/rbac/roles",
        body: {
          roleName,
          roleDescription: roleDescription || ""
        }
      });

      if (!result.success) {
        throw new Error(result.error.message || result.error.error);
      }

      return result.data.role || null;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "역할 생성 실패";
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateRole = async (
    roleId: number,
    roleName: string,
    roleDescription?: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchBackendApi<RoleResponse>({
        method: "PUT",
        url: `/api/rbac/roles/${roleId}`,
        body: { roleName, roleDescription: roleDescription || "" }
      });

      if (!result.success) {
        throw new Error(result.error.message || result.error.error);
      }

      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "역할 수정 실패";
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteRole = async (roleId: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchBackendApi({
        method: "DELETE",
        url: `/api/rbac/roles/${roleId}`
      });

      if (!result.success) {
        throw new Error(result.error.message || result.error.error);
      }

      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "역할 삭제 실패";
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createRole,
    updateRole,
    deleteRole
  };
};
