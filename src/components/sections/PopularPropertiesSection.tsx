'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Gallery4 from '@/components/ui/gallery4';
import { useNavigationStore } from '@/store/navigation';

export default function PopularPropertiesSection() {
  const { openPropertyModal, navigate } = useNavigationStore();

  return (
    <section className="py-20 md:py-28 bg-[#0B0B0B]">
      <div className="max-w-7xl mx-auto px-4 mb-12">
        {/* Section Header */}
        <motion.div
          className="text-center mb-4"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
              Портфолио
            </span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Популярные <span className="gold-text">объекты</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Самые востребованные предложения на рынке недвижимости Ростова-на-Дону
          </p>
        </motion.div>

        {/* View All link */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={() => navigate('catalog')}
            className="text-[#D4AF37] hover:text-[#F1D28A] text-sm font-medium transition-colors underline underline-offset-4"
          >
            Смотреть все объекты →
          </button>
        </motion.div>
      </div>

      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <Gallery4 onPropertyClick={(id) => openPropertyModal(id)} />
      </motion.div>
    </section>
  );
}
