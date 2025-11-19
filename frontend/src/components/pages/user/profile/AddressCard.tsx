import { Button } from "@/components/ui/Button/Button";
import { DataSectionCard } from "@/components/common/DataSectionCard/DataSectionCard";

export const AddressCard = () => {
  // 샘플 데이터
  const data = [
    ["서울시 강남구 테헤란로 123"],
    [
      { label: "수령인:", value: "김철수" },
      { label: "연락처:", value: "010-1234-5678" }
    ]
  ];

  return (
    <>
      <div className="flex w-full flex-col gap-4 px-1.5 py-2">
        {/* 라벨 */}
        <p className="text-xl font-bold">기본 배송지</p>
        {/* 프로필 정보 */}
        <DataSectionCard data={data} />
      </div>
      <Button
        label="배송지 관리하기"
        state="Navigation"
        buttonType="Secondary"
        href="/user/addresses"
      />
    </>
  );
};
