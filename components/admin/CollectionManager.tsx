"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Plus,
  Edit,
  Trash2,
  Image,
  Tag,
  Eye,
  EyeOff,
  Search,
  Package,
  Settings,
} from "lucide-react";
import { useCollectionStore, Collection } from "@/stores/useCollectionStore";
import { useProductStore } from "@/stores/useProductStore";
import { useToast } from "@/hooks/use-toast";

// Collection 인터페이스는 이미 스토어에서 import됨

export default function CollectionManager() {
  const { toast } = useToast();
  const {
    collections,
    filteredCollections,
    activeCollections,
    addCollection,
    updateCollection,
    deleteCollection,
    searchTerm,
    setSearchTerm,
    setShowInactive,
    selectedCollection,
    setSelectedCollection,
    addProductToCollection,
    removeProductFromCollection,
    addProductsToCollection,
    removeProductsFromCollection,
  } = useCollectionStore();

  // 관리자는 기본적으로 비활성 컬렉션도 볼 수 있도록 설정
  useEffect(() => {
    setShowInactive(true);

    // 디버깅: 초기 컬렉션 상태 확인
    console.log("초기 컬렉션 로드:", collections);
    const casualCollection = collections.find((c) => c.id === "4");
    console.log("캐주얼 컬렉션 상태:", casualCollection);
  }, [setShowInactive, collections]);

  // 컬렉션 정보가 변경될 때 managing 컬렉션도 업데이트
  useEffect(() => {
    if (managingCollection) {
      const updatedCollection = collections.find(
        (c) => c.id === managingCollection.id
      );
      if (
        updatedCollection &&
        JSON.stringify(updatedCollection) !== JSON.stringify(managingCollection)
      ) {
        setManagingCollection(updatedCollection);
      }
    }
  }, [collections]);

  const { products, filteredProducts } = useProductStore();

  // 개발용: localStorage 초기화 함수
  const resetCollectionStore = () => {
    localStorage.removeItem("collection-store");
    window.location.reload();
  };

  // 전역에서 접근 가능하도록 설정 (개발용)
  useEffect(() => {
    (window as any).resetCollectionStore = resetCollectionStore;
    (window as any).logCollections = () =>
      console.log("현재 컬렉션들:", collections);
  }, [collections]);

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isProductManageDialogOpen, setIsProductManageDialogOpen] =
    useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null
  );
  const [managingCollection, setManagingCollection] =
    useState<Collection | null>(null);
  const [productSearchTerm, setProductSearchTerm] = useState("");
  const [, forceUpdate] = useState({});

  // 새 컬렉션 폼 상태
  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
    image: "",
    isFeature: false,
    sortOrder: 1,
    slug: "",
  });

  // 컬렉션 생성
  const createCollection = () => {
    addCollection({
      ...newCollection,
      isActive: true,
      productIds: [],
    });
    setIsCreateDialogOpen(false);
    setNewCollection({
      name: "",
      description: "",
      image: "",
      isFeature: false,
      sortOrder: 1,
      slug: "",
    });
    toast({
      title: "컬렉션 생성 완료",
      description: "새로운 컬렉션이 성공적으로 생성되었습니다.",
      duration: 3000,
    });
  };

  // 컬렉션 수정 다이얼로그 열기
  const openEditDialog = (collection: Collection) => {
    setEditingCollection({ ...collection }); // 깊은 복사로 수정
    setIsEditDialogOpen(true);
  };

  // 컬렉션 수정 저장
  const saveCollection = () => {
    if (editingCollection) {
      updateCollection(editingCollection.id, editingCollection);
      setEditingCollection(null);
      setIsEditDialogOpen(false);
      toast({
        title: "컬렉션 수정 완료",
        description: "컬렉션 정보가 성공적으로 수정되었습니다.",
        duration: 3000,
      });
    }
  };

  // 컬렉션 삭제
  const handleDeleteCollection = (id: string) => {
    deleteCollection(id);
    toast({
      title: "컬렉션 삭제 완료",
      description: "컬렉션이 성공적으로 삭제되었습니다.",
      duration: 3000,
    });
  };

  // 컬렉션 활성화/비활성화
  const toggleCollectionStatus = (id: string) => {
    console.log("=== 토글 시작 ===");
    console.log("toggleCollectionStatus 호출됨:", id);
    console.log("현재 전체 컬렉션:", collections);

    const collection = collections.find((c) => c.id === id);
    console.log("찾은 컬렉션:", collection);

    if (collection) {
      const newStatus = !collection.isActive;
      console.log("현재 상태:", collection.isActive, "새로운 상태:", newStatus);

      updateCollection(id, { isActive: newStatus });

      // 강제 리렌더링
      setTimeout(() => {
        forceUpdate({});
        console.log("강제 리렌더링 실행");

        // 업데이트 후 상태 확인
        const updatedCollection = collections.find((c) => c.id === id);
        console.log("업데이트 후 컬렉션:", updatedCollection);
      }, 200);

      toast({
        title: "상태 변경 완료",
        description: `컬렉션이 ${newStatus ? "활성화" : "비활성화"}되었습니다.`,
        duration: 2000,
      });
    } else {
      console.error("컬렉션을 찾을 수 없음:", id);
    }
    console.log("=== 토글 종료 ===");
  };

  // 상품 관리 다이얼로그 열기
  const openProductManageDialog = (collection: Collection) => {
    // 최신 컬렉션 정보 가져오기
    const latestCollection = collections.find((c) => c.id === collection.id);
    setManagingCollection(latestCollection || collection);
    setProductSearchTerm(""); // 검색어 초기화
    setIsProductManageDialogOpen(true);
  };

  // 상품 검색 필터링
  const filteredProductsForDialog = products.filter(
    (product) =>
      product.name.toLowerCase().includes(productSearchTerm.toLowerCase()) ||
      product.description
        .toLowerCase()
        .includes(productSearchTerm.toLowerCase())
  );

  // 상품을 컬렉션에 추가/제거
  const toggleProductInCollection = (productId: string, shouldAdd: boolean) => {
    if (managingCollection) {
      if (shouldAdd) {
        addProductToCollection(managingCollection.id, productId);
      } else {
        removeProductFromCollection(managingCollection.id, productId);
      }
      // 강제 리렌더링을 위해 상태 업데이트
      forceUpdate({});
    }
  };

  // 전체 상품 선택/해제
  const toggleAllProducts = () => {
    if (managingCollection) {
      const allProductIds = filteredProductsForDialog.map((p) => p.id);
      const selectedProductIds = managingCollection.productIds;
      const allSelected = allProductIds.every((id) =>
        selectedProductIds.includes(id)
      );

      if (allSelected) {
        // 전체 해제
        removeProductsFromCollection(managingCollection.id, allProductIds);
      } else {
        // 전체 선택
        addProductsToCollection(managingCollection.id, allProductIds);
      }
      // 강제 리렌더링을 위해 상태 업데이트
      forceUpdate({});
    }
  };

  // 이미지 업로드 시뮬레이션
  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setNewCollection({ ...newCollection, image: imageUrl });
  };

  // 통계 계산
  const activeCollectionsCount = collections.filter(
    (collection) => collection.isActive
  ).length;
  const totalProducts = collections.reduce(
    (sum, collection) => sum + collection.productCount,
    0
  );
  const averageProductsPerCollection =
    collections.length > 0 ? Math.round(totalProducts / collections.length) : 0;

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-3 gap-2 lg:gap-6">
        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-blue-200 dark:border-blue-700 hover:shadow-md transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
              <div className="flex items-center space-x-2 lg:space-x-0 lg:block">
                <div className="w-8 h-8 lg:hidden bg-blue-200 dark:bg-blue-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Tag className="w-4 h-4 text-blue-700 dark:text-blue-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-blue-700 dark:text-blue-300 truncate">
                    활성 컬렉션
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-blue-900 dark:text-blue-100">
                    {activeCollectionsCount}
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex w-12 h-12 bg-blue-200 dark:bg-blue-700 rounded-xl items-center justify-center">
                <Tag className="w-6 h-6 text-blue-700 dark:text-blue-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-green-200 dark:border-green-700 hover:shadow-md transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
              <div className="flex items-center space-x-2 lg:space-x-0 lg:block">
                <div className="w-8 h-8 lg:hidden bg-green-200 dark:bg-green-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-4 h-4 text-green-700 dark:text-green-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-green-700 dark:text-green-300 truncate">
                    총 상품 수
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-green-900 dark:text-green-100">
                    {totalProducts}
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex w-12 h-12 bg-green-200 dark:bg-green-700 rounded-xl items-center justify-center">
                <Package className="w-6 h-6 text-green-700 dark:text-green-300" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 border-purple-200 dark:border-purple-700 hover:shadow-md transition-shadow">
          <CardContent className="p-3 lg:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-2 lg:space-y-0">
              <div className="flex items-center space-x-2 lg:space-x-0 lg:block">
                <div className="w-8 h-8 lg:hidden bg-purple-200 dark:bg-purple-700 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Tag className="w-4 h-4 text-purple-700 dark:text-purple-300" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-medium text-purple-700 dark:text-purple-300 truncate">
                    평균 상품 수
                  </p>
                  <p className="text-lg lg:text-2xl font-bold text-purple-900 dark:text-purple-100">
                    {averageProductsPerCollection}
                  </p>
                </div>
              </div>
              <div className="hidden lg:flex w-12 h-12 bg-purple-200 dark:bg-purple-700 rounded-xl items-center justify-center">
                <Tag className="w-6 h-6 text-purple-700 dark:text-purple-300" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 컬렉션 관리 */}
      <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-gray-100">
                컬렉션 관리
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                컬렉션을 생성하고 관리하세요
              </CardDescription>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 text-white w-full sm:w-fit"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  <span className="hidden sm:inline">컬렉션 생성</span>
                  <span className="sm:hidden">생성</span>
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-0">
                <DialogHeader className="p-6 pb-4 sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <DialogTitle className="text-gray-900 dark:text-gray-100">
                        새 컬렉션 생성
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400 mt-1">
                        새로운 컬렉션을 생성하세요
                      </DialogDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsCreateDialogOpen(false)}
                      className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label="닫기"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </Button>
                  </div>
                </DialogHeader>
                <div className="space-y-4 p-6 pt-4">
                  <div>
                    <Label htmlFor="name">컬렉션명</Label>
                    <Input
                      id="name"
                      value={newCollection.name}
                      onChange={(e) =>
                        setNewCollection({
                          ...newCollection,
                          name: e.target.value,
                        })
                      }
                      placeholder="컬렉션명을 입력하세요"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">설명</Label>
                    <Textarea
                      id="description"
                      value={newCollection.description}
                      onChange={(e) =>
                        setNewCollection({
                          ...newCollection,
                          description: e.target.value,
                        })
                      }
                      placeholder="컬렉션에 대한 설명을 입력하세요"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">이미지 URL</Label>
                    <Input
                      id="image"
                      value={newCollection.image}
                      onChange={(e) =>
                        setNewCollection({
                          ...newCollection,
                          image: e.target.value,
                        })
                      }
                      placeholder="이미지 URL을 입력하세요"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="slug">슬러그</Label>
                      <Input
                        id="slug"
                        value={newCollection.slug}
                        onChange={(e) =>
                          setNewCollection({
                            ...newCollection,
                            slug: e.target.value,
                          })
                        }
                        placeholder="URL용 슬러그"
                      />
                    </div>
                    <div>
                      <Label htmlFor="sortOrder">정렬 순서</Label>
                      <Input
                        id="sortOrder"
                        type="number"
                        value={newCollection.sortOrder}
                        onChange={(e) =>
                          setNewCollection({
                            ...newCollection,
                            sortOrder: parseInt(e.target.value),
                          })
                        }
                        placeholder="정렬 순서"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isFeature"
                      checked={newCollection.isFeature}
                      onCheckedChange={(checked) =>
                        setNewCollection({
                          ...newCollection,
                          isFeature: checked as boolean,
                        })
                      }
                    />
                    <Label htmlFor="isFeature">피처 컬렉션으로 설정</Label>
                  </div>

                  <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      취소
                    </Button>
                    <Button
                      onClick={createCollection}
                      className="lumina-gradient text-white"
                    >
                      컬렉션 생성
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* 컬렉션 수정 다이얼로그 */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-0">
                <DialogHeader className="p-6 pb-4 sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <DialogTitle className="text-gray-900 dark:text-gray-100">
                        컬렉션 수정
                      </DialogTitle>
                      <DialogDescription className="text-gray-600 dark:text-gray-400 mt-1">
                        컬렉션 정보를 수정하세요
                      </DialogDescription>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditDialogOpen(false)}
                      className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      aria-label="닫기"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </Button>
                  </div>
                </DialogHeader>
                {editingCollection && (
                  <div className="space-y-4 p-6 pt-4">
                    <div>
                      <Label htmlFor="edit-name">컬렉션명</Label>
                      <Input
                        id="edit-name"
                        value={editingCollection.name}
                        onChange={(e) =>
                          setEditingCollection({
                            ...editingCollection,
                            name: e.target.value,
                          })
                        }
                        placeholder="컬렉션명을 입력하세요"
                      />
                    </div>

                    <div>
                      <Label htmlFor="edit-description">설명</Label>
                      <Textarea
                        id="edit-description"
                        value={editingCollection.description}
                        onChange={(e) =>
                          setEditingCollection({
                            ...editingCollection,
                            description: e.target.value,
                          })
                        }
                        placeholder="컬렉션에 대한 설명을 입력하세요"
                        rows={3}
                      />
                    </div>

                    <div>
                      <Label htmlFor="edit-image">이미지 URL</Label>
                      <Input
                        id="edit-image"
                        value={editingCollection.image}
                        onChange={(e) =>
                          setEditingCollection({
                            ...editingCollection,
                            image: e.target.value,
                          })
                        }
                        placeholder="이미지 URL을 입력하세요"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="edit-slug">슬러그</Label>
                        <Input
                          id="edit-slug"
                          value={editingCollection.slug || ""}
                          onChange={(e) =>
                            setEditingCollection({
                              ...editingCollection,
                              slug: e.target.value,
                            })
                          }
                          placeholder="URL용 슬러그"
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-sortOrder">정렬 순서</Label>
                        <Input
                          id="edit-sortOrder"
                          type="number"
                          value={editingCollection.sortOrder || 1}
                          onChange={(e) =>
                            setEditingCollection({
                              ...editingCollection,
                              sortOrder: parseInt(e.target.value),
                            })
                          }
                          placeholder="정렬 순서"
                        />
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="edit-isActive"
                          checked={editingCollection.isActive}
                          onCheckedChange={(checked) =>
                            setEditingCollection({
                              ...editingCollection,
                              isActive: checked as boolean,
                            })
                          }
                        />
                        <Label htmlFor="edit-isActive">활성화</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="edit-isFeature"
                          checked={editingCollection.isFeature || false}
                          onCheckedChange={(checked) =>
                            setEditingCollection({
                              ...editingCollection,
                              isFeature: checked as boolean,
                            })
                          }
                        />
                        <Label htmlFor="edit-isFeature">피처 컬렉션</Label>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(false)}
                        className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                      >
                        취소
                      </Button>
                      <Button
                        onClick={saveCollection}
                        className="lumina-gradient text-white"
                      >
                        수정 완료
                      </Button>
                    </div>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 lg:max-w-xs">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
              <Input
                placeholder="컬렉션명, 설명 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
          </div>

          {/* 컬렉션 목록 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
            {collections.map((collection) => (
              <Card
                key={collection.id}
                className={`hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${
                  !collection.isActive
                    ? "border-gray-300 dark:border-gray-600"
                    : ""
                }`}
              >
                <CardContent className="p-4 sm:p-6">
                  <div className="space-y-3 sm:space-y-4">
                    {/* 컬렉션 이미지 */}
                    <div
                      className={`relative aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden ${
                        !collection.isActive ? "opacity-70" : ""
                      }`}
                    >
                      {collection.image ? (
                        <img
                          src={collection.image}
                          alt={`${collection.name} 컬렉션 이미지`}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex flex-col gap-1">
                        {(() => {
                          console.log(
                            `컬렉션 ${collection.name} 배지 렌더링:`,
                            {
                              id: collection.id,
                              isActive: collection.isActive,
                              isFeature: collection.isFeature,
                            }
                          );
                          return collection.isActive ? (
                            <Badge className="bg-green-100 dark:bg-green-700 text-green-800 dark:text-green-200 hover:bg-green-100 dark:hover:bg-green-700 text-xs">
                              활성
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 text-xs">
                              비활성
                            </Badge>
                          );
                        })()}
                        {collection.isFeature && (
                          <Badge className="bg-purple-100 dark:bg-purple-700 text-purple-800 dark:text-purple-200 hover:bg-purple-100 dark:hover:bg-purple-700 text-xs">
                            피처
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* 컬렉션 정보 */}
                    <div
                      className={`space-y-2 ${
                        !collection.isActive ? "opacity-70" : ""
                      }`}
                    >
                      <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100">
                        {collection.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                        {collection.description}
                      </p>

                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-1 sm:space-y-0 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                        <span>상품 수: {collection.productCount}개</span>
                        <span className="truncate">{collection.createdAt}</span>
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex items-center justify-between pt-2 opacity-100">
                      <div className="flex items-center space-x-1 sm:space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(collection)}
                          title="컬렉션 수정"
                          className="hover:bg-blue-50 dark:hover:bg-blue-900/20 hover:border-blue-300 dark:hover:border-blue-600 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 p-1.5 sm:p-2"
                        >
                          <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openProductManageDialog(collection)}
                          title="상품 관리"
                          className="hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-600 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 p-1.5 sm:p-2"
                        >
                          <Package className="w-3 h-3 sm:w-4 sm:h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleCollectionStatus(collection.id)}
                          title={collection.isActive ? "비활성화" : "활성화"}
                          className={`border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 p-1.5 sm:p-2 ${
                            collection.isActive
                              ? "hover:bg-orange-50 dark:hover:bg-orange-900/20 hover:border-orange-300 dark:hover:border-orange-600"
                              : "hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-300 dark:hover:border-green-600"
                          }`}
                        >
                          {collection.isActive ? (
                            <EyeOff className="w-3 h-3 sm:w-4 sm:h-4" />
                          ) : (
                            <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                          )}
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteCollection(collection.id)}
                        className="text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-600 border-gray-300 dark:border-gray-600 p-1.5 sm:p-2"
                        title="삭제"
                      >
                        <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 상품 관리 다이얼로그 */}
      <Dialog
        open={isProductManageDialogOpen}
        onOpenChange={setIsProductManageDialogOpen}
      >
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 p-0">
          <DialogHeader className="p-6 pb-4 sticky top-0 z-10 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="flex items-center space-x-2 text-lg sm:text-xl text-gray-900 dark:text-gray-100">
                  <Package className="w-5 h-5" />
                  <span className="truncate">
                    {managingCollection?.name} 상품 관리
                  </span>
                </DialogTitle>
                <DialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                  이 컬렉션에 포함할 상품을 선택하세요.
                </DialogDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsProductManageDialogOpen(false)}
                className="h-8 w-8 p-0 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                aria-label="닫기"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>
          </DialogHeader>

          <div className="space-y-4 p-6 pt-4">
            {/* 상품 검색 및 전체 선택 */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                <Input
                  placeholder="상품명으로 검색..."
                  value={productSearchTerm}
                  onChange={(e) => setProductSearchTerm(e.target.value)}
                  className="pl-10 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <Button
                variant="outline"
                onClick={toggleAllProducts}
                className="whitespace-nowrap w-full sm:w-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                size="sm"
              >
                {filteredProductsForDialog.every((p) =>
                  managingCollection?.productIds.includes(p.id)
                )
                  ? "전체 해제"
                  : "전체 선택"}
              </Button>
            </div>

            {/* 상품 목록 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 max-h-96 overflow-y-auto">
              {filteredProductsForDialog.map((product) => {
                const isSelected =
                  managingCollection?.productIds.includes(product.id) || false;
                return (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-3 lg:p-4 cursor-pointer transition-colors ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={(e) => {
                      // 체크박스 클릭이 아닌 경우에만 토글
                      if ((e.target as HTMLElement).tagName !== "BUTTON") {
                        toggleProductInCollection(product.id, !isSelected);
                      }
                    }}
                  >
                    <div className="flex items-start space-x-2 lg:space-x-3">
                      <Checkbox
                        checked={isSelected}
                        onCheckedChange={(checked) =>
                          toggleProductInCollection(product.id, !!checked)
                        }
                        className="mt-1 flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start space-x-2">
                          {product.images.length > 0 && (
                            <img
                              src={product.images[0]}
                              alt={`${product.name} 상품 이미지`}
                              className="w-10 h-10 lg:w-12 lg:h-12 object-cover rounded flex-shrink-0"
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <h4 className="text-sm font-medium text-gray-900 truncate">
                              {product.name}
                            </h4>
                            <p className="text-sm text-gray-500">
                              {product.price.toLocaleString()}원
                            </p>
                            <p className="text-xs text-gray-400">
                              {product.category}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 선택된 상품 수 표시 */}
            <div className="text-sm text-gray-600 dark:text-gray-400 text-center py-2 bg-gray-50 dark:bg-gray-700 rounded">
              선택된 상품: {managingCollection?.productIds.length || 0}개
            </div>

            {/* 액션 버튼 */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-2 pt-4 border-t border-gray-200 dark:border-gray-700">
              <Button
                variant="outline"
                onClick={() => setIsProductManageDialogOpen(false)}
                className="w-full sm:w-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                닫기
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
