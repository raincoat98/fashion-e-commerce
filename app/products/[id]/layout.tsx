import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "제품 상세 - Fashion Store",
  description:
    "트렌디한 여성 의류를 온라인에서 만나보세요. 상세한 제품 정보와 고객 리뷰를 확인하세요.",
};

export default function ProductLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
