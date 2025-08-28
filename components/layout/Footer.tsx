import React from 'react';
import { Phone, Mail, Clock } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-white text-lg font-bold">FASHION</h3>
            <p className="text-sm leading-relaxed">
              트렌디하고 품질 좋은 여성 의류를<br />
              합리적인 가격에 제공합니다.
            </p>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">고객센터</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>1588-0000</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>help@fashion.co.kr</span>
              </div>
              <div className="flex items-start space-x-2">
                <Clock className="h-4 w-4 mt-0.5" />
                <div>
                  <p>평일 09:00 - 18:00</p>
                  <p>토요일 09:00 - 15:00</p>
                  <p>일요일, 공휴일 휴무</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shopping Guide */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">쇼핑 안내</h4>
            <div className="space-y-2 text-sm">
              <a href="/guide/shipping" className="block hover:text-white transition-colors">
                배송 안내
              </a>
              <a href="/guide/exchange" className="block hover:text-white transition-colors">
                교환/반품
              </a>
              <a href="/guide/size" className="block hover:text-white transition-colors">
                사이즈 가이드
              </a>
              <a href="/guide/payment" className="block hover:text-white transition-colors">
                결제 방법
              </a>
            </div>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold">약관 및 정책</h4>
            <div className="space-y-2 text-sm">
              <a href="/legal/terms" className="block hover:text-white transition-colors">
                이용약관
              </a>
              <a href="/legal/privacy" className="block hover:text-white transition-colors">
                개인정보처리방침
              </a>
              <a href="/legal/commerce" className="block hover:text-white transition-colors">
                전자상거래법 표시
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8 space-y-4">
          <div className="text-sm text-gray-400">
            <p><strong>상호명:</strong> (주)패션스토어 | <strong>대표:</strong> 홍길동</p>
            <p><strong>사업자등록번호:</strong> 123-45-67890 | <strong>통신판매업신고:</strong> 제2024-서울강남-0000호</p>
            <p><strong>주소:</strong> 서울특별시 강남구 테헤란로 123, 456호</p>
            <p><strong>개인정보보호책임자:</strong> 김철수 (privacy@fashion.co.kr)</p>
          </div>
          <div className="text-xs text-gray-500">
            <p>Copyright © 2025 Fashion Store. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}