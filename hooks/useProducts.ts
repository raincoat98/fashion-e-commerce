import { useState, useEffect } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  isNew?: boolean;
  isSale?: boolean;
  discount?: number;
  description?: string;
}

// Mock 상품 데이터
const mockProducts: Product[] = [
  {
    id: "1",
    name: "LUMINA 시그니처 티셔츠",
    price: 89000,
    originalPrice: 120000,
    image: "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg",
    category: "상의",
    rating: 4.8,
    reviewCount: 127,
    isNew: true,
    isSale: true,
    discount: 25,
    description: "프리미엄 코튼 소재의 시그니처 티셔츠",
  },
  {
    id: "2",
    name: "프리미엄 데님 팬츠",
    price: 129000,
    image: "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg",
    category: "하의",
    rating: 4.9,
    reviewCount: 89,
    isNew: false,
    description: "고급 데님 소재의 프리미엄 팬츠",
  },
  {
    id: "3",
    name: "엘레간트 원피스",
    price: 159000,
    originalPrice: 200000,
    image: "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg",
    category: "원피스",
    rating: 4.7,
    reviewCount: 156,
    isSale: true,
    discount: 20,
    description: "우아한 실루엣의 엘레간트 원피스",
  },
  {
    id: "4",
    name: "크롭 니트 가디건",
    price: 99000,
    image: "https://images.pexels.com/photos/1884582/pexels-photo-1884582.jpeg",
    category: "상의",
    rating: 4.6,
    reviewCount: 203,
    isNew: true,
    description: "부드러운 니트 소재의 크롭 가디건",
  },
  {
    id: "5",
    name: "하이웨이스트 스커트",
    price: 75000,
    originalPrice: 95000,
    image: "https://images.pexels.com/photos/1884583/pexels-photo-1884583.jpeg",
    category: "하의",
    rating: 4.5,
    reviewCount: 78,
    isSale: true,
    discount: 21,
    description: "여성스러운 실루엣의 하이웨이스트 스커트",
  },
  {
    id: "6",
    name: "오버사이즈 블레이저",
    price: 189000,
    image: "https://images.pexels.com/photos/1884585/pexels-photo-1884585.jpeg",
    category: "아우터",
    rating: 4.9,
    reviewCount: 92,
    isNew: true,
    description: "모던한 실루엣의 오버사이즈 블레이저",
  },
  {
    id: "7",
    name: "실크 블라우스",
    price: 115000,
    originalPrice: 145000,
    image: "https://images.pexels.com/photos/1884586/pexels-photo-1884586.jpeg",
    category: "상의",
    rating: 4.7,
    reviewCount: 134,
    isSale: true,
    discount: 20,
    description: "고급스러운 실크 소재의 블라우스",
  },
  {
    id: "8",
    name: "와이드 팬츠",
    price: 95000,
    image: "https://images.pexels.com/photos/1884587/pexels-photo-1884587.jpeg",
    category: "하의",
    rating: 4.6,
    reviewCount: 167,
    isNew: false,
    description: "편안한 착용감의 와이드 팬츠",
  },
  {
    id: "9",
    name: "미니 원피스",
    price: 125000,
    originalPrice: 160000,
    image: "https://images.pexels.com/photos/1884588/pexels-photo-1884588.jpeg",
    category: "원피스",
    rating: 4.8,
    reviewCount: 98,
    isSale: true,
    discount: 22,
    description: "귀여운 실루엣의 미니 원피스",
  },
  {
    id: "10",
    name: "트렌치 코트",
    price: 245000,
    image: "https://images.pexels.com/photos/1884589/pexels-photo-1884589.jpeg",
    category: "아우터",
    rating: 4.9,
    reviewCount: 76,
    isNew: true,
    description: "클래식한 실루엣의 트렌치 코트",
  },
  {
    id: "11",
    name: "베이직 후드티",
    price: 65000,
    originalPrice: 85000,
    image: "https://images.pexels.com/photos/1884590/pexels-photo-1884590.jpeg",
    category: "상의",
    rating: 4.4,
    reviewCount: 245,
    isSale: true,
    discount: 24,
    description: "편안한 착용감의 베이직 후드티",
  },
  {
    id: "12",
    name: "플리츠 스커트",
    price: 85000,
    image: "https://images.pexels.com/photos/1884591/pexels-photo-1884591.jpeg",
    category: "하의",
    rating: 4.7,
    reviewCount: 112,
    isNew: false,
    description: "여성스러운 플리츠 디자인의 스커트",
  },
  {
    id: "13",
    name: "이미지 없는 상품 1",
    price: 75000,
    image: "", // 빈 이미지 URL
    category: "상의",
    rating: 4.5,
    reviewCount: 45,
    isNew: true,
    description: "이미지가 없는 상품입니다",
  },
  {
    id: "14",
    name: "이미지 없는 상품 2",
    price: 95000,
    image: "invalid-url", // 잘못된 이미지 URL
    category: "하의",
    rating: 4.3,
    reviewCount: 32,
    isSale: true,
    discount: 15,
    description: "잘못된 이미지 URL을 가진 상품입니다",
  },
  {
    id: "15",
    name: "이미지 없는 상품 3",
    price: 120000,
    image: "https://nonexistent-image-url.com/image.jpg", // 존재하지 않는 이미지
    category: "원피스",
    rating: 4.6,
    reviewCount: 28,
    isNew: false,
    description: "존재하지 않는 이미지 URL을 가진 상품입니다",
  },
];

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 상품 데이터 로드
  const loadProducts = async () => {
    try {
      setLoading(true);
      // 실제로는 API 호출
      // const response = await fetch('/api/products');
      // const data = await response.json();

      // Mock 데이터 사용
      await new Promise((resolve) => setTimeout(resolve, 300)); // 로딩 시뮬레이션
      setProducts(mockProducts);
      setError(null);
    } catch (err) {
      setError("상품을 불러오는데 실패했습니다.");
      console.error("Failed to load products:", err);
    } finally {
      setLoading(false);
    }
  };

  // 카테고리별 상품 필터링
  const getProductsByCategory = (category: string) => {
    return products.filter((product) => product.category === category);
  };

  // 신상품 필터링
  const getNewProducts = () => {
    return products.filter((product) => product.isNew);
  };

  // 할인 상품 필터링
  const getSaleProducts = () => {
    return products.filter((product) => product.isSale);
  };

  // 인기 상품 필터링 (평점 기준)
  const getPopularProducts = (limit: number = 8) => {
    return products.sort((a, b) => b.rating - a.rating).slice(0, limit);
  };

  // 이미지 URL 검증
  const isValidImageUrl = (url: string): boolean => {
    if (!url || url.trim() === "") return false;
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // 상품 검색
  const searchProducts = (query: string) => {
    const lowercaseQuery = query.toLowerCase();
    return products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery) ||
        product.description?.toLowerCase().includes(lowercaseQuery)
    );
  };

  useEffect(() => {
    loadProducts();
  }, []);

  return {
    products,
    loading,
    error,
    getProductsByCategory,
    getNewProducts,
    getSaleProducts,
    getPopularProducts,
    searchProducts,
    reloadProducts: loadProducts,
  };
}
