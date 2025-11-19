import { useState } from "react";
import type { UserProfileData } from "../types";

// 프로필 사진 파일 업로드 및 미리보기 훅
export const useFileUpload = (
  userData: UserProfileData,
  onChange: (data: UserProfileData) => void
) => {
  const [previewUrl, setPreviewUrl] = useState<string>(
    typeof userData.profileUrl === "string" ? userData.profileUrl : ""
  );

  const handleFileChange = (file: File) => {
    onChange({
      ...userData,
      profileUrl: file
    });

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return { previewUrl, handleFileChange };
};
