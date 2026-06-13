'use client';

import dynamic from 'next/dynamic';
import AppLayout from '@/components/AppLayout';

const CabinetPage = dynamic(() => import('@/components/pages/CabinetPage'), { ssr: false });

export default function Cabinet() {
  return (
    <AppLayout>
      <CabinetPage />
    </AppLayout>
  );
}
