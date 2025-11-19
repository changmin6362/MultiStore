import type { UserProfileData } from "../types";

// 사용자 프로필 수정 요청 서비스
export const submitUserProfile = async (userData: UserProfileData) => {
  const formData = new FormData();

  const { profileUrl, ...dataToSend } = userData;

  formData.append(
    "data",
    JSON.stringify({
      ...dataToSend,
      profileUrl: typeof profileUrl === "string" ? profileUrl : ""
    })
  );

  if (profileUrl instanceof File) {
    formData.append("profile", profileUrl);
  }

  const response = await fetch("/api/user/profile", {
    method: "PUT",
    body: formData
  });

  if (!response.ok) {
    throw new Error("프로필 수정 실패");
  }

  return response.json();
};
