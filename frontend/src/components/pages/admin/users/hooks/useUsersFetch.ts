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

        // 백엔드 응답 구조: { success: true, users: [...] }
        const userList = data.users || [];
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
