import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";
import { CardRegistrationForm } from "@/components/pages/user/payments/add/CardRegisterationForm";

export default function UserPaymentAdd() {
  return (
    <>
      <AuthFormWrapper>
        <CardRegistrationForm />
      </AuthFormWrapper>
    </>
  );
}
