"use client";

import { Button } from "@/components/ui/Button/Button";
import { DataSectionList } from "./internal/DataSectionList";
import type { UserProfileData } from "./types";
import { EditUserProfileImage } from "./EditUserProfileImage";
import { useEditUserProfile } from "./hooks/useEditUserProfile";
import { submitUserProfile } from "./services/userProfileService";

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

  const { userData, setUserData, isLoading, setIsLoading } =
    useEditUserProfile(initialData);

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      await submitUserProfile(userData);
      window.location.href = "/user/profile";
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
