import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";
import { EditAddressForm } from "@/components/pages/user/addresses/edit/EditAddressForm";

export default function UserAddressEdit() {
  return (
    <AuthFormWrapper>
      <div className="mb-4 text-2xl font-bold">주소 정보 수정</div>
      {/* 주소 수정용 정보 입력 Form */}
      <EditAddressForm />
    </AuthFormWrapper>
  );
}
