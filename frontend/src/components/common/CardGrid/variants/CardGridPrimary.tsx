import { CardGridItem } from "../internal/CardGridItem";

import p1 from "@public/product1.png";
import p2 from "@public/product2.png";
import p3 from "@public/product3.png";
import p4 from "@public/product4.png";
import p5 from "@public/product5.png";
import p6 from "@public/product6.png";

const productImages = [p1, p2, p3, p4, p5, p6];

export const CardGridPrimary = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-4 border-b border-gray-400 bg-white px-4 py-8">
      <div className="w-full">
        <p className="font-semi-bold text-left text-2xl text-blue-500">
          스토어 목록
        </p>
      </div>
      <div className="flex w-full flex-1 flex-wrap items-start justify-between md:flex-nowrap">
        {productImages.map((imageSrc, index) => (
          <CardGridItem
            key={index}
            imageSrc={imageSrc}
            className="flex-1/3 md:flex-1/6"
          />
        ))}
      </div>
    </div>
  );
};
