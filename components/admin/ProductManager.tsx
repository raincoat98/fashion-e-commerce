"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useToast } from "@/hooks/use-toast";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
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
  ImagePlus,
  X,
  Save,
  Home,
} from "lucide-react";
import { useProductStore, Product } from "@/stores/useProductStore";
import { useCollectionStore, Collection } from "@/stores/useCollectionStore";

// Mock 데이터 (실제로는 스토어에서 가져오므로 사용되지 않음)
const mockProducts: Product[] = []; /* 사용되지 않는 mock 데이터
const unusedMockProducts = [
  {
    id: "1",
    name: "LUMINA 시그니처 티셔츠",
    description: "프리미엄 코튼 소재의 시그니처 티셔츠",
    price: 89000,
    originalPrice: 120000,
    category: "상의",
    subCategory: "티셔츠",
    images: [
      "https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1805411/pexels-photo-1805411.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    colors: ["화이트", "블랙", "네이비"],
    sizes: ["S", "M", "L", "XL"],
    stock: 150,
    isActive: true,
    isSale: true,
    isFeatured: true,
    tags: ["시그니처", "베스트셀러", "신상"],
    isLimited: false,
    isHot: true,
    isNew: false,
    isBest: false,
    rating: 4.8,
    reviewCount: 156,
    createdAt: "2025-01-01T00:00:00Z",
    updatedAt: "2025-01-15T00:00:00Z",
  },
  {
    id: "2",
    name: "프리미엄 데님 팬츠",
    description: "고급 데님 소재의 프리미엄 팬츠",
    price: 129000,
    originalPrice: 159000,
    category: "하의",
    subCategory: "팬츠",
    images: [
      "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800",
      "https://images.pexels.com/photos/852860/pexels-photo-852860.jpeg?auto=compress&cs=tinysrgb&w=800",
    ],
    colors: ["블루", "블랙"],
    sizes: ["26", "27", "28", "29", "30"],
    stock: 80,
    isActive: true,
    isFeatured: false,
    tags: ["프리미엄", "데님"],
    isLimited: false,
    isHot: false,
    isNew: true,
    isBest: false,
    badge: "NEW",
    createdAt: "2025-01-05",
    updatedAt: "2025-01-10",
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
    isLimited: true,
    isHot: false,
    isNew: false,
    isBest: false,
    badge: "LIMITED",
    createdAt: "2025-01-10",
    updatedAt: "2025-01-12",
  },
]; */

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

interface ProductManagerProps {
  onEditProduct?: (product: Product) => void;
}

// ProductForm에서 사용하는 인터페이스 추가
interface ProductFormData {
  name: string;
  price: number;
  originalPrice: number;
  description: string;
  images: string[];
  badge?: string;
  category: string;
  collection?: string;
  materials: string;
  care: string;
  modelInfo: string;
  features: string[];
  isActive?: boolean;
  isLimited?: boolean;
  isHot?: boolean;
  isNew?: boolean;
  isBest?: boolean;
  isFeatured?: boolean;
}

