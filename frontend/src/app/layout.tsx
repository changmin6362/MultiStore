import { Footer } from "@/components/common/Footer/Footer";
import { HeaderVariantProvider } from "@/components/common/Header/contexts/HeaderVariantProvider";
import { Header } from "@/components/common/Header/Header";
import { cookies } from "next/headers";
import { UserStates } from "@/components/common/Header/variants/type";

import { fontVariables } from "./fonts";
import "./globals.css";
import React from "react";

export const dynamic = "force-dynamic";

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  // 서버 컴포넌트에서 쿠키 읽어 사용자 상태 결정
  const cookieStore = await cookies();
  const hasToken = cookieStore.get("access_token");
  const userState = hasToken ? UserStates[0] : UserStates[1]; // "User" | "Guest"
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
