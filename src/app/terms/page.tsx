'use client';

import dynamic from 'next/dynamic';
import AppLayout from '@/components/AppLayout';

const TermsPage = dynamic(() => import('@/components/pages/TermsPage'), { ssr: false });

export default function Page() {
  return (
    <AppLayout>
      <TermsPage />
    </AppLayout>
  );
}
