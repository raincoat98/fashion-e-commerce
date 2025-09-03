import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LUMINA - 관리자 대시보드",
  description: "LUMINA 패션 쇼핑몰 관리자 대시보드",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="admin-page">{children}</body>
    </html>
  );
}
