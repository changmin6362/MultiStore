import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";
import { AddAddressForm } from "@/components/pages/user/addresses/add/AddAddressForm";

export default function UserAddressAdd() {
  return (
    <AuthFormWrapper>
      <div className="mb-4 text-2xl font-bold">주소 정보 등록</div>
      {/* 주소 등록용 정보 입력 Form */}
      <AddAddressForm />
    </AuthFormWrapper>
  );
}
