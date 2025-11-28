import { useState, useEffect } from "react";
import type { UserResponse, UsersApiResponse } from "../types";
import { convertUser } from "../utils";

export const useUsersFetch = () => {
  const [users, setUsers] = useState<UserResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch("/api/user");
        const data: UsersApiResponse = await response.json();

        if (!response.ok) {
          throw new Error("사용자 목록 조회 실패");
        }

        // 백엔드 응답 구조 변경 대응
        // 이전: { success: true, users: [...] }
        // 현재: { success: true, data: [...] }
        const anyData: any = data as any;
        const userList = (anyData.data as any[]) || anyData.users || [];
        const convertedUsers = userList.map(convertUser);

        setUsers(convertedUsers);
      } catch (err) {
        setError(err instanceof Error ? err.message : "오류가 발생했습니다");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return { users, loading, error };
};
