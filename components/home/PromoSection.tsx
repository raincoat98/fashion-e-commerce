'use client';

import React from 'react';
import { Clock, Package, Gift } from 'lucide-react';

export default function PromoSection() {
  const promos = [
    {
      icon: Clock,
      title: '타임딜',
      subtitle: '24시간 한정',
      description: '매일 오전 10시 새로운 딜',
      color: 'bg-red-500',
      textColor: 'text-red-600'
    },
    {
      icon: Package,
      title: '셋업 번들',
      subtitle: '상하의 세트',
      description: '함께 입으면 더 예쁜 조합',
      color: 'bg-blue-500',
      textColor: 'text-blue-600'
    },
    {
      icon: Gift,
      title: '균일가',
      subtitle: '전 상품 동일가',
      description: '복잡한 가격 고민 없이',
      color: 'bg-green-500',
      textColor: 'text-green-600'
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {promos.map((promo, index) => (
            <div
              key={index}
              className="group bg-gray-50 rounded-2xl p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-start space-x-4">
                <div className={`${promo.color} rounded-xl p-3 group-hover:scale-110 transition-transform`}>
                  <promo.icon className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-900">{promo.title}</h3>
                  <p className={`${promo.textColor} font-medium text-sm`}>{promo.subtitle}</p>
                  <p className="text-gray-600 text-sm mt-1">{promo.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}