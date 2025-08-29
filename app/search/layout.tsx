import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "검색 결과 | LUMINA",
  description:
    "LUMINA에서 원하는 상품을 검색해보세요. 상품명, 브랜드명으로 빠르고 정확한 검색이 가능합니다.",
  keywords: "검색, 상품 검색, 패션, 의류, LUMINA",
};

export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
