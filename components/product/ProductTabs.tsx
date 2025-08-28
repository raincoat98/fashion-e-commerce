'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ProductTabsProps {
  description: string;
  materials: string;
  care: string;
  modelInfo: string;
  measurements: {
    [key: string]: {
      chest: number;
      shoulder: number;
      length: number;
      sleeve: number;
    };
  };
}

export default function ProductTabs({
  description,
  materials,
  care,
  modelInfo,
  measurements
}: ProductTabsProps) {
  return (
    <Tabs defaultValue="description" className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        <TabsTrigger value="description">상품정보</TabsTrigger>
        <TabsTrigger value="size">사이즈</TabsTrigger>
        <TabsTrigger value="shipping">배송/교환</TabsTrigger>
        <TabsTrigger value="reviews">리뷰</TabsTrigger>
      </TabsList>
      
      <TabsContent value="description" className="mt-8 space-y-6">
        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold mb-4">상품 설명</h3>
          <p className="text-gray-700 leading-relaxed mb-6">{description}</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-2">소재 정보</h4>
              <p className="text-gray-600">{materials}</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">세탁 방법</h4>
              <p className="text-gray-600">{care}</p>
            </div>
          </div>
          
          <div className="bg-gray-50 p-4 rounded-lg mt-6">
            <h4 className="font-medium mb-2">모델 착용 정보</h4>
            <p className="text-gray-600">{modelInfo}</p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="size" className="mt-8">
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">상세 사이즈표</h3>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-3 text-left font-medium">사이즈</th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-medium">가슴둘레</th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-medium">어깨너비</th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-medium">총길이</th>
                  <th className="border border-gray-200 px-4 py-3 text-center font-medium">소매길이</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(measurements).map(([size, measures]) => (
                  <tr key={size}>
                    <td className="border border-gray-200 px-4 py-3 font-medium">{size}</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{measures.chest}cm</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{measures.shoulder}cm</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{measures.length}cm</td>
                    <td className="border border-gray-200 px-4 py-3 text-center">{measures.sleeve}cm</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-blue-900">사이즈 선택 가이드</h4>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• 평소 입으시는 사이즈를 선택하세요</li>
              <li>• 오버핏을 원하신다면 한 사이즈 크게 선택하세요</li>
              <li>• 사이즈 문의는 고객센터로 연락주세요</li>
            </ul>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="shipping" className="mt-8">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">배송 정보</h3>
            <div className="space-y-3 text-sm">
              <div className="flex">
                <span className="w-20 font-medium">배송비</span>
                <span>3,000원 (5만원 이상 구매시 무료배송)</span>
              </div>
              <div className="flex">
                <span className="w-20 font-medium">배송시간</span>
                <span>평일 오후 2시까지 주문시 당일발송</span>
              </div>
              <div className="flex">
                <span className="w-20 font-medium">배송기간</span>
                <span>발송 후 1-2일 소요 (도서산간 지역 2-3일)</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">교환/반품 안내</h3>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-medium mb-2">교환/반품 가능 조건</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 상품 수령일로부터 7일 이내</li>
                  <li>• 상품 택 제거하지 않은 새 상품</li>
                  <li>• 세탁하지 않은 상태</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium mb-2">교환/반품 불가 조건</h4>
                <ul className="space-y-1 ml-4">
                  <li>• 고객의 단순 변심으로 인한 착용 후 반품</li>
                  <li>• 세탁 또는 수선한 상품</li>
                  <li>• 상품 택이 제거된 상품</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="reviews" className="mt-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold">고객 리뷰</h3>
            <button className="text-sm text-gray-600 hover:text-gray-900">
              리뷰 작성하기
            </button>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-600">아직 작성된 리뷰가 없습니다.</p>
            <p className="text-sm text-gray-500 mt-2">첫 번째 리뷰를 작성해보세요!</p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}