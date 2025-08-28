import React from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TrackingSystem from "@/components/shipping/TrackingSystem";

export default function TrackingPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">배송 조회</h1>
          <p className="text-gray-600">
            송장번호를 입력하여 배송 상태를 실시간으로 확인하세요
          </p>
        </div>

        <TrackingSystem />
      </main>

      <Footer />
    </div>
  );
}
