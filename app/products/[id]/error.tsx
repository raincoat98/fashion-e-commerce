"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Home, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="text-center space-y-6 p-8">
        <div className="flex justify-center">
          <AlertTriangle className="h-16 w-16 text-red-500" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-gray-900">
            제품을 찾을 수 없습니다
          </h1>
          <p className="text-gray-600 max-w-md">
            요청하신 제품이 존재하지 않거나 삭제되었을 수 있습니다. 다른 제품을
            찾아보시거나 홈으로 돌아가보세요.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="outline"
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>다시 시도</span>
          </Button>
          <Link href="/">
            <Button className="flex items-center space-x-2">
              <Home className="h-4 w-4" />
              <span>홈으로</span>
            </Button>
          </Link>
        </div>

        {process.env.NODE_ENV === "development" && (
          <details className="mt-8 text-left max-w-md mx-auto">
            <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
              개발자 정보 (클릭하여 확장)
            </summary>
            <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
      </div>
    </div>
  );
}
