'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useNavigationStore } from '@/store/navigation';

// Core layout components — always needed, load eagerly
import Header from '@/components/sections/Header';
import Footer from '@/components/sections/Footer';

// Home page sections — use dynamic imports for heavy components
import HeroSection from '@/components/sections/HeroSection';
import PopularPropertiesSection from '@/components/sections/PopularPropertiesSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ApplicationFormSection from '@/components/sections/ApplicationFormSection';

// Heavy sections — load with ssr: false to reduce server memory
const AdvantagesSection = dynamic(() => import('@/components/sections/AdvantagesSection'), {
  ssr: false,
  loading: () => (
    <div className="relative z-30 text-center py-20 md:py-28 px-4 bg-[#0B0B0B]">
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-px w-12 bg-[#D4AF37]" />
        <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
          Наши преимущества
        </span>
        <div className="h-px w-12 bg-[#D4AF37]" />
      </div>
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
        Почему <span className="gold-text">выбирают нас</span>
      </h2>
      <p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg">
        Более 17 лет мы помогаем людям найти недвижимость мечты в Ростове-на-Дону
      </p>
    </div>
  ),
});

const MapSection = dynamic(() => import('@/components/sections/MapSection'), {
  ssr: false,
  loading: () => (
    <div className="py-20 bg-[#0B0B0B] text-center">
      <div className="h-32 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#D4AF37] border-t-transparent rounded-full animate-spin" />
      </div>
    </div>
  ),
});

// Page components — lazy loaded to reduce initial bundle size and SSR memory
const AboutPage = dynamic(() => import('@/components/pages/AboutPage'), { ssr: false });
const ObjectsPage = dynamic(() => import('@/components/pages/ObjectsPage'), { ssr: false });
const CatalogPage = dynamic(() => import('@/components/pages/CatalogPage'), { ssr: false });
const PropertyModal = dynamic(() => import('@/components/pages/PropertyModal'), { ssr: false });
const ServicesPage = dynamic(() => import('@/components/pages/ServicesPage'), { ssr: false });
const ContactsPage = dynamic(() => import('@/components/pages/ContactsPage'), { ssr: false });
const CabinetPage = dynamic(() => import('@/components/pages/CabinetPage'), { ssr: false });
const DashboardPage = dynamic(() => import('@/components/pages/DashboardPage'), { ssr: false });
const PrivacyPage = dynamic(() => import('@/components/pages/PrivacyPage'), { ssr: false });
const TermsPage = dynamic(() => import('@/components/pages/TermsPage'), { ssr: false });

function HomePage() {
  return (
    <>
      <HeroSection />
      <AdvantagesSection />
      <PopularPropertiesSection />
      <ServicesSection />
      <AboutSection />
      <ReviewsSection />
      <ApplicationFormSection />
      <MapSection />
    </>
  );
}

const pageComponents: Record<string, React.ComponentType> = {
  home: HomePage,
  about: AboutPage,
  objects: ObjectsPage,
  catalog: CatalogPage,
  services: ServicesPage,
  contacts: ContactsPage,
  cabinet: CabinetPage,
  dashboard: DashboardPage,
  privacy: PrivacyPage,
  terms: TermsPage,
};

export default function MainPage() {
  const { currentPage } = useNavigationStore();

  const PageComponent = pageComponents[currentPage] || HomePage;

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0B0B]">
      <Header />

      <main className="flex-1">
        <PageComponent />
      </main>

      <Footer />
      <PropertyModal />
    </div>
  );
}
