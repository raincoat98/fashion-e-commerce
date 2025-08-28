"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  Star,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

// 로그인 폼 스키마
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
  password: z
    .string()
    .min(1, "비밀번호를 입력해주세요")
    .min(6, "비밀번호는 최소 6자 이상이어야 합니다"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  // URL 파라미터에서 메시지 확인
  React.useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const messageParam = urlParams.get("message");
    if (messageParam) {
      setMessage(messageParam);
    }
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);

    try {
      // TODO: 실제 로그인 API 호출
      console.log("로그인 시도:", data);

      // 시뮬레이션을 위한 지연
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 시 홈페이지로 리다이렉트
      window.location.href = "/";
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-16 h-16 border border-yellow-400/30 rounded-full"></div>
        <div className="absolute top-40 right-40 w-12 h-12 border border-yellow-400/20 rounded-full"></div>
        <div className="absolute bottom-40 left-1/3 w-20 h-20 border border-yellow-400/25 rounded-full"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-32 left-16 animate-pulse">
          <Sparkles className="text-yellow-400/40 w-6 h-6" />
        </div>
        <div className="absolute top-64 right-24 animate-pulse delay-1000">
          <Star className="text-yellow-400/30 w-4 h-4" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-pulse delay-2000">
          <Heart className="text-yellow-400/35 w-5 h-5" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* 로고 및 제목 */}
          <div className="text-center">
            <Link href="/" className="inline-flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 lumina-gradient rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">L</span>
              </div>
              <span className="text-3xl font-bold lumina-text-gradient">
                LUMINA
              </span>
            </Link>

            <div className="inline-flex items-center space-x-2 bg-yellow-500/20 text-yellow-300 px-4 py-2 rounded-full text-sm font-medium border border-yellow-500/30 mb-4">
              <Sparkles className="w-4 h-4" />
              <span>WELCOME BACK</span>
            </div>

            <h2 className="text-3xl font-bold text-white mb-2">로그인</h2>
            <p className="text-gray-300">
              LUMINA와 함께{" "}
              <span className="text-yellow-300 font-medium">빛나는 당신</span>을
              만나보세요
            </p>
          </div>

          {/* 로그인 카드 */}
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 shadow-2xl">
            <CardHeader className="space-y-1 pb-6">
              <CardTitle className="text-xl text-center text-white">
                계정에 로그인
              </CardTitle>
              <CardDescription className="text-center text-gray-300">
                이메일과 비밀번호를 입력해주세요
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* 성공 메시지 표시 */}
              {message && (
                <div className="p-4 bg-green-500/20 border border-green-400/30 rounded-lg">
                  <p className="text-sm text-green-300">{message}</p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                {/* 이메일 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-white">
                    이메일
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="example@email.com"
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-sm text-red-400">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* 비밀번호 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-white">
                    비밀번호
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="비밀번호를 입력하세요"
                      className="pl-10 pr-10 bg-white/10 border-white/20 text-white placeholder-gray-400 focus:border-yellow-400 focus:ring-yellow-400/20"
                      {...register("password")}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-yellow-400 transition-colors"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-400">
                      {errors.password.message}
                    </p>
                  )}
                </div>

                {/* 전체 에러 메시지 */}
                {errors.root && (
                  <div className="p-4 bg-red-500/20 border border-red-400/30 rounded-lg">
                    <p className="text-sm text-red-300">
                      {errors.root.message}
                    </p>
                  </div>
                )}

                {/* 로그인 버튼 */}
                <Button
                  type="submit"
                  className="w-full lumina-gradient hover:opacity-90 text-white py-3 text-lg font-semibold lumina-shadow-lg transition-all duration-300 group"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>로그인 중...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-2">
                      <Sparkles className="w-5 h-5" />
                      <span>로그인</span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  )}
                </Button>
              </form>

              {/* 추가 옵션 */}
              <div className="space-y-6">
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded border-gray-400 text-yellow-400 focus:ring-yellow-400 bg-white/10"
                    />
                    <span className="text-gray-300">로그인 상태 유지</span>
                  </label>
                  <Link
                    href="/forgot-password"
                    className="text-yellow-400 hover:text-yellow-300 transition-colors"
                  >
                    비밀번호 찾기
                  </Link>
                </div>

                <Separator className="bg-white/20" />

                {/* 소셜 로그인 */}
                <div className="space-y-4">
                  <p className="text-center text-sm text-gray-400">또는</p>
                  <Button
                    variant="outline"
                    className="w-full border-white/50 text-white hover:bg-white/20 hover:border-white/70 transition-all duration-300 bg-black/20"
                    type="button"
                  >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google로 로그인
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 하단 링크 */}
          <div className="text-center">
            <p className="text-gray-300">
              계정이 없으신가요?{" "}
              <Link
                href="/signup"
                className="font-medium text-yellow-400 hover:text-yellow-300 transition-colors"
              >
                회원가입하기
              </Link>
            </p>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span>안전한 로그인</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span>개인정보 보호</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span>24/7 지원</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
