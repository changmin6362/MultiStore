export interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  status: "판매중" | "품절" | "숨김";
}

export type ProductStatus = Product["status"];
