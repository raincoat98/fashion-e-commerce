import { useState, useEffect } from "react";

const SEARCH_HISTORY_KEY = "lumina-search-history";
const MAX_HISTORY_ITEMS = 10;

export function useSearchHistory() {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);

  // 로컬 스토리지에서 검색 히스토리 로드
  useEffect(() => {
    const savedHistory = localStorage.getItem(SEARCH_HISTORY_KEY);
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        setSearchHistory(Array.isArray(parsed) ? parsed : []);
      } catch (error) {
        console.error("검색 히스토리 로드 실패:", error);
        setSearchHistory([]);
      }
    }
  }, []);

  // 검색어 추가
  const addSearchTerm = (term: string) => {
    if (!term.trim()) return;

    setSearchHistory((prev) => {
      const filtered = prev.filter(
        (item) => item.toLowerCase() !== term.toLowerCase()
      );
      const newHistory = [term, ...filtered].slice(0, MAX_HISTORY_ITEMS);

      // 로컬 스토리지에 저장
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));

      return newHistory;
    });
  };

  // 검색어 제거
  const removeSearchTerm = (term: string) => {
    setSearchHistory((prev) => {
      const newHistory = prev.filter((item) => item !== term);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(newHistory));
      return newHistory;
    });
  };

  // 검색 히스토리 전체 삭제
  const clearSearchHistory = () => {
    setSearchHistory([]);
    localStorage.removeItem(SEARCH_HISTORY_KEY);
  };

  return {
    searchHistory,
    addSearchTerm,
    removeSearchTerm,
    clearSearchHistory,
  };
}
