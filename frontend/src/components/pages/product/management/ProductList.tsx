"use client";
import { useState } from "react";
import type { Product } from "./types";
import { initialProducts } from "./constants/mockData";
import { getStatusColor } from "./utils/statusUtils";
import { ProductCard } from "./internal/ProductCard";

interface ProductListProps {
  onEdit: (productId: number) => void;
  onDelete: (productId: number) => void;
  onAddNew: () => void;
}

export const ProductList = ({
  onEdit,
  onDelete,
  onAddNew
}: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const handleDelete = (productId: number) => {
    if (window.confirm(`상품 ID ${productId}를 삭제하시겠습니까?`)) {
      setProducts(products.filter((p) => p.id !== productId));
      alert("삭제되었습니다.");
      onDelete(productId);
    }
  };

  const handleEdit = (productId: number) => {
    onEdit(productId);
  };

  const handleAddNew = () => {
    onAddNew();
  };

  return (
    <div className="w-full p-4">
      {/* 헤더 */}
      <div className="mb-6 flex flex-col items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-gray-800">상품 관리</h1>
        <button
          onClick={handleAddNew}
          className="w-full rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white shadow-md transition duration-150 ease-in-out hover:bg-blue-700"
        >
          + 새 상품 등록
        </button>
      </div>

      {/* 상품 카드 목록 */}
      <div className="space-y-4">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            statusColorClass={getStatusColor(product.status)}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};
