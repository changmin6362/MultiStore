import type { ProductStatus } from "../types";

export const getStatusColor = (status: ProductStatus) => {
  switch (status) {
    case "판매중":
      return "bg-green-100 text-green-800";
    case "품절":
      return "bg-red-100 text-red-800";
    case "숨김":
      return "bg-gray-100 text-gray-800";
  }
};
