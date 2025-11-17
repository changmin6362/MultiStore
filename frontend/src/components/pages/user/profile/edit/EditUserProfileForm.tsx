"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { DataSectionList } from "./internal/DataSectionList";
import type { UserProfileData } from "./types";
import { EditUserProfileImage } from "./EditUserProfileImage";

export const EditUserProfileForm = () => {
  const initialData: UserProfileData = {
    nickname: "김철수",
    password: "password",
    lastName: "김",
    firstName: "철수",
    phone: "01012345678",
    birthDate: "19900101",
    gender: "M",
    profileUrl: "https://via.placeholder.com/150"
  };

  const [userData, setUserData] = useState<UserProfileData>(initialData);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const formData = new FormData();

      // userData에서 profileUrl 추출
      const { profileUrl, ...dataToSend } = userData;

      // userData 전체를 JSON으로 전송 (profileUrl은 string만 포함)
      formData.append(
        "data",
        JSON.stringify({
          ...dataToSend,
          profileUrl: typeof profileUrl === "string" ? profileUrl : ""
        })
      );

      // profileUrl이 File이면 profile 필드로 전송
      if (profileUrl instanceof File) {
        formData.append("profile", profileUrl);
      }

      const response = await fetch("/api/user/profile", {
        method: "PUT",
        body: formData
      });

      if (response.ok) {
        window.location.href = "/user/profile";
      } else {
        console.error("프로필 수정 실패");
      }
    } catch (error) {
      console.error("에러:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <EditUserProfileImage userData={userData} onChange={setUserData} />
      <div className="flex w-full flex-col gap-4 px-1.5 py-2">
        <div className="justify-first flex w-full flex-col items-center gap-6">
          <div className="flex w-full flex-col gap-2">
            <DataSectionList data={userData} onChange={setUserData} />
          </div>
        </div>

        <Button
          label="수정 완료하기"
          state="Submit"
          buttonType="Primary"
          onClick={handleSubmit}
          disabled={isLoading}
        />
      </div>
    </>
  );
};
