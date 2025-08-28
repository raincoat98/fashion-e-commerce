"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
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
import Link from "next/link";

// 비밀번호 찾기 폼 스키마
const forgotPasswordSchema = z.object({
  email: z
    .string()
    .min(1, "이메일을 입력해주세요")
    .email("올바른 이메일 형식이 아닙니다"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      // TODO: 실제 비밀번호 재설정 이메일 발송 API 호출
      console.log("비밀번호 재설정 이메일 발송:", data);

      // 시뮬레이션을 위한 지연
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 성공 시 제출 완료 상태로 변경
      setIsSubmitted(true);
    } catch (error) {
      setError("root", {
        type: "manual",
        message: "이메일 발송에 실패했습니다. 다시 시도해주세요.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* 로고 및 제목 */}
          <div className="text-center">
            <Link
              href="/"
              className="text-3xl font-bold text-gray-900 mb-2 block"
            >
              FASHION
            </Link>
            <h2 className="text-2xl font-semibold text-gray-900">
              비밀번호 재설정
            </h2>
          </div>

          {/* 성공 메시지 카드 */}
          <Card className="shadow-lg">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    이메일이 발송되었습니다
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    입력하신 이메일 주소로 비밀번호 재설정 링크를 보냈습니다.
                    이메일을 확인하여 비밀번호를 재설정해주세요.
                  </p>
                  <p className="text-xs text-gray-500">
                    이메일이 보이지 않는다면 스팸 폴더를 확인해주세요.
                  </p>
                </div>
                <div className="space-y-3">
                  <Button asChild className="w-full">
                    <Link href="/login">로그인 페이지로 돌아가기</Link>
                  </Button>
                  <Button variant="outline" asChild className="w-full">
                    <Link href="/">홈으로 돌아가기</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* 로고 및 제목 */}
        <div className="text-center">
          <Link
            href="/"
            className="text-3xl font-bold text-gray-900 mb-2 block"
          >
            FASHION
          </Link>
          <h2 className="text-2xl font-semibold text-gray-900">
            비밀번호 찾기
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            가입하신 이메일 주소를 입력해주세요
          </p>
        </div>

        {/* 비밀번호 찾기 카드 */}
        <Card className="shadow-lg">
          <CardHeader className="space-y-1">
            <CardTitle className="text-xl text-center">
              비밀번호 재설정
            </CardTitle>
            <CardDescription className="text-center">
              이메일로 비밀번호 재설정 링크를 보내드립니다
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* 이메일 입력 */}
              <div className="space-y-2">
                <Label htmlFor="email">이메일</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    className="pl-10"
                    {...register("email")}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-600">{errors.email.message}</p>
                )}
              </div>

              {/* 전체 에러 메시지 */}
              {errors.root && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                  <p className="text-sm text-red-600">{errors.root.message}</p>
                </div>
              )}

              {/* 이메일 발송 버튼 */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>발송 중...</span>
                  </div>
                ) : (
                  <span>비밀번호 재설정 이메일 발송</span>
                )}
              </Button>
            </form>

            {/* 추가 정보 */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-md">
              <h4 className="text-sm font-medium text-blue-900 mb-2">
                비밀번호 재설정 안내
              </h4>
              <ul className="text-xs text-blue-800 space-y-1">
                <li>• 가입하신 이메일 주소로 재설정 링크를 발송합니다</li>
                <li>• 이메일을 확인하여 비밀번호를 재설정해주세요</li>
                <li>• 링크는 24시간 동안 유효합니다</li>
                <li>• 이메일이 보이지 않는다면 스팸 폴더를 확인해주세요</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* 하단 링크 */}
        <div className="text-center">
          <Button variant="ghost" asChild className="text-sm">
            <Link href="/login" className="flex items-center space-x-2">
              <ArrowLeft className="h-4 w-4" />
              <span>로그인 페이지로 돌아가기</span>
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
