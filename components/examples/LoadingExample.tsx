"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import LoadingWrapper from "@/components/ui/LoadingWrapper";
import { useLoading, useMultipleLoading } from "@/hooks/useLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// 가짜 API 함수들
const fakeApiCall = (delay: number = 1000) =>
  new Promise<string>((resolve) =>
    setTimeout(() => resolve(`데이터 로딩 완료 (${delay}ms)`), delay)
  );

const fakeErrorApiCall = () =>
  new Promise<string>((_, reject) =>
    setTimeout(() => reject(new Error("API 호출 실패")), 1000)
  );

export default function LoadingExample() {
  // 기본 로딩 훅 사용
  const { loading, error, data, execute, reset } = useLoading({
    delay: 500,
    onSuccess: (data) => console.log("성공:", data),
    onError: (error) => console.log("에러:", error),
  });

  // 여러 로딩 상태 관리
  const {
    execute: executeMultiple,
    isLoading,
    getError,
  } = useMultipleLoading();

  const handleBasicLoad = async () => {
    await execute(() => fakeApiCall(2000));
  };

  const handleErrorLoad = async () => {
    try {
      await execute(() => fakeErrorApiCall());
    } catch (error) {
      // 에러는 훅에서 자동으로 처리됨
    }
  };

  const handleMultipleLoad = async () => {
    // 여러 API를 동시에 호출
    await Promise.all([
      executeMultiple("users", () => fakeApiCall(1500)),
      executeMultiple("products", () => fakeApiCall(2000)),
      executeMultiple("orders", () => fakeApiCall(1000)),
    ]);
  };

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center mb-8">
        로딩 컴포넌트 데모
      </h1>

      {/* 기본 로딩 예시 */}
      <Card>
        <CardHeader>
          <CardTitle>기본 로딩 훅</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex space-x-4">
            <Button onClick={handleBasicLoad} disabled={loading}>
              데이터 로드
            </Button>
            <Button
              onClick={handleErrorLoad}
              disabled={loading}
              variant="destructive"
            >
              에러 테스트
            </Button>
            <Button onClick={reset} variant="outline">
              리셋
            </Button>
          </div>

          <LoadingWrapper loading={loading} error={error} type="container">
            <div className="p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">로딩 결과:</h3>
              <p className="text-gray-600">{data || "데이터가 없습니다"}</p>
            </div>
          </LoadingWrapper>
        </CardContent>
      </Card>

      {/* 여러 로딩 상태 예시 */}
      <Card>
        <CardHeader>
          <CardTitle>여러 로딩 상태 관리</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleMultipleLoad}>여러 데이터 동시 로드</Button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* 사용자 데이터 */}
            <LoadingWrapper
              loading={isLoading("users")}
              error={getError("users")}
              type="container"
              text="사용자 데이터 로딩 중..."
            >
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900">사용자 데이터</h4>
                <p className="text-blue-700">사용자 정보가 로드되었습니다</p>
              </div>
            </LoadingWrapper>

            {/* 상품 데이터 */}
            <LoadingWrapper
              loading={isLoading("products")}
              error={getError("products")}
              type="container"
              text="상품 데이터 로딩 중..."
            >
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900">상품 데이터</h4>
                <p className="text-green-700">상품 정보가 로드되었습니다</p>
              </div>
            </LoadingWrapper>

            {/* 주문 데이터 */}
            <LoadingWrapper
              loading={isLoading("orders")}
              error={getError("orders")}
              type="container"
              text="주문 데이터 로딩 중..."
            >
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900">주문 데이터</h4>
                <p className="text-purple-700">주문 정보가 로드되었습니다</p>
              </div>
            </LoadingWrapper>
          </div>
        </CardContent>
      </Card>

      {/* 로딩 타입 예시 */}
      <Card>
        <CardHeader>
          <CardTitle>로딩 타입별 예시</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* 전체 화면 로딩 */}
          <div>
            <h4 className="font-semibold mb-2">전체 화면 로딩</h4>
            <LoadingWrapper
              loading={isLoading("fullscreen")}
              type="fullscreen"
              text="전체 화면을 로딩 중입니다..."
            >
              <div className="p-4 bg-gray-50 rounded-lg">전체 화면 콘텐츠</div>
            </LoadingWrapper>
            <Button
              onClick={() =>
                executeMultiple("fullscreen", () => fakeApiCall(3000))
              }
              className="mt-2"
            >
              전체 화면 로딩 테스트
            </Button>
          </div>

          {/* 인라인 로딩 */}
          <div>
            <h4 className="font-semibold mb-2">인라인 로딩</h4>
            <div className="flex items-center space-x-4">
              <span>텍스트와 함께:</span>
              <LoadingWrapper
                loading={isLoading("inline")}
                type="inline"
                text="처리 중..."
              >
                <span className="text-green-600">완료!</span>
              </LoadingWrapper>
            </div>
            <Button
              onClick={() => executeMultiple("inline", () => fakeApiCall(1000))}
              className="mt-2"
            >
              인라인 로딩 테스트
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
