'use client';

import React from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { CheckCircle, Package, CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function OrderCompletePage() {
  // Mock order data
  const order = {
    orderNumber: '2025010112345',
    orderDate: '2025-01-01 14:30',
    paymentAmount: 107000,
    paymentMethod: '신용카드',
    deliveryAddress: '서울특별시 강남구 테헤란로 123, 456호',
    estimatedDelivery: '2025-01-03 (수)'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              주문이 완료되었습니다!
            </h1>
            <p className="text-gray-600">
              주문해 주셔서 감사합니다. 빠른 배송으로 보답하겠습니다.
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-6">
            <div className="border-b pb-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">주문 정보</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">주문번호</span>
                  <p className="font-bold text-lg">{order.orderNumber}</p>
                </div>
                <div>
                  <span className="text-gray-600">주문일시</span>
                  <p className="font-medium">{order.orderDate}</p>
                </div>
                <div>
                  <span className="text-gray-600">결제금액</span>
                  <p className="font-bold text-lg text-red-600">
                    {order.paymentAmount.toLocaleString()}원
                  </p>
                </div>
                <div>
                  <span className="text-gray-600">결제방법</span>
                  <p className="font-medium">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

            <div className="border-b pb-6">
              <h3 className="font-bold text-gray-900 mb-3">배송 정보</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600 block">배송지</span>
                  <p className="font-medium">{order.deliveryAddress}</p>
                </div>
                <div>
                  <span className="text-gray-600 block">예상 배송일</span>
                  <p className="font-medium text-blue-600">{order.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg">
              <div className="flex items-start space-x-3">
                <Package className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900">배송 안내</p>
                  <p className="text-blue-800 mt-1">
                    평일 오후 2시까지 주문하신 상품은 당일 발송됩니다.<br />
                    배송 현황은 문자로 안내해 드립니다.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <Link href="/account/orders" className="flex-1">
              <Button variant="outline" className="w-full py-3">
                주문 내역 보기
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3">
                쇼핑 계속하기
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-gray-100 p-6 rounded-xl">
            <h3 className="font-bold text-gray-900 mb-4">고객센터 안내</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-gray-600" />
                <span className="text-gray-600">전화:</span>
                <span className="font-medium">1588-0000</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600">운영시간:</span>
                <span className="font-medium">평일 09:00-18:00</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-4">
              주문 관련 문의사항이 있으시면 언제든지 고객센터로 연락주세요.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}