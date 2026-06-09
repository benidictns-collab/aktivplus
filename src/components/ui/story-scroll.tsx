'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, CheckCircle, Scale, UserCheck, Clock, RotateCcw } from 'lucide-react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, React.ReactNode> = {
  Shield: <Shield className="w-8 h-8" />,
  CheckCircle: <CheckCircle className="w-8 h-8" />,
  Scale: <Scale className="w-8 h-8" />,
  UserCheck: <UserCheck className="w-8 h-8" />,
  Clock: <Clock className="w-8 h-8" />,
  RotateCcw: <RotateCcw className="w-8 h-8" />,
};

const sections = [
  {
    id: 'reliability',
    title: 'Надёжность',
    subtitle: '15 лет на рынке',
    description: 'Мы строим отношения на основе доверия и прозрачности. Каждый клиент для нас — партнёр, чьи интересы мы защищаем.',
    bgClass: 'bg-[#0B0B0B]',
    textClass: 'text-white',
    accentClass: 'text-[#D4AF37]',
    items: [
      { icon: 'Shield', title: 'Надёжность', desc: '15 лет на рынке недвижимости Ростова-на-Дону. Доверие тысяч клиентов.' },
      { icon: 'CheckCircle', title: 'Проверенные объекты', desc: 'Каждый объект проходит тщательную юридическую и техническую проверку.' },
    ],
  },
  {
    id: 'verified',
    title: 'Проверенные объекты',
    subtitle: 'Гарантия качества',
    description: 'Каждый объект в нашем портфолио проходит многоуровневую проверку. Мы гарантируем юридическую чистоту и техническое соответствие.',
    bgClass: 'bg-[#D4AF37]',
    textClass: 'text-[#0B0B0B]',
    accentClass: 'text-[#0B0B0B]',
    items: [
      { icon: 'Scale', title: 'Юридическая безопасность', desc: 'Полное правовое сопровождение всех сделок. Гарантия чистоты.' },
      { icon: 'UserCheck', title: 'Персональный менеджер', desc: 'За вами закрепляется личный менеджер на всех этапах работы.' },
    ],
  },
  {
    id: 'security',
    title: 'Безопасность',
    subtitle: 'Полная защита',
    description: 'Юридическая безопасность каждой сделки — наш приоритет. Мы обеспечиваем полный цикл правового сопровождения.',
    bgClass: 'bg-[#0B0B0B]',
    textClass: 'text-white',
    accentClass: 'text-[#D4AF37]',
    items: [
      { icon: 'Clock', title: 'Быстрое сопровождение', desc: 'Средний срок сделки — 14 дней. Ценим ваше время.' },
      { icon: 'RotateCcw', title: 'Полный цикл сделки', desc: 'От подбора объекта до передачи ключей — всё в одном месте.' },
    ],
  },
];

export default function StoryScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    sectionsRef.current.forEach((section, i) => {
      if (!section) return;

      gsap.fromTo(
        section,
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );

      const cards = section.querySelectorAll('.advantage-card');
      gsap.fromTo(
        cards,
        { opacity: 0, x: i % 2 === 0 ? -40 : 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 60%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      {/* Section Header */}
      <div className="text-center py-16 px-4">
        <motion.div
          className="flex items-center justify-center gap-3 mb-4"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <div className="h-px w-12 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">Наши преимущества</span>
          <div className="h-px w-12 bg-[#D4AF37]" />
        </motion.div>
        <motion.h2
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          Почему <span className="gold-text">выбирают нас</span>
        </motion.h2>
        <motion.p
          className="text-white/60 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          Более 15 лет мы помогаем людям найти недвижимость мечты
        </motion.p>
      </div>

      {/* Scroll Sections */}
      {sections.map((section, index) => (
        <div
          key={section.id}
          ref={(el) => { if (el) sectionsRef.current[index] = el; }}
          className={`${section.bgClass} py-20 md:py-32 px-4`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className={`text-sm font-medium tracking-[0.2em] uppercase ${section.accentClass} mb-2 block`}>
                  {section.subtitle}
                </span>
                <h3 className={`text-3xl md:text-4xl lg:text-5xl font-bold ${section.textClass} mb-6`}>
                  {section.title}
                </h3>
                <p className={`${section.textClass} opacity-70 text-lg leading-relaxed mb-8`}>
                  {section.description}
                </p>
              </div>
              <div className="space-y-4">
                {section.items.map((item) => (
                  <div
                    key={item.title}
                    className="advantage-card p-6 rounded-xl bg-white/5 border border-white/10 hover:border-[#D4AF37]/30 transition-all group"
                  >
                    <div className="flex items-start gap-4">
                      <div className={`${section.accentClass} shrink-0`}>
                        {iconMap[item.icon]}
                      </div>
                      <div>
                        <h4 className={`text-xl font-semibold ${section.textClass} mb-2`}>
                          {item.title}
                        </h4>
                        <p className={`${section.textClass} opacity-60`}>
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
