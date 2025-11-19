import { AuthFormWrapper } from "@/components/forms/AuthFormWrapper/AuthFormWrapper";
import { ProductManagementCard } from "@/components/pages/product/management/ProductManagementCard";

export default function Product() {
  return (
    <AuthFormWrapper>
      <div className="mb-4 text-2xl font-bold">상품 관리</div>
      <ProductManagementCard />
    </AuthFormWrapper>
  );
}
