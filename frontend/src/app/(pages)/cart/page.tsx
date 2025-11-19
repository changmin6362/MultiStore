"use client";

import { Fragment, useState } from "react";
import { CartItem } from "@/components/common/CartItem/CartItem";
import { Button } from "@/components/ui/Button/Button";

// Mock 이미지 URL
const PLACEHOLDER_IMAGE_URL =
  "https://placehold.co/400x400/222222/FFFFFF/png?text=Product+Image";

interface CartProduct {
  id: string;
  storeName: string;
  productName: string;
  price: number;
  option: string;
  imageSrc: string;
  quantity: number;
}

export default function Cart() {
  const [cartItems, setCartItems] = useState<CartProduct[]>([
    {
      id: "1",
      storeName: "집밥 연구소",
      productName:
        "홈메이드 수제 버거 밀키트 (매우 긴 이름일 때 truncate 테스트)",
      price: 4900,
      option: "기본 옵션: 빵 추가, 소스 변경 (이것도 길 수 있음)",
      imageSrc: PLACEHOLDER_IMAGE_URL,
      quantity: 1
    },
    {
      id: "2",
      storeName: "홈스타일 요리",
      productName: "프리미엄 스테이크 세트",
      price: 29900,
      option: "웰던",
      imageSrc: PLACEHOLDER_IMAGE_URL,
      quantity: 2
    }
  ]);

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveItem(id);
      return;
    }
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("장바구니가 비어있습니다.");
      return;
    }
    // TODO: 결제 페이지로 이동
    console.log("Checkout with items:", cartItems);
    alert("결제 페이지로 이동합니다.");
  };

  return (
    <div className="flex flex-col gap-6 px-4 py-8">
      {/* 장바구니 제목 */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-black">장바구니</h1>
        <p className="text-sm text-gray-400">{cartItems.length}개 상품</p>
      </div>

      {/* 장바구니 아이템 목록 */}
      <div className="flex flex-col gap-4 space-y-4">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <Fragment key={item.id}>
              <CartItem
                product={item}
                quantity={item.quantity}
                onQuantityIncrease={() =>
                  handleQuantityChange(item.id, item.quantity + 1)
                }
                onQuantityDecrease={() =>
                  handleQuantityChange(item.id, item.quantity - 1)
                }
                onDelete={() => handleRemoveItem(item.id)}
                onEdit={() => {
                  // TODO: 상품 수정 페이지로 이동
                  console.log("Edit item:", item);
                }}
              />
            </Fragment>
          ))
        ) : (
          <div className="flex h-64 flex-col items-center justify-center rounded-lg border border-gray-300 bg-gray-50">
            <p className="text-lg text-gray-500">장바구니가 비어있습니다.</p>
            <Button
              label="쇼핑 계속하기"
              state="Positive"
              buttonType="Primary"
              href="/"
            />
          </div>
        )}
      </div>
      {/* 결제 정보 */}
      {cartItems.length > 0 && (
        <div className="flex flex-col gap-4 pt-6">
          <div className="flex items-center justify-between text-lg font-semibold">
            <span>총 결제 금액</span>
            <span className="text-2xl text-black">
              {totalPrice.toLocaleString()}원
            </span>
          </div>
          <Button
            label="결제하기"
            state="Submit"
            buttonType="Primary"
            onClick={handleCheckout}
          />
        </div>
      )}
    </div>
  );
}
