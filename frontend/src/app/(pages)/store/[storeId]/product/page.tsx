"use client";

import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";
import { ProductList } from "@/components/pages/product/management/ProductList";

export default function Product() {
  const handleEdit = (productId: number) => {
    console.log("상품 수정:", productId);
    // TODO: 상품 수정 페이지로 이동
  };

  const handleDelete = (productId: number) => {
    console.log("상품 삭제:", productId);
  };

  const handleAddNew = () => {
    console.log("새 상품 등록");
    // TODO: 상품 등록 페이지로 이동
  };

  return (
    <AuthFormWrapper>
      <ProductList
        onEdit={handleEdit}
        onDelete={handleDelete}
        onAddNew={handleAddNew}
      />
    </AuthFormWrapper>
  );
}
