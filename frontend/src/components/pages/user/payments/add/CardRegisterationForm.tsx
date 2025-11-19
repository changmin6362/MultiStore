import { Button } from "@/components/ui/Button/Button";
import { Input } from "@/components/ui/Input/Input";

export const CardRegistrationForm = () => {
  return (
    <>
      <div className="mb-4 text-2xl font-bold">카드 등록</div>
      {/* 카드사명 입력 */}
      <Input placeholder="카드사명" />
      {/* 카드번호 입력 */}
      <div className="flex w-full gap-6">
        <Input />
        <Input />
        <Input />
        <Input />
      </div>
      {/* 유효기간 및 CVC 입력 */}
      <div className="flex w-full gap-6">
        <Input placeholder="유효기간(MM/YY)" />
        <Input placeholder="CVC" />
      </div>
      {/* 카드 등록 버튼 */}
      <Button label="카드 등록하기" state="Submit" />
    </>
  );
};
