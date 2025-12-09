"use client";

import { useState, useEffect } from "react";
import type { UserProfileResponse } from "@/app/api/.common/types";

interface UseUserProfileReturn {
  profile: UserProfileResponse | null;
  loading: boolean;
  error: string | null;
  isEmpty: boolean; // 프로필이 소프트삭제 상태인지 판단
  exists: boolean; // 프로필이 존재하는지 판단
  refetch: () => Promise<void>;
}

/**
 * 사용자 프로필 조회 훅
 *
 * 프로필 상태:
 * 1. exists=true, isEmpty=false: 정상 프로필 데이터 존재
 * 2. exists=true, isEmpty=true: 소프트삭제된 프로필 (초기값만 있음)
 * 3. exists=false: 프로필이 존재하지 않음 (생성 필요)
 * 4. error: 조회 중 에러 발생
 */
export const useUserProfile = (): UseUserProfileReturn => {
  const [profile, setProfile] = useState<UserProfileResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  /**
   * 프로필이 소프트삭제된 상태인지 판단
   * 초기값(null, 빈 문자열, 기본값)만 있으면 소프트삭제된 것으로 간주
   */
  const checkIsEmpty = (profile: UserProfileResponse): boolean => {
    if (!profile) return true;

    const hasValidData =
      (profile.phone && profile.phone !== "0000000000") ||
      (profile.firstName && profile.firstName !== "") ||
      (profile.lastName && profile.lastName !== "");

    return !hasValidData;
  };

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
    isEmpty: profile ? checkIsEmpty(profile) : false,
    exists: profile !== null,
    refetch: fetchUserProfile
  };
};
