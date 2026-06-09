'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Scale, UserCheck, Clock, RotateCcw } from 'lucide-react';

const advantages = [
  {
    icon: Shield,
    title: 'Надёжность',
    desc: '15 лет на рынке недвижимости Ростова-на-Дону. Доверие тысяч клиентов и безупречная репутация — наш главный актив.',
    stat: '15',
    statLabel: 'лет на рынке',
  },
  {
    icon: Scale,
    title: 'Юридическая безопасность',
    desc: 'Полное правовое сопровождение всех сделок. Проверка юридической чистоты, оформление документов и регистрация прав.',
    stat: '100%',
    statLabel: 'чистота сделок',
  },
  {
    icon: UserCheck,
    title: 'Персональный менеджер',
    desc: 'За вами закрепляется личный менеджер, который знает все нюансы вашей сделки и всегда на связи.',
    stat: '24/7',
    statLabel: 'на связи',
  },
  {
    icon: Clock,
    title: 'Быстрое сопровождение',
    desc: 'Средний срок сделки — 14 дней. Мы ценим ваше время и организуем процесс максимально эффективно.',
    stat: '14',
    statLabel: 'дней — срок сделки',
  },
  {
    icon: RotateCcw,
    title: 'Полный цикл сделки',
    desc: 'От подбора объекта до передачи ключей — все услуги в одном месте. Подбор, показы, переговоры, оформление без посредников.',
    stat: '500+',
    statLabel: 'сделок закрыто',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
};

export default function AdvantagesSection() {
  return (
    <section id="advantages" className="relative bg-[#0B0B0B] py-20 md:py-28 px-4">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto text-center mb-16">
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="h-px w-12 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
            Наши преимущества
          </span>
          <div className="h-px w-12 bg-[#D4AF37]" />
        </motion.div>
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Почему <span className="gold-text">выбирают нас</span>
        </motion.h2>
        <motion.p
          className="text-white/50 max-w-2xl mx-auto text-base md:text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Более 15 лет мы помогаем людям найти недвижимость мечты в Ростове-на-Дону
        </motion.p>
      </div>

      {/* Cards Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {advantages.map((adv, i) => {
          const Icon = adv.icon;
          return (
            <motion.div
              key={adv.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-50px' }}
              className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 md:p-7 hover:border-[#D4AF37]/30 hover:bg-white/[0.04] transition-all duration-500 flex flex-col"
            >
              {/* Gold glow on hover */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 40px rgba(212, 175, 55, 0.08), inset 0 1px 0 rgba(212, 175, 55, 0.1)' }}
              />

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center mb-5 group-hover:bg-[#D4AF37]/20 transition-colors duration-500">
                <Icon className="w-6 h-6 text-[#D4AF37]" />
              </div>

              {/* Title */}
              <h3 className="text-white font-bold text-base md:text-lg mb-3 leading-snug">
                {adv.title}
              </h3>

              {/* Description */}
              <p className="text-white/45 text-sm leading-relaxed flex-1 mb-5">
                {adv.desc}
              </p>

              {/* Stat */}
              <div className="border-t border-white/[0.06] pt-4 group-hover:border-[#D4AF37]/20 transition-colors duration-500">
                <p className="text-2xl md:text-3xl font-black text-[#D4AF37] leading-none mb-1">
                  {adv.stat}
                </p>
                <p className="text-[11px] font-mono text-white/30 uppercase tracking-wider">
                  {adv.statLabel}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Bottom decorative line */}
      <div className="max-w-7xl mx-auto mt-16">
        <div className="gold-divider" />
      </div>
    </section>
  );
}
