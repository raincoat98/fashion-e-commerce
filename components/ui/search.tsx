"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Search as SearchIcon,
  X,
  ArrowRight,
  Clock,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProductStore } from "@/stores/useProductStore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useSearchHistory } from "@/hooks/useSearchHistory";

interface SearchResult {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  isBest?: boolean;
}

interface SearchProps {
  placeholder?: string;
  className?: string;
  variant?: "header" | "full";
  onSearch?: (results: SearchResult[]) => void;
}

export default function Search({
  placeholder = "상품명, 브랜드를 검색하세요",
  className = "",
  variant = "header",
  onSearch,
}: SearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const { products, setSearchTerm: setStoreSearchTerm } = useProductStore();
  const router = useRouter();
  const { searchHistory, addSearchTerm, removeSearchTerm, clearSearchHistory } =
    useSearchHistory();

  // 디바운싱된 검색 함수
  const debouncedSearch = useCallback(
    (term: string) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        if (term.trim().length === 0) {
          setResults([]);
          setIsLoading(false);
          return;
        }

        setIsLoading(true);

        // 검색 로직
        const searchResults = products
          .filter((product) => {
            const searchLower = term.toLowerCase();
            const nameMatch = product.name.toLowerCase().includes(searchLower);
            const categoryMatch = product.category
              .toLowerCase()
              .includes(searchLower);
            const tagMatch = product.tags?.some((tag) =>
              tag.toLowerCase().includes(searchLower)
            );

            return nameMatch || categoryMatch || tagMatch;
          })
          .map((product) => ({
            id: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: product.images[0],
            category: product.category,
            isNew: product.isNew,
            isSale: product.isSale,
            isBest: product.isBest,
          }))
          .slice(0, 8); // 최대 8개 결과만 표시

        setResults(searchResults);
        setIsLoading(false);

        if (onSearch) {
          onSearch(searchResults);
        }
      }, 300);
    },
    [products, onSearch]
  );

  // 검색어 변경 핸들러
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setHighlightedIndex(-1);

    if (value.trim().length > 0) {
      setIsOpen(true);
      debouncedSearch(value);
    } else {
      setIsOpen(false);
      setResults([]);
    }
  };

  // 검색 결과 클릭 핸들러
  const handleResultClick = (result: SearchResult) => {
    addSearchTerm(searchTerm);
    setSearchTerm("");
    setIsOpen(false);
    setResults([]);
    router.push(`/products/${result.id}`);
  };

  // 전체 검색 페이지로 이동
  const handleViewAllResults = () => {
    if (searchTerm.trim()) {
      addSearchTerm(searchTerm);
      setStoreSearchTerm(searchTerm);
      setIsOpen(false);
      router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
    }
  };

  // 키보드 네비게이션
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen || results.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < results.length - 1 ? prev + 1 : prev
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && results[highlightedIndex]) {
          handleResultClick(results[highlightedIndex]);
        } else if (searchTerm.trim()) {
          handleViewAllResults();
        }
        break;
      case "Escape":
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

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

  // 외부 클릭 시 드롭다운 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 컴포넌트 언마운트 시 타이머 정리
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div ref={searchRef} className={`relative ${className}`}>
      <div className="relative">
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (searchTerm.trim() && results.length > 0) {
              setIsOpen(true);
            }
          }}
          placeholder={placeholder}
          spellCheck={false}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
        />
        {searchTerm && (
          <button
            onClick={() => {
              setSearchTerm("");
              setIsOpen(false);
              setResults([]);
              inputRef.current?.focus();
            }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* 검색 결과 드롭다운 */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-gray-500">검색 중...</div>
          ) : results.length > 0 ? (
            <>
              <div className="max-h-80 overflow-y-auto">
                {results.map((result, index) => (
                  <button
                    key={result.id}
                    onClick={() => handleResultClick(result)}
                    className={`w-full p-3 text-left hover:bg-gray-50 transition-colors ${
                      index === highlightedIndex ? "bg-gray-100" : ""
                    } ${index === 0 ? "rounded-t-lg" : ""}`}
                  >
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={result.image}
                          alt={result.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="text-sm font-medium text-gray-900 truncate">
                            {highlightText(result.name, searchTerm)}
                          </span>
                          {result.isNew && (
                            <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                              NEW
                            </span>
                          )}
                          {result.isSale && (
                            <span className="px-2 py-1 text-xs bg-red-100 text-red-800 rounded">
                              SALE
                            </span>
                          )}
                          {result.isBest && (
                            <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded">
                              BEST
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-gray-500 mb-1">
                          {result.category}
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {result.price.toLocaleString()}원
                          </span>
                          {result.originalPrice && (
                            <span className="text-xs text-gray-400 line-through">
                              {result.originalPrice.toLocaleString()}원
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
              <div className="border-t border-gray-200 p-3">
                <button
                  onClick={handleViewAllResults}
                  className="w-full flex items-center justify-center space-x-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <span>"{searchTerm}" 검색 결과 모두 보기</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </>
          ) : searchTerm.trim() ? (
            <div className="p-4 text-center text-gray-500">
              검색 결과가 없습니다.
            </div>
          ) : searchHistory.length > 0 ? (
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  최근 검색어
                </h3>
                <button
                  onClick={clearSearchHistory}
                  className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
                >
                  <Trash2 className="h-3 w-3" />
                  전체 삭제
                </button>
              </div>
              <div className="space-y-2">
                {searchHistory.map((term, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-md cursor-pointer"
                  >
                    <button
                      onClick={() => {
                        setSearchTerm(term);
                        setStoreSearchTerm(term);
                        setIsOpen(false);
                        router.push(`/search?q=${encodeURIComponent(term)}`);
                      }}
                      className="flex-1 text-left text-sm text-gray-700 hover:text-gray-900"
                    >
                      {term}
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSearchTerm(term);
                      }}
                      className="text-gray-400 hover:text-gray-600 p-1"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
