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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Package,
  Tag,
  DollarSign,
  Upload,
  Download,
  Search,
  Filter,
  Eye,
  EyeOff,
  Star,
  ShoppingCart,
} from "lucide-react";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  salePrice?: number;
  category: string;
  collection: string;
  images: string[];
  colors: string[];
  sizes: string[];
  stock: number;
  isActive: boolean;
  isFeatured: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface Collection {
  id: string;
  name: string;
  description: string;
  image: string;
  isActive: boolean;
}

// Mock 데이터
const mockProducts: Product[] = [
  {
    id: "1",
    name: "LUMINA 시그니처 티셔츠",
    description: "프리미엄 코튼 소재의 시그니처 티셔츠",
    price: 89000,
    salePrice: 71000,
    category: "top",
    collection: "signature",
    images: [
      "/images/products/tshirt-1.jpg",
      "/images/products/tshirt-2.jpg",
      "/images/products/tshirt-3.jpg",
    ],
    colors: ["화이트", "블랙", "네이비"],
    sizes: ["S", "M", "L", "XL"],
    stock: 150,
    isActive: true,
    isFeatured: true,
    tags: ["시그니처", "베스트셀러", "신상"],
    createdAt: "2024-01-01",
    updatedAt: "2024-01-15",
  },
  {
    id: "2",
    name: "프리미엄 데님 팬츠",
    description: "고급 데님 소재의 프리미엄 팬츠",
    price: 129000,
    category: "bottom",
    collection: "premium",
    images: ["/images/products/jeans-1.jpg", "/images/products/jeans-2.jpg"],
    colors: ["블루", "블랙"],
    sizes: ["26", "27", "28", "29", "30"],
    stock: 80,
    isActive: true,
    isFeatured: false,
    tags: ["프리미엄", "데님"],
    createdAt: "2024-01-05",
    updatedAt: "2024-01-10",
  },
  {
    id: "3",
    name: "엘레간트 원피스",
    description: "우아한 실루엣의 엘레간트 원피스",
    price: 159000,
    salePrice: 127000,
    category: "dress",
    collection: "elegant",
    images: [
      "/images/products/dress-1.jpg",
      "/images/products/dress-2.jpg",
      "/images/products/dress-3.jpg",
    ],
    colors: ["블랙", "네이비", "베이지"],
    sizes: ["XS", "S", "M", "L"],
    stock: 45,
    isActive: true,
    isFeatured: true,
    tags: ["엘레간트", "원피스", "할인"],
    createdAt: "2024-01-10",
    updatedAt: "2024-01-12",
  },
];

const mockCollections: Collection[] = [
  {
    id: "1",
    name: "시그니처",
    description: "LUMINA의 대표 컬렉션",
    image: "/images/collections/signature.jpg",
    isActive: true,
  },
  {
    id: "2",
    name: "프리미엄",
    description: "고급스러운 프리미엄 컬렉션",
    image: "/images/collections/premium.jpg",
    isActive: true,
  },
  {
    id: "3",
    name: "엘레간트",
    description: "우아하고 세련된 엘레간트 컬렉션",
    image: "/images/collections/elegant.jpg",
    isActive: true,
  },
];

const categoryOptions = [
  { value: "top", label: "상의" },
  { value: "bottom", label: "하의" },
  { value: "dress", label: "원피스" },
  { value: "outer", label: "아우터" },
  { value: "accessory", label: "액세서리" },
];

const colorOptions = [
  "화이트",
  "블랙",
  "네이비",
  "블루",
  "베이지",
  "그레이",
  "핑크",
  "레드",
  "옐로우",
  "그린",
];

const sizeOptions = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "XXL",
  "26",
  "27",
  "28",
  "29",
  "30",
  "31",
  "32",
];

