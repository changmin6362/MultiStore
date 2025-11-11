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
    <div className={`flex flex-col w-full ${className}`}>
      <div
        className="flex flex-col w-full aspect-square relative justify-center
          items-center"
      >
        <Image src={imageSrc} alt="carousel" fill className="object-cover" />
      </div>
      <p className="text-black font-semi-bold text-left text-[14px]">상품명</p>
    </div>
  );
};
