import './globals.css';
import type { Metadata } from 'next';
import { Inter, Noto_Sans_KR } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });
const notoSansKR = Noto_Sans_KR({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  variable: '--font-noto-sans-kr'
});

export const metadata: Metadata = {
  title: 'Fashion Store - 트렌디한 여성 의류',
  description: '매장 품질의 여성 의류를 온라인에서 만나보세요. 당일발송, 빠른 교환 서비스',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className={`${inter.className} ${notoSansKR.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}