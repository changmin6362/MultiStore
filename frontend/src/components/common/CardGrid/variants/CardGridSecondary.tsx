import { ImageCard } from "../../../ui/ImageCard/ImageCard";

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

const productImages = [p1, p2, p3, p4, p5, p6, p7, p8, p9, p10];

export const CardGridSecondary = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-y-4 border-b border-gray-400 bg-white px-4 py-8">
      <div className="w-full">
        <p className="font-semi-bold text-left text-2xl text-blue-500">
          스토어 목록
        </p>
      </div>
      <div className="flex w-full flex-1 flex-wrap items-start justify-between">
        {productImages.map((imageSrc, index) => (
          <ImageCard
            key={index}
            imageSrc={imageSrc}
            className={`flex-1/3 md:flex-1/5 ${
              index >= 6 ? "hidden md:block" : ""
            }`}
          />
        ))}
      </div>
    </div>
  );
};
