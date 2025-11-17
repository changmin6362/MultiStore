import { Footer } from "@/components/common/Footer/Footer";
import { HeaderVariantProvider } from "@/components/common/Header/contexts/HeaderVariantProvider";
import { Header } from "@/components/common/Header/Header";

import { fontVariables } from "./fonts";
import "./globals.css";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko" className={fontVariables}>
      <body className="font-sans antialiased">
        <HeaderVariantProvider>
          <Header />
        </HeaderVariantProvider>
        {children}
        <Footer />
      </body>
    </html>
  );
}
