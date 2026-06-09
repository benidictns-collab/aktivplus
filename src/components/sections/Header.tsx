'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MenuVertical } from '@/components/ui/menu-vertical';
import { GradientMenu, siteMenuConfig } from '@/components/ui/gradient-menu';
import { useNavigationStore, type PageName } from '@/store/navigation';

const navLinks: { label: string; page: PageName }[] = [
  { label: 'Главная', page: 'home' },
  { label: 'О нас', page: 'about' },
  { label: 'Каталог объектов', page: 'catalog' },
  { label: 'Услуги', page: 'services' },
  { label: 'Контакты', page: 'contacts' },
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

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const headerOpacity = Math.min(scrollY / 100, 1);

  const handleNavigate = (page: PageName) => {
    navigate(page);
    setIsMenuOpen(false);
  };

  const menuItems = navLinks.map((link) => ({
    label: link.label,
    href: `#${link.page}`,
    onClick: () => handleNavigate(link.page),
    isActive: currentPage === link.page,
  }));

  return (
    <>
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
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-10 pt-2">
          <div className="flex items-center justify-between py-1">
            {/* Logo */}
            <motion.button
              onClick={() => handleNavigate('home')}
              className="flex items-center z-60 relative"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img src="/logo.png" alt="Актив Плюс" className="w-24 sm:w-32 md:w-44 h-auto" />
            </motion.button>

            {/* Desktop Nav — GradientMenu (centered) */}
            <nav className="hidden xl:flex items-center justify-center">
              <GradientMenu
                menuItems={navLinks.map((link, i) => ({
                  ...siteMenuConfig[i],
                  title: link.label,
                  onClick: () => handleNavigate(link.page),
                  isActive: currentPage === link.page,
                }))}
              />
            </nav>

            {/* Desktop CTA */}
            <div className="hidden xl:flex items-center gap-2 justify-end">
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
                onClick={() => handleNavigate('cabinet')}
              >
                Личный кабинет
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="xl:hidden text-white p-2 hover:text-[#D4AF37] transition-colors z-60 relative"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Full-screen Mobile Menu with MenuVertical */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0B0B0B]/98 backdrop-blur-xl flex flex-col justify-center items-start overflow-y-auto"
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
          >
            <div className="w-full flex flex-col justify-center flex-1 py-20">
              <MenuVertical
                menuItems={menuItems}
                color="#D4AF37"
                skew={-5}
              />
            </div>

            {/* Bottom contact section */}
            <div className="w-full px-10 pb-10 space-y-4">
              <div className="border-t border-[#D4AF37]/20 pt-6">
                <a
                  href="tel:+78630000000"
                  className="text-[#D4AF37] flex items-center gap-3 text-lg py-2"
                >
                  <Phone className="w-5 h-5" />
                  <span className="font-medium">+7 (863) 000-00-00</span>
                </a>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                <Button
                  className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] font-semibold"
                  size="lg"
                  onClick={() => handleNavigate('contacts')}
                >
                  Консультация
                </Button>
                <Button
                  variant="outline"
                  className="border-[#D4AF37]/50 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black"
                  size="lg"
                  onClick={() => handleNavigate('cabinet')}
                >
                  Личный кабинет
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
