import { Button } from "@/components/ui/Button/Button";

export const ProductManagementCard = () => {
  return (
    <>
      <p className="w-full font-semibold text-black">등록된 상품 개수: </p>
      <Button
        label="상품 목록 확인"
        state="Positive"
        href="/store/1234/product/list"
        buttonType="Primary"
      />
      <Button
        label="상품 등록하기"
        state="Submit"
        href="/store/1234/product/register"
        buttonType="Primary"
      />
    </>
  );
};
