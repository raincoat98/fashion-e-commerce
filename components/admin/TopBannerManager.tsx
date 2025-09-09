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
  ExternalLink,
  X,
} from "lucide-react";

interface TopBanner {
  id: string;
  title: string;
  content: string;
  backgroundColor: string;
  textColor: string;
  linkUrl: string;
  order: number;
  isActive: boolean;
  startDate: string;
  endDate: string;
  bannerType: "custom" | "lumina-gradient";
  isFullWidth?: boolean;
  links?: Array<{
    text: string;
    url: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

export default function TopBannerManager() {
  const [topBanners, setTopBanners] = useState<TopBanner[]>([]);

  // 초기 데이터 로드
  useEffect(() => {
    const savedBanners = localStorage.getItem("topBanners");
    if (savedBanners) {
      try {
        setTopBanners(JSON.parse(savedBanners));
      } catch (error) {
        console.error("Failed to parse saved banners:", error);
      }
    } else {
      // 기본 데이터 설정
      const defaultBanners: TopBanner[] = [
        {
          id: "1",
          title: "신규 회원 10% 할인",
          content: "신규 회원가입 시 모든 상품 10% 할인!",
          backgroundColor: "#ff6b6b",
          textColor: "#ffffff",
          linkUrl: "/signup",
          order: 1,
          isActive: true,
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          bannerType: "custom",
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-01-01T00:00:00Z",
        },
        {
          id: "2",
          title: "무료 배송 이벤트",
          content: "5만원 이상 구매 시 무료 배송!",
          backgroundColor: "#4ecdc4",
          textColor: "#ffffff",
          linkUrl: "/products",
          order: 2,
          isActive: false,
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          bannerType: "custom",
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-01-01T00:00:00Z",
        },
        {
          id: "3",
          title: "✨ NEW ARRIVAL: 봄 시즌 컬렉션 출시!",
          content: "첫 구매 20% 할인",
          backgroundColor: "",
          textColor: "#ffffff",
          linkUrl: "/products",
          order: 3,
          isActive: true,
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          bannerType: "lumina-gradient",
          isFullWidth: true,
          links: [
            { text: "신상품 보기", url: "/products" },
            { text: "할인 상품", url: "/sale" },
            { text: "회원가입", url: "/signup" },
          ],
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-01-01T00:00:00Z",
        },
        {
          id: "4",
          title: "🎉 특별 이벤트",
          content: "한정 수량 특가 상품",
          backgroundColor: "#ff6b6b",
          textColor: "#ffffff",
          linkUrl: "/sale",
          order: 4,
          isActive: false,
          startDate: "2025-01-01",
          endDate: "2025-12-31",
          bannerType: "custom",
          isFullWidth: false,
          links: [
            { text: "이벤트 상품", url: "/sale" },
            { text: "쿠폰 받기", url: "/coupons" },
          ],
          createdAt: "2025-01-01T00:00:00Z",
          updatedAt: "2025-01-01T00:00:00Z",
        },
      ];
      setTopBanners(defaultBanners);
      localStorage.setItem("topBanners", JSON.stringify(defaultBanners));
    }
  }, []);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<TopBanner | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    backgroundColor: "#ff6b6b",
    textColor: "#ffffff",
    linkUrl: "",
    order: 1,
    isActive: true,
    startDate: "",
    endDate: "",
    bannerType: "custom" as "custom" | "lumina-gradient",
    isFullWidth: false,
    links: [] as Array<{ text: string; url: string }>,
  });

  const handleAddBanner = () => {
    setEditingBanner(null);
    setFormData({
      title: "",
      content: "",
      backgroundColor: "#ff6b6b",
      textColor: "#ffffff",
      linkUrl: "",
      order: topBanners.length + 1,
      isActive: true,
      startDate: "",
      endDate: "",
      bannerType: "custom" as "custom" | "lumina-gradient",
      isFullWidth: false,
      links: [],
    });
    setIsDialogOpen(true);
  };

  const handleEditBanner = (banner: TopBanner) => {
    setEditingBanner(banner);
    setFormData({
      title: banner.title,
      content: banner.content,
      backgroundColor: banner.backgroundColor,
      textColor: banner.textColor,
      linkUrl: banner.linkUrl,
      order: banner.order,
      isActive: banner.isActive,
      startDate: banner.startDate,
      endDate: banner.endDate,
      bannerType: banner.bannerType,
      isFullWidth: banner.isFullWidth || false,
      links: banner.links || [],
    });
    setIsDialogOpen(true);
  };

