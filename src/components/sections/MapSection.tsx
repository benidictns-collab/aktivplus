'use client';

import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';

export default function MapSection() {
  return (
    <section className="py-20 md:py-28 bg-[#0B0B0B]">
      {/* Section Header — always visible, no animation */}
      <div className="text-center mb-12 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
            Расположение
          </span>
          <div className="h-px w-12 bg-[#D4AF37]" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
          Как нас <span className="gold-text">найти</span>
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="relative rounded-2xl overflow-hidden">
          {/* Map */}
          <div className="h-[400px] md:h-[500px] bg-[#1A1A1A] relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2695.7!2d39.7!3d47.23!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDfCsDEzJzQ4LjAiTiAzOcKwNDInMDAuMCJF!5e0!3m2!1sru!2sru!4v1700000000000!5m2!1sru!2sru"
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(80%) contrast(1.2)' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Карта — Актив Плюс"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B]/80 via-transparent to-transparent pointer-events-none hidden md:block" />

            {/* Info card overlay — on mobile: bottom overlay, on desktop: top-left card */}
            <div className="absolute bottom-0 left-0 right-0 md:bottom-auto md:left-10 md:right-auto md:top-10 bg-[#141414]/95 backdrop-blur-lg rounded-t-2xl md:rounded-2xl border border-[#D4AF37]/20 p-5 md:p-8 md:max-w-sm">
              <div className="flex items-center gap-3 mb-5">
                <img src="/logo.png" alt="Актив Плюс" className="h-8 w-auto" />
                <span className="gold-text text-lg font-bold">АКТИВ ПЛЮС</span>
              </div>

              <div className="space-y-3 md:space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white text-sm font-medium">Адрес</div>
                    <div className="text-white/60 text-sm">г. Ростов-на-Дону, ул. Обороны, 49</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white text-sm font-medium">Телефон</div>
                    <div className="text-white/60 text-sm">+7 (863) 000-00-00</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#D4AF37] shrink-0 mt-0.5" />
                  <div>
                    <div className="text-white text-sm font-medium">Режим работы</div>
                    <div className="text-white/60 text-sm">Пн-Пт: 9:00-19:00</div>
                    <div className="text-white/60 text-sm">Сб: 10:00-16:00</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
