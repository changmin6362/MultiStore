import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";

import { ProfileCard } from "@/components/pages/user/profile/ProfileCard";
import { AddressCard } from "@/components/pages/user/profile/AddressCard";
import { PaymentCard } from "@/components/pages/user/profile/PaymentCard";
import { MerchantActionSection } from "@/components/pages/user/profile/MerchantActionSection";

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
        <MerchantActionSection />
      </AuthFormWrapper>
    </>
  );
}
