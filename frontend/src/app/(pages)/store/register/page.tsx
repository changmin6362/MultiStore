import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";
import { RegisterStoreForm } from "@/components/pages/store/register/RegisterStoreForm";

export default function StoreRegister() {
  return (
    <AuthFormWrapper>
      <div className="mb-4 text-2xl font-bold">스토어 정보 등록</div>
      {/* 스토어 등록용 정보 입력 Form */}
      <RegisterStoreForm />
    </AuthFormWrapper>
  );
}
