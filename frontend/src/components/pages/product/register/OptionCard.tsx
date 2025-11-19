import { Button } from "@/components/ui/Button/Button";
import { DataSectionCard } from "@/components/common/DataSectionCard/DataSectionCard";

interface OptionData {
  id: string;
  name: string;
  additionalPrice: number;
}

export const OptionCard = () => {
  // 단일 데이터 객체
  const optionData: OptionData = {
    id: "option-1",
    name: "기본 옵션",
    additionalPrice: 0
  };

  // 객체를 배열 형태로 변환 (DataSectionCard와 호환)
  const data = [
    [optionData.name],
    [{ label: "추가 가격", value: `${optionData.additionalPrice}원` }]
  ];

  return (
    <>
      <div className="flex w-full flex-col gap-4 px-1.5 py-2">
        {/* 옵션 정보 */}
        <DataSectionCard data={data} />
        <DataSectionCard data={data} />
      </div>
      <Button label="옵션 삭제하기" state="Negative" />
    </>
  );
};
