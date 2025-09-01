import React from "react";
import { cn } from "@/lib/utils";
import Loading, { FullScreenLoading, ContainerLoading } from "./loading";

interface LoadingWrapperProps {
  loading: boolean;
  error?: Error | null;
  children: React.ReactNode;
  type?: "fullscreen" | "container" | "inline";
  text?: string;
  color?: "primary" | "secondary" | "white" | "gray";
  className?: string;
  fallback?: React.ReactNode;
  errorFallback?: React.ReactNode;
  minHeight?: string;
}

export default function LoadingWrapper({
  loading,
  error,
  children,
  type = "container",
  text = "로딩 중...",
  color = "primary",
  className,
  fallback,
  errorFallback,
  minHeight = "min-h-[200px]",
}: LoadingWrapperProps) {
  // 에러가 있는 경우
  if (error) {
    if (errorFallback) {
      return <>{errorFallback}</>;
    }

    return (
      <div className={cn("flex items-center justify-center py-12", className)}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            오류가 발생했습니다
          </h3>
          <p className="text-gray-600 mb-4">{error.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  // 로딩 중인 경우
  if (loading) {
    if (fallback) {
      return <>{fallback}</>;
    }

    switch (type) {
      case "fullscreen":
        return <FullScreenLoading text={text} color={color} />;
      case "inline":
        return <Loading size="sm" color={color} showText text={text} />;
      case "container":
      default:
        return (
          <div
            className={cn(
              "flex items-center justify-center",
              minHeight,
              className
            )}
          >
            <Loading size="lg" color={color} showText text={text} />
          </div>
        );
    }
  }

  // 정상 상태
  return <>{children}</>;
}

// 특정 조건에서만 로딩을 표시하는 래퍼
export function ConditionalLoadingWrapper({
  condition,
  loading,
  error,
  children,
  ...props
}: LoadingWrapperProps & { condition: boolean }) {
  if (!condition) {
    return <>{children}</>;
  }

  return (
    <LoadingWrapper loading={loading} error={error} {...props}>
      {children}
    </LoadingWrapper>
  );
}

// 스켈레톤 로딩 래퍼
export function SkeletonLoadingWrapper({
  loading,
  children,
  className,
  skeletonCount = 3,
}: {
  loading: boolean;
  children: React.ReactNode;
  className?: string;
  skeletonCount?: number;
}) {
  if (loading) {
    return (
      <div className={cn("space-y-4", className)}>
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return <>{children}</>;
}
