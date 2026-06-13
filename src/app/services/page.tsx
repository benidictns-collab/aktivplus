'use client';

import dynamic from 'next/dynamic';
import AppLayout from '@/components/AppLayout';

const ServicesPage = dynamic(() => import('@/components/pages/ServicesPage'), { ssr: false });

export default function Services() {
  return (
    <AppLayout>
      <ServicesPage />
    </AppLayout>
  );
}
