"use client";

import { useState, useEffect, useCallback } from "react";
import type { UserProfileResponse } from "@/app/api/.common/types";

interface CurrentUser {
  userId: number;
  emailAddress: string;
  nickName: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UseUserProfileReturn {
  profile: UserProfileResponse | null;
  loading: boolean;
  error: string | null;
  exists: boolean; // 프로필이 존재하는지 판단
  refetch: () => Promise<void>;
  // 현재 로그인 사용자 단건 조회/수정 유틸 (중복 fetch를 컴포넌트에서 선언하지 않기 위함)
  currentUser: CurrentUser | null;
  userLoading: boolean;
  userError: string | null;
  fetchCurrentUser: (userIdOverride?: number) => Promise<void>;
  savingUser: boolean;
  editNickName: (nextNick: string) => Promise<CurrentUser | null>;
}

/**
 * 사용자 프로필 조회 훅
 *
 * 프로필 상태:
 * 1. exists=true: 정상 프로필 데이터 존재
 * 2. exists=false: 프로필이 존재하지 않음 (생성 필요)
 * 3. error: 조회 중 에러 발생
 */
export const useUserProfile = (): UseUserProfileReturn => {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 현재 사용자(UserController 기반) 상태
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [userLoading, setUserLoading] = useState<boolean>(false);
  const [userError, setUserError] = useState<string | null>(null);
  const [savingUser, setSavingUser] = useState<boolean>(false);

  /**
   * 프로필 조회
   */
  const fetchUserProfile = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/user-profile", {
        method: "GET"
      });

      if (!response.ok) {
        // 404 또는 프로필이 없는 경우
        if (response.status === 404) {
          setProfile(null);
          setError(null);
          setLoading(false);
          return;
        }

        // 다른 에러 처리
        let errorMessage = `프로필 조회 실패 (${response.status})`;
        try {
          const errorData = (await response.json()) as { error?: string };
          if (errorData.error) {
            errorMessage = errorData.error;
          }
        } catch {
          // JSON 파싱 실패 시 기본 메시지 사용
        }

        throw new Error(errorMessage);
      }

      const data = (await response.json()) as UserProfileResponse | null;
      setProfile(data);
      setError(null);
    } catch (err) {
      console.error("[useUserProfile] Error:", err);
      setError(err instanceof Error ? err.message : "프로필 조회 중 오류 발생");
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  // 현재 사용자 단건 조회 (UserController)
  const fetchCurrentUser = useCallback(
    async (userIdOverride?: number) => {
      const targetUserId = userIdOverride ?? profile?.userId;
      if (!targetUserId) {
        setCurrentUser(null);
        return;
      }
      try {
        setUserLoading(true);
        setUserError(null);
        const res = await fetch(`/api/user/${targetUserId}`, { method: "GET" });
        if (!res.ok) {
          throw new Error(`사용자 조회 실패 (${res.status})`);
        }
        const wrapped = (await res.json()) as
          | { success?: boolean; data?: CurrentUser }
          | CurrentUser;
        // 서버 라우트가 ApiResponse를 그대로 전달하는 경우와, 언랩하여 반환하는 경우 모두 지원
        const data = (
          wrapped && typeof wrapped === "object" && "data" in wrapped
            ? (wrapped as { data?: CurrentUser }).data
            : (wrapped as CurrentUser)
        ) as CurrentUser | null;
        setCurrentUser(data ?? null);
      } catch (err) {
        setUserError(
          err instanceof Error
            ? err.message
            : "사용자 정보를 불러오지 못했습니다"
        );
        setCurrentUser(null);
      } finally {
        setUserLoading(false);
      }
    },
    [profile?.userId]
  );

  // 닉네임 수정 (이메일 동봉 필요)
  const editNickName = useCallback(
    async (nextNick: string) => {
      if (!currentUser?.userId) return null;
      const nick = nextNick.trim();
      if (!nick) return null;
      try {
        setSavingUser(true);
        const res = await fetch(`/api/user/${currentUser.userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            emailAddress: currentUser.emailAddress,
            nickName: nick
          })
        });
        if (!res.ok) {
          throw new Error(`닉네임 수정 실패 (${res.status})`);
        }
        const wrapped = (await res.json()) as
          | { success?: boolean; data?: CurrentUser }
          | CurrentUser;
        const data = (
          wrapped && typeof wrapped === "object" && "data" in wrapped
            ? (wrapped as { data?: CurrentUser }).data
            : (wrapped as CurrentUser)
        ) as CurrentUser | null;
        if (data) setCurrentUser(data);
        return data ?? null;
      } finally {
        setSavingUser(false);
      }
    },
    [currentUser?.userId, currentUser?.emailAddress]
  );

  return {
    profile,
    loading,
    error,
    exists: profile !== null,
    refetch: fetchUserProfile,
    currentUser,
    userLoading,
    userError,
    fetchCurrentUser,
    savingUser,
    editNickName
  };
};
