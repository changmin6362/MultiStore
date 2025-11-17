"use client";

import { useRef, useState } from "react";
import { ImageCard } from "@/components/ui/ImageCard/ImageCard";
import type { UserProfileData } from "./types";

interface EditUserProfileImageProps {
  userData: UserProfileData;
  onChange: (data: UserProfileData) => void;
}

export const EditUserProfileImage = ({
  userData,
  onChange
}: EditUserProfileImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string>(
    typeof userData.profileUrl === "string" ? userData.profileUrl : ""
  );

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // userData의 profileUrl을 File 객체로 업데이트
    onChange({
      ...userData,
      profileUrl: file
    });

    // 미리보기 업데이트
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex w-full items-center gap-4 px-1.5 py-2">
      <div className="w-24 cursor-pointer" onClick={handleClick}>
        <ImageCard
          imageSrc={previewUrl}
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
        onChange={handleFileChange}
        className="hidden"
      />
    </div>
  );
};
