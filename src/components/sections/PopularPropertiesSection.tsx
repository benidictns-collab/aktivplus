'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useNavigationStore } from '@/store/navigation';

const ImageGallery = dynamic(
  () => import('@/components/ui/image-gallery'),
  { ssr: false }
);

export default function PopularPropertiesSection() {
  const { openPropertyModal, navigate } = useNavigationStore();

  return (
    <ImageGallery
      label="Портфолио"
      title="Популярные объекты"
      subtitle="Самые востребованные предложения на рынке недвижимости Ростова-на-Дону"
      onImageClick={(id) => openPropertyModal(id)}
      onViewAll={() => navigate('catalog')}
    />
  );
}
