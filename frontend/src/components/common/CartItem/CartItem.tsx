import { StaticImageData } from "next/image";
import { ImageCard } from "@/components/ui/ImageCard/ImageCard";
import { Button } from "@/components/ui/Button/Button";
import { Divider } from "@/components/ui/Divider/Divider";

import plus from "@public/plus_button.svg";
import minus from "@public/minus_button.svg";

export interface ProductInfo {
  storeName: string;
  productName: string;
  price: number;
  option: string;
  imageSrc: string | StaticImageData;
}

interface CartItemProps {
  product: ProductInfo;
  onQuantityIncrease: () => void;
  onQuantityDecrease: () => void;
  onDelete: () => void;
  onEdit: () => void;
}

export const CartItem = ({
  product,
  onQuantityIncrease,
  onQuantityDecrease,
  onDelete,
  onEdit
}: CartItemProps) => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-4 rounded-[15px] border border-gray-500 bg-white px-4 py-8">
      {/* 상점 이름 */}
      <p className="text-left text-xl text-black">{product.storeName}</p>
      <Divider />
      <div className="flex w-full gap-2.5 p-2.5">
        {/* 제품 이미지 */}
        <div className="w-20 shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)] md:w-40">
          <ImageCard
            imageSrc={product.imageSrc}
            alt={product.productName}
            useLabel={false}
          />
        </div>
        {/* 제품 라벨 컨테이너 */}
        <div className="flex min-w-0 flex-1 flex-col justify-between p-1.5 text-xs md:p-4 md:text-2xl">
          {/* 상품 이름 (Truncate 적용) */}
          <p className="max-w-full truncate text-gray-700">
            {product.productName}
          </p>

          {/* 상품 가격 */}
          <p className="text-red-500">{product.price}원</p>

          {/* 상품 옵션 */}
          <p className="truncate text-black">{product.option}</p>

          {/* 수량 제어 버튼 */}
          <div className="flex justify-start gap-2.5">
            <div className="size-4 cursor-pointer" onClick={onQuantityIncrease}>
              <ImageCard imageSrc={plus} alt="수량 증가" useLabel={false} />
            </div>
            <div className="size-4 cursor-pointer" onClick={onQuantityDecrease}>
              <ImageCard imageSrc={minus} alt="수량 감소" useLabel={false} />
            </div>
          </div>
        </div>
      </div>

      {/* 주문 버튼 */}
      <div className="flex w-full items-center justify-center gap-2.5">
        <Button label="삭제" buttonType="Secondary" onClick={onDelete} />
        <Button label="주문수정" buttonType="Secondary" onClick={onEdit} />
      </div>
    </div>
  );
};
