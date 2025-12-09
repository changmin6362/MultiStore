"use client";

import { Button } from "@/components/ui/Button/Button";
import { DataSectionList } from "./internal/DataSectionList";
import type { UserProfileData } from "./types";
import { EditUserProfileImage } from "./EditUserProfileImage";
import { useEditUserProfile } from "./hooks/useEditUserProfile";
import {
  submitUserProfile,
  createUserProfile
} from "./services/userProfileService";
import { useUserProfile } from "@/hooks/useUserProfile";
import { useMemo } from "react";

export const EditUserProfileForm = () => {
  const { profile, loading, exists } = useUserProfile();

  // 화면 표시 용도: 프로필 미존재(!exists)일 때만 "등록"으로 표기
  const isCreateView = !loading && !exists;
  // 전송 방식 결정: "등록" 화면에서는 항상 POST 사용
  const isCreate = isCreateView;

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
      // 생성 흐름(등록 화면)에서는 항상 POST 사용
      if (isCreate) {
        await createUserProfile(userData);
      } else {
        await submitUserProfile(userData);
      }
      window.location.href = "/user/profile";
    } catch (error) {
      console.error("에러:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold">
        {isCreateView ? "프로필 정보 등록" : "프로필 정보 수정"}
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
              label={isCreateView ? "프로필 등록하기" : "프로필 수정하기"}
              state="Submit"
              buttonType="Primary"
              onClick={handleSubmit}
              disabled={isLoading || loading}
            />
          </div>
        </div>
      </div>
    </>
  );
};
