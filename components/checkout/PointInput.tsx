"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, CheckCircle, X, AlertCircle, Gift } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PointInputProps {
  totalAmount: number;
  onPointsUsed: (points: number) => void;
  usedPoints: number;
  availablePoints: number;
}

export default function PointInput({
  totalAmount,
  onPointsUsed,
  usedPoints,
  availablePoints,
}: PointInputProps) {
  const [pointsToUse, setPointsToUse] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // 최대 사용 가능 포인트 계산 (결제 금액의 50% 또는 보유 포인트 중 작은 값)
  const maxUsablePoints = Math.min(
    Math.floor(totalAmount * 0.5),
    availablePoints
  );

  // 포인트 적용
  const applyPoints = async () => {
    const points = parseInt(pointsToUse);

    if (!pointsToUse.trim() || isNaN(points)) {
      toast({
        title: "포인트 입력 필요",
        description: "사용할 포인트를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (points <= 0) {
      toast({
        title: "잘못된 포인트",
        description: "0보다 큰 포인트를 입력해주세요.",
        variant: "destructive",
      });
      return;
    }

    if (points > availablePoints) {
      toast({
        title: "포인트 부족",
        description: `보유 포인트(${availablePoints.toLocaleString()}P)보다 많이 입력할 수 없습니다.`,
        variant: "destructive",
      });
      return;
    }

    if (points > maxUsablePoints) {
      toast({
        title: "포인트 사용 한도 초과",
        description: `최대 ${maxUsablePoints.toLocaleString()}P까지 사용 가능합니다. (주문 금액의 50%)`,
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // Mock API 호출 시뮬레이션
    await new Promise((resolve) => setTimeout(resolve, 500));

    onPointsUsed(points);
    setPointsToUse("");
    setIsLoading(false);

    toast({
      title: "포인트 적용 완료",
      description: `${points.toLocaleString()}P가 적용되었습니다.`,
    });
  };

  // 포인트 제거
  const removePoints = () => {
    onPointsUsed(0);
    toast({
      title: "포인트 사용 취소",
      description: "포인트 사용이 취소되었습니다.",
    });
  };

  // 전체 포인트 사용
  const useAllPoints = () => {
    setPointsToUse(maxUsablePoints.toString());
  };

  // 예상 적립 포인트 계산 (결제 금액의 1%)
  const expectedEarnedPoints = Math.floor((totalAmount - usedPoints) * 0.01);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Coins className="w-5 h-5 text-blue-600" />
            <span>포인트</span>
          </div>
          <Badge variant="outline" className="text-blue-600 border-blue-200">
            보유: {availablePoints.toLocaleString()}P
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {usedPoints === 0 ? (
          <div className="space-y-4">
            {/* 포인트 입력 */}
            <div className="space-y-3">
              <div className="flex space-x-2">
                <Input
                  type="number"
                  placeholder="사용할 포인트를 입력하세요"
                  value={pointsToUse}
                  onChange={(e) => setPointsToUse(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && applyPoints()}
                  className="flex-1"
                  max={maxUsablePoints}
                  min="0"
                />
                <Button
                  onClick={applyPoints}
                  disabled={isLoading}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                >
                  {isLoading ? "적용 중..." : "적용"}
                </Button>
              </div>

              {/* 빠른 사용 버튼들 */}
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPointsToUse("1000")}
                  disabled={maxUsablePoints < 1000}
                  className="text-xs"
                >
                  1,000P
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPointsToUse("5000")}
                  disabled={maxUsablePoints < 5000}
                  className="text-xs"
                >
                  5,000P
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setPointsToUse("10000")}
                  disabled={maxUsablePoints < 10000}
                  className="text-xs"
                >
                  10,000P
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={useAllPoints}
                  disabled={maxUsablePoints <= 0}
                  className="text-xs"
                >
                  전체 사용
                </Button>
              </div>
            </div>

            {/* 포인트 사용 안내 */}
            <div className="p-3 bg-blue-50 rounded-lg">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-blue-800 space-y-1">
                  <p>• 주문 금액의 최대 50%까지 포인트 사용 가능</p>
                  <p>• 최대 사용 가능: {maxUsablePoints.toLocaleString()}P</p>
                  <p>• 1P = 1원으로 사용됩니다</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* 적용된 포인트 표시 */}
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">포인트 사용</span>
                    <Badge className="bg-green-100 text-green-800">
                      -{usedPoints.toLocaleString()}P
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">
                    {usedPoints.toLocaleString()}원 할인 적용
                  </p>
                </div>
              </div>
              <Button
                size="sm"
                variant="outline"
                onClick={removePoints}
                className="text-red-600 hover:text-red-700"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* 적립 예정 포인트 */}
        <div className="border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Gift className="w-4 h-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-700">
                적립 예정 포인트
              </span>
            </div>
            <span className="text-sm font-medium text-orange-600">
              +{expectedEarnedPoints.toLocaleString()}P
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-1">
            결제 완료 후 자동 적립 (결제 금액의 1%)
          </p>
        </div>

        {/* 포인트 사용 후 잔여 포인트 */}
        {usedPoints > 0 && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">사용 후 보유 포인트</span>
            <span className="font-medium">
              {(availablePoints - usedPoints).toLocaleString()}P
            </span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
