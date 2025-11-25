"use client";

import { useState } from "react";
import type {
  PermissionDto,
  PermissionResponse
} from "@/app/api/.common/types";
import { fetchBackendApi } from "@/app/api/.common/utils";

interface UsePermissionManagementReturn {
  loading: boolean;
  error: string | null;
  createPermission: (
    permissionName: string,
    resourceType: string,
    actionType: string,
    permissionDescription?: string
  ) => Promise<PermissionDto | null>;
  updatePermission: (
    permissionId: number,
    permissionName: string,
    resourceType: string,
    actionType: string,
    permissionDescription?: string
  ) => Promise<boolean>;
  deletePermission: (permissionId: number) => Promise<boolean>;
}

export const usePermissionManagement = (): UsePermissionManagementReturn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createPermission = async (
    permissionName: string,
    resourceType: string,
    actionType: string,
    permissionDescription?: string
  ): Promise<PermissionDto | null> => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchBackendApi<PermissionResponse>({
        method: "POST",
        url: "/api/rbac/permissions",
        body: {
          permissionName,
          resourceType,
          actionType,
          permissionDescription: permissionDescription || ""
        }
      });

      if (!result.success) {
        throw new Error(result.error.message || result.error.error);
      }

      return result.data.permission || null;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "권한 생성 실패";
      setError(errorMsg);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updatePermission = async (
    permissionId: number,
    permissionName: string,
    resourceType: string,
    actionType: string,
    permissionDescription?: string
  ): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchBackendApi<PermissionResponse>({
        method: "PUT",
        url: `/api/rbac/permissions/${permissionId}`,
        body: {
          permissionName,
          resourceType,
          actionType,
          permissionDescription: permissionDescription || ""
        }
      });

      if (!result.success) {
        throw new Error(result.error.message || result.error.error);
      }

      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "권한 수정 실패";
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deletePermission = async (permissionId: number): Promise<boolean> => {
    try {
      setLoading(true);
      setError(null);
      const result = await fetchBackendApi({
        method: "DELETE",
        url: `/api/rbac/permissions/${permissionId}`
      });

      if (!result.success) {
        throw new Error(result.error.message || result.error.error);
      }

      return true;
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : "권한 삭제 실패";
      setError(errorMsg);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    createPermission,
    updatePermission,
    deletePermission
  };
};
