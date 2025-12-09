import { useEffect, useState } from "react";
import type { UserProfileData } from "../types";

// 사용자 프로필 수정 훅
export const useEditUserProfile = (initialData: UserProfileData) => {
  const [userData, setUserData] = useState<UserProfileData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  // 외부에서 초기 데이터가 갱신되면 상태에 반영
  useEffect(() => {
    setUserData(initialData);
  }, [initialData]);

  return {
    userData,
    setUserData,
    isLoading,
    setIsLoading
  };
};
