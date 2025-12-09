import { useState } from "react";
import type { UserProfileData } from "../types";

// 프로필 사진 파일 업로드 및 미리보기 훅
export const useFileUpload = (
  userData: UserProfileData,
  onChange: (data: UserProfileData) => void
) => {
  const [previewUrl, setPreviewUrl] = useState<string>(
    typeof userData.profileImageUrl === "string" ? userData.profileImageUrl : ""
  );

  const handleFileChange = (file: File) => {
    onChange({
      ...userData,
      profileImageUrl: file
    });

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return { previewUrl, handleFileChange };
};
