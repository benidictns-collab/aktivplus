'use client';

import React from 'react';
import { useNavigationStore, type PageName } from '@/store/navigation';
import { Component as ExperienceHero } from '@/components/ui/experience-hero';

export default function HeroSection() {
  const { navigate } = useNavigationStore();

  const handleNavigate = (section: string) => {
    if (section === 'home') {
      navigate('home');
    } else {
      navigate(section as PageName);
    }
  };

  return <ExperienceHero onNavigate={handleNavigate} />;
}
