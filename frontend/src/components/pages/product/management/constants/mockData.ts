import type { Product } from "../types";

export const initialProducts: Product[] = [
  {
    id: 1,
    name: "프리미엄 스테이크 세트",
    price: 29900,
    stock: 50,
    status: "판매중"
  },
  {
    id: 2,
    name: "홈메이드 수제 버거 밀키트",
    price: 14900,
    stock: 0,
    status: "품절"
  },
  {
    id: 3,
    name: "유기농 채소 박스",
    price: 19800,
    stock: 120,
    status: "판매중"
  },
  {
    id: 4,
    name: "캠핑용 바베큐 그릴",
    price: 89000,
    stock: 10,
    status: "숨김"
  }
];
