'use client';

import dynamic from 'next/dynamic';
import AppLayout from '@/components/AppLayout';

const ContactsPage = dynamic(() => import('@/components/pages/ContactsPage'), { ssr: false });

export default function Contacts() {
  return (
    <AppLayout>
      <ContactsPage />
    </AppLayout>
  );
}
