import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";
import { EditUserProfileForm } from "@/components/pages/user/profile/edit/EditUserProfileForm";

export default function UserProfile() {
  return (
    <AuthFormWrapper>
      <div className="mb-4 text-2xl font-bold">프로필 정보 수정</div>
      {/* 프로필 사진 및 정보 수정 Form */}
      <EditUserProfileForm />
    </AuthFormWrapper>
  );
}
