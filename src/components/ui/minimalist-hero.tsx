'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, MapPin, Menu, X, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface MinimalistHeroProps {
  onNavigate?: (section: string) => void;
}

const navLinks = [
  { label: 'Главная', section: 'home' },
  { label: 'О нас', section: 'about' },
  { label: 'Наши объекты', section: 'objects' },
  { label: 'Каталог', section: 'catalog' },
  { label: 'Услуги', section: 'services' },
  { label: 'Контакты', section: 'contacts' },
];

export default function MinimalistHero({ onNavigate }: MinimalistHeroProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerOpacity = Math.min(scrollY / 100, 1);

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#0B0B0B]">
      {/* Background Image */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      >
        <img
          src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071"
          alt="Премиальная недвижимость"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />
      </motion.div>

      {/* Gold circle decoration */}
      <motion.div
        className="absolute top-1/2 right-[10%] -translate-y-1/2 w-[400px] h-[400px] md:w-[500px] md:h-[500px] rounded-full border border-[#D4AF37]/30"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.5, ease: 'easeOut' }}
      >
        <div className="absolute inset-4 rounded-full border border-[#D4AF37]/20" />
        <div className="absolute inset-8 rounded-full border border-[#D4AF37]/10" />
      </motion.div>

      {/* Header / Navigation */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          backgroundColor: `rgba(11, 11, 11, ${0.3 + headerOpacity * 0.6})`,
          backdropFilter: 'blur(12px)',
        }}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <motion.div
              className="flex items-center gap-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              <img src="/logo.png" alt="Актив Плюс" className="h-10 md:h-12 w-auto" />
              <span className="gold-text text-xl md:text-2xl font-bold tracking-wider">АКТИВ ПЛЮС</span>
            </motion.div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.section}
                  onClick={() => onNavigate?.(link.section)}
                  className="text-white/80 hover:text-[#D4AF37] transition-colors text-sm font-medium tracking-wide"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.1 }}
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a href="tel:+78630000000" className="text-white/80 hover:text-[#D4AF37] text-sm flex items-center gap-2 transition-colors">
                <Phone className="w-4 h-4" />
                +7 (863) 000-00-00
              </a>
              <Button
                variant="outline"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                size="sm"
              >
                Консультация
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="lg:hidden bg-[#0B0B0B]/95 backdrop-blur-lg border-t border-[#D4AF37]/20"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="px-4 py-6 space-y-4">
                {navLinks.map((link) => (
                  <button
                    key={link.section}
                    onClick={() => {
                      onNavigate?.(link.section);
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-white/80 hover:text-[#D4AF37] transition-colors text-lg py-2 border-b border-white/5"
                  >
                    {link.label}
                  </button>
                ))}
                <div className="pt-4 space-y-3">
                  <a href="tel:+78630000000" className="text-[#D4AF37] flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    +7 (863) 000-00-00
                  </a>
                  <Button className="w-full bg-[#D4AF37] text-black hover:bg-[#F1D28A]">
                    Консультация
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Content */}
      <div className="relative z-10 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Label */}
            <motion.div
              className="flex items-center gap-3 mb-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
                Агентство премиальной недвижимости
              </span>
            </motion.div>

            {/* Title */}
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
            >
              Премиальная
              <br />
              <span className="gold-text">недвижимость</span>
              <br />
              в Ростове-на-Дону
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="text-lg md:text-xl text-white/70 max-w-xl mb-8 leading-relaxed"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.7 }}
            >
              Элитные квартиры, дома и коммерческие объекты. Полное сопровождение сделок
              от подбора до передачи ключей.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 mb-12"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.7 }}
            >
              <Button
                size="lg"
                className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold px-8 h-12"
                onClick={() => onNavigate?.('catalog')}
              >
                Подобрать объект
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-[#D4AF37] text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-semibold px-8 h-12"
              >
                Получить консультацию
              </Button>
            </motion.div>

            {/* Social & Location */}
            <motion.div
              className="flex flex-col sm:flex-row items-start sm:items-center gap-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9, duration: 0.7 }}
            >
              <div className="flex items-center gap-4">
                <a href="#" className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
                  <span className="text-xs font-bold">VK</span>
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
                  <MessageCircle className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
                  <Phone className="w-4 h-4" />
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                Ростов-на-Дону, ул. Обороны д. 49/22
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-[#D4AF37]/30 rounded-full flex items-start justify-center p-1"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div className="w-1.5 h-1.5 bg-[#D4AF37] rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}
