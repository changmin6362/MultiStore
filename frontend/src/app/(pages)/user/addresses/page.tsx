import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";

import { AddressCard } from "@/components/pages/user/addresses/AddressCard";
import { Button } from "@/components/ui/Button/Button";

export default function UserAddress() {
  return (
    <>
      <AuthFormWrapper>
        {/* 기본 배송지 정보 */}
        <AddressCard />
        {/* 기본 배송지 등록 버튼 */}
        {/* 다른 배송지 정보 */}
        <AddressCard />
        <Button
          label="배송지 추가하기"
          state="Submit"
          href="/user/addresses/add"
        />
      </AuthFormWrapper>
    </>
  );
}
