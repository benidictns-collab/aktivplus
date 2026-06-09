'use client';

import React from 'react';
import MinimalistHero from '@/components/ui/minimalist-hero';
import { useNavigationStore, type PageName } from '@/store/navigation';

export default function HeroSection() {
  const { navigate } = useNavigationStore();

  const handleNavigate = (section: string) => {
    if (section === 'home') {
      navigate('home');
    } else {
      navigate(section as PageName);
    }
  };

  return <MinimalistHero onNavigate={handleNavigate} />;
}
