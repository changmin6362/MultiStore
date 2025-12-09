"use client";

import { usePathname } from "next/navigation";
import { HeaderVariants } from "../Header";

type HeaderVariantType = (typeof HeaderVariants)[number];

export const useHeaderVariant = (): HeaderVariantType => {
  const pathname = usePathname();

  let headerVariant: HeaderVariantType;

  // 정규식: /store/숫자/product/숫자 형태 체크
  const productDetailRegex = /^\/store\/\d+\/product\/\d+/;

  // (1) 가장 구체적인 경로 (우선순위 높음)
  if (
    pathname.startsWith("/cart") ||
    productDetailRegex.test(pathname) ||
    pathname.startsWith("/user/profile/edit") ||
    pathname.startsWith("/user/addresses") ||
    pathname.startsWith("/user/payments")
  ) {
    headerVariant = HeaderVariants[0];
  }
  // (2) 검색바가 필요한 경로
  else if (
    pathname === "/" ||
    pathname.startsWith("/store") ||
    pathname.startsWith("/search")
  ) {
    headerVariant = HeaderVariants[1];
  }
  // (3) 그 외 나머지 경로
  else {
    headerVariant = HeaderVariants[2];
  }

  return headerVariant;
};
