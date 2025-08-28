'use client';

import React, { useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ProductCard from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { Filter, Grid, List, ChevronDown } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { category: 'new' },
    { category: 'best' },
    { category: 'outer' },
    { category: 'top' },
    { category: 'bottom' },
    { category: 'dress' },
    { category: 'sale' }
  ];
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  // Mock data - replace with actual API call
  const products = Array.from({ length: 12 }, (_, i) => ({
    id: i + 1,
    name: `상품 ${i + 1}`,
    price: Math.floor(Math.random() * 50000) + 20000,
    originalPrice: Math.floor(Math.random() * 80000) + 40000,
    image: `https://images.pexels.com/photos/${1536619 + i}/pexels-photo-${1536619 + i}.jpeg?auto=compress&cs=tinysrgb&w=400`,
    hoverImage: `https://images.pexels.com/photos/${1545743 + i}/pexels-photo-${1545743 + i}.jpeg?auto=compress&cs=tinysrgb&w=400`,
    badge: i % 3 === 0 ? 'SALE' : undefined,
    rating: 4.5 + Math.random() * 0.5,
    reviewCount: Math.floor(Math.random() * 200) + 10,
    sizes: ['S', 'M', 'L']
  }));

  const categoryNames: { [key: string]: string } = {
    'new': '신상품',
    'best': '베스트',
    'outer': '아우터',
    'top': '상의',
    'bottom': '하의',
    'dress': '원피스',
    'sale': '세일'
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto py-8">
        {/* Breadcrumb */}
        <div className="text-sm text-gray-500 mb-6">
          <span>홈</span> / <span className="text-gray-900">{categoryNames[params.category] || params.category}</span>
        </div>

        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {categoryNames[params.category] || params.category}
          </h1>
          <p className="text-gray-600">총 {products.length}개의 상품</p>
        </div>

        {/* Filter and Sort Bar */}
        <div className="bg-white rounded-lg p-4 mb-6 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
            {/* Filters */}
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center space-x-2"
              >
                <Filter className="h-4 w-4" />
                <span>필터</span>
                <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>

              {/* Size Filter Pills */}
              <div className="flex space-x-2">
                <Button variant="outline" size="sm">S</Button>
                <Button variant="outline" size="sm">M</Button>
                <Button variant="outline" size="sm">L</Button>
              </div>
            </div>

            {/* Sort and View */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-1 text-sm"
              >
                <option value="popular">인기순</option>
                <option value="newest">최신순</option>
                <option value="price-low">낮은 가격순</option>
                <option value="price-high">높은 가격순</option>
                <option value="rating">평점순</option>
              </select>

              <div className="flex rounded-lg border border-gray-300 overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none px-3"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none px-3"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="mt-6 pt-6 border-t border-gray-200 animate-slide-up">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div>
                  <h3 className="font-medium mb-3">가격대</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">2만원 이하</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">2-5만원</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">5-10만원</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">색상</h3>
                  <div className="flex flex-wrap gap-2">
                    {['블랙', '화이트', '베이지', '네이비', '핑크'].map((color) => (
                      <Button key={color} variant="outline" size="sm" className="text-xs">
                        {color}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">브랜드</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">브랜드 A</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">브랜드 B</span>
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-medium mb-3">할인율</h3>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">30% 이상</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">50% 이상</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Product Grid */}
        <div className={`${
          viewMode === 'grid'
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6'
            : 'space-y-4'
        }`}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="px-8 py-3">
            더 보기 (24개 상품 더)
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
}