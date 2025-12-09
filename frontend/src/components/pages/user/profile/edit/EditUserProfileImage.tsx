"use client";

import { useRef } from "react";
import { ImageCard } from "@/components/ui/ImageCard/ImageCard";
import type { UserProfileData } from "./types";
import { useFileUpload } from "./hooks/useFileUpload";

import profileImg from "@public/default_profile.jpg";

interface EditUserProfileImageProps {
  userData: UserProfileData;
  onChange: (data: UserProfileData) => void;
}

// 사용자 프로필 이미지 수정 컴포넌트
export const EditUserProfileImage = ({
  userData,
  onChange
}: EditUserProfileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { previewUrl, handleFileChange } = useFileUpload(userData, onChange);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    handleFileChange(file);
  };

  return (
    <div className="flex w-full items-center gap-4 px-1.5 py-2">
      <div className="w-24 cursor-pointer" onClick={handleClick}>
        <ImageCard
          imageSrc={previewUrl == "" ? profileImg : previewUrl}
          alt="profile"
          className="w-full"
          useLabel={false}
          isCircle={true}
        />
      </div>
      <div className="flex cursor-pointer flex-col gap-1" onClick={handleClick}>
        <p className="text-lg font-bold text-black">프로필 사진 수정</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
      />
    </div>
  );
};
