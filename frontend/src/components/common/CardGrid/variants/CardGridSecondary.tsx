import { CardGridItem } from "../internal/CardGridItem";

import p1 from "@public/product1.png";
import p2 from "@public/product2.png";
import p3 from "@public/product3.png";
import p4 from "@public/product4.png";
import p5 from "@public/product5.png";
import p6 from "@public/product6.png";
import p7 from "@public/product7.png";
import p8 from "@public/product8.png";
import p9 from "@public/product9.png";
import p10 from "@public/product10.png";
import p11 from "@public/product11.png";
import p12 from "@public/product12.png";

const productImages = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12];

export const CardGridSecondary = () => {
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
      <div className="flex w-full items-start justify-between flex-1 flex-wrap">
        {productImages.map((imageSrc, index) => (
          <CardGridItem
            key={index}
            imageSrc={imageSrc}
            className={`flex-1/3 md:flex-1/6 ${
              index >= 6 ? "hidden md:block" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};
