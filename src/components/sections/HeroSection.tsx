'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useNavigationStore, type PageName } from '@/store/navigation';

// Dynamic import — Three.js / @react-three/fiber must not run on the server
const ExperienceHero = dynamic(
  () => import('@/components/ui/experience-hero').then((mod) => mod.Component),
  {
    ssr: false,
    loading: () => (
      <div className="relative min-h-screen w-full bg-[#0B0B0B] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-2 border-[#D4AF37]/30 border-t-[#D4AF37] rounded-full animate-spin" />
          <span className="text-[#D4AF37]/50 font-mono text-xs uppercase tracking-widest">Загрузка</span>
        </div>
      </div>
    ),
  }
);

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
