import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// 컬렉션 타입 정의
export interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  productCount: number;
  productIds: string[]; // 연결된 상품 ID 목록
  createdAt: string;
  updatedAt: string;
  sortOrder?: number; // 정렬 순서
  isFeature?: boolean; // 피처 컬렉션 여부
  slug?: string; // URL용 슬러그
}

// 컬렉션 스토어 타입
interface CollectionStore {
  // 컬렉션 데이터
  collections: Collection[];

  // 검색 및 필터링
  searchTerm: string;
  showInactive: boolean;

  // 선택된 컬렉션 (수정용)
  selectedCollection: Collection | null;

  // 액션들
  // 컬렉션 관리
  addCollection: (
    collection: Omit<
      Collection,
      "id" | "createdAt" | "updatedAt" | "productCount"
    >
  ) => void;
  updateCollection: (id: string, updates: Partial<Collection>) => void;
  deleteCollection: (id: string) => void;
  getCollectionById: (id: string) => Collection | undefined;
  getCollectionBySlug: (slug: string) => Collection | undefined;

  // 상품-컬렉션 연결 관리
  addProductToCollection: (collectionId: string, productId: string) => void;
  removeProductFromCollection: (
    collectionId: string,
    productId: string
  ) => void;
  addProductsToCollection: (collectionId: string, productIds: string[]) => void;
  removeProductsFromCollection: (
    collectionId: string,
    productIds: string[]
  ) => void;
  getCollectionsByProductId: (productId: string) => Collection[];

  // 검색 및 필터링
  setSearchTerm: (term: string) => void;
  setShowInactive: (show: boolean) => void;

  // 선택된 컬렉션
  setSelectedCollection: (collection: Collection | null) => void;

  // 계산된 값들
  filteredCollections: Collection[];
  activeCollections: Collection[];
  featuredCollections: Collection[];
}

// 샘플 컬렉션 데이터
const sampleCollections: Collection[] = [
  {
    id: "1",
    name: "시그니처",
    description:
      "LUMINA의 대표 컬렉션으로, 브랜드의 핵심 아이덴티티를 담은 프리미엄 제품들",
    image: "/images/collections/signature.jpg",
    isActive: true,
    productCount: 0,
    productIds: [],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    sortOrder: 1,
    isFeature: true,
    slug: "signature",
  },
  {
    id: "2",
    name: "프리미엄",
    description: "고급스러운 소재와 세련된 디자인으로 완성된 프리미엄 컬렉션",
    image: "/images/collections/premium.jpg",
    isActive: true,
    productCount: 0,
    productIds: [],
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-10T00:00:00Z",
    sortOrder: 2,
    isFeature: true,
    slug: "premium",
  },
  {
    id: "3",
    name: "엘레간트",
    description: "우아하고 세련된 실루엣으로 완성된 엘레간트 컬렉션",
    image: "/images/collections/elegant.jpg",
    isActive: true,
    productCount: 0,
    productIds: [],
    createdAt: "2024-01-10T00:00:00Z",
    updatedAt: "2024-01-12T00:00:00Z",
    sortOrder: 3,
    isFeature: false,
    slug: "elegant",
  },
  {
    id: "4",
    name: "캐주얼",
    description: "편안하면서도 스타일리시한 일상복 컬렉션",
    image: "/images/collections/casual.jpg",
    isActive: false,
    productCount: 0,
    productIds: [],
    createdAt: "2024-01-15T00:00:00Z",
    updatedAt: "2024-01-15T00:00:00Z",
    sortOrder: 4,
    isFeature: false,
    slug: "casual",
  },
  {
    id: "basic",
    name: "베이직",
    description: "기본에 충실한 베이직 컬렉션",
    image: "/images/collections/basic.jpg",
    isActive: true,
    productCount: 0,
    productIds: ["1", "2", "4", "5"], // 기존 상품들을 베이직 컬렉션에 연결
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
    sortOrder: 5,
    isFeature: false,
    slug: "basic",
  },
  {
    id: "special",
    name: "스페셜",
    description: "특별한 순간을 위한 스페셜 컬렉션",
    image: "/images/collections/special.jpg",
    isActive: true,
    productCount: 0,
    productIds: ["3"], // 플로럴 원피스를 스페셜 컬렉션에 연결
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-25T00:00:00Z",
    sortOrder: 6,
    isFeature: true,
    slug: "special",
  },
];

