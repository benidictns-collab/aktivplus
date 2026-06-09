'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { useNavigationStore, type PageName } from '@/store/navigation';

// Dynamic import — Three.js / GSAP must not run on the server
const ExperienceHero = dynamic(
  () => import('@/components/ui/experience-hero').then((mod) => mod.Component),
  {
    ssr: false,
    loading: () => (
      <div className="relative min-h-screen w-full bg-[#0B0B0B] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <img src="/logo.png" alt="Актив Плюс" className="h-16 w-auto mb-2" />
          <div className="w-16 h-1 bg-[#1E1E1E] rounded-full overflow-hidden">
            <div className="h-full bg-[#D4AF37] animate-loading rounded-full" />
          </div>
          <span className="text-[#D4AF37]/50 font-mono text-xs uppercase tracking-widest">Загрузка 3D</span>
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
