"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button/Button";
import { ImageCard } from "@/components/ui/ImageCard/ImageCard";
import { Input } from "@/components/ui/Input/Input";
import profileImg from "@public/default_profile.jpg";

interface UserData {
  userId: number;
  emailAddress: string;
  nickName: string;
  createdAt?: string;
  updatedAt?: string;
}

export const ProfileCard = () => {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState(false);
  const [nickInput, setNickInput] = useState("");
  const [saving, setSaving] = useState(false);

  const fetchUser = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch("/api/user", { method: "GET" });
      if (!res.ok) {
        throw new Error(`사용자 조회 실패 (${res.status})`);
      }
      const data = (await res.json()) as UserData;
      setUser(data);
      setNickInput(data?.nickName ?? "");
    } catch (e) {
      console.error("[ProfileCard] fetchUser error", e);
      setError(
        e instanceof Error ? e.message : "사용자 정보를 불러오지 못했습니다"
      );
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const startEdit = () => {
    setNickInput(user?.nickName ?? "");
    setEditing(true);
  };

  const cancelEdit = () => {
    setNickInput(user?.nickName ?? "");
    setEditing(false);
  };

  const saveNickName = async () => {
    if (!nickInput || nickInput.trim().length === 0) {
      alert("닉네임을 입력해주세요");
      return;
    }
    setSaving(true);
    try {
      const res = await fetch("/api/user", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickName: nickInput.trim() })
      });
      if (!res.ok) {
        throw new Error(`닉네임 수정 실패 (${res.status})`);
      }
      const updated = (await res.json()) as UserData;
      setUser(updated);
      setEditing(false);
    } catch (e) {
      console.error("[ProfileCard] saveNickName error", e);
      alert("닉네임 수정에 실패했습니다. 잠시 후 다시 시도해주세요.");
    } finally {
      setSaving(false);
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
                label={saving ? "저장 중..." : "저장"}
                state="Submit"
                buttonType="Primary"
                onClick={saveNickName}
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
        label="프로필 정보 수정하기"
        state="Navigation"
        buttonType="Secondary"
        href="/user/profile/edit"
      />
    </>
  );
};
