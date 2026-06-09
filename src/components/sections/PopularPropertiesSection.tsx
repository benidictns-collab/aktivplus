'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useNavigationStore } from '@/store/navigation';

const ImageGallery = dynamic(
  () => import('@/components/ui/image-gallery'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-[460px] w-full max-w-6xl mx-auto px-4">
        <div className="flex items-center gap-2 w-full h-full">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="flex-grow h-full rounded-xl bg-[#141414] border border-white/[0.04] animate-pulse"
              style={{ flex: '1 1 0%' }}
            />
          ))}
        </div>
      </div>
    ),
  }
);

export default function PopularPropertiesSection() {
  const { openPropertyModal, navigate } = useNavigationStore();

  return (
    <section className="py-20 md:py-28 bg-[#0B0B0B]">
      {/* Section Header — no animation, always visible */}
      <div className="max-w-7xl mx-auto px-4 mb-10">
        <div className="text-center mb-4">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
              Портфолио
            </span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Популярные <span className="gold-text">объекты</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Самые востребованные предложения на рынке недвижимости Ростова-на-Дону
          </p>
        </div>

        {/* View All link */}
        <div className="text-center mb-8">
          <button
            onClick={() => navigate('catalog')}
            className="text-[#D4AF37] hover:text-[#F1D28A] text-sm font-medium transition-colors underline underline-offset-4 inline-flex items-center gap-2"
          >
            Смотреть все объекты
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Gallery — dynamically loaded */}
      <ImageGallery
        showHeader={false}
        onImageClick={(id) => openPropertyModal(id)}
      />
    </section>
  );
}
