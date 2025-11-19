import { Button } from "@/components/ui/Button/Button";
import { ImageList } from "./ImageList";
import { OptionCard } from "../OptionCard";

export const ImageImportCard = () => {
  return (
    <>
      <ImageList />
      {/* 포스트 입력창 */}
      <OptionCard />
      <Button label="입력 완료" href="/store/1234/product/" />
    </>
  );
};
