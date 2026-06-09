'use client';

import React from 'react';
import { motion } from 'framer-motion';
import OfferCarousel from '@/components/ui/offer-carousel';

export default function ServicesSection() {
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
              Что мы предлагаем
            </span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Наши <span className="gold-text">услуги</span>
          </h2>
          <p className="text-white/60 max-w-2xl mx-auto">
            Полный спектр услуг для решения любых задач в сфере недвижимости
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <OfferCarousel />
      </motion.div>
    </section>
  );
}