// Zustand 스토어 생성
export const useCollectionStore = create<CollectionStore>()(
  devtools(
    persist(
      (set, get) => ({
        // 초기 상태
        collections: sampleCollections.map((collection) => ({
          ...collection,
          productCount: collection.productIds.length,
        })),

        // 검색 및 필터링
        searchTerm: "",
        showInactive: false,

        // 선택된 컬렉션
        selectedCollection: null,

        // 컬렉션 관리 액션들
        addCollection: (collection) => {
          const newCollection: Collection = {
            ...collection,
            id: Date.now().toString(),
            productCount: collection.productIds?.length || 0,
            productIds: collection.productIds || [],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            sortOrder: collection.sortOrder || 999,
            isFeature: collection.isFeature || false,
            slug:
              collection.slug ||
              collection.name.toLowerCase().replace(/\s+/g, "-"),
          };

          set((state) => ({
            collections: [...state.collections, newCollection],
          }));
        },

        updateCollection: (id, updates) => {
          set((state) => ({
            collections: state.collections.map((collection) =>
              collection.id === id
                ? {
                    ...collection,
                    ...updates,
                    updatedAt: new Date().toISOString(),
                  }
                : collection
            ),
          }));
        },

        deleteCollection: (id) => {
          set((state) => ({
            collections: state.collections.filter(
              (collection) => collection.id !== id
            ),
          }));
        },

        getCollectionById: (id) => {
          const { collections } = get();
          return collections.find((collection) => collection.id === id);
        },

        getCollectionBySlug: (slug) => {
          const { collections } = get();
          return collections.find((collection) => collection.slug === slug);
        },

        // 상품-컬렉션 연결 관리
        addProductToCollection: (collectionId, productId) => {
          set((state) => ({
            collections: state.collections.map((collection) =>
              collection.id === collectionId
                ? {
                    ...collection,
                    productIds: collection.productIds.includes(productId)
                      ? collection.productIds
                      : [...collection.productIds, productId],
                    productCount: collection.productIds.includes(productId)
                      ? collection.productCount
                      : collection.productCount + 1,
                    updatedAt: new Date().toISOString(),
                  }
                : collection
            ),
          }));
        },

        removeProductFromCollection: (collectionId, productId) => {
          set((state) => ({
            collections: state.collections.map((collection) =>
              collection.id === collectionId
                ? {
                    ...collection,
                    productIds: collection.productIds.filter(
                      (id) => id !== productId
                    ),
                    productCount: Math.max(0, collection.productCount - 1),
                    updatedAt: new Date().toISOString(),
                  }
                : collection
            ),
          }));
        },

        addProductsToCollection: (collectionId, productIds) => {
          set((state) => ({
            collections: state.collections.map((collection) =>
              collection.id === collectionId
                ? {
                    ...collection,
                    productIds: [
                      ...collection.productIds,
                      ...productIds.filter(
                        (id) => !collection.productIds.includes(id)
                      ),
                    ],
                    productCount:
                      collection.productCount +
                      productIds.filter(
                        (id) => !collection.productIds.includes(id)
                      ).length,
                    updatedAt: new Date().toISOString(),
                  }
                : collection
            ),
          }));
        },

        removeProductsFromCollection: (collectionId, productIds) => {
          set((state) => ({
            collections: state.collections.map((collection) =>
              collection.id === collectionId
                ? {
                    ...collection,
                    productIds: collection.productIds.filter(
                      (id) => !productIds.includes(id)
                    ),
                    productCount: Math.max(
                      0,
                      collection.productCount - productIds.length
                    ),
                    updatedAt: new Date().toISOString(),
                  }
                : collection
            ),
          }));
        },

        getCollectionsByProductId: (productId) => {
          const { collections } = get();
          return collections.filter((collection) =>
            collection.productIds.includes(productId)
          );
        },

        // 검색 및 필터링 액션들
        setSearchTerm: (term) => set({ searchTerm: term }),
        setShowInactive: (show) => set({ showInactive: show }),

        // 선택된 컬렉션 액션
        setSelectedCollection: (collection) =>
          set({ selectedCollection: collection }),

        // 계산된 값들
        get filteredCollections() {
          const { collections, searchTerm, showInactive } = get();

          let filtered = collections;

          // 활성화 컬렉션 필터링
          if (!showInactive) {
            filtered = filtered.filter((collection) => collection.isActive);
          }

          // 검색어 필터링
          if (searchTerm) {
            filtered = filtered.filter(
              (collection) =>
                collection.name
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase()) ||
                collection.description
                  .toLowerCase()
                  .includes(searchTerm.toLowerCase())
            );
          }

          // 정렬 순서대로 정렬
          filtered.sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));

          return filtered;
        },

        get activeCollections() {
          const { collections } = get();
          return collections
            .filter((collection) => collection.isActive)
            .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
        },

        get featuredCollections() {
          const { collections } = get();
          return collections
            .filter((collection) => collection.isActive && collection.isFeature)
            .sort((a, b) => (a.sortOrder || 999) - (b.sortOrder || 999));
        },
      }),
      {
        name: "collection-store",
      }
    ),
    {
      name: "collection-store",
    }
  )
);
