'use client';

import React from 'react';
import { MapPin, Maximize, BedDouble, Heart, Search, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { properties } from '@/lib/data';
import { useNavigationStore } from '@/store/navigation';

export default function ObjectsPage() {
  const { openPropertyModal, navigate } = useNavigationStore();

  return (
    <div className="pt-20">
      {/* Banner */}
      <section className="relative py-20 md:py-32 bg-[#0B0B0B] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075"
            alt="Наши объекты"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">Портфолио</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Наши <span className="gold-text">объекты</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Лучшие предложения на рынке недвижимости Ростова-на-Дону
            </p>
          </div>
        </div>
      </section>

      {/* Quick Search */}
      <section className="py-8 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-[#141414] rounded-2xl border border-white/5 p-6 flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#D4AF37]/50" />
              <Input
                placeholder="Поиск по названию или району..."
                className="pl-11 bg-[#0B0B0B] border-white/10 focus:border-[#D4AF37] h-11 text-white placeholder:text-white/30"
              />
            </div>
            <Button
              className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold h-11 px-8"
              onClick={() => navigate('catalog')}
            >
              Расширенный поиск
            </Button>
          </div>
        </div>
      </section>

      {/* Properties Gallery */}
      <section className="py-16 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <div
                key={property.id}
                className="premium-card group relative overflow-hidden rounded-2xl bg-[#141414] border border-white/5 cursor-pointer hover:-translate-y-2 transition-transform duration-300"
                onClick={() => openPropertyModal(property.id)}
              >
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={property.images[0]}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#D4AF37] text-black text-xs font-semibold px-3 py-1.5 rounded-full">
                      {property.status}
                    </span>
                  </div>
                  <button
                    className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Heart className="w-5 h-5" />
                  </button>
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
                    {property.title}
                  </h3>
                  <div className="flex items-center gap-1 text-white/50 text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
                    {property.district}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
                    <div className="flex items-center gap-1.5">
                      <Maximize className="w-4 h-4 text-[#D4AF37]" />
                      {property.area}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4 text-[#D4AF37]" />
                      {property.rooms}
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold gold-text">{property.price}</span>
                    <Button size="sm" className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] text-xs font-semibold">
                      Подробнее
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Не нашли подходящий <span className="gold-text">объект?</span>
          </h2>
          <p className="text-white/60 max-w-xl mx-auto mb-8">
            Оставьте заявку и мы подберём для вас идеальный вариант недвижимости
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold px-8"
              onClick={() => navigate('contacts')}
            >
              Оставить заявку
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold px-8"
              onClick={() => navigate('catalog')}
            >
              Каталог объектов
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
