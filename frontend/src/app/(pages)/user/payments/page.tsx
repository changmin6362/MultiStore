import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";

import { AddressCard } from "@/components/pages/user/payments/AddressCard";
import { Button } from "@/components/ui/Button/Button";

export default function UserPayment() {
  return (
    <>
      <AuthFormWrapper>
        {/* 기본 결제 수단 정보 */}
        <AddressCard />
        {/* 기본 결제 수단 등록 버튼 */}
        {/* 다른 결제 수단 정보 */}
        <AddressCard />
        <Button
          label="결제 수단 추가하기"
          state="Submit"
          href="/user/payments/add"
        />
      </AuthFormWrapper>
    </>
  );
}
