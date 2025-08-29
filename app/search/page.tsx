"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useProductStore } from "@/stores/useProductStore";
import ProductCard from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import { Filter, Grid, List, X } from "lucide-react";
import Search from "@/components/ui/search";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export default function SearchPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";

  const {
    products,
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
  } = useProductStore();
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);

  // 검색어가 URL에서 변경되면 스토어 업데이트
  useEffect(() => {
    if (query && query !== searchTerm) {
      setSearchTerm(query);
    }
  }, [query, searchTerm, setSearchTerm]);

  // 검색 결과 필터링
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredProducts([]);
      return;
    }

    const results = products.filter((product) => {
      const searchLower = searchTerm.toLowerCase();
      const nameMatch = product.name.toLowerCase().includes(searchLower);
      const categoryMatch = product.category
        .toLowerCase()
        .includes(searchLower);
      const tagMatch = product.tags?.some((tag) =>
        tag.toLowerCase().includes(searchLower)
      );

      return nameMatch || categoryMatch || tagMatch;
    });

    setFilteredProducts(results);
  }, [products, searchTerm]);

  // 검색어 하이라이트 함수
  const highlightText = (text: string, searchTerm: string) => {
    if (!searchTerm.trim()) return text;

    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);

    return parts.map((part, index) =>
      regex.test(part) ? (
        <span key={index} className="bg-yellow-200 font-semibold">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  // 필터 초기화
  const clearFilters = () => {
    setSelectedCategory("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* 검색 헤더 */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                검색 결과
              </h1>
              {searchTerm && (
                <p className="text-gray-600">
                  <span className="font-semibold">"{searchTerm}"</span>에 대한
                  <span className="font-semibold text-blue-600 ml-1">
                    {filteredProducts.length}개
                  </span>
                  의 상품을 찾았습니다.
                </p>
              )}
            </div>

            {/* 검색바 */}
            <div className="w-full lg:w-96">
              <Search
                placeholder="다른 상품을 검색해보세요"
                onSearch={(results) => {
                  // 검색 결과가 있으면 첫 번째 결과로 이동하거나 전체 결과 페이지로 이동
                }}
              />
            </div>
          </div>

          {/* 필터 및 정렬 */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2"
              >
                <Filter className="h-4 w-4" />
                필터
              </Button>

              {selectedCategory && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={clearFilters}
                  className="flex items-center gap-2"
                >
                  <X className="h-4 w-4" />
                  필터 초기화
                </Button>
              )}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600">보기:</span>
              <Button
                variant={viewMode === "grid" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("grid")}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* 필터 패널 */}
        {showFilters && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  카테고리
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900"
                >
                  <option value="">전체</option>
                  <option value="상의">상의</option>
                  <option value="하의">하의</option>
                  <option value="아우터">아우터</option>
                  <option value="원피스">원피스</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* 검색 결과 */}
        {filteredProducts.length > 0 ? (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }
          >
            {filteredProducts.map((product) => (
              <div key={product.id}>
                {viewMode === "grid" ? (
                  <ProductCard product={product} />
                ) : (
                  <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-md transition-shadow">
                    <div className="w-24 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 mb-1">
                        {highlightText(product.name, searchTerm)}
                      </h3>
                      <p className="text-sm text-gray-500 mb-2">
                        {product.category}
                      </p>
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-gray-900">
                          {product.price.toLocaleString()}원
                        </span>
                        {product.originalPrice && (
                          <span className="text-sm text-gray-400 line-through">
                            {product.originalPrice.toLocaleString()}원
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              검색 결과가 없습니다
            </h3>
            <p className="text-gray-600 mb-4">
              <span className="font-semibold">"{searchTerm}"</span>에 대한
              상품을 찾을 수 없습니다.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-gray-500">다음과 같이 검색해보세요:</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• 검색어의 철자가 정확한지 확인해주세요</li>
                <li>• 더 일반적인 검색어를 사용해보세요</li>
                <li>• 다른 키워드로 검색해보세요</li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg
                className="mx-auto h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              검색어를 입력해주세요
            </h3>
            <p className="text-gray-600">
              상품명, 브랜드명으로 검색할 수 있습니다.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
