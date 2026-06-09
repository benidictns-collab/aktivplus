'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigationStore, type PageName } from '@/store/navigation';

const navLinks: { label: string; page: PageName }[] = [
  { label: 'Главная', page: 'home' },
  { label: 'О нас', page: 'about' },
  { label: 'Наши объекты', page: 'objects' },
  { label: 'Каталог объектов', page: 'catalog' },
  { label: 'Услуги', page: 'services' },
  { label: 'Контакты', page: 'contacts' },
  { label: 'Личный кабинет', page: 'cabinet' },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { currentPage, navigate } = useNavigationStore();

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerOpacity = Math.min(scrollY / 100, 1);

  const handleNavigate = (page: PageName) => {
    navigate(page);
    setIsMenuOpen(false);
  };

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{
        backgroundColor: `rgba(11, 11, 11, ${0.6 + headerOpacity * 0.35})`,
        backdropFilter: 'blur(16px)',
        borderBottom: `1px solid rgba(212, 175, 55, ${0.05 + headerOpacity * 0.15})`,
      }}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <motion.button
            onClick={() => handleNavigate('home')}
            className="flex items-center gap-3"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <img src="/logo.png" alt="Актив Плюс" className="h-10 md:h-12 w-auto" />
            <span className="gold-text text-lg md:text-xl font-bold tracking-wider hidden sm:block">
              АКТИВ ПЛЮС
            </span>
          </motion.button>

          {/* Desktop Nav */}
          <nav className="hidden xl:flex items-center gap-1">
            {navLinks.map((link) => (
              <button
                key={link.page}
                onClick={() => handleNavigate(link.page)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  currentPage === link.page
                    ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                    : 'text-white/70 hover:text-[#D4AF37] hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden xl:flex items-center gap-4">
            <a
              href="tel:+78630000000"
              className="text-white/80 hover:text-[#D4AF37] text-sm flex items-center gap-2 transition-colors"
            >
              <Phone className="w-4 h-4 text-[#D4AF37]" />
              <span className="font-medium">+7 (863) 000-00-00</span>
            </a>
            <Button
              size="sm"
              className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold"
              onClick={() => handleNavigate('contacts')}
            >
              Консультация
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
            >
              Обратный звонок
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="xl:hidden text-white p-2 hover:text-[#D4AF37] transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="xl:hidden bg-[#0B0B0B]/98 backdrop-blur-xl border-t border-[#D4AF37]/20"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-4 py-6 space-y-1 max-h-[80vh] overflow-y-auto">
              {navLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => handleNavigate(link.page)}
                  className={`block w-full text-left text-lg py-3 px-4 rounded-lg transition-all ${
                    currentPage === link.page
                      ? 'text-[#D4AF37] bg-[#D4AF37]/10'
                      : 'text-white/80 hover:text-[#D4AF37] hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-4 space-y-3 border-t border-white/10 mt-4">
                <a
                  href="tel:+78630000000"
                  className="text-[#D4AF37] flex items-center gap-2 text-lg py-2 px-4"
                >
                  <Phone className="w-5 h-5" />
                  +7 (863) 000-00-00
                </a>
                <Button
                  className="w-full bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold"
                  size="lg"
                >
                  Консультация
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                  size="lg"
                >
                  Обратный звонок
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
