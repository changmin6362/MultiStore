import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";
import { RegisterMerchantForm } from "@/components/pages/merchant/register/RegisterMerchantForm";

export default function MerchantRegister() {
  return (
    <AuthFormWrapper>
      <div className="mb-4 text-2xl font-bold">판매자 정보 등록</div>
      {/* 판매자 등록용 정보 입력 Form */}
      <RegisterMerchantForm />
    </AuthFormWrapper>
  );
}
