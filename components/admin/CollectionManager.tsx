"use client";

import React, { useState } from "react";
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

  const { products, filteredProducts } = useProductStore();

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isProductManageDialogOpen, setIsProductManageDialogOpen] =
    useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null
  );
  const [managingCollection, setManagingCollection] =
    useState<Collection | null>(null);

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
    setEditingCollection(collection);
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
    const collection = collections.find((c) => c.id === id);
    if (collection) {
      updateCollection(id, { isActive: !collection.isActive });
      toast({
        title: "상태 변경 완료",
        description: `컬렉션이 ${
          !collection.isActive ? "활성화" : "비활성화"
        }되었습니다.`,
        duration: 2000,
      });
    }
  };

  // 상품 관리 다이얼로그 열기
  const openProductManageDialog = (collection: Collection) => {
    setManagingCollection(collection);
    setIsProductManageDialogOpen(true);
  };

  // 상품을 컬렉션에 추가/제거
  const toggleProductInCollection = (
    productId: string,
    isSelected: boolean
  ) => {
    if (managingCollection) {
      if (isSelected) {
        addProductToCollection(managingCollection.id, productId);
      } else {
        removeProductFromCollection(managingCollection.id, productId);
      }
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">활성 컬렉션</p>
                <p className="text-2xl font-bold text-blue-600">
                  {activeCollectionsCount}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Tag className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 상품 수</p>
                <p className="text-2xl font-bold text-green-600">
                  {totalProducts}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Image className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  평균 상품 수
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {averageProductsPerCollection}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Tag className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 컬렉션 관리 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>컬렉션 관리</CardTitle>
              <CardDescription>컬렉션을 생성하고 관리하세요</CardDescription>
            </div>
            <Dialog
              open={isCreateDialogOpen}
              onOpenChange={setIsCreateDialogOpen}
            >
              <DialogTrigger asChild>
                <Button className="lumina-gradient text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  컬렉션 생성
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>새 컬렉션 생성</DialogTitle>
                  <DialogDescription>
                    새로운 컬렉션을 생성하세요
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
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
                    <Label htmlFor="image">컬렉션 이미지</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        e.target.files && handleImageUpload(e.target.files[0])
                      }
                    />
                  </div>

                  <div className="flex justify-end space-x-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsCreateDialogOpen(false)}
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
              <DialogContent className="max-w-2xl">
                <DialogHeader>
                  <DialogTitle>컬렉션 수정</DialogTitle>
                  <DialogDescription>
                    컬렉션 정보를 수정하세요
                  </DialogDescription>
                </DialogHeader>
                {editingCollection && (
                  <div className="space-y-4">
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
                      <Label htmlFor="edit-image">컬렉션 이미지</Label>
                      <Input
                        id="edit-image"
                        type="file"
                        accept="image/*"
                        onChange={(e) =>
                          e.target.files && handleImageUpload(e.target.files[0])
                        }
                      />
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsEditDialogOpen(false)}
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
          <div className="flex items-center justify-between mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="컬렉션명, 설명 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </div>

          {/* 컬렉션 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCollections.map((collection) => (
              <Card
                key={collection.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* 컬렉션 이미지 */}
                    <div className="relative aspect-video bg-gray-100 rounded-lg overflow-hidden">
                      {collection.image ? (
                        <img
                          src={collection.image}
                          alt={collection.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2">
                        {collection.isActive ? (
                          <Badge className="bg-green-100 text-green-800">
                            활성
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">
                            비활성
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* 컬렉션 정보 */}
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {collection.description}
                      </p>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>상품 수: {collection.productCount}개</span>
                        <span>{collection.createdAt}</span>
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(collection)}
                          title="컬렉션 수정"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openProductManageDialog(collection)}
                          title="상품 관리"
                        >
                          <Package className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleCollectionStatus(collection.id)}
                          title={collection.isActive ? "비활성화" : "활성화"}
                        >
                          {collection.isActive ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteCollection(collection.id)}
                        className="text-red-600 hover:text-red-700"
                        title="삭제"
                      >
                        <Trash2 className="w-4 h-4" />
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
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <Package className="w-5 h-5" />
              <span>{managingCollection?.name} 상품 관리</span>
            </DialogTitle>
            <DialogDescription>
              이 컬렉션에 포함할 상품을 선택하세요.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            {/* 상품 목록 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
              {products.map((product) => {
                const isSelected =
                  managingCollection?.productIds.includes(product.id) || false;
                return (
                  <div
                    key={product.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                      isSelected
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() =>
                      toggleProductInCollection(product.id, !isSelected)
                    }
                  >
                    <div className="flex items-start space-x-3">
                      <Checkbox
                        checked={isSelected}
                        onChange={() =>
                          toggleProductInCollection(product.id, !isSelected)
                        }
                        className="mt-1"
                      />
                      <div className="flex-1 min-w-0">
                        {product.images.length > 0 && (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-12 h-12 object-cover rounded mb-2"
                          />
                        )}
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
                );
              })}
            </div>

            {/* 선택된 상품 수 표시 */}
            <div className="text-sm text-gray-600 text-center py-2 bg-gray-50 rounded">
              선택된 상품: {managingCollection?.productIds.length || 0}개
            </div>

            {/* 액션 버튼 */}
            <div className="flex justify-end space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsProductManageDialogOpen(false)}
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
