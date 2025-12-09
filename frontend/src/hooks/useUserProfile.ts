"use client";

import { useState, useEffect } from "react";
import type { UserProfileResponse } from "@/app/api/.common/types";

interface UseUserProfileReturn {
  profile: UserProfileResponse | null;
  loading: boolean;
  error: string | null;
  exists: boolean; // 프로필이 존재하는지 판단
  refetch: () => Promise<void>;
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

  return {
    profile,
    loading,
    error,
    exists: profile !== null,
    refetch: fetchUserProfile
  };
};
