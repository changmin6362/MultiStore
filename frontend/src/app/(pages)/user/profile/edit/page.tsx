import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";
import { EditUserProfileForm } from "@/components/pages/user/profile/edit/EditUserProfileForm";

export default function UserProfile() {
  return (
    <AuthFormWrapper>
      {/* 프로필 사진 및 정보 수정 Form */}
      <EditUserProfileForm />
    </AuthFormWrapper>
  );
}
