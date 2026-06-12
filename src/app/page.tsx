'use client';

import React from 'react';
import { useNavigationStore } from '@/store/navigation';

// Section components for the home page
import Header from '@/components/sections/Header';
import HeroSection from '@/components/sections/HeroSection';
import AdvantagesSection from '@/components/sections/AdvantagesSection';
import PopularPropertiesSection from '@/components/sections/PopularPropertiesSection';
import ServicesSection from '@/components/sections/ServicesSection';
import AboutSection from '@/components/sections/AboutSection';
import ReviewsSection from '@/components/sections/ReviewsSection';
import ApplicationFormSection from '@/components/sections/ApplicationFormSection';
import MapSection from '@/components/sections/MapSection';
import Footer from '@/components/sections/Footer';

// Page components for SPA navigation
import AboutPage from '@/components/pages/AboutPage';
import ObjectsPage from '@/components/pages/ObjectsPage';
import CatalogPage from '@/components/pages/CatalogPage';
import PropertyModal from '@/components/pages/PropertyModal';
import ServicesPage from '@/components/pages/ServicesPage';
import ContactsPage from '@/components/pages/ContactsPage';
import CabinetPage from '@/components/pages/CabinetPage';
import DashboardPage from '@/components/pages/DashboardPage';
import PrivacyPage from '@/components/pages/PrivacyPage';
import TermsPage from '@/components/pages/TermsPage';

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
