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
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      
      <main className="container mx-auto py-16">
        <div className="max-w-2xl mx-auto">
          {/* Success Message */}
          <div className="text-center mb-12">
            <CheckCircle className="h-16 w-16 text-green-500 dark:text-green-400 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              주문이 완료되었습니다!
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              주문해 주셔서 감사합니다. 빠른 배송으로 보답하겠습니다.
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-200 dark:border-gray-700 space-y-6">
            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">주문 정보</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400">주문번호</span>
                  <p className="font-bold text-lg text-gray-900 dark:text-gray-100">{order.orderNumber}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">주문일시</span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{order.orderDate}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">결제금액</span>
                  <p className="font-bold text-lg text-red-600 dark:text-red-400">
                    {order.paymentAmount.toLocaleString()}원
                  </p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400">결제방법</span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

            <div className="border-b border-gray-200 dark:border-gray-700 pb-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-3">배송 정보</h3>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-gray-600 dark:text-gray-400 block">배송지</span>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{order.deliveryAddress}</p>
                </div>
                <div>
                  <span className="text-gray-600 dark:text-gray-400 block">예상 배송일</span>
                  <p className="font-medium text-blue-600 dark:text-blue-400">{order.estimatedDelivery}</p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-900/30">
              <div className="flex items-start space-x-3">
                <Package className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-blue-900 dark:text-blue-100">배송 안내</p>
                  <p className="text-blue-800 dark:text-blue-200 mt-1">
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
              <Button variant="outline" className="w-full py-3 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                주문 내역 보기
              </Button>
            </Link>
            <Link href="/" className="flex-1">
              <Button className="w-full bg-gray-900 dark:bg-gray-100 hover:bg-gray-800 dark:hover:bg-gray-200 text-white dark:text-gray-900 py-3">
                쇼핑 계속하기
              </Button>
            </Link>
          </div>

          {/* Additional Info */}
          <div className="mt-12 bg-gray-100 dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 mb-4">고객센터 안내</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <CreditCard className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">전화:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">1588-0000</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-600 dark:text-gray-400">운영시간:</span>
                <span className="font-medium text-gray-900 dark:text-gray-100">평일 09:00-18:00</span>
              </div>
            </div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-4">
              주문 관련 문의사항이 있으시면 언제든지 고객센터로 연락주세요.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}