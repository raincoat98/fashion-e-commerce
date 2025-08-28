'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { CreditCard, Smartphone, Building } from 'lucide-react';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreements, setAgreements] = useState({
    terms: false,
    privacy: false,
    payment: false
  });

  // Mock cart items
  const cartItems = [
    {
      id: 1,
      name: '베이직 코튼 티셔츠',
      price: 29000,
      size: 'M',
      color: 'Black',
      quantity: 1,
      image: 'https://images.pexels.com/photos/1545743/pexels-photo-1545743.jpeg?auto=compress&cs=tinysrgb&w=100'
    },
    {
      id: 2,
      name: '와이드 데님 팬츠',
      price: 39000,
      size: 'L',
      color: 'Blue',
      quantity: 2,
      image: 'https://images.pexels.com/photos/2065195/pexels-photo-2065195.jpeg?auto=compress&cs=tinysrgb&w=100'
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 50000 ? 0 : 3000;
  const total = subtotal + shipping;

  const allAgreed = Object.values(agreements).every(Boolean);

  const handleAgreementChange = (key: keyof typeof agreements, checked: boolean) => {
    setAgreements(prev => ({ ...prev, [key]: checked }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!allAgreed) {
      alert('필수 약관에 동의해주세요.');
      return;
    }
    // Handle payment processing
    alert('결제가 진행됩니다.');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">주문/결제</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Shipping Address */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">배송 정보</h2>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">받는 분</Label>
                    <Input id="name" placeholder="이름을 입력하세요" required />
                  </div>
                  <div>
                    <Label htmlFor="phone">연락처</Label>
                    <Input id="phone" type="tel" placeholder="010-0000-0000" required />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="address">주소</Label>
                  <div className="flex space-x-2">
                    <Input id="postcode" placeholder="우편번호" className="w-32" required />
                    <Button type="button" variant="outline">주소 검색</Button>
                  </div>
                  <Input className="mt-2" placeholder="기본 주소" required />
                  <Input className="mt-2" placeholder="상세 주소" required />
                </div>
                
                <div>
                  <Label htmlFor="deliveryMemo">배송 메모</Label>
                  <Textarea
                    id="deliveryMemo"
                    placeholder="배송시 요청사항을 입력하세요 (선택사항)"
                    rows={3}
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">결제 수단</h2>
              
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-gray-400 transition-colors">
                    <RadioGroupItem value="card" id="card" />
                    <CreditCard className="h-5 w-5 text-gray-600" />
                    <Label htmlFor="card" className="flex-1 cursor-pointer">
                      신용카드 / 체크카드
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-gray-400 transition-colors">
                    <RadioGroupItem value="kakaopay" id="kakaopay" />
                    <Smartphone className="h-5 w-5 text-gray-600" />
                    <Label htmlFor="kakaopay" className="flex-1 cursor-pointer">
                      카카오페이
                    </Label>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-4 border rounded-lg hover:border-gray-400 transition-colors">
                    <RadioGroupItem value="bank" id="bank" />
                    <Building className="h-5 w-5 text-gray-600" />
                    <Label htmlFor="bank" className="flex-1 cursor-pointer">
                      무통장 입금
                    </Label>
                  </div>
                </div>
              </RadioGroup>
            </div>

            {/* Agreements */}
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-gray-900 mb-6">약관 동의</h2>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="terms"
                    checked={agreements.terms}
                    onCheckedChange={(checked) => handleAgreementChange('terms', checked as boolean)}
                  />
                  <Label htmlFor="terms" className="flex-1 cursor-pointer">
                    <span className="text-red-600">[필수]</span> 이용약관 동의
                  </Label>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    보기
                  </Button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="privacy"
                    checked={agreements.privacy}
                    onCheckedChange={(checked) => handleAgreementChange('privacy', checked as boolean)}
                  />
                  <Label htmlFor="privacy" className="flex-1 cursor-pointer">
                    <span className="text-red-600">[필수]</span> 개인정보처리방침 동의
                  </Label>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    보기
                  </Button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Checkbox
                    id="payment"
                    checked={agreements.payment}
                    onCheckedChange={(checked) => handleAgreementChange('payment', checked as boolean)}
                  />
                  <Label htmlFor="payment" className="flex-1 cursor-pointer">
                    <span className="text-red-600">[필수]</span> 결제대행 서비스 약관 동의
                  </Label>
                  <Button variant="ghost" size="sm" className="text-gray-500">
                    보기
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-sm sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">주문 상품</h2>
              
              {/* Product List */}
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-gray-900 truncate">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-500">
                        {item.size} / {item.color} / {item.quantity}개
                      </p>
                      <p className="text-sm font-bold text-gray-900">
                        {(item.price * item.quantity).toLocaleString()}원
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Price Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">상품 금액</span>
                  <span>{subtotal.toLocaleString()}원</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">배송비</span>
                  <span>{shipping === 0 ? '무료' : `${shipping.toLocaleString()}원`}</span>
                </div>
                <hr className="border-gray-200" />
                <div className="flex justify-between text-lg font-bold">
                  <span>총 결제 금액</span>
                  <span className="text-red-600">{total.toLocaleString()}원</span>
                </div>
              </div>
              
              {/* Payment Button */}
              <Button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3"
                disabled={!allAgreed}
              >
                {total.toLocaleString()}원 결제하기
              </Button>
              
              <p className="text-xs text-gray-500 text-center mt-3">
                결제 완료 후 주문 내역은 마이페이지에서 확인하실 수 있습니다.
              </p>
            </div>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
}