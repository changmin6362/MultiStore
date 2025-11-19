import { useState } from "react";
import type { UserProfileData } from "../types";

// 사용자 프로필 수정 훅
export const useEditUserProfile = (initialData: UserProfileData) => {
  const [userData, setUserData] = useState<UserProfileData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  return {
    userData,
    setUserData,
    isLoading,
    setIsLoading
  };
};
