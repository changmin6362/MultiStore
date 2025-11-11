import { StaticImageData } from "next/image";

import Image from "next/image";

interface CardGridItemProps {
  imageSrc: string | StaticImageData;
}

export const CardGridItem = ({ imageSrc }: CardGridItemProps) => {
  return (
    <div className="flex flex-col w-full">
      <div
        className="flex flex-col flex-1 w-full min-h-[114px] aspect-square
          relative justify-center items-center"
      >
        <Image src={imageSrc} alt="carousel" fill className="object-cover" />
      </div>
      <p className="text-black font-semi-bold text-left text-[14px]">상품명</p>
    </div>
  );
};
