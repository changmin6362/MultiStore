import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";
import { RegisterProductForm } from "@/components/pages/product/register/RegisterProductForm";

export default function ProductRegister() {
  return (
    <AuthFormWrapper>
      <RegisterProductForm />
    </AuthFormWrapper>
  );
}
