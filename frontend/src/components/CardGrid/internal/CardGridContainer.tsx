import { CardGridItem } from "./CardGridItem";

import p1 from "@public/product1.png";
import p2 from "@public/product2.png";
import p3 from "@public/product3.png";
import p4 from "@public/product4.png";
import p5 from "@public/product5.png";
import p6 from "@public/product6.png";

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
      <div className="flex gap-2.5 w-full items-start justify-between flex-1">
        <CardGridItem imageSrc={p1} />
        <CardGridItem imageSrc={p2} />
        <CardGridItem imageSrc={p3} />
      </div>
      <div className="flex gap-2.5 w-full items-start justify-between flex-1">
        <CardGridItem imageSrc={p4} />
        <CardGridItem imageSrc={p5} />
        <CardGridItem imageSrc={p6} />
      </div>
    </div>
  );
};
