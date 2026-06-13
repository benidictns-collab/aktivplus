'use client';

import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';
import PropertyModal from '@/components/pages/PropertyModal';

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B]">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <PropertyModal />
    </div>
  );
}
