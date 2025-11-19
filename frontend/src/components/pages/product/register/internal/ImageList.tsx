import { ImageCard } from "@/components/ui/ImageCard/ImageCard";

import p1 from "@public/product1.png";
import p2 from "@public/product2.png";
import p3 from "@public/product3.png";
import p4 from "@public/product4.png";
import p5 from "@public/product5.png";
import p6 from "@public/product6.png";

const productImages = [p1, p2, p3, p4, p5, p6];

export const ImageList = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-4 bg-white px-4 py-8">
      <p className="font-semi-bold text-left text-2xl text-black">
        상품 정보 및 옵션 등록
      </p>
      <div className="flex w-full flex-wrap items-start justify-between md:flex-nowrap">
        {productImages.map((imageSrc, index) => (
          <ImageCard
            key={index}
            imageSrc={imageSrc}
            useLabel={false}
            className="flex-1/3 p-1 md:flex-1/6"
          />
        ))}
      </div>
    </div>
  );
};
