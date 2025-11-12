import { StaticImageData } from "next/image";
import Image from "next/image";

interface CardGridItemProps {
  imageSrc: string | StaticImageData;
  className?: string;
}

export const CardGridItem = ({
  imageSrc,
  className = "flex-1"
}: CardGridItemProps) => {
  return (
    <div className={`flex w-full flex-col gap-1 p-1 ${className}`}>
      <div className="relative flex aspect-square w-full flex-col items-center justify-center">
        <Image src={imageSrc} alt="carousel" fill className="object-cover" />
      </div>
      <p className="font-semi-bold text-left text-[14px] text-black">상품명</p>
    </div>
  );
};
