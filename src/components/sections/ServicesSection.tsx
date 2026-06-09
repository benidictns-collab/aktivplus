'use client';

import React from 'react';
import dynamic from 'next/dynamic';

const InteractiveSelector = dynamic(
  () => import('@/components/ui/interactive-selector'),
  { ssr: false }
);

export default function ServicesSection() {
  return (
    <section className="bg-[#0B0B0B]">
      <InteractiveSelector />
    </section>
  );
}
