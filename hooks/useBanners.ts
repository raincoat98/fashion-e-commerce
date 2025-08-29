import { useState, useEffect } from "react";

export interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  order: number;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

// Mock 데이터 (실제로는 API에서 가져올 데이터)
const mockBanners: Banner[] = [
  {
    id: "1",
    title: "봄 신상품 컬렉션",
    description: "2025 봄 시즌 새로운 스타일을 만나보세요",
    imageUrl:
      "https://images.pexels.com/photos/994523/pexels-photo-994523.jpeg",
    linkUrl: "/categories/new",
    order: 1,
    isActive: true,
    createdAt: "2025-01-15",
    updatedAt: "2025-01-15",
  },
  {
    id: "2",
    title: "특가 할인 이벤트",
    description: "최대 50% 할인된 프리미엄 상품들",
    imageUrl:
      "https://images.pexels.com/photos/1884584/pexels-photo-1884584.jpeg",
    linkUrl: "/sale",
    order: 2,
    isActive: true,
    createdAt: "2025-01-14",
    updatedAt: "2025-01-14",
  },
  {
    id: "3",
    title: "베스트 셀러 모음",
    description: "고객들이 가장 많이 선택한 인기 상품들",
    imageUrl:
      "https://images.pexels.com/photos/1884581/pexels-photo-1884581.jpeg",
    linkUrl: "/categories/best",
    order: 3,
    isActive: true,
    createdAt: "2025-01-13",
    updatedAt: "2025-01-13",
  },
  {
    id: "4",
    title: "프리미엄 브랜드 특별전",
    description: "한정 수량 프리미엄 브랜드 상품 특별 할인",
    imageUrl:
      "https://images.pexels.com/photos/1884582/pexels-photo-1884582.jpeg",
    linkUrl: "/categories/premium",
    order: 4,
    isActive: true,
    createdAt: "2025-01-12",
    updatedAt: "2025-01-12",
  },
  {
    id: "5",
    title: "이미지 없는 배너",
    description: "이미지가 없는 배너 테스트",
    imageUrl: "", // 빈 이미지 URL
    linkUrl: "/test",
    order: 5,
    isActive: true,
    createdAt: "2025-01-11",
    updatedAt: "2025-01-11",
  },
  {
    id: "6",
    title: "잘못된 이미지 배너",
    description: "잘못된 이미지 URL을 가진 배너",
    imageUrl: "invalid-url",
    linkUrl: "/test",
    order: 6,
    isActive: true,
    createdAt: "2025-01-10",
    updatedAt: "2025-01-10",
  },
];

export function useBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 배너 데이터 로드
  const loadBanners = async () => {
    try {
      setLoading(true);
      // 실제로는 API 호출
      // const response = await fetch('/api/banners');
      // const data = await response.json();

      // Mock 데이터 사용
      await new Promise((resolve) => setTimeout(resolve, 500)); // 로딩 시뮬레이션
      setBanners(mockBanners);
      setError(null);
    } catch (err) {
      setError("배너를 불러오는데 실패했습니다.");
      console.error("Failed to load banners:", err);
    } finally {
      setLoading(false);
    }
  };

  // 활성화된 배너만 반환
  const getActiveBanners = () => {
    return banners
      .filter((banner) => banner.isActive)
      .sort((a, b) => a.order - b.order);
  };

  // 배너 추가
  const addBanner = async (
    bannerData: Omit<Banner, "id" | "createdAt" | "updatedAt">
  ) => {
    try {
      const newBanner: Banner = {
        ...bannerData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString().split("T")[0],
        updatedAt: new Date().toISOString().split("T")[0],
      };

      // 실제로는 API 호출
      // await fetch('/api/banners', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(newBanner),
      // });

      setBanners((prev) => [...prev, newBanner]);
      return newBanner;
    } catch (err) {
      setError("배너 추가에 실패했습니다.");
      throw err;
    }
  };

  // 배너 수정
  const updateBanner = async (id: string, bannerData: Partial<Banner>) => {
    try {
      // 실제로는 API 호출
      // await fetch(`/api/banners/${id}`, {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(bannerData),
      // });

      setBanners((prev) =>
        prev.map((banner) =>
          banner.id === id
            ? {
                ...banner,
                ...bannerData,
                updatedAt: new Date().toISOString().split("T")[0],
              }
            : banner
        )
      );
    } catch (err) {
      setError("배너 수정에 실패했습니다.");
      throw err;
    }
  };

  // 배너 삭제
  const deleteBanner = async (id: string) => {
    try {
      // 실제로는 API 호출
      // await fetch(`/api/banners/${id}`, {
      //   method: 'DELETE',
      // });

      setBanners((prev) => prev.filter((banner) => banner.id !== id));
    } catch (err) {
      setError("배너 삭제에 실패했습니다.");
      throw err;
    }
  };

  // 배너 순서 변경
  const reorderBanners = async (bannerIds: string[]) => {
    try {
      const updatedBanners = bannerIds
        .map((id, index) => {
          const banner = banners.find((b) => b.id === id);
          return banner ? { ...banner, order: index + 1 } : null;
        })
        .filter(Boolean) as Banner[];

      // 실제로는 API 호출
      // await fetch('/api/banners/reorder', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ bannerIds }),
      // });

      setBanners(updatedBanners);
    } catch (err) {
      setError("배너 순서 변경에 실패했습니다.");
      throw err;
    }
  };

  // 배너 상태 토글
  const toggleBannerStatus = async (id: string) => {
    try {
      const banner = banners.find((b) => b.id === id);
      if (!banner) return;

      await updateBanner(id, { isActive: !banner.isActive });
    } catch (err) {
      setError("배너 상태 변경에 실패했습니다.");
      throw err;
    }
  };

  useEffect(() => {
    loadBanners();
  }, []);

  return {
    banners,
    activeBanners: getActiveBanners(),
    loading,
    error,
    addBanner,
    updateBanner,
    deleteBanner,
    reorderBanners,
    toggleBannerStatus,
    reloadBanners: loadBanners,
  };
}
