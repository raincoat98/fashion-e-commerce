"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useBanners } from "@/hooks/useBanners";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  Eye,
  EyeOff,
  Upload,
  ArrowUp,
  ArrowDown,
  Home,
  Package,
} from "lucide-react";

interface Banner {
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

export default function BannerManager() {
  const {
    banners,
    loading,
    error,
    addBanner,
    updateBanner,
    deleteBanner,
    reorderBanners,
    toggleBannerStatus,
  } = useBanners();

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    linkUrl: "",
    order: 1,
    isActive: true,
  });

  const handleAddBanner = () => {
    setEditingBanner(null);
    setFormData({
      title: "",
      description: "",
      imageUrl: "",
      linkUrl: "",
      order: banners.length + 1,
      isActive: true,
    });
    setIsDialogOpen(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      description: banner.description,
      imageUrl: banner.imageUrl,
      linkUrl: banner.linkUrl,
      order: banner.order,
      isActive: banner.isActive,
    });
    setIsDialogOpen(true);
  };

  const handleDeleteBanner = async (id: string) => {
    if (confirm("정말로 이 배너를 삭제하시겠습니까?")) {
      try {
        await deleteBanner(id);
      } catch (error) {
        console.error("Failed to delete banner:", error);
      }
    }
  };

  const handleSaveBanner = async () => {
    try {
      if (editingBanner) {
        // 수정
        await updateBanner(editingBanner.id, formData);
      } else {
        // 새로 추가
        await addBanner(formData);
      }
      setIsDialogOpen(false);
    } catch (error) {
      console.error("Failed to save banner:", error);
    }
  };

  const handleOrderChange = async (id: string, direction: "up" | "down") => {
    const currentIndex = banners.findIndex((banner) => banner.id === id);
    if (currentIndex === -1) return;

    const newBanners = [...banners];
    if (direction === "up" && currentIndex > 0) {
      [newBanners[currentIndex], newBanners[currentIndex - 1]] = [
        newBanners[currentIndex - 1],
        newBanners[currentIndex],
      ];
    } else if (direction === "down" && currentIndex < banners.length - 1) {
      [newBanners[currentIndex], newBanners[currentIndex + 1]] = [
        newBanners[currentIndex + 1],
        newBanners[currentIndex],
      ];
    }

    // 순서 번호 업데이트
    const bannerIds = newBanners.map((banner) => banner.id);
    try {
      await reorderBanners(bannerIds);
    } catch (error) {
      console.error("Failed to reorder banners:", error);
    }
  };

  const handleToggleBannerStatus = async (id: string) => {
    try {
      await toggleBannerStatus(id);
    } catch (error) {
      console.error("Failed to toggle banner status:", error);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              <div className="text-gray-500">배너 로딩 중...</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-center text-red-500">
              <div>에러: {error}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="p-4 sm:p-6">
          <div className="flex flex-col space-y-3 sm:space-y-4 lg:flex-row lg:items-center lg:justify-between lg:space-y-0">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl lg:text-2xl text-gray-900 dark:text-gray-100">
                배너 관리
              </CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-1">
                메인 페이지 배너를 등록, 수정, 삭제할 수 있습니다
              </CardDescription>
            </div>
            <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-3 lg:space-x-4 flex-shrink-0">
              <Link href="/">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto flex items-center justify-center space-x-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <Home className="w-4 h-4" />
                  <span className="hidden sm:inline">홈으로 가기</span>
                  <span className="sm:hidden">홈</span>
                </Button>
              </Link>
              <Button
                onClick={handleAddBanner}
                size="sm"
                className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">배너 추가</span>
                <span className="sm:hidden">추가</span>
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* 모바일 카드 레이아웃 */}
          <div className="block md:hidden space-y-3 sm:space-y-4">
            {banners.length === 0 ? (
              <div className="text-center py-8 sm:py-12">
                <div className="text-gray-400 dark:text-gray-500 mb-3 sm:mb-4">
                  <Package className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" />
                </div>
                <h3 className="text-base sm:text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  등록된 배너가 없습니다
                </h3>
                <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 mb-4">
                  첫 번째 배너를 추가해보세요
                </p>
                <Button
                  onClick={handleAddBanner}
                  size="sm"
                  className="inline-flex items-center bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  배너 추가
                </Button>
              </div>
            ) : (
              banners.map((banner) => (
                <Card
                  key={banner.id}
                  className="border border-gray-200 dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800"
                >
                  <CardContent className="p-3 sm:p-4">
                    <div className="flex items-start space-x-3 sm:space-x-4">
                      {/* 이미지 */}
                      <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={banner.imageUrl}
                          alt={banner.title}
                          width={64}
                          height={64}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* 메인 정보 */}
                      <div className="flex-1 space-y-2 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="min-w-0 flex-1">
                            <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">
                              {banner.title}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mt-1">
                              {banner.description}
                            </p>
                          </div>
                          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="p-1 h-6 w-6"
                              onClick={() => handleOrderChange(banner.id, "up")}
                              disabled={banner.order === 1}
                            >
                              <ArrowUp className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="p-1 h-6 w-6"
                              onClick={() =>
                                handleOrderChange(banner.id, "down")
                              }
                              disabled={banner.order === banners.length}
                            >
                              <ArrowDown className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2 min-w-0">
                            <Switch
                              checked={banner.isActive}
                              onCheckedChange={() =>
                                handleToggleBannerStatus(banner.id)
                              }
                            />
                            <Badge
                              variant={
                                banner.isActive ? "default" : "secondary"
                              }
                              className="text-xs"
                            >
                              {banner.isActive ? (
                                <>
                                  <Eye className="w-3 h-3 mr-1" />
                                  노출
                                </>
                              ) : (
                                <>
                                  <EyeOff className="w-3 h-3 mr-1" />
                                  숨김
                                </>
                              )}
                            </Badge>
                            <span className="text-xs text-gray-500 dark:text-gray-400">
                              #{banner.order}
                            </span>
                          </div>

                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <Button
                              size="sm"
                              variant="outline"
                              className="p-1.5 h-7 w-7 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                              onClick={() => handleEditBanner(banner)}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              className="p-1.5 h-7 w-7 bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white"
                              onClick={() => handleDeleteBanner(banner.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>

                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          등록일: {banner.createdAt}
                        </div>

                        {banner.linkUrl && (
                          <div className="text-xs text-blue-600 dark:text-blue-400 truncate">
                            {banner.linkUrl}
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>

          {/* 데스크톱 테이블 레이아웃 */}
          <div className="hidden md:block overflow-x-auto">
            {banners.length === 0 ? (
              <div className="text-center py-12 lg:py-16">
                <div className="text-gray-400 dark:text-gray-500 mb-4">
                  <Package className="w-16 h-16 lg:w-20 lg:h-20 mx-auto" />
                </div>
                <h3 className="text-lg lg:text-xl font-medium text-gray-900 dark:text-gray-100 mb-2">
                  등록된 배너가 없습니다
                </h3>
                <p className="text-sm lg:text-base text-gray-500 dark:text-gray-400 mb-6">
                  첫 번째 배너를 추가하여 메인 페이지를 꾸며보세요
                </p>
                <Button
                  onClick={handleAddBanner}
                  size="sm"
                  className="inline-flex items-center bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  배너 추가
                </Button>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-sm lg:text-base">순서</TableHead>
                    <TableHead className="text-sm lg:text-base">
                      이미지
                    </TableHead>
                    <TableHead className="text-sm lg:text-base">제목</TableHead>
                    <TableHead className="text-sm lg:text-base">링크</TableHead>
                    <TableHead className="text-sm lg:text-base">상태</TableHead>
                    <TableHead className="text-sm lg:text-base">
                      등록일
                    </TableHead>
                    <TableHead className="text-sm lg:text-base">액션</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {banners.map((banner) => (
                    <TableRow key={banner.id}>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm lg:text-base">
                            {banner.order}
                          </span>
                          <div className="flex flex-col space-y-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() => handleOrderChange(banner.id, "up")}
                              disabled={banner.order === 1}
                            >
                              <ArrowUp className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              className="h-6 w-6 p-0"
                              onClick={() =>
                                handleOrderChange(banner.id, "down")
                              }
                              disabled={banner.order === banners.length}
                            >
                              <ArrowDown className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="w-16 h-10 lg:w-20 lg:h-12 rounded-lg overflow-hidden">
                          <Image
                            src={banner.imageUrl}
                            alt={banner.title}
                            width={80}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-sm lg:text-base text-gray-900 dark:text-gray-100">
                            {banner.title}
                          </p>
                          <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                            {banner.description}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs lg:text-sm text-blue-600 dark:text-blue-400 truncate max-w-32">
                          {banner.linkUrl}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Switch
                            checked={banner.isActive}
                            onCheckedChange={() =>
                              handleToggleBannerStatus(banner.id)
                            }
                          />
                          <Badge
                            variant={banner.isActive ? "default" : "secondary"}
                            className="text-xs"
                          >
                            {banner.isActive ? (
                              <>
                                <Eye className="w-3 h-3 mr-1" />
                                노출
                              </>
                            ) : (
                              <>
                                <EyeOff className="w-3 h-3 mr-1" />
                                숨김
                              </>
                            )}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-xs lg:text-sm text-gray-600 dark:text-gray-400">
                          {banner.createdAt}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditBanner(banner)}
                            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                          >
                            <Edit className="w-3 h-3 mr-1" />
                            <span className="hidden lg:inline">수정</span>
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteBanner(banner.id)}
                            className="bg-red-600 dark:bg-red-700 hover:bg-red-700 dark:hover:bg-red-800 text-white"
                          >
                            <Trash2 className="w-3 h-3 mr-1" />
                            <span className="hidden lg:inline">삭제</span>
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </CardContent>
      </Card>

      {/* 배너 추가/수정 다이얼로그 */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
              {editingBanner ? "배너 수정" : "새 배너 추가"}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              배너 정보를 입력하고 저장하세요
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 sm:space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title" className="text-sm sm:text-base">
                  배너 제목
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="배너 제목을 입력하세요"
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="order" className="text-sm sm:text-base">
                  노출 순서
                </Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: parseInt(e.target.value),
                    })
                  }
                  min="1"
                  max={banners.length + 1}
                  className="mt-1"
                />
              </div>
            </div>
            <div>
              <Label htmlFor="description" className="text-sm sm:text-base">
                배너 설명
              </Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                placeholder="배너에 대한 설명을 입력하세요"
                rows={3}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="imageUrl" className="text-sm sm:text-base">
                이미지 URL
              </Label>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 mt-1">
                <Input
                  id="imageUrl"
                  value={formData.imageUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, imageUrl: e.target.value })
                  }
                  placeholder="이미지 URL을 입력하세요"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                >
                  <Upload className="w-4 h-4" />
                  <span className="ml-2 sm:hidden">업로드</span>
                </Button>
              </div>
            </div>
            <div>
              <Label htmlFor="linkUrl" className="text-sm sm:text-base">
                링크 URL
              </Label>
              <Input
                id="linkUrl"
                value={formData.linkUrl}
                onChange={(e) =>
                  setFormData({ ...formData, linkUrl: e.target.value })
                }
                placeholder="클릭 시 이동할 URL을 입력하세요"
                className="mt-1"
              />
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
              <Label htmlFor="isActive" className="text-sm sm:text-base">
                배너 노출
              </Label>
            </div>
            {formData.imageUrl && (
              <div>
                <Label className="text-sm sm:text-base">미리보기</Label>
                <div className="mt-2 w-full h-32 sm:h-48 rounded-lg overflow-hidden border">
                  <Image
                    src={formData.imageUrl}
                    alt="배너 미리보기"
                    width={400}
                    height={192}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}
          </div>
          <DialogFooter className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 pt-4">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="w-full sm:w-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              취소
            </Button>
            <Button
              onClick={handleSaveBanner}
              className="w-full sm:w-auto bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-800 text-white"
            >
              {editingBanner ? "수정" : "추가"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
