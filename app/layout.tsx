import "./globals.css";
import type { Metadata } from "next";
import { Inter, Noto_Sans_KR } from "next/font/google";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/toaster";
import TopButton from "@/components/ui/top-button";

const inter = Inter({ subsets: ["latin"] });
const notoSansKR = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-noto-sans-kr",
});

export const metadata: Metadata = {
  title: "LUMINA - 빛나는 당신을 위한 스타일",
  description:
    "LUMINA는 당신의 개성과 아름다움을 빛나게 하는 프리미엄 의류 브랜드입니다. 세련된 디자인과 최고급 소재로 완성된 스타일을 만나보세요.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} ${notoSansKR.variable} font-sans`}>
        <CartProvider>
          {children}
          <TopButton />
          <Toaster />
        </CartProvider>
      </body>
    </html>
  );
}
