import { Button } from "@/components/ui/Button/Button";

export const MerchantActionSection = () => {
  return (
    <div className="flex w-full gap-7">
      <Button
        label="내 스토어"
        state="Navigation"
        href="/store/1234"
        buttonType="Secondary"
      />
      <Button
        label="상품 관리"
        state="Navigation"
        href="/store/1234/product"
        buttonType="Secondary"
      />
    </div>
  );
};
