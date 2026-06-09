'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const ImageGallery = dynamic(
  () => import('@/components/ui/image-gallery'),
  { ssr: false }
);

export default function PortfolioSection() {
  return (
    <section className="bg-[#0B0B0B]">
      <ImageGallery />
    </section>
  );
}
