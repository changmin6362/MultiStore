"use client";
import type { Product } from "../types";

interface ProductCardProps {
  product: Product;
  statusColorClass: string;
  onEdit: (productId: number) => void;
  onDelete: (productId: number) => void;
}

export const ProductCard = ({
  product,
  statusColorClass,
  onEdit,
  onDelete
}: ProductCardProps) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg">
      {/* 1줄: 상품명과 상태 */}
      <div className="mb-3 flex items-start justify-between">
        <h2 className="pr-4 text-lg font-semibold text-gray-900">
          {product.name}
        </h2>
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold whitespace-nowrap ${statusColorClass}`}
        >
          {product.status}
        </span>
      </div>

      {/* 2줄: ID, 가격, 재고 정보 */}
      <div className="mb-4 flex items-center justify-between text-sm text-gray-600">
        <div>
          <span className="font-medium">ID:</span> {product.id}
        </div>
        <div className="text-right">
          <span className="font-medium">가격:</span>{" "}
          {product.price.toLocaleString()}원
        </div>
        <div className="text-right">
          <span className="font-medium">재고:</span> {product.stock}개
        </div>
      </div>

      {/* 3줄: 관리 버튼들 (영역을 꽉 채움) */}
      <div className="flex justify-between gap-3 border-t pt-3">
        <button
          onClick={() => onEdit(product.id)}
          className="flex-1 rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200"
        >
          수정
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="flex-1 rounded-lg bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200"
        >
          삭제
        </button>
      </div>
    </div>
  );
};
