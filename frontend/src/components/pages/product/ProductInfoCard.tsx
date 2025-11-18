import { ImageCard } from "@/components/ui/ImageCard/ImageCard";
import { Divider } from "@/components/ui/Divider/Divider";

import Star from "@public/Star.svg";
import { Button } from "@/components/ui/Button/Button";

export const ProductInfoCard = () => {
  return (
    <div className="flex w-full flex-col items-start justify-center gap-4 border-b border-gray-400 px-4 py-8">
      <div className="flex flex-col items-start justify-start gap-2">
        {/* 상품 이름 */}
        <p className="text-xl text-black">홈메이드 수제 버거 밀키트</p>
        {/* 상품의 리뷰 정보 */}
        <div className="flex items-center justify-start gap-2">
          <div className="size-6">
            <ImageCard imageSrc={Star} useLabel={false} />
          </div>
          <p className="text-xl font-semibold text-gray-500">4.88</p>
          <p className="text-sm text-gray-400">24건 리뷰</p>
        </div>
        {/* 상품 가격 */}
        <p className="text-2xl font-semibold text-red-500">4,900원</p>
      </div>
      {/* 옵션 정보 */}
      <div className="w-full space-y-4">
        <div className="rounded-md border border-gray-400">
          <div className="space-y-0">
            <div className="flex items-center justify-start gap-2.5 px-3 py-1.5">
              <p className="text-xs text-gray-400">기본 옵션</p>
              <p className="text-xs text-gray-400">개수: 1개</p>
            </div>
            <Divider />
            <div className="flex items-center justify-start gap-2.5 px-3 py-1.5">
              <p className="text-xs text-gray-400">추가 가격</p>
              <p className="text-xs text-gray-400">0원</p>
            </div>
          </div>
        </div>
        {/* 사용자 액션 버튼 */}
        <div className="flex w-full items-center justify-between gap-2.5">
          <Button label="장바구니에 담기" state="Positive" href="/cart" />
          <Button label="주문하기" state="Positive" />
        </div>
      </div>
    </div>
  );
};
