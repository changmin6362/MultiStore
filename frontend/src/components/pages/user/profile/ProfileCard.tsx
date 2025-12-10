"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { ImageCard } from "@/components/ui/ImageCard/ImageCard";
import { Input } from "@/components/ui/Input/Input";
import profileImg from "@public/default_profile.jpg";
import { useUserProfile } from "@/hooks/useUserProfile";

interface CurrentUser {
  userId: number;
  emailAddress: string;
  nickName: string;
  createdAt?: string;
  updatedAt?: string;
}

export const ProfileCard = () => {
  const [editing, setEditing] = useState(false);
  const [nickInput, setNickInput] = useState("");
  const {
    profile,
    loading: profileLoading,
    exists: profileExists,
    currentUser: user,
    userLoading: loading,
    userError: error,
    fetchCurrentUser,
    savingUser: saving,
    editNickName
  } = useUserProfile();

  // 프로필 정보가 준비되면 해당 userId로 사용자 정보를 조회 (훅의 fetch 함수 사용)
  useEffect(() => {
    if (profile?.userId) {
      void fetchCurrentUser(profile.userId);
    }
  }, [profile?.userId, fetchCurrentUser]);

  // nickInput 값은 편집 시작/취소 시점에만 동기화합니다.

  const startEdit = () => {
    setNickInput(user?.nickName ?? "");
    setEditing(true);
  };

  const cancelEdit = () => {
    setNickInput(user?.nickName ?? "");
    setEditing(false);
  };

  const onEditNickName = async () => {
    try {
      if (!user) throw new Error("사용자 정보를 불러오는 중입니다");
      const nextNick = nickInput.trim();
      if (!nextNick) {
        alert("닉네임을 입력해주세요");
        return;
      }
      const updated = await editNickName(nextNick);
      if (updated) setEditing(false);
    } catch (e) {
      console.error("[ProfileCard] editNickName error", e);
      alert("닉네임 수정에 실패했습니다. 잠시 후 다시 시도해주세요.");
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-start gap-2.5 overflow-hidden px-1.5 py-2">
        {/* 프로필 사진 */}
        <div className="size-16">
          <ImageCard
            imageSrc={profileImg}
            alt="profile"
            useLabel={false}
            isCircle
          />
        </div>
        {/* 닉네임 */}
        <div className="flex min-w-0 flex-1 items-center gap-2">
          {loading ? (
            <p className="text-gray-500">불러오는 중...</p>
          ) : error ? (
            <p className="truncate text-sm text-red-500">{error}</p>
          ) : editing ? (
            <div className="flex items-center gap-2">
              <Input
                value={nickInput}
                onChange={(e) => setNickInput(e.target.value)}
                hasBorder
              />
              <Button
                label={saving ? "수정 중..." : "수정"}
                state="Submit"
                buttonType="Primary"
                onClick={onEditNickName}
                disabled={saving}
              />
              <Button
                label="취소"
                state="Negative"
                buttonType="Secondary"
                onClick={cancelEdit}
                disabled={saving}
              />
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <p className="truncate text-lg font-bold text-black">
                {user?.nickName ?? "닉네임 없음"}
              </p>

              <div className="flex cursor-pointer gap-1" onClick={startEdit}>
                <p className="text-lg font-bold text-black">닉네임 수정</p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Button
        label={
          !profileLoading && !profileExists
            ? "프로필 정보 등록하기"
            : "프로필 정보 수정하기"
        }
        state="Navigation"
        buttonType="Secondary"
        href="/user/profile/edit"
      />
    </>
  );
};
