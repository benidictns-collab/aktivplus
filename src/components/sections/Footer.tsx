'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, MessageCircle } from 'lucide-react';
import { useNavigationStore, type PageName } from '@/store/navigation';

const footerLinks = [
  {
    title: 'Навигация',
    links: [
      { label: 'Главная', page: 'home' as PageName },
      { label: 'О нас', page: 'about' as PageName },
      { label: 'Каталог', page: 'catalog' as PageName },
      { label: 'Услуги', page: 'services' as PageName },
      { label: 'Контакты', page: 'contacts' as PageName },
    ],
  },
  {
    title: 'Недвижимость',
    links: [
      { label: 'Квартиры', page: 'catalog' as PageName },
      { label: 'Дома', page: 'catalog' as PageName },
      { label: 'Коммерческая', page: 'catalog' as PageName },
      { label: 'Новостройки', page: 'catalog' as PageName },
      { label: 'Аренда', page: 'catalog' as PageName },
    ],
  },
  {
    title: 'Компания',
    links: [
      { label: 'О компании', page: 'about' as PageName },
      { label: 'Команда', page: 'about' as PageName },
      { label: 'Отзывы', page: 'home' as PageName },
      { label: 'Вакансии', page: 'about' as PageName },
      { label: 'Блог', page: 'home' as PageName },
    ],
  },
];

export default function Footer() {
  const { navigate } = useNavigationStore();

  return (
    <footer className="bg-[#0B0B0B] relative">
      {/* Gold divider */}
      <div className="gold-divider" />

      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Logo & Info */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <img src="/logo.png" alt="Актив Плюс" className="h-10 w-auto" />
              <span className="gold-text text-xl font-bold tracking-wider">АКТИВ ПЛЮС</span>
            </div>
            <p className="text-white/50 leading-relaxed mb-6 max-w-sm">
              Агентство премиальной недвижимости в Ростове-на-Дону. Продажа, покупка и аренда
              элитной недвижимости с полным сопровождением сделок.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-white/60 text-sm">
                <MapPin className="w-4 h-4 text-[#D4AF37]" />
                г. Ростов-на-Дону, ул. Обороны, 49
              </div>
              <a href="tel:+78630000000" className="flex items-center gap-3 text-white/60 text-sm hover:text-[#D4AF37] transition-colors">
                <Phone className="w-4 h-4 text-[#D4AF37]" />
                +7 (863) 000-00-00
              </a>
              <a href="mailto:info@aktivplus.ru" className="flex items-center gap-3 text-white/60 text-sm hover:text-[#D4AF37] transition-colors">
                <Mail className="w-4 h-4 text-[#D4AF37]" />
                info@aktivplus.ru
              </a>
            </div>

            {/* Social */}
            <div className="flex items-center gap-3 mt-6">
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
          </motion.div>

          {/* Link Columns */}
          {footerLinks.map((col, i) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: (i + 1) * 0.1 }}
            >
              <h4 className="text-white font-semibold mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <button
                      onClick={() => navigate(link.page)}
                      className="text-white/50 hover:text-[#D4AF37] text-sm transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="gold-divider mt-12 mb-6" />
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/40">
          <p>© 2024 Актив Плюс. Все права защищены.</p>
          <div className="flex items-center gap-6">
            <button className="hover:text-[#D4AF37] transition-colors">Политика конфиденциальности</button>
            <button className="hover:text-[#D4AF37] transition-colors">Пользовательское соглашение</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
