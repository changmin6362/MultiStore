import type { Metadata } from "next";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "멀티스토어",
  description: "멀티스토어에서 다양한 상품을 구매하세요",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={fontVariables}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
