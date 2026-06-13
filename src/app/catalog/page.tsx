'use client';

import dynamic from 'next/dynamic';
import AppLayout from '@/components/AppLayout';

const CatalogPage = dynamic(() => import('@/components/pages/CatalogPage'), { ssr: false });

export default function Catalog() {
  return (
    <AppLayout>
      <CatalogPage />
    </AppLayout>
  );
}