  const handleSaveBanner = () => {
    if (editingBanner) {
      // 수정
      const updatedBanners = topBanners.map((banner) =>
        banner.id === editingBanner.id
          ? { ...banner, ...formData, updatedAt: new Date().toISOString() }
          : banner
      );
      setTopBanners(updatedBanners);
      localStorage.setItem("topBanners", JSON.stringify(updatedBanners));
    } else {
      // 추가
      const newBanner: TopBanner = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      const updatedBanners = [...topBanners, newBanner];
      setTopBanners(updatedBanners);
      localStorage.setItem("topBanners", JSON.stringify(updatedBanners));
    }

    // 탑배너 업데이트 이벤트 발생
    window.dispatchEvent(new CustomEvent("topBannerUpdate"));

    setIsDialogOpen(false);
  };

  const handleDeleteBanner = (id: string) => {
    const updatedBanners = topBanners.filter((banner) => banner.id !== id);
    setTopBanners(updatedBanners);
    localStorage.setItem("topBanners", JSON.stringify(updatedBanners));

    // 탑배너 업데이트 이벤트 발생
    window.dispatchEvent(new CustomEvent("topBannerUpdate"));
  };

  const handleToggleStatus = (id: string) => {
    const updatedBanners = topBanners.map((banner) =>
      banner.id === id
        ? {
            ...banner,
            isActive: !banner.isActive,
            updatedAt: new Date().toISOString(),
          }
        : banner
    );
    setTopBanners(updatedBanners);
    localStorage.setItem("topBanners", JSON.stringify(updatedBanners));

    // 탑배너 업데이트 이벤트 발생 (가장 중요한 부분!)
    window.dispatchEvent(new CustomEvent("topBannerUpdate"));
  };

  const handleReorder = (id: string, direction: "up" | "down") => {
    const currentIndex = topBanners.findIndex((banner) => banner.id === id);
    if (currentIndex === -1) return;

    const newBanners = [...topBanners];
    if (direction === "up" && currentIndex > 0) {
      [newBanners[currentIndex], newBanners[currentIndex - 1]] = [
        newBanners[currentIndex - 1],
        newBanners[currentIndex],
      ];
    } else if (direction === "down" && currentIndex < newBanners.length - 1) {
      [newBanners[currentIndex], newBanners[currentIndex + 1]] = [
        newBanners[currentIndex + 1],
        newBanners[currentIndex],
      ];
    }

    const updatedBanners = newBanners.map((banner, index) => ({
      ...banner,
      order: index + 1,
      updatedAt: new Date().toISOString(),
    }));

    setTopBanners(updatedBanners);
    localStorage.setItem("topBanners", JSON.stringify(updatedBanners));

    // 탑배너 업데이트 이벤트 발생
    window.dispatchEvent(new CustomEvent("topBannerUpdate"));
  };

