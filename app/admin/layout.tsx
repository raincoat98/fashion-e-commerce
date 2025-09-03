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
  return <div className="admin-page min-h-screen bg-gray-50">{children}</div>;
}
