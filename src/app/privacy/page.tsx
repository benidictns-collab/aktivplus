'use client';

import dynamic from 'next/dynamic';
import AppLayout from '@/components/AppLayout';

const PrivacyPage = dynamic(() => import('@/components/pages/PrivacyPage'), { ssr: false });

export default function Page() {
  return (
    <AppLayout>
      <PrivacyPage />
    </AppLayout>
  );
}
