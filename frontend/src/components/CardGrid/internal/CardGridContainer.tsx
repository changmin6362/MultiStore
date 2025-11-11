import { CardGridItem } from "./CardGridItem";

import p1 from "@public/product1.png";
import p2 from "@public/product2.png";
import p3 from "@public/product3.png";
import p4 from "@public/product4.png";
import p5 from "@public/product5.png";
import p6 from "@public/product6.png";

const productImages = [p1, p2, p3, p4, p5, p6];

export const CardGridContainer = () => {
  return (
    <div
      className="border-b border-gray-400 bg-white flex flex-col gap-y-4
        items-center justify-center flex-1 px-4 py-8"
    >
      <div className="w-full">
        <p className="text-blue-500 font-semi-bold text-left text-2xl">
          스토어 목록
        </p>
      </div>
      <div
        className="flex gap-2.5 w-full items-start justify-between flex-1
          flex-wrap md:flex-nowrap"
      >
        {productImages.map((imageSrc, index) => (
          <CardGridItem
            key={index}
            imageSrc={imageSrc}
            className="flex-1/4 md:flex-1/6"
          />
        ))}
      </div>
    </div>
  );
};