export default function ProductManager() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [collections, setCollections] = useState<Collection[]>(mockCollections);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // 새 상품 폼 상태
  const [newProduct, setNewProduct] = useState({
    name: "",
    description: "",
    price: 0,
    salePrice: 0,
    category: "top",
    collection: "",
    images: [] as string[],
    colors: [] as string[],
    sizes: [] as string[],
    stock: 0,
    tags: [] as string[],
  });

  // 필터링된 상품
  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesCollection =
      selectedCollection === "all" || product.collection === selectedCollection;
    return matchesSearch && matchesCategory && matchesCollection;
  });

  // 상품 생성
  const createProduct = () => {
    const product: Product = {
      id: Date.now().toString(),
      ...newProduct,
      isActive: true,
      isFeatured: false,
      createdAt: new Date().toISOString().split("T")[0],
      updatedAt: new Date().toISOString().split("T")[0],
    };
    setProducts([...products, product]);
    setIsCreateDialogOpen(false);
    setNewProduct({
      name: "",
      description: "",
      price: 0,
      salePrice: 0,
      category: "top",
      collection: "",
      images: [],
      colors: [],
      sizes: [],
      stock: 0,
      tags: [],
    });
  };

  // 상품 수정
  const updateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? {
              ...product,
              ...updates,
              updatedAt: new Date().toISOString().split("T")[0],
            }
          : product
      )
    );
    setEditingProduct(null);
    setIsEditDialogOpen(false);
  };

  // 상품 수정 다이얼로그 열기
  const openEditDialog = (product: Product) => {
    setEditingProduct(product);
    setIsEditDialogOpen(true);
  };

  // 상품 삭제
  const deleteProduct = (id: string) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  // 상품 활성화/비활성화
  const toggleProductStatus = (id: string) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, isActive: !product.isActive }
          : product
      )
    );
  };

  // 상품 피처드 토글
  const toggleProductFeatured = (id: string) => {
    setProducts(
      products.map((product) =>
        product.id === id
          ? { ...product, isFeatured: !product.isFeatured }
          : product
      )
    );
  };

  // 이미지 업로드 시뮬레이션
  const handleImageUpload = (files: FileList) => {
    const imageUrls = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );
    setNewProduct({
      ...newProduct,
      images: [...newProduct.images, ...imageUrls],
    });
  };

  // 대량 업로드 시뮬레이션
  const handleBulkUpload = (file: File) => {
    // CSV 파일 파싱 시뮬레이션
    console.log("대량 업로드 파일:", file.name);
    setIsBulkUploadDialogOpen(false);
  };

  // 통계 계산
  const activeProducts = products.filter((product) => product.isActive).length;
  const featuredProducts = products.filter(
    (product) => product.isFeatured
  ).length;
  const totalStock = products.reduce((sum, product) => sum + product.stock, 0);
  const totalValue = products.reduce(
    (sum, product) =>
      sum + (product.salePrice || product.price) * product.stock,
    0
  );

  return (
    <div className="space-y-6">
      {/* 통계 카드 */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">활성 상품</p>
                <p className="text-2xl font-bold text-blue-600">
                  {activeProducts}
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">피처드 상품</p>
                <p className="text-2xl font-bold text-purple-600">
                  {featuredProducts}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">총 재고</p>
                <p className="text-2xl font-bold text-green-600">
                  {totalStock}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <ShoppingCart className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  총 재고 가치
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  {totalValue.toLocaleString()}원
                </p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 상품 관리 */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>상품 관리</CardTitle>
              <CardDescription>상품을 등록하고 관리하세요</CardDescription>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="flex items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>엑셀 다운로드</span>
              </Button>
              <Dialog
                open={isBulkUploadDialogOpen}
                onOpenChange={setIsBulkUploadDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2"
                  >
                    <Upload className="w-4 h-4" />
                    <span>대량 업로드</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>대량 상품 업로드</DialogTitle>
                    <DialogDescription>
                      CSV 파일을 업로드하여 상품을 대량으로 등록하세요
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="bulk-upload">CSV 파일 선택</Label>
                      <Input
                        id="bulk-upload"
                        type="file"
                        accept=".csv"
                        onChange={(e) =>
                          e.target.files && handleBulkUpload(e.target.files[0])
                        }
                      />
                    </div>
                    <div className="text-sm text-gray-600">
                      <p>CSV 파일 형식:</p>
                      <p>
                        상품명,설명,가격,할인가격,카테고리,컬렉션,색상,사이즈,재고,태그
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="lumina-gradient text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    상품 등록
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>새 상품 등록</DialogTitle>
                    <DialogDescription>
                      새로운 상품을 등록하세요
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">상품명</Label>
                        <Input
                          id="name"
                          value={newProduct.name}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              name: e.target.value,
                            })
                          }
                          placeholder="상품명을 입력하세요"
                        />
                      </div>
                      <div>
                        <Label htmlFor="category">카테고리</Label>
                        <Select
                          value={newProduct.category}
                          onValueChange={(value) =>
                            setNewProduct({ ...newProduct, category: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {categoryOptions.map((category) => (
                              <SelectItem
                                key={category.value}
                                value={category.value}
                              >
                                {category.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="description">상품 설명</Label>
                      <Textarea
                        id="description"
                        value={newProduct.description}
                        onChange={(e) =>
                          setNewProduct({
                            ...newProduct,
                            description: e.target.value,
                          })
                        }
                        placeholder="상품에 대한 상세 설명을 입력하세요"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="price">정가</Label>
                        <Input
                          id="price"
                          type="number"
                          value={newProduct.price}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              price: parseInt(e.target.value),
                            })
                          }
                          placeholder="0"
                        />
                      </div>
                      <div>
                        <Label htmlFor="salePrice">할인가</Label>
                        <Input
                          id="salePrice"
                          type="number"
                          value={newProduct.salePrice}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              salePrice: parseInt(e.target.value),
                            })
                          }
                          placeholder="0 (선택사항)"
                        />
                      </div>
                      <div>
                        <Label htmlFor="stock">재고</Label>
                        <Input
                          id="stock"
                          type="number"
                          value={newProduct.stock}
                          onChange={(e) =>
                            setNewProduct({
                              ...newProduct,
                              stock: parseInt(e.target.value),
                            })
                          }
                          placeholder="0"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="collection">컬렉션</Label>
                        <Select
                          value={newProduct.collection}
                          onValueChange={(value) =>
                            setNewProduct({ ...newProduct, collection: value })
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="컬렉션 선택" />
                          </SelectTrigger>
                          <SelectContent>
                            {collections.map((collection) => (
                              <SelectItem
                                key={collection.id}
                                value={collection.id}
                              >
                                {collection.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="images">이미지 업로드</Label>
                        <Input
                          id="images"
                          type="file"
                          multiple
                          accept="image/*"
                          onChange={(e) =>
                            e.target.files && handleImageUpload(e.target.files)
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <Label>색상 옵션</Label>
                        <div className="grid grid-cols-5 gap-2 mt-2">
                          {colorOptions.map((color) => (
                            <button
                              key={color}
                              type="button"
                              onClick={() => {
                                const colors = newProduct.colors.includes(color)
                                  ? newProduct.colors.filter((c) => c !== color)
                                  : [...newProduct.colors, color];
                                setNewProduct({ ...newProduct, colors });
                              }}
                              className={`p-2 text-xs rounded border ${
                                newProduct.colors.includes(color)
                                  ? "bg-blue-100 border-blue-500 text-blue-700"
                                  : "bg-gray-50 border-gray-200 text-gray-700"
                              }`}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label>사이즈 옵션</Label>
                        <div className="grid grid-cols-4 gap-2 mt-2">
                          {sizeOptions.map((size) => (
                            <button
                              key={size}
                              type="button"
                              onClick={() => {
                                const sizes = newProduct.sizes.includes(size)
                                  ? newProduct.sizes.filter((s) => s !== size)
                                  : [...newProduct.sizes, size];
                                setNewProduct({ ...newProduct, sizes });
                              }}
                              className={`p-2 text-xs rounded border ${
                                newProduct.sizes.includes(size)
                                  ? "bg-blue-100 border-blue-500 text-blue-700"
                                  : "bg-gray-50 border-gray-200 text-gray-700"
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end space-x-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateDialogOpen(false)}
                      >
                        취소
                      </Button>
                      <Button
                        onClick={createProduct}
                        className="lumina-gradient text-white"
                      >
                        상품 등록
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>

              {/* 상품 수정 다이얼로그 */}
              <Dialog
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
              >
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>상품 수정</DialogTitle>
                    <DialogDescription>
                      상품 정보를 수정하세요
                    </DialogDescription>
                  </DialogHeader>
                  {editingProduct && (
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="edit-name">상품명</Label>
                          <Input
                            id="edit-name"
                            value={editingProduct.name}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                name: e.target.value,
                              })
                            }
                            placeholder="상품명을 입력하세요"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-category">카테고리</Label>
                          <Select
                            value={editingProduct.category}
                            onValueChange={(value) =>
                              setEditingProduct({
                                ...editingProduct,
                                category: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {categoryOptions.map((category) => (
                                <SelectItem
                                  key={category.value}
                                  value={category.value}
                                >
                                  {category.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="edit-description">상품 설명</Label>
                        <Textarea
                          id="edit-description"
                          value={editingProduct.description}
                          onChange={(e) =>
                            setEditingProduct({
                              ...editingProduct,
                              description: e.target.value,
                            })
                          }
                          placeholder="상품에 대한 상세 설명을 입력하세요"
                          rows={3}
                        />
                      </div>

                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <Label htmlFor="edit-price">정가</Label>
                          <Input
                            id="edit-price"
                            type="number"
                            value={editingProduct.price}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                price: parseInt(e.target.value),
                              })
                            }
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-salePrice">할인가</Label>
                          <Input
                            id="edit-salePrice"
                            type="number"
                            value={editingProduct.salePrice || ""}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                salePrice:
                                  parseInt(e.target.value) || undefined,
                              })
                            }
                            placeholder="0 (선택사항)"
                          />
                        </div>
                        <div>
                          <Label htmlFor="edit-stock">재고</Label>
                          <Input
                            id="edit-stock"
                            type="number"
                            value={editingProduct.stock}
                            onChange={(e) =>
                              setEditingProduct({
                                ...editingProduct,
                                stock: parseInt(e.target.value),
                              })
                            }
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="edit-collection">컬렉션</Label>
                          <Select
                            value={editingProduct.collection}
                            onValueChange={(value) =>
                              setEditingProduct({
                                ...editingProduct,
                                collection: value,
                              })
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="컬렉션 선택" />
                            </SelectTrigger>
                            <SelectContent>
                              {collections.map((collection) => (
                                <SelectItem
                                  key={collection.id}
                                  value={collection.id}
                                >
                                  {collection.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="edit-images">이미지 업로드</Label>
                          <Input
                            id="edit-images"
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={(e) =>
                              e.target.files &&
                              handleImageUpload(e.target.files)
                            }
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>색상 옵션</Label>
                          <div className="grid grid-cols-5 gap-2 mt-2">
                            {colorOptions.map((color) => (
                              <button
                                key={color}
                                type="button"
                                onClick={() => {
                                  const colors = editingProduct.colors.includes(
                                    color
                                  )
                                    ? editingProduct.colors.filter(
                                        (c) => c !== color
                                      )
                                    : [...editingProduct.colors, color];
                                  setEditingProduct({
                                    ...editingProduct,
                                    colors,
                                  });
                                }}
                                className={`p-2 text-xs rounded border ${
                                  editingProduct.colors.includes(color)
                                    ? "bg-blue-100 border-blue-500 text-blue-700"
                                    : "bg-gray-50 border-gray-200 text-gray-700"
                                }`}
                              >
                                {color}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div>
                          <Label>사이즈 옵션</Label>
                          <div className="grid grid-cols-4 gap-2 mt-2">
                            {sizeOptions.map((size) => (
                              <button
                                key={size}
                                type="button"
                                onClick={() => {
                                  const sizes = editingProduct.sizes.includes(
                                    size
                                  )
                                    ? editingProduct.sizes.filter(
                                        (s) => s !== size
                                      )
                                    : [...editingProduct.sizes, size];
                                  setEditingProduct({
                                    ...editingProduct,
                                    sizes,
                                  });
                                }}
                                className={`p-2 text-xs rounded border ${
                                  editingProduct.sizes.includes(size)
                                    ? "bg-blue-100 border-blue-500 text-blue-700"
                                    : "bg-gray-50 border-gray-200 text-gray-700"
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
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
                            updateProduct(editingProduct.id, editingProduct)
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
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="카테고리" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  {categoryOptions.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={selectedCollection}
                onValueChange={setSelectedCollection}
              >
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="컬렉션" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">전체</SelectItem>
                  {collections.map((collection) => (
                    <SelectItem key={collection.id} value={collection.id}>
                      {collection.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="상품명, 설명 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
            </div>
          </div>

          {/* 상품 목록 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Card
                key={product.id}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {/* 상품 이미지 */}
                    <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                      {product.images.length > 0 ? (
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <Image className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <div className="absolute top-2 right-2 flex space-x-1">
                        {product.isActive ? (
                          <Badge className="bg-green-100 text-green-800">
                            활성
                          </Badge>
                        ) : (
                          <Badge className="bg-gray-100 text-gray-800">
                            비활성
                          </Badge>
                        )}
                        {product.isFeatured && (
                          <Badge className="bg-purple-100 text-purple-800">
                            피처드
                          </Badge>
                        )}
                      </div>
                    </div>

                    {/* 상품 정보 */}
                    <div className="space-y-2">
                      <h3 className="font-medium text-gray-900">
                        {product.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </p>

                      <div className="flex items-center space-x-2">
                        {product.salePrice ? (
                          <>
                            <span className="text-lg font-bold text-red-600">
                              {product.salePrice.toLocaleString()}원
                            </span>
                            <span className="text-sm text-gray-500 line-through">
                              {product.price.toLocaleString()}원
                            </span>
                          </>
                        ) : (
                          <span className="text-lg font-bold text-gray-900">
                            {product.price.toLocaleString()}원
                          </span>
                        )}
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>재고: {product.stock}개</span>
                        <span>{product.category}</span>
                      </div>

                      {/* 옵션 정보 */}
                      <div className="space-y-1">
                        <div className="flex flex-wrap gap-1">
                          {product.colors.slice(0, 3).map((color) => (
                            <Badge
                              key={color}
                              variant="outline"
                              className="text-xs"
                            >
                              {color}
                            </Badge>
                          ))}
                          {product.colors.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.colors.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {product.sizes.slice(0, 3).map((size) => (
                            <Badge
                              key={size}
                              variant="outline"
                              className="text-xs"
                            >
                              {size}
                            </Badge>
                          ))}
                          {product.sizes.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.sizes.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* 액션 버튼 */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => openEditDialog(product)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleProductStatus(product.id)}
                        >
                          {product.isActive ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleProductFeatured(product.id)}
                        >
                          <Star
                            className={`w-4 h-4 ${
                              product.isFeatured
                                ? "fill-yellow-400 text-yellow-600"
                                : ""
                            }`}
                          />
                        </Button>
                      </div>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => deleteProduct(product.id)}
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
