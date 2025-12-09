"use client";

import { Button } from "@/components/ui/Button/Button";
import { DataSectionList } from "./internal/DataSectionList";
import type { UserProfileData } from "./types";
import { EditUserProfileImage } from "./EditUserProfileImage";
import { useEditUserProfile } from "./hooks/useEditUserProfile";
import {
  submitUserProfile,
  deleteUserProfile
} from "./services/userProfileService";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useMemo } from "react";

export const EditUserProfileForm = () => {
  const { profile, loading, exists, isEmpty } = useUserProfile();

  const isRegister = (!loading && !exists) || (!loading && isEmpty);

  // 백엔드 응답을 폼 데이터 형태로 맵핑
  // useMemo로 메모이즈하여 매 렌더마다 참조가 바뀌지 않도록 함
  const mappedInitial: UserProfileData = useMemo(
    () => ({
      firstName: profile?.firstName || "",
      lastName: profile?.lastName || "",
      phone: profile?.phone || "",
      // 백엔드 birthDate(LocalDate)를 문자열로 변환 (이미 문자열일 수 있음)
      // 폼에서는 6자리(YYMMDD)로 입력받기 위해 하이픈 제거 후 앞의 세기를 제거
      birthDate: profile?.birthDate
        ? (() => {
            const digits = String(profile.birthDate).replaceAll("-", "");
            return digits.length === 8 ? digits.slice(2) : ""; // YYMMDD
          })()
        : "",
      gender: ((profile?.gender as "M" | "W") || "M") as "M" | "W",
      profileImageUrl: (profile?.profileImageUrl as string) || ""
    }),
    [
      profile?.firstName,
      profile?.lastName,
      profile?.phone,
      profile?.birthDate,
      profile?.gender,
      profile?.profileImageUrl
    ]
  );

  const { userData, setUserData, isLoading, setIsLoading } =
    useEditUserProfile(mappedInitial);

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

  const handleDelete = async () => {
    if (loading) return;
    const confirmed = window.confirm(
      "프로필을 삭제하시겠습니까?\n이 작업은 되돌릴 수 없습니다."
    );
    if (!confirmed) return;
    setIsLoading(true);
    try {
      await deleteUserProfile();
      window.location.href = "/user/profile";
    } catch (error) {
      console.error("프로필 삭제 에러:", error);
      alert("프로필 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold">
        {isRegister ? "프로필 정보 등록" : "프로필 정보 수정"}
      </div>
      {loading ? null : (
        <EditUserProfileImage userData={userData} onChange={setUserData} />
      )}
      <div className="flex w-full flex-col gap-4 px-1.5 py-2">
        <div className="justify-first flex w-full flex-col items-center gap-6">
          <div className="flex w-full flex-col gap-2">
            {!loading && (
              <DataSectionList data={userData} onChange={setUserData} />
            )}
          </div>
        </div>

        <div className="mt-2 flex w-full items-center justify-between gap-3">
          <div className="ml-auto flex gap-3">
            <Button
              label={isRegister ? "프로필 등록하기" : "프로필 수정하기"}
              state="Submit"
              buttonType="Primary"
              onClick={handleSubmit}
              disabled={isLoading || loading}
            />
            <Button
              label="프로필 삭제하기"
              state="Negative"
              buttonType="Primary"
              onClick={handleDelete}
              disabled={isLoading || loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};
