'use client';

import React from 'react';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { Shield, Scale, UserCheck, Clock, RotateCcw } from 'lucide-react';

const advantages = [
  {
    num: '01',
    icon: Shield,
    title: 'Надёжность',
    titleLarge: ['Надёж', 'ность', 'и доверие'],
    desc: 'Мы строим отношения на основе доверия и прозрачности. Каждый клиент для нас — партнёр, чьи интересы мы защищаем на протяжении уже более 15 лет.',
    stat: '15',
    statLabel: 'лет на рынке',
    bg: '#0B0B0B',
    color: '#FAFAFA',
    accent: '#D4AF37',
    dividerColor: 'rgba(212,175,55,0.5)',
  },
  {
    num: '02',
    icon: Scale,
    title: 'Юридическая безопасность',
    titleLarge: ['Безопас', 'ность', 'сделки'],
    desc: 'Юридическая чистота каждой сделки — наш абсолютный приоритет. Полное правовое сопровождение и гарантия безопасности на каждом этапе.',
    stat: '100%',
    statLabel: 'чистота сделок',
    bg: '#D4AF37',
    color: '#0B0B0B',
    accent: '#0B0B0B',
    dividerColor: 'rgba(11,11,11,0.2)',
  },
  {
    num: '03',
    icon: UserCheck,
    title: 'Персональный менеджер',
    titleLarge: ['Персональ', 'ный', 'подход'],
    desc: 'За вами закрепляется персональный менеджер, который знает все нюансы вашей сделки. Индивидуальный подход и постоянная связь на каждом этапе.',
    stat: '24/7',
    statLabel: 'на связи',
    bg: '#0B0B0B',
    color: '#FAFAFA',
    accent: '#D4AF37',
    dividerColor: 'rgba(212,175,55,0.5)',
  },
  {
    num: '04',
    icon: Clock,
    title: 'Быстрое сопровождение',
    titleLarge: ['Скорость', 'и точность'],
    desc: 'Средний срок сделки — всего 14 дней. Мы ценим ваше время и организуем процесс максимально эффективно, без лишних задержек и бюрократии.',
    stat: '14',
    statLabel: 'дней — срок сделки',
    bg: '#141414',
    color: '#FAFAFA',
    accent: '#D4AF37',
    dividerColor: 'rgba(212,175,55,0.5)',
  },
  {
    num: '05',
    icon: RotateCcw,
    title: 'Полный цикл сделки',
    titleLarge: ['Полный', 'цикл', 'сделки'],
    desc: 'Подбор объекта, показы, переговоры, проверка, оформление, регистрация — все услуги в одном месте без посредников.',
    stat: '500+',
    statLabel: 'сделок закрыто',
    bg: '#D4AF37',
    color: '#0B0B0B',
    accent: '#0B0B0B',
    dividerColor: 'rgba(11,11,11,0.2)',
  },
];

export default function AdvantagesSection() {
  return (
    <div id="advantages" className="relative">
      {/* Section Header — pinned above the animation layers */}
      <div className="relative z-30 text-center py-20 md:py-28 px-4 bg-[#0B0B0B]">
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-px w-12 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
            Наши преимущества
          </span>
          <div className="h-px w-12 bg-[#D4AF37]" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Почему <span className="gold-text">выбирают нас</span>
        </h2>
        <p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg">
          Более 15 лет мы помогаем людям найти недвижимость мечты в Ростове-на-Дону
        </p>
      </div>

      {/* FlowArt Scroll Sections */}
      <FlowArt aria-label="Наши преимущества">
        {advantages.map((adv, idx) => {
          const Icon = adv.icon;
          const isGold = adv.bg === '#D4AF37';

          return (
            <FlowSection
              key={adv.num}
              aria-label={adv.title}
              style={{ backgroundColor: adv.bg, color: adv.color }}
            >
              {/* Number & label */}
              <p
                className="text-xs font-bold uppercase tracking-[0.2em] pb-[0.5vw]"
                style={{ color: isGold ? 'rgba(11,11,11,0.6)' : 'rgba(212,175,55,0.7)' }}
              >
                {adv.num} — {adv.title}
              </p>

              <hr className="my-[3vw] border-none h-px" style={{ backgroundColor: adv.dividerColor }} />

              {/* Large title */}
              <div className="py-[1vw]">
                <h2 className="text-[clamp(2.5rem,10vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight">
                  {adv.titleLarge.map((line, i) => (
                    <React.Fragment key={i}>
                      {i > 0 && <br />}
                      {line}
                    </React.Fragment>
                  ))}
                </h2>
              </div>

              <hr className="my-[3vw] border-none h-px" style={{ backgroundColor: adv.dividerColor }} />

              {/* Icon + Description row */}
              <div className="flex flex-wrap gap-[3vw] items-start">
                <div className="min-w-[180px] flex-1">
                  <div className="mb-3" style={{ color: adv.accent }}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <p
                    className="mb-2 text-sm font-bold uppercase tracking-wider"
                    style={{ color: adv.accent }}
                  >
                    {adv.title}
                  </p>
                  <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed opacity-70">
                    {adv.desc}
                  </p>
                </div>

                {/* Stat block */}
                <div className="min-w-[180px] flex-1">
                  <p
                    className="mb-1 text-[clamp(2.5rem,5vw,4.5rem)] font-black leading-none"
                    style={{ color: adv.accent }}
                  >
                    {adv.stat}
                  </p>
                  <p className="text-[clamp(0.75rem,1vw,0.95rem)] leading-relaxed opacity-50 uppercase tracking-wider font-mono">
                    {adv.statLabel}
                  </p>
                </div>
              </div>

              <hr className="my-[3vw] border-none h-px" style={{ backgroundColor: adv.dividerColor }} />

              {/* Bottom quote — alternating sides */}
              {idx % 2 === 0 ? (
                <p
                  className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(1rem,2.5vw,1.75rem)] font-normal leading-relaxed"
                  style={{ color: adv.accent }}
                >
                  {idx === 0 && '15 лет безупречной репутации на рынке премиальной недвижимости Ростова-на-Дону'}
                  {idx === 2 && 'Ваш персональный менеджер всегда на связи — решение любого вопроса в кратчайшие сроки'}
                  {idx === 4 && 'Один звонок — и мы берём всё на себя. Ваш комфорт — наша работа'}
                </p>
              ) : (
                <p
                  className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,1.75rem)] font-normal leading-relaxed"
                  style={{ color: isGold ? 'rgba(11,11,11,0.7)' : 'rgba(212,175,55,0.8)' }}
                >
                  {idx === 1 && 'Ваша безопасность — наш главный приоритет. Мы не оставляем ни одного вопроса без ответа'}
                  {idx === 3 && 'Оперативность и профессионализм — каждый шаг сделки под контролем экспертов'}
                </p>
              )}
            </FlowSection>
          );
        })}
      </FlowArt>
    </div>
  );
}
