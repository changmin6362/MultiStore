import { Footer } from "@/components/common/Footer/Footer";
import { HeaderVariantProvider } from "@/components/common/Header/contexts/HeaderVariantProvider";
import { Header } from "@/components/common/Header/Header";
import { UserStates } from "@/components/common/Header/variants/type";
import { verifyToken } from "@/hooks/useVerifyToken";

import { fontVariables } from "./fonts";
import "./globals.css";
import React from "react";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // 토큰 검증
  const isValidToken = await verifyToken();
  const userState: (typeof UserStates)[number] = isValidToken
    ? UserStates[0]
    : UserStates[1]; // "User" | "Guest"

  return (
    <html lang="ko" className={fontVariables}>
      <body className="font-sans antialiased">
        <HeaderVariantProvider>
          <Header userState={userState} />
        </HeaderVariantProvider>
        {children}
        <Footer />
      </body>
    </html>
  );
}
