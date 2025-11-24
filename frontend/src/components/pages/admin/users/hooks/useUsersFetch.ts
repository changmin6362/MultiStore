import { useState, useEffect } from "react";
import type { UserResponse, RawUser } from "../types";
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
        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "사용자 목록 조회 실패");
        }

        // 백엔드가 배열로 직접 반환하는 경우와 { data: [] }로 반환하는 경우 모두 처리
        const userList = Array.isArray(data)
          ? data
          : (data.data as RawUser[]) || [];
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
