"use client";

import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";
import { ProfileCard } from "@/components/pages/user/profile/ProfileCard";
import { AddressCard } from "@/components/pages/user/profile/AddressCard";
import { PaymentCard } from "@/components/pages/user/profile/PaymentCard";
import { MerchantActionSection } from "@/components/pages/user/profile/MerchantActionSection";
import { useUserProfile } from "@/hooks/useUserProfile";

export default function UserProfile() {
  const { loading, error, isEmpty, exists } = useUserProfile();

  // 로딩 중
  if (loading) {
    return (
      <AuthFormWrapper>
        <div className="flex items-center justify-center py-12">
          <p className="text-gray-500">프로필 정보를 불러오는 중...</p>
        </div>
      </AuthFormWrapper>
    );
  }

  // 에러 발생
  if (error) {
    return (
      <AuthFormWrapper>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="font-semibold text-red-500">{error}</p>
            <p className="mt-2 text-sm text-gray-500">
              프로필 조회 중 문제가 발생했습니다
            </p>
          </div>
        </div>
      </AuthFormWrapper>
    );
  }

  // 프로필이 존재하지 않는 경우 (생성 필요)
  if (!exists) {
    return (
      <AuthFormWrapper>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="mb-4 font-semibold text-gray-700">
              프로필이 없습니다
            </p>
            <p className="mb-6 text-sm text-gray-500">
              프로필을 생성하여 정보를 입력해주세요
            </p>
            <a
              href="/user/profile/edit"
              className="inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              프로필 생성하기
            </a>
          </div>
        </div>
      </AuthFormWrapper>
    );
  }

  // 프로필이 소프트삭제된 경우 (초기값만 있음)
  if (isEmpty) {
    return (
      <AuthFormWrapper>
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <p className="mb-4 font-semibold text-gray-700">
              프로필 정보가 비어있습니다
            </p>
            <p className="mb-6 text-sm text-gray-500">
              프로필 정보를 입력하여 완성해주세요
            </p>
            <a
              href="/user/profile/edit"
              className="inline-block rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              프로필 작성하기
            </a>
          </div>
        </div>
      </AuthFormWrapper>
    );
  }

  // 정상적인 프로필이 존재하는 경우
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
