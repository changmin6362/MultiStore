import Link from "next/link";

import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";

import { ProfileCard } from "@/components/pages/user/profile/ProfileCard";
import { AddressCard } from "@/components/pages/user/profile/AddressCard";
import { PaymentCard } from "@/components/pages/user/profile/PaymentCard";

export default function UserProfile() {
  return (
    <>
      <AuthFormWrapper>
        {/* 프로필 정보 */}
        <ProfileCard />
        {/* 배송지 정보 */}
        <AddressCard />
        {/* 결제 수단 정보 */}
        <PaymentCard />
      </AuthFormWrapper>
      <div className="flex w-full justify-center gap-4">
        <Link href="/merchant/register">
          <p>판매자 등록하러 가기</p>
        </Link>
      </div>
    </>
  );
}