  const getStatusBadge = (banner: TopBanner) => {
    const now = new Date();
    const startDate = new Date(banner.startDate);
    const endDate = new Date(banner.endDate);

    if (!banner.isActive) {
      return <Badge variant="secondary">비활성</Badge>;
    }

    if (now < startDate) {
      return <Badge variant="outline">대기중</Badge>;
    }

    if (now > endDate) {
      return <Badge variant="destructive">만료됨</Badge>;
    }

    return <Badge variant="default">활성</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
            탑배너 관리
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground text-gray-600 dark:text-gray-400">
            웹사이트 상단에 표시되는 배너를 관리합니다.
          </p>
        </div>
        <Button
          onClick={handleAddBanner}
          className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white w-full sm:w-fit"
        >
          <Plus className="w-4 h-4 mr-2" />
          <span className="hidden sm:inline">새 배너 추가</span>
          <span className="sm:hidden">배너 추가</span>
        </Button>
      </div>

      <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
            탑배너 목록
          </CardTitle>
          <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            현재 등록된 탑배너 목록입니다. 순서를 변경하거나 상태를 관리할 수
            있습니다.
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6 pt-0">
          {/* 데스크톱 테이블 레이아웃 */}
          <div className="hidden lg:block overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50 dark:bg-gray-700">
                  <TableHead className="text-gray-900 dark:text-gray-100">
                    순서
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">
                    제목
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">
                    내용
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">
                    타입
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">
                    전체
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">
                    색상
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">
                    링크
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">
                    기간
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">
                    상태
                  </TableHead>
                  <TableHead className="text-gray-900 dark:text-gray-100">
                    작업
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topBanners.map((banner) => (
                  <TableRow
                    key={banner.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <TableCell className="text-gray-900 dark:text-gray-100">
                      <div className="flex items-center space-x-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorder(banner.id, "up")}
                          disabled={banner.order === 1}
                          className="hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center">{banner.order}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorder(banner.id, "down")}
                          disabled={banner.order === topBanners.length}
                          className="hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </Button>
                      </div>
                    </TableCell>
                    <TableCell className="font-medium text-gray-900 dark:text-gray-100">
                      {banner.title}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-gray-700 dark:text-gray-300">
                      {banner.content}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          banner.bannerType === "lumina-gradient"
                            ? "default"
                            : "secondary"
                        }
                      >
                        {banner.bannerType === "lumina-gradient"
                          ? "LUMINA"
                          : "커스텀"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={banner.isFullWidth ? "default" : "outline"}
                      >
                        {banner.isFullWidth ? "전체" : "일반"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {banner.bannerType === "custom" ? (
                          <>
                            <div
                              className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600"
                              style={{
                                backgroundColor: banner.backgroundColor,
                              }}
                            />
                            <div
                              className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600"
                              style={{ backgroundColor: banner.textColor }}
                            />
                          </>
                        ) : (
                          <div className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600 lumina-gradient"></div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col space-y-1">
                        {banner.linkUrl && (
                          <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                          >
                            <a
                              href={banner.linkUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </Button>
                        )}
                        {banner.links && banner.links.length > 0 && (
                          <div className="text-xs text-muted-foreground text-gray-500 dark:text-gray-400">
                            +{banner.links.length}개 추가 링크
                          </div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-700 dark:text-gray-300">
                        <div>{banner.startDate}</div>
                        <div className="text-muted-foreground text-gray-500 dark:text-gray-400">
                          ~ {banner.endDate}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(banner)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(banner.id)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          {banner.isActive ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditBanner(banner)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBanner(banner.id)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* 모바일 카드 레이아웃 */}
          <div className="lg:hidden space-y-4">
            {topBanners.map((banner) => (
              <Card
                key={banner.id}
                className="bg-gray-50 dark:bg-gray-700 border-gray-200 dark:border-gray-600"
              >
                <CardContent className="p-4">
                  <div className="space-y-3">
                    {/* 헤더 */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm sm:text-base text-gray-900 dark:text-gray-100 truncate">
                          {banner.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
                          {banner.content}
                        </p>
                      </div>
                      <div className="ml-3 flex-shrink-0">
                        {getStatusBadge(banner)}
                      </div>
                    </div>

                    {/* 상세 정보 */}
                    <div className="grid grid-cols-1 gap-2 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          순서:
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {banner.order}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          타입:
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {banner.bannerType === "custom" ? "커스텀" : "Lumina"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          전체폭:
                        </span>
                        <span className="text-gray-900 dark:text-gray-100">
                          {banner.isFullWidth ? "예" : "아니오"}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500 dark:text-gray-400">
                          기간:
                        </span>
                        <span className="text-gray-900 dark:text-gray-100 text-right">
                          {banner.startDate} ~ {banner.endDate}
                        </span>
                      </div>
                    </div>

                    {/* 색상 정보 */}
                    {banner.bannerType === "custom" && (
                      <div className="flex items-center space-x-2">
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          색상:
                        </span>
                        <div className="flex items-center space-x-2">
                          <div
                            className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: banner.backgroundColor }}
                          />
                          <div
                            className="w-4 h-4 rounded border border-gray-300 dark:border-gray-600"
                            style={{ backgroundColor: banner.textColor }}
                          />
                        </div>
                      </div>
                    )}

                    {/* 액션 버튼 */}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-200 dark:border-gray-600">
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorder(banner.id, "up")}
                          disabled={banner.order === 1}
                          className="hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-1 flex-shrink-0"
                        >
                          <ArrowUp className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReorder(banner.id, "down")}
                          disabled={banner.order === topBanners.length}
                          className="hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-1 flex-shrink-0"
                        >
                          <ArrowDown className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleToggleStatus(banner.id)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-1 flex-shrink-0"
                        >
                          {banner.isActive ? (
                            <EyeOff className="w-3 h-3" />
                          ) : (
                            <Eye className="w-3 h-3" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditBanner(banner)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-1 flex-shrink-0"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteBanner(banner.id)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 p-1 flex-shrink-0"
                        >
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <DialogHeader className="pb-4">
            <DialogTitle className="text-lg sm:text-xl text-gray-900 dark:text-gray-100">
              {editingBanner ? "탑배너 수정" : "새 탑배너 추가"}
            </DialogTitle>
            <DialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
              탑배너의 정보를 입력하세요. 이 배너는 웹사이트 상단에 표시됩니다.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="title"
                  className="text-gray-900 dark:text-gray-100"
                >
                  제목
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="배너 제목을 입력하세요"
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="order"
                  className="text-gray-900 dark:text-gray-100"
                >
                  순서
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
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="bannerType"
                  className="text-gray-900 dark:text-gray-100"
                >
                  배너 타입
                </Label>
                <Select
                  value={formData.bannerType}
                  onValueChange={(value: "custom" | "lumina-gradient") =>
                    setFormData({ ...formData, bannerType: value })
                  }
                >
                  <SelectTrigger className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-700 border-gray-200 dark:border-gray-600">
                    <SelectItem
                      value="custom"
                      className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      커스텀 색상
                    </SelectItem>
                    <SelectItem
                      value="lumina-gradient"
                      className="text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      LUMINA 그라데이션
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="isFullWidth"
                  className="text-gray-900 dark:text-gray-100"
                >
                  전체 배너
                </Label>
                <div className="flex items-center space-x-2">
                  <Switch
                    id="isFullWidth"
                    checked={formData.isFullWidth}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, isFullWidth: checked })
                    }
                  />
                  <Label
                    htmlFor="isFullWidth"
                    className="text-sm text-gray-900 dark:text-gray-100"
                  >
                    전체 너비 사용
                  </Label>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="content"
                className="text-gray-900 dark:text-gray-100"
              >
                내용
              </Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="배너에 표시할 내용을 입력하세요"
                rows={3}
                className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
              />
            </div>
            {formData.bannerType === "custom" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="backgroundColor"
                    className="text-gray-900 dark:text-gray-100"
                  >
                    배경색
                  </Label>
                  <Input
                    id="backgroundColor"
                    type="color"
                    value={formData.backgroundColor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        backgroundColor: e.target.value,
                      })
                    }
                    className="border-gray-300 dark:border-gray-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label
                    htmlFor="textColor"
                    className="text-gray-900 dark:text-gray-100"
                  >
                    텍스트색
                  </Label>
                  <Input
                    id="textColor"
                    type="color"
                    value={formData.textColor}
                    onChange={(e) =>
                      setFormData({ ...formData, textColor: e.target.value })
                    }
                    className="border-gray-300 dark:border-gray-600"
                  />
                </div>
              </div>
            )}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label
                  htmlFor="linkUrl"
                  className="text-gray-900 dark:text-gray-100"
                >
                  기본 링크 URL
                </Label>
                <Input
                  id="linkUrl"
                  value={formData.linkUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, linkUrl: e.target.value })
                  }
                  placeholder="클릭 시 이동할 URL을 입력하세요 (선택사항)"
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-gray-900 dark:text-gray-100">
                    추가 링크
                  </Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      const newLinks = [
                        ...formData.links,
                        { text: "", url: "" },
                      ];
                      setFormData({ ...formData, links: newLinks });
                    }}
                    className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    링크 추가
                  </Button>
                </div>

                {formData.links.map((link, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <Input
                      placeholder="링크 텍스트"
                      value={link.text}
                      onChange={(e) => {
                        const newLinks = [...formData.links];
                        newLinks[index].text = e.target.value;
                        setFormData({ ...formData, links: newLinks });
                      }}
                      className="flex-1 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <Input
                      placeholder="URL"
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...formData.links];
                        newLinks[index].url = e.target.value;
                        setFormData({ ...formData, links: newLinks });
                      }}
                      className="flex-1 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newLinks = formData.links.filter(
                          (_, i) => i !== index
                        );
                        setFormData({ ...formData, links: newLinks });
                      }}
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="startDate"
                  className="text-gray-900 dark:text-gray-100"
                >
                  시작일
                </Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="endDate"
                  className="text-gray-900 dark:text-gray-100"
                >
                  종료일
                </Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="isActive"
                checked={formData.isActive}
                onCheckedChange={(checked) =>
                  setFormData({ ...formData, isActive: checked })
                }
              />
              <Label
                htmlFor="isActive"
                className="text-gray-900 dark:text-gray-100"
              >
                활성화
              </Label>
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0 sm:space-x-2">
            <Button
              variant="outline"
              onClick={() => setIsDialogOpen(false)}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 w-full sm:w-auto"
            >
              취소
            </Button>
            <Button
              onClick={handleSaveBanner}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white w-full sm:w-auto"
            >
              {editingBanner ? "수정" : "추가"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
