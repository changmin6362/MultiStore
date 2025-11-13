import type { Meta, StoryObj } from "@storybook/react";
import { CartItem } from "./CartItem";

const PLACEHOLDER_IMAGE_URL =
  "https://placehold.co/400x400/222222/FFFFFF/png?text=Product+Image";

const meta = {
  title: "Common/CartItem",
  component: CartItem,
  tags: ["autodocs"],
  argTypes: {
    product: {
      // product 객체는 컨트롤러에서 직접 편집하기 어려우므로 테이블 문서화만 제공합니다.
      control: "object",
      description: "상품 정보 (상점명, 상품명, 가격, 옵션, 이미지)"
    },

    onQuantityIncrease: { action: "증가 버튼 클릭됨" },
    onQuantityDecrease: { action: "감소 버튼 클릭됨" },
    onDelete: { action: "삭제 버튼 클릭됨" },
    onEdit: { action: "주문 수정 버튼 클릭됨" }
  }
} satisfies Meta<typeof CartItem>;

export default meta;

export const DefaultCartItem: StoryObj<typeof CartItem> = {
  args: {
    product: {
      storeName: "집밥 연구소",
      productName:
        "홈메이드 수제 버거 밀키트 (매우 긴 이름일 때 truncate 테스트)",
      price: 4900,
      option: "기본 옵션: 빵 추가, 소스 변경 (이것도 길 수 있음)",
      imageSrc: PLACEHOLDER_IMAGE_URL
    },

    onQuantityIncrease: () => {},
    onQuantityDecrease: () => {},
    onDelete: () => {},
    onEdit: () => {}
  }
};
