"use client";

import { createContext, useContext } from "react";
import { useHeaderVariant } from "../hooks/useHeaderVariant";
import { HeaderVariants } from "../Header";

type HeaderVariantType = (typeof HeaderVariants)[number];

const HeaderVariantContext = createContext<HeaderVariantType | null>(null);

export const HeaderVariantProvider = ({
  children
}: {
  children: React.ReactNode;
}) => {
  const variant = useHeaderVariant();
  return (
    <HeaderVariantContext.Provider value={variant}>
      {children}
    </HeaderVariantContext.Provider>
  );
};

export const useHeaderVariantContext = (): HeaderVariantType => {
  const context = useContext(HeaderVariantContext);
  if (!context) {
    throw new Error(
      "useHeaderVariantContext must be used within HeaderVariantProvider"
    );
  }
  return context;
};
