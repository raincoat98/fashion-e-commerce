import React from "react";
import { cn } from "@/lib/utils";

interface LoadingProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "primary" | "secondary" | "white" | "gray";
  className?: string;
  text?: string;
  showText?: boolean;
}

export default function Loading({
  size = "md",
  color = "primary",
  className,
  text = "로딩 중...",
  showText = false,
}: LoadingProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16",
  };

  const colorClasses = {
    primary: "text-yellow-500",
    secondary: "text-gray-500",
    white: "text-white",
    gray: "text-gray-400",
  };

  return (
    <div className={cn("flex flex-col items-center justify-center", className)}>
      <div
        className={cn(
          "animate-spin rounded-full border-2 border-gray-200 border-t-current",
          sizeClasses[size],
          colorClasses[color]
        )}
      />
      {showText && (
        <p className="mt-2 text-sm text-gray-600 animate-pulse">{text}</p>
      )}
    </div>
  );
}

// 전체 화면 로딩 컴포넌트
export function FullScreenLoading({
  text = "데이터를 불러오는 중...",
  color = "primary",
}: {
  text?: string;
  color?: "primary" | "secondary" | "white" | "gray";
}) {
  return (
    <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="text-center">
        <Loading size="xl" color={color} showText text={text} />
      </div>
    </div>
  );
}

// 컨테이너 로딩 컴포넌트
export function ContainerLoading({
  text = "로딩 중...",
  color = "primary",
  className,
}: {
  text?: string;
  color?: "primary" | "secondary" | "white" | "gray";
  className?: string;
}) {
  return (
    <div className={cn("flex items-center justify-center py-12", className)}>
      <Loading size="lg" color={color} showText text={text} />
    </div>
  );
}

// 인라인 로딩 컴포넌트
export function InlineLoading({
  color = "primary",
  className,
}: {
  color?: "primary" | "secondary" | "white" | "gray";
  className?: string;
}) {
  return <Loading size="sm" color={color} className={className} />;
}