export default function ProductManager({ onEditProduct }: ProductManagerProps) {
  const { toast } = useToast();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    setSearchTerm,
    setSelectedCategory,
    setShowInactive,
    searchTerm,
    selectedCategory,
    showInactive,
    filteredProducts,
  } = useProductStore();

  // 컬렉션 스토어
  const {
    collections,
    activeCollections,
    addProductToCollection,
    removeProductFromCollection,
    getCollectionsByProductId,
  } = useCollectionStore();

  // 관리자는 기본적으로 비활성화 상품도 보기
  React.useEffect(() => {
    setShowInactive(true);
  }, [setShowInactive]);

  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [isBulkUploadDialogOpen, setIsBulkUploadDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [, forceUpdate] = useState({});

  // ProductForm 통합을 위한 상태
  const [showProductForm, setShowProductForm] = useState(false);
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    price: 0,
    originalPrice: 0,
    description: "",
    images: [],
    category: "top",
    collection: "none",
    materials: "",
    care: "",
    modelInfo: "",
    features: [""],
    isActive: true,
    isLimited: false,
    isHot: false,
    isNew: false,
    isBest: false,
    isFeatured: false,
  });

  const [sizes, setSizes] = useState([
    { name: "S", available: true, stock: 10 },
    { name: "M", available: true, stock: 15 },
    { name: "L", available: true, stock: 12 },
  ]);

  const [colors, setColors] = useState([
    { name: "Black", hex: "#000000", available: true },
    { name: "White", hex: "#FFFFFF", available: true },
    { name: "Gray", hex: "#9CA3AF", available: true },
  ]);

  const [newImage, setNewImage] = useState("");
  const [newFeature, setNewFeature] = useState("");

  // 사이즈 상태 변경 모니터링
  useEffect(() => {
    console.log("사이즈 상태 변경:", sizes);
  }, [sizes]);

  // 카테고리 변경 시 사이즈 업데이트
  useEffect(() => {
    console.log("카테고리 변경 감지:", formData.category);
    if (formData.category === "bottom") {
      console.log("하의 카테고리 - 사이즈 업데이트");
      setSizes([
        { name: "26", available: true, stock: 10 },
        { name: "27", available: true, stock: 15 },
        { name: "28", available: true, stock: 12 },
      ]);
    } else if (formData.category === "top") {
      console.log("상의 카테고리 - 사이즈 업데이트");
      setSizes([
        { name: "S", available: true, stock: 10 },
        { name: "M", available: true, stock: 15 },
        { name: "L", available: true, stock: 12 },
      ]);
    }
  }, [formData.category]);

  // 컬렉션 필터링을 위한 추가 필터링
  const finalFilteredProducts = React.useMemo(() => {
    console.log("finalFilteredProducts 계산 시작:", {
      filteredProductsLength: filteredProducts.length,
      selectedCollection,
    });

    let filtered = filteredProducts;

    // 컬렉션 필터링 (스토어의 filteredProducts에 컬렉션 필터가 없으므로 추가)
    if (selectedCollection !== "all") {
      const collection = collections.find((c) => c.id === selectedCollection);
      if (collection) {
        filtered = filtered.filter((product) =>
          collection.productIds.includes(product.id)
        );
      }
    }

    console.log("finalFilteredProducts 계산 완료:", {
      originalLength: filteredProducts.length,
      filteredLength: filtered.length,
      firstProduct: filtered[0],
    });

    return filtered;
  }, [filteredProducts, selectedCollection, collections]);

  // 상품 수정 다이얼로그 열기
  const openEditDialog = (product: Product) => {
    if (onEditProduct) {
      onEditProduct(product);
    } else {
      // 수정할 상품 데이터를 폼에 설정
      // 상품이 속한 컬렉션 찾기
      const productCollections = getCollectionsByProductId(product.id);
      const currentCollection =
        productCollections.length > 0 ? productCollections[0].id : "none";

      setFormData({
        name: product.name,
        price: product.price,
        originalPrice: product.salePrice || product.price,
        description: product.description,
        images: product.images,
        category: product.category,
        collection: currentCollection,
        materials: "", // 기존 데이터에 없으므로 빈 값
        care: "", // 기존 데이터에 없으므로 빈 값
        modelInfo: "", // 기존 데이터에 없으므로 빈 값
        features: product.tags.length > 0 ? product.tags : [""],
        isLimited: product.isLimited || false,
        isHot: product.isHot || false,
        isNew: product.isNew || false,
        isBest: product.isBest || false,
      });

      // 사이즈와 색상 데이터 설정
      setSizes(
        product.sizes.map((size) => ({
          name: size,
          available: true, // 기본값
          stock: Math.floor(product.stock / product.sizes.length), // 재고를 사이즈 개수로 나눔
        }))
      );

      setColors(
        product.colors.map((color) => ({
          name: color,
          hex: "#000000", // 기본값
          available: true,
        }))
      );

      setEditingProduct(product);
      setShowProductForm(true);
    }
  };

  // 상품 삭제
  const handleDeleteProduct = (id: string) => {
    const productToDelete = products.find((product) => product.id === id);
    deleteProduct(id);

    toast({
      title: "상품 삭제 완료",
      description: `${productToDelete?.name || "상품"}이 삭제되었습니다.`,
      duration: 3000,
    });
  };

  // 상품 활성화/비활성화
  const toggleProductStatus = React.useCallback(
    (id: string) => {
      const product = products.find((p) => p.id === id);
      const newStatus = !product?.isActive;

      console.log("상품 상태 변경 전:", {
        id,
        currentStatus: product?.isActive,
        newStatus,
      });

      updateProduct(id, { isActive: newStatus });

      // 강제 리렌더링
      setTimeout(() => {
        forceUpdate({});
        console.log("강제 리렌더링 실행");
      }, 100);

      console.log(
        "상품 상태 변경 후 - products:",
        products.find((p) => p.id === id)
      );

      toast({
        title: "상품 상태 변경",
        description: `${product?.name || "상품"}이 ${
          newStatus ? "활성화" : "비활성화"
        }되었습니다.`,
        duration: 2000,
      });
    },
    [products, updateProduct, forceUpdate, toast]
  );

  // 상품 피처드 토글
  const toggleProductFeatured = React.useCallback(
    (id: string) => {
      const product = products.find((p) => p.id === id);
      const newFeatured = !product?.isFeatured;

      updateProduct(id, { isFeatured: newFeatured });

      // 강제 리렌더링
      setTimeout(() => {
        forceUpdate({});
      }, 100);

      toast({
        title: "피처드 상태 변경",
        description: `${product?.name || "상품"}이 ${
          newFeatured ? "피처드" : "일반"
        } 상품으로 변경되었습니다.`,
        duration: 2000,
      });
    },
    [products, updateProduct, forceUpdate, toast]
  );

  // 대량 업로드 시뮬레이션
  const handleBulkUpload = (file: File) => {
    // CSV 파일 파싱 시뮬레이션
    console.log("대량 업로드 파일:", file.name);
    setIsBulkUploadDialogOpen(false);
  };

  // ProductForm 함수들
  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSizeChange = (index: number, field: string, value: any) => {
    const newSizes = [...sizes];
    newSizes[index] = { ...newSizes[index], [field]: value };
    setSizes(newSizes);
  };

  const handleColorChange = (index: number, field: string, value: any) => {
    const newColors = [...colors];
    newColors[index] = { ...newColors[index], [field]: value };
    setColors(newColors);
  };

  const addSize = () => {
    const defaultSize = formData.category === "bottom" ? "26" : "S";
    setSizes([...sizes, { name: defaultSize, available: true, stock: 0 }]);
  };

  const removeSize = (index: number) => {
    setSizes(sizes.filter((_, i) => i !== index));
  };

  const addColor = () => {
    setColors([...colors, { name: "", hex: "#000000", available: true }]);
  };

  const removeColor = (index: number) => {
    setColors(colors.filter((_, i) => i !== index));
  };

  const addImage = () => {
    if (newImage.trim()) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, newImage.trim()],
      }));
      setNewImage("");
    }
  };

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const addFeature = () => {
    if (newFeature.trim()) {
      setFormData((prev) => ({
        ...prev,
        features: [...prev.features, newFeature.trim()],
      }));
      setNewFeature("");
    }
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index),
    }));
  };

  const getBadgeText = () => {
    if (formData.isLimited) return "LIMITED";
    if (formData.isHot) return "HOT";
    if (formData.isNew) return "NEW";
    if (formData.isBest) return "BEST";
    return "";
  };

  const handleProductFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const badge = getBadgeText();

    if (editingProduct) {
      // 수정 모드
      const updates = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        originalPrice:
          formData.originalPrice !== formData.price
            ? formData.originalPrice
            : undefined,
        category: formData.category,
        images: formData.images,
        colors: colors.map((c) => c.name),
        sizes: sizes.map((s) => s.name),
        stock: sizes.reduce((sum, size) => sum + size.stock, 0),
        tags: formData.features.filter((f) => f.trim() !== ""),
        isActive: formData.isActive ?? true,
        isNew: formData.isNew ?? false,
        isSale: formData.originalPrice !== formData.price,
        isBest: formData.isBest ?? false,
        isFeatured: formData.isFeatured ?? false,
        isLimited: formData.isLimited ?? false,
        isHot: formData.isHot ?? false,
      };

      updateProduct(editingProduct.id, updates);

      // 컬렉션 연동 업데이트
      // 기존 컬렉션에서 제거
      const existingCollections = getCollectionsByProductId(editingProduct.id);
      existingCollections.forEach((collection) => {
        removeProductFromCollection(collection.id, editingProduct.id);
      });

      // 새 컬렉션에 추가 (none이 아닌 경우에만)
      if (formData.collection && formData.collection !== "none") {
        addProductToCollection(formData.collection, editingProduct.id);
      }

      toast({
        title: "상품 수정 완료",
        description: "상품 정보가 성공적으로 수정되었습니다.",
        duration: 3000,
      });
    } else {
      // 등록 모드
      const newProduct = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        originalPrice:
          formData.originalPrice !== formData.price
            ? formData.originalPrice
            : undefined,
        category: formData.category,
        subCategory: formData.category === "top" ? "티셔츠" : "기본",
        images: formData.images,
        colors: colors.map((c) => c.name),
        sizes: sizes.map((s) => s.name),
        stock: sizes.reduce((sum, size) => sum + size.stock, 0),
        isActive: formData.isActive ?? true,
        isNew: formData.isNew ?? false,
        isSale: formData.originalPrice !== formData.price,
        isBest: formData.isBest ?? false,
        isFeatured: formData.isFeatured ?? false,
        isLimited: formData.isLimited ?? false,
        isHot: formData.isHot ?? false,
        collection:
          formData.collection && formData.collection !== "none"
            ? formData.collection
            : "basic",
        rating: 0,
        reviewCount: 0,
        tags: formData.features.filter((f) => f.trim() !== ""),
      };

      addProduct(newProduct);

      // 컬렉션에 상품 추가 (none이 아닌 경우에만)
      if (formData.collection && formData.collection !== "none") {
        // 새로 생성된 상품의 ID는 Date.now().toString()로 생성됨
        const newProductId = Date.now().toString();
        addProductToCollection(formData.collection, newProductId);
      }

      toast({
        title: "상품 등록 완료",
        description: "새로운 상품이 성공적으로 등록되었습니다.",
        duration: 3000,
      });
    }

    setShowProductForm(false);
    setEditingProduct(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      price: 0,
      originalPrice: 0,
      description: "",
      images: [],
      category: "top",
      collection: "none",
      materials: "",
      care: "",
      modelInfo: "",
      features: [""],
      isActive: true,
      isLimited: false,
      isHot: false,
      isNew: false,
      isBest: false,
      isFeatured: false,
    });
    // 카테고리에 따라 기본 사이즈 설정
    if (formData.category === "bottom") {
      setSizes([
        { name: "26", available: true, stock: 10 },
        { name: "27", available: true, stock: 15 },
        { name: "28", available: true, stock: 12 },
      ]);
    } else {
      setSizes([
        { name: "S", available: true, stock: 10 },
        { name: "M", available: true, stock: 15 },
        { name: "L", available: true, stock: 12 },
      ]);
    }
    setColors([
      { name: "Black", hex: "#000000", available: true },
      { name: "White", hex: "#FFFFFF", available: true },
      { name: "Gray", hex: "#9CA3AF", available: true },
    ]);
    setNewImage("");
    setNewFeature("");
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
      {/* 상품 등록 모달 */}
      <Dialog open={showProductForm} onOpenChange={setShowProductForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between text-gray-900 dark:text-gray-100">
              <span>{editingProduct ? "상품 수정" : "상품 등록"}</span>
              <div className="flex gap-2">
                {formData.isLimited && (
                  <Badge variant="destructive">LIMITED</Badge>
                )}
                {formData.isHot && <Badge variant="destructive">HOT</Badge>}
                {formData.isNew && (
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200">
                    NEW
                  </Badge>
                )}
                {formData.isBest && (
                  <Badge className="bg-yellow-500 text-white dark:bg-yellow-600">
                    BEST
                  </Badge>
                )}
              </div>
            </DialogTitle>
            <DialogDescription className="text-gray-600 dark:text-gray-400">
              {editingProduct
                ? "상품 정보를 수정하세요"
                : "새로운 상품을 등록하세요"}
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleProductFormSubmit} className="space-y-6">
            {/* 기본 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="name"
                  className="text-gray-900 dark:text-gray-100"
                >
                  상품명 *
                </Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  placeholder="상품명을 입력하세요"
                  required
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <Label
                  htmlFor="category"
                  className="text-gray-900 dark:text-gray-100"
                >
                  카테고리 *
                </Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) =>
                    handleInputChange("category", value)
                  }
                >
                  <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <SelectValue placeholder="카테고리를 선택하세요" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <SelectItem
                      value="top"
                      className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      상의
                    </SelectItem>
                    <SelectItem
                      value="bottom"
                      className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      하의
                    </SelectItem>
                    <SelectItem
                      value="dress"
                      className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      원피스
                    </SelectItem>
                    <SelectItem
                      value="outer"
                      className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      아우터
                    </SelectItem>
                    <SelectItem
                      value="accessory"
                      className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      액세서리
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label
                  htmlFor="collection"
                  className="text-gray-900 dark:text-gray-100"
                >
                  컬렉션
                </Label>
                <Select
                  value={formData.collection || ""}
                  onValueChange={(value) =>
                    handleInputChange("collection", value)
                  }
                >
                  <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <SelectValue placeholder="컬렉션을 선택하세요" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <SelectItem
                      value="none"
                      className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      선택 안함
                    </SelectItem>
                    {activeCollections.map((collection) => (
                      <SelectItem
                        key={collection.id}
                        value={collection.id}
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* 가격 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="price"
                  className="text-gray-900 dark:text-gray-100"
                >
                  정가 *
                </Label>
                <Input
                  id="price"
                  type="number"
                  value={formData.price}
                  onChange={(e) =>
                    handleInputChange("price", parseInt(e.target.value))
                  }
                  placeholder="정가를 입력하세요"
                  required
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <Label
                  htmlFor="originalPrice"
                  className="text-gray-900 dark:text-gray-100"
                >
                  할인가
                </Label>
                <Input
                  id="originalPrice"
                  type="number"
                  value={formData.originalPrice}
                  onChange={(e) =>
                    handleInputChange("originalPrice", parseInt(e.target.value))
                  }
                  placeholder="할인가를 입력하세요 (선택사항)"
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* 배지 설정 */}
            <div>
              <Label className="text-base font-medium text-gray-900 dark:text-gray-100">
                상품 배지 설정
              </Label>
              <div className="flex flex-wrap gap-3 mt-2">
                <div className="flex items-center space-x-1">
                  <Checkbox
                    id="isLimited"
                    checked={formData.isLimited}
                    onCheckedChange={(checked) =>
                      handleInputChange("isLimited", checked)
                    }
                  />
                  <Label
                    htmlFor="isLimited"
                    className="flex items-center gap-1 text-gray-900 dark:text-gray-100"
                  >
                    <Badge variant="destructive">LIMITED</Badge>
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <Checkbox
                    id="isHot"
                    checked={formData.isHot}
                    onCheckedChange={(checked) =>
                      handleInputChange("isHot", checked)
                    }
                  />
                  <Label
                    htmlFor="isHot"
                    className="flex items-center gap-1 text-gray-900 dark:text-gray-100"
                  >
                    <Badge variant="destructive">HOT</Badge>
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <Checkbox
                    id="isNew"
                    checked={formData.isNew}
                    onCheckedChange={(checked) =>
                      handleInputChange("isNew", checked)
                    }
                  />
                  <Label
                    htmlFor="isNew"
                    className="flex items-center gap-1 text-gray-900 dark:text-gray-100"
                  >
                    <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200">
                      NEW
                    </Badge>
                  </Label>
                </div>
                <div className="flex items-center space-x-1">
                  <Checkbox
                    id="isBest"
                    checked={formData.isBest}
                    onCheckedChange={(checked) =>
                      handleInputChange("isBest", checked)
                    }
                  />
                  <Label
                    htmlFor="isBest"
                    className="flex items-center gap-1 text-gray-900 dark:text-gray-100"
                  >
                    <Badge className="bg-yellow-500 text-white dark:bg-yellow-600">
                      BEST
                    </Badge>
                  </Label>
                </div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                * 배지는 우선순위에 따라 하나만 표시됩니다: LIMITED &gt; HOT
                &gt; NEW &gt; BEST
              </p>
            </div>

            <Separator />

            {/* 이미지 관리 */}
            <div>
              <Label className="text-base font-medium text-gray-900 dark:text-gray-100">
                상품 이미지
              </Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {formData.images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`상품 이미지 ${index + 1}`}
                      className="w-full h-32 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2 mt-4">
                <Input
                  value={newImage}
                  onChange={(e) => setNewImage(e.target.value)}
                  placeholder="이미지 URL을 입력하세요"
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
                <Button
                  type="button"
                  onClick={addImage}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                >
                  <ImagePlus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <Separator />

            {/* 사이즈 관리 */}
            <div>
              <Label className="text-base font-medium text-gray-900 dark:text-gray-100">
                사이즈 관리
              </Label>
              <div className="space-y-2 mt-2">
                {sizes.map((size, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Select
                      value={size.name}
                      onValueChange={(value) =>
                        handleSizeChange(index, "name", value)
                      }
                    >
                      <SelectTrigger className="w-24 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                        <SelectValue placeholder="사이즈" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                        {formData.category === "bottom" ? (
                          // 하의: 숫자 사이즈
                          <>
                            <SelectItem
                              value="21"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              21
                            </SelectItem>
                            <SelectItem
                              value="22"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              22
                            </SelectItem>
                            <SelectItem
                              value="23"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              23
                            </SelectItem>
                            <SelectItem
                              value="24"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              24
                            </SelectItem>
                            <SelectItem
                              value="25"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              25
                            </SelectItem>
                            <SelectItem
                              value="26"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              26
                            </SelectItem>
                            <SelectItem
                              value="27"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              27
                            </SelectItem>
                            <SelectItem
                              value="28"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              28
                            </SelectItem>
                            <SelectItem
                              value="29"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              29
                            </SelectItem>
                            <SelectItem
                              value="30"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              30
                            </SelectItem>
                            <SelectItem
                              value="31"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              31
                            </SelectItem>
                            <SelectItem
                              value="32"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              32
                            </SelectItem>
                            <SelectItem
                              value="33"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              33
                            </SelectItem>
                            <SelectItem
                              value="34"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              34
                            </SelectItem>
                          </>
                        ) : (
                          // 상의/기타: 문자 사이즈
                          <>
                            <SelectItem
                              value="XS"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              XS
                            </SelectItem>
                            <SelectItem
                              value="S"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              S
                            </SelectItem>
                            <SelectItem
                              value="M"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              M
                            </SelectItem>
                            <SelectItem
                              value="L"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-100"
                            >
                              L
                            </SelectItem>
                            <SelectItem
                              value="XL"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              XL
                            </SelectItem>
                            <SelectItem
                              value="XXL"
                              className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                            >
                              XXL
                            </SelectItem>
                          </>
                        )}
                      </SelectContent>
                    </Select>
                    <Checkbox
                      checked={size.available}
                      onCheckedChange={(checked) =>
                        handleSizeChange(index, "available", checked)
                      }
                    />
                    <Label className="text-sm text-gray-900 dark:text-gray-100">
                      재고 있음
                    </Label>
                    <Input
                      type="number"
                      value={size.stock}
                      onChange={(e) =>
                        handleSizeChange(
                          index,
                          "stock",
                          parseInt(e.target.value)
                        )
                      }
                      placeholder="재고"
                      className="w-20 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                    />
                    <Button
                      type="button"
                      onClick={() => removeSize(index)}
                      size="sm"
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addSize}
                  size="sm"
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  사이즈 추가
                </Button>
              </div>
            </div>

            <Separator />

            {/* 색상 관리 */}
            <div>
              <Label className="text-base font-medium text-gray-900 dark:text-gray-100">
                색상 관리
              </Label>
              <div className="space-y-2 mt-2">
                {colors.map((color, index) => (
                  <div key={index} className="flex gap-2 items-center">
                    <Input
                      value={color.name}
                      onChange={(e) =>
                        handleColorChange(index, "name", e.target.value)
                      }
                      placeholder="색상명"
                      className="w-24 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <Input
                      type="color"
                      value={color.hex}
                      onChange={(e) =>
                        handleColorChange(index, "hex", e.target.value)
                      }
                      className="w-16 h-10 border-gray-300 dark:border-gray-600"
                    />
                    <Checkbox
                      checked={color.available}
                      onCheckedChange={(checked) =>
                        handleColorChange(index, "available", checked)
                      }
                    />
                    <Label className="text-sm text-gray-900 dark:text-gray-100">
                      재고 있음
                    </Label>
                    <Button
                      type="button"
                      onClick={() => removeColor(index)}
                      size="sm"
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  onClick={addColor}
                  size="sm"
                  variant="outline"
                  className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Plus className="w-4 h-4 mr-1" />
                  색상 추가
                </Button>
              </div>
            </div>

            <Separator />

            {/* 상품 설명 */}
            <div>
              <Label
                htmlFor="description"
                className="text-gray-900 dark:text-gray-100"
              >
                상품 설명
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                placeholder="상품에 대한 자세한 설명을 입력하세요"
                rows={4}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* 상품 특징 */}
            <div>
              <Label className="text-base font-medium text-gray-900 dark:text-gray-100">
                상품 특징
              </Label>
              <div className="space-y-2 mt-2">
                {formData.features.map((feature, index) => (
                  <div key={index} className="flex gap-2">
                    <Input
                      value={feature}
                      onChange={(e) => {
                        const newFeatures = [...formData.features];
                        newFeatures[index] = e.target.value;
                        handleInputChange("features", newFeatures);
                      }}
                      placeholder="상품 특징을 입력하세요"
                      className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <Button
                      type="button"
                      onClick={() => removeFeature(index)}
                      size="sm"
                      variant="outline"
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Input
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="새로운 특징을 입력하세요"
                    className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                  />
                  <Button
                    type="button"
                    onClick={addFeature}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            {/* 소재 및 세탁 정보 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="materials"
                  className="text-gray-900 dark:text-gray-100"
                >
                  소재
                </Label>
                <Input
                  id="materials"
                  value={formData.materials}
                  onChange={(e) =>
                    handleInputChange("materials", e.target.value)
                  }
                  placeholder="예: 코튼 100%"
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div>
                <Label
                  htmlFor="care"
                  className="text-gray-900 dark:text-gray-100"
                >
                  세탁 방법
                </Label>
                <Input
                  id="care"
                  value={formData.care}
                  onChange={(e) => handleInputChange("care", e.target.value)}
                  placeholder="예: 찬물 단독 세탁"
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* 모델 정보 */}
            <div>
              <Label
                htmlFor="modelInfo"
                className="text-gray-900 dark:text-gray-100"
              >
                모델 착용 정보
              </Label>
              <Input
                id="modelInfo"
                value={formData.modelInfo}
                onChange={(e) => handleInputChange("modelInfo", e.target.value)}
                placeholder="예: 모델 착용 사이즈: M / 키 168cm"
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>

            {/* 버튼 */}
            <div className="flex gap-4 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setShowProductForm(false);
                  setEditingProduct(null);
                  resetForm();

                  toast({
                    title: "작업 취소",
                    description: "상품 등록/수정이 취소되었습니다.",
                    duration: 2000,
                  });
                }}
                className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                취소
              </Button>
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white"
              >
                <Save className="w-4 h-4 mr-2" />
                {editingProduct ? "수정하기" : "등록하기"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* 기존 ProductManager 표시 */}
      <div>
        {/* 통계 카드 */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-6 mb-6">
          <Card className="bg-white dark:bg-gray-800 border-2 border-blue-300 dark:border-blue-600 shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 dark:bg-blue-900/30 rounded-xl flex items-center justify-center border-2 border-blue-300 dark:border-blue-600">
                    <Package className="w-5 h-5 lg:w-6 lg:h-6 text-blue-700 dark:text-blue-400" />
                  </div>
                  <p className="text-xl lg:text-2xl font-bold text-blue-700 dark:text-blue-400">
                    {activeProducts}
                  </p>
                </div>
                <p className="text-xs lg:text-sm font-medium text-blue-600 dark:text-blue-300 truncate">
                  활성 상품
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 border-purple-300 dark:border-purple-600 shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-purple-100 dark:bg-purple-900/30 rounded-xl flex items-center justify-center border-2 border-purple-300 dark:border-purple-600">
                    <Star className="w-5 h-5 lg:w-6 lg:h-6 text-purple-700 dark:text-purple-400" />
                  </div>
                  <p className="text-xl lg:text-2xl font-bold text-purple-700 dark:text-purple-400">
                    {featuredProducts}
                  </p>
                </div>
                <p className="text-xs lg:text-sm font-medium text-purple-600 dark:text-purple-300 truncate">
                  피처드 상품
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 border-green-300 dark:border-green-600 shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 dark:bg-green-900/30 rounded-xl flex items-center justify-center border-2 border-green-300 dark:border-green-600">
                    <ShoppingCart className="w-5 h-5 lg:w-6 lg:h-6 text-green-700 dark:text-green-400" />
                  </div>
                  <p className="text-lg lg:text-2xl font-bold text-green-700 dark:text-green-400">
                    {totalStock}
                  </p>
                </div>
                <p className="text-xs lg:text-sm font-medium text-green-600 dark:text-green-300 truncate">
                  총 재고
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800 border-2 border-orange-300 dark:border-orange-600 shadow-lg">
            <CardContent className="p-4 lg:p-6">
              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 lg:w-12 lg:h-12 bg-orange-100 dark:bg-orange-900/30 rounded-xl flex items-center justify-center border-2 border-orange-300 dark:border-orange-600">
                    <DollarSign className="w-5 h-5 lg:w-6 lg:h-6 text-orange-700 dark:text-orange-400" />
                  </div>
                  <p className="text-xl lg:text-2xl font-bold text-orange-700 dark:text-orange-400">
                    {Math.floor(totalValue / 10000)}만
                  </p>
                </div>
                <p className="text-xs lg:text-sm font-medium text-orange-600 dark:text-orange-300 truncate">
                  총 재고 가치
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 상품 관리 */}
        <Card className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 border-gray-200 dark:border-gray-700">
          <CardHeader className="p-4 sm:p-6">
            <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0 flex-1">
                <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-gray-100">
                  상품 관리
                </CardTitle>
                <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                  상품을 등록하고 관리하세요
                </CardDescription>
              </div>
              <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:items-center sm:gap-3 lg:gap-4 flex-shrink-0">
                <Link href="/">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 w-full sm:w-auto"
                  >
                    <Home className="w-4 h-4" />
                    <span className="hidden sm:inline">홈으로 가기</span>
                    <span className="sm:hidden">홈</span>
                  </Button>
                </Link>
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => setShowProductForm(true)}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white flex-1 sm:flex-none"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    <span className="hidden sm:inline">상품 등록</span>
                    <span className="sm:hidden">등록</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center space-x-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex-1 sm:flex-none"
                  >
                    <Download className="w-4 h-4" />
                    <span className="hidden sm:inline">엑셀 다운로드</span>
                    <span className="sm:hidden">엑셀</span>
                  </Button>
                  <Dialog
                    open={isBulkUploadDialogOpen}
                    onOpenChange={setIsBulkUploadDialogOpen}
                  >
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center space-x-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 flex-1 sm:flex-none"
                      >
                        <Upload className="w-4 h-4" />
                        <span className="hidden sm:inline">대량 업로드</span>
                        <span className="sm:hidden">업로드</span>
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                      <DialogHeader>
                        <DialogTitle className="text-gray-900 dark:text-gray-100">
                          대량 상품 업로드
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-400">
                          CSV 파일을 업로드하여 상품을 대량으로 등록하세요
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label
                            htmlFor="bulk-upload"
                            className="text-gray-900 dark:text-gray-100"
                          >
                            CSV 파일 선택
                          </Label>
                          <Input
                            id="bulk-upload"
                            type="file"
                            accept=".csv"
                            onChange={(e) =>
                              e.target.files &&
                              handleBulkUpload(e.target.files[0])
                            }
                            className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                          />
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          <p>CSV 파일 형식:</p>
                          <p>
                            상품명,설명,가격,할인가격,카테고리,컬렉션,색상,사이즈,재고,태그
                          </p>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-4 mb-6">
              {/* 필터 섹션 */}
              <div className="flex flex-col space-y-3 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4">
                <Select
                  value={selectedCategory}
                  onValueChange={setSelectedCategory}
                >
                  <SelectTrigger className="w-full sm:w-40 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <SelectValue placeholder="카테고리" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <SelectItem
                      value="all"
                      className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      전체
                    </SelectItem>
                    {categoryOptions.map((category) => (
                      <SelectItem
                        key={category.value}
                        value={category.value}
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select
                  value={selectedCollection}
                  onValueChange={setSelectedCollection}
                >
                  <SelectTrigger className="w-full sm:w-40 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <SelectValue placeholder="컬렉션" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <SelectItem
                      value="all"
                      className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      전체
                    </SelectItem>
                    {collections.map((collection) => (
                      <SelectItem
                        key={collection.id}
                        value={collection.id}
                        className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                      >
                        {collection.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="show-inactive"
                    checked={showInactive}
                    onCheckedChange={setShowInactive}
                  />
                  <Label
                    htmlFor="show-inactive"
                    className="text-xs sm:text-sm text-gray-900 dark:text-gray-100"
                  >
                    <span className="hidden sm:inline">비활성화 상품 표시</span>
                    <span className="sm:hidden">비활성 표시</span>
                  </Label>
                </div>
              </div>

              {/* 검색 섹션 */}
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 w-4 h-4" />
                <Input
                  placeholder="상품명, 설명 검색..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
            </div>

            {/* 상품 목록 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
              {finalFilteredProducts.map((product) => (
                <Card
                  key={product.id}
                  className={`hover:shadow-md transition-shadow bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 ${
                    !product.isActive
                      ? "opacity-60 border-gray-300 dark:border-gray-600"
                      : ""
                  }`}
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3 sm:space-y-4">
                      {/* 상품 이미지 */}
                      <div className="relative aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden">
                        {product.images.length > 0 ? (
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Image className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400 dark:text-gray-500" />
                          </div>
                        )}
                        <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex flex-wrap gap-1">
                          {product.isActive ? (
                            <Badge className="bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900 dark:text-green-200 text-xs">
                              활성
                            </Badge>
                          ) : (
                            <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 text-xs">
                              비활성
                            </Badge>
                          )}
                          {product.isFeatured && (
                            <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-100 dark:bg-purple-900 dark:text-purple-200 text-xs">
                              피처드
                            </Badge>
                          )}
                          {product.isLimited && (
                            <Badge variant="destructive" className="text-xs">
                              LIMITED
                            </Badge>
                          )}
                          {product.isHot && (
                            <Badge variant="destructive" className="text-xs">
                              HOT
                            </Badge>
                          )}
                          {product.isNew && (
                            <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100 dark:bg-blue-900 dark:text-blue-200 text-xs">
                              NEW
                            </Badge>
                          )}
                          {product.isBest && (
                            <Badge className="bg-yellow-500 text-white dark:bg-yellow-600 text-xs">
                              BEST
                            </Badge>
                          )}
                        </div>
                      </div>

                      {/* 상품 정보 */}
                      <div className="space-y-2">
                        <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100 line-clamp-2">
                          {product.name}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                          {product.description}
                        </p>

                        <div className="flex items-center space-x-2">
                          {product.originalPrice &&
                          product.originalPrice > product.price ? (
                            <>
                              <span className="text-base sm:text-lg font-bold text-red-600 dark:text-red-400">
                                {product.price.toLocaleString()}원
                              </span>
                              <span className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-through">
                                {product.originalPrice.toLocaleString()}원
                              </span>
                            </>
                          ) : (
                            <span className="text-base sm:text-lg font-bold text-gray-900 dark:text-gray-100">
                              {product.price.toLocaleString()}원
                            </span>
                          )}
                        </div>

                        <div className="space-y-1 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
                          <div className="flex items-center justify-between">
                            <span>재고: {product.stock}개</span>
                            <span>{product.category}</span>
                          </div>
                          {(() => {
                            const productCollections =
                              getCollectionsByProductId(product.id);
                            return (
                              productCollections.length > 0 && (
                                <div className="flex items-center gap-1">
                                  <Tag className="w-3 h-3 text-gray-600 dark:text-gray-400" />
                                  <span className="text-xs text-gray-600 dark:text-gray-400">
                                    {productCollections
                                      .map((c) => c.name)
                                      .join(", ")}
                                  </span>
                                </div>
                              )
                            );
                          })()}
                        </div>

                        {/* 옵션 정보 */}
                        <div className="space-y-1">
                          <div className="flex flex-wrap gap-1">
                            {product.colors.slice(0, 3).map((color) => (
                              <Badge
                                key={color}
                                variant="outline"
                                className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                              >
                                {color}
                              </Badge>
                            ))}
                            {product.colors.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                              >
                                +{product.colors.length - 3}
                              </Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {product.sizes.slice(0, 3).map((size) => (
                              <Badge
                                key={size}
                                variant="outline"
                                className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                              >
                                {size}
                              </Badge>
                            ))}
                            {product.sizes.length > 3 && (
                              <Badge
                                variant="outline"
                                className="text-xs border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                              >
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
                            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 p-2"
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => toggleProductStatus(product.id)}
                            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 p-2"
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
                            className={`p-2 ${
                              product.isFeatured
                                ? "border-yellow-300 dark:border-yellow-600 text-yellow-600 dark:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/20"
                                : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                            }`}
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
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 p-2"
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
    </div>
  );
}
