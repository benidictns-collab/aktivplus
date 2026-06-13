'use client';

import dynamic from 'next/dynamic';
import AppLayout from '@/components/AppLayout';

const ObjectsPage = dynamic(() => import('@/components/pages/ObjectsPage'), { ssr: false });

export default function Objects() {
  return (
    <AppLayout>
      <ObjectsPage />
    </AppLayout>
  );
}
