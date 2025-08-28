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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Plus,
  Edit,
  Trash2,
  Image,
  Tag,
  Eye,
  EyeOff,
  Search,
} from "lucide-react";

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
  productCount: number;
  createdAt: string;
  updatedAt: string;
}

// Mock 데이터
const mockCollections: Collection[] = [
  {
    id: "1",
    name: "시그니처",
    description:
      "LUMINA의 대표 컬렉션으로, 브랜드의 핵심 아이덴티티를 담은 프리미엄 제품들",
    image: "/images/collections/signature.jpg",
    isActive: true,
    productCount: 12,
    createdAt: "2025-01-01",
    updatedAt: "2025-01-15",
  },
  {
    id: "2",
    name: "프리미엄",
    description: "고급스러운 소재와 세련된 디자인으로 완성된 프리미엄 컬렉션",
    image: "/images/collections/premium.jpg",
    isActive: true,
    productCount: 8,
    createdAt: "2025-01-05",
    updatedAt: "2025-01-10",
  },
  {
    id: "3",
    name: "엘레간트",
    description: "우아하고 세련된 실루엣으로 완성된 엘레간트 컬렉션",
    image: "/images/collections/elegant.jpg",
    isActive: true,
    productCount: 15,
    createdAt: "2025-01-10",
    updatedAt: "2025-01-12",
  },
  {
    id: "4",
    name: "캐주얼",
    description: "편안하면서도 스타일리시한 일상복 컬렉션",
    image: "/images/collections/casual.jpg",
    isActive: false,
    productCount: 6,
    createdAt: "2025-01-15",
    updatedAt: "2025-01-20",
  },
];

export default function CollectionManager() {
  const [collections, setCollections] = useState<Collection[]>(mockCollections);
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingCollection, setEditingCollection] = useState<Collection | null>(
    null
  );

  // 새 컬렉션 폼 상태
  const [newCollection, setNewCollection] = useState({
    name: "",
    description: "",
    image: "",
  });

  // 필터링된 컬렉션
  const filteredCollections = collections.filter((collection) => {
    const matchesSearch =
      collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      collection.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  });

  // 컬렉션 생성
  const createCollection = () => {
    const collection: Collection = {
      id: Date.now().toString(),
      ...newCollection,
      isActive: true,
      productCount: 0,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setCollections([...collections, collection]);
    setIsCreateDialogOpen(false);
    setNewCollection({
      name: "",
      description: "",
      image: "",
    });
  };

  // 컬렉션 수정
  const updateCollection = (id: string, updates: Partial<Collection>) => {
    setCollections(
      collections.map((collection) =>
        collection.id === id
          ? {
              ...collection,
              ...updates,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : collection
      )
    );
    setEditingCollection(null);
    setIsEditDialogOpen(false);
  };

  // 컬렉션 수정 다이얼로그 열기
  const openEditDialog = (collection: Collection) => {
    setEditingCollection(collection);
    setIsEditDialogOpen(true);
  };

  // 컬렉션 삭제
  const deleteCollection = (id: string) => {
    setCollections(collections.filter((collection) => collection.id !== id));
  };

  // 컬렉션 활성화/비활성화
  const toggleCollectionStatus = (id: string) => {
    setCollections(
      collections.map((collection) =>
        collection.id === id
          ? { ...collection, isActive: !collection.isActive }
          : collection
      )
    );
  };

  // 이미지 업로드 시뮬레이션
  const handleImageUpload = (file: File) => {
    const imageUrl = URL.createObjectURL(file);
    setNewCollection({ ...newCollection, image: imageUrl });
  };

  // 통계 계산
  const activeCollections = collections.filter(
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
                  {activeCollections}
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
                        onClick={() =>
                          updateCollection(
                            editingCollection.id,
                            editingCollection
                          )
                        }
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
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleCollectionStatus(collection.id)}
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
                        onClick={() => deleteCollection(collection.id)}
                        className="text-red-600 hover:text-red-700"
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
    </div>
  );
}
