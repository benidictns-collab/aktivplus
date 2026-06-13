'use client';

import dynamic from 'next/dynamic';
import AppLayout from '@/components/AppLayout';

const AboutPage = dynamic(() => import('@/components/pages/AboutPage'), { ssr: false });

export default function About() {
  return (
    <AppLayout>
      <AboutPage />
    </AppLayout>
  );
}
