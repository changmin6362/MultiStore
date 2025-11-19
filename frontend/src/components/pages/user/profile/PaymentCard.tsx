import { Button } from "@/components/ui/Button/Button";
import { DataSectionCard } from "@/components/common/DataSectionCard/DataSectionCard";

export const PaymentCard = () => {
  // 샘플 데이터
  const data = [[{ label: "카드 결제:", value: "KB 국민 카드 12**" }]];

  return (
    <>
      <div className="flex w-full flex-col gap-4 px-1.5 py-2">
        {/* 라벨 */}
        <p className="text-xl font-bold">기본 배송지</p>
        {/* 프로필 정보 */}
        <DataSectionCard data={data} />
      </div>
      <Button
        label="결제 수단 관리하기"
        state="Navigation"
        href="/user/payments"
      />
    </>
  );
};
