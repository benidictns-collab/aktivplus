'use client';

import React from 'react';
import { motion } from 'framer-motion';
import FlowArt, { FlowSection } from '@/components/ui/story-scroll';
import { Shield, CheckCircle, Scale, UserCheck, Clock, RotateCcw } from 'lucide-react';

const advantages = [
  {
    icon: Shield,
    title: 'Надёжность',
    desc: '15 лет на рынке недвижимости Ростова-на-Дону. Доверие тысяч клиентов и безупречная репутация.',
  },
  {
    icon: CheckCircle,
    title: 'Проверенные объекты',
    desc: 'Каждый объект проходит тщательную юридическую и техническую проверку перед включением в каталог.',
  },
  {
    icon: Scale,
    title: 'Юридическая безопасность',
    desc: 'Полное правовое сопровождение всех сделок. Гарантия юридической чистоты каждого объекта.',
  },
  {
    icon: UserCheck,
    title: 'Персональный менеджер',
    desc: 'За вами закрепляется личный менеджер, который сопровождает вас на всех этапах работы.',
  },
  {
    icon: Clock,
    title: 'Быстрое сопровождение',
    desc: 'Средний срок сделки — 14 дней. Мы ценим ваше время и оперативно решаем все вопросы.',
  },
  {
    icon: RotateCcw,
    title: 'Полный цикл сделки',
    desc: 'От подбора объекта до передачи ключей — все услуги в одном месте, без лишних посредников.',
  },
];

export default function AdvantagesSection() {
  return (
    <div id="advantages" className="relative">
      {/* Section Header */}
      <div className="text-center py-16 md:py-24 px-4 bg-[#0B0B0B]">
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
          className="text-white/60 max-w-2xl mx-auto text-lg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Более 15 лет мы помогаем людям найти недвижимость мечты в Ростове-на-Дону
        </motion.p>
      </div>

      {/* FlowArt Scroll Sections */}
      <FlowArt aria-label="Наши преимущества">
        {/* Section 1 — Надёжность и Проверенные объекты */}
        <FlowSection
          aria-label="Надёжность и Проверенные объекты"
          style={{ backgroundColor: '#0B0B0B', color: '#FAFAFA' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            01 — Надёжность
          </p>
          <hr className="my-[2vw] border-none h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <div>
            <h1 className="text-[clamp(2.5rem,10vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight">
              Надёж
              <br />
              ность
              <br />
              и&nbsp;доверие
            </h1>
          </div>
          <hr className="my-[2vw] border-none h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-white/70">
            Мы строим отношения на основе доверия и прозрачности. Каждый клиент для нас — партнёр,
            чьи интересы мы защищаем на протяжении уже более 15 лет.
          </p>
          <hr className="my-[2vw] border-none h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <div className="flex flex-wrap gap-[3vw]">
            {advantages.slice(0, 3).map((adv) => {
              const Icon = adv.icon;
              return (
                <div key={adv.title} className="min-w-[180px] flex-1">
                  <div className="mb-3 text-[#D4AF37]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                    {adv.title}
                  </p>
                  <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
                    {adv.desc}
                  </p>
                </div>
              );
            })}
          </div>
          <hr className="my-[2vw] border-none h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(1rem,2.5vw,1.75rem)] font-normal leading-relaxed text-[#D4AF37]">
            15 лет безупречной репутации на рынке премиальной недвижимости Ростова-на-Дону
          </p>
        </FlowSection>

        {/* Section 2 — Юридическая безопасность и Персональный менеджер */}
        <FlowSection
          aria-label="Безопасность и персональный подход"
          style={{ backgroundColor: '#D4AF37', color: '#0B0B0B' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0B0B0B]/70">
            02 — Безопасность
          </p>
          <hr className="my-[2vw] border-none h-px bg-[#0B0B0B]/20" />
          <div>
            <h2 className="text-[clamp(2.5rem,10vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight text-[#0B0B0B]">
              Безопас
              <br />
              ность
              <br />
              сделки
            </h2>
          </div>
          <hr className="my-[2vw] border-none h-px bg-[#0B0B0B]/20" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-[#0B0B0B]/70">
            Юридическая чистота каждой сделки — наш абсолютный приоритет. Полное правовое
            сопровождение и гарантия безопасности на каждом этапе.
          </p>
          <hr className="my-[2vw] border-none h-px bg-[#0B0B0B]/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <div className="mb-3 text-[#0B0B0B]/60">
                <Scale className="w-6 h-6" />
              </div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Юридическая безопасность</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#0B0B0B]/60">
                Полное правовое сопровождение всех сделок с недвижимостью. Проверка юридической
                чистоты, оформление документов, регистрация перехода прав — всё под контролем
                наших экспертов.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <div className="mb-3 text-[#0B0B0B]/60">
                <UserCheck className="w-6 h-6" />
              </div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Персональный менеджер</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#0B0B0B]/60">
                За вами закрепляется персональный менеджер, который знает все нюансы вашей сделки.
                Индивидуальный подход и постоянная связь на каждом этапе.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <div className="mb-3 text-[#0B0B0B]/60">
                <CheckCircle className="w-6 h-6" />
              </div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wider">Проверенные объекты</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#0B0B0B]/60">
                Каждый объект проходит многоуровневую проверку: юридическую, техническую и рыночную.
                Мы гарантируем соответствие заявленным характеристикам.
              </p>
            </div>
          </div>
          <hr className="my-[2vw] border-none h-px bg-[#0B0B0B]/20" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-1 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none">100%</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#0B0B0B]/60">
                Гарантия юридической чистоты каждой сделки. Без исключений.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-1 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none">500+</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#0B0B0B]/60">
                Успешно закрытых сделок за последние 5 лет в премиальном сегменте.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-1 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none">24/7</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-[#0B0B0B]/60">
                Персональный менеджер всегда на связи для решения ваших вопросов.
              </p>
            </div>
          </div>
          <hr className="my-[2vw] border-none h-px bg-[#0B0B0B]/20" />
          <p className="mt-auto max-w-[50ch] text-[clamp(1rem,2.5vw,1.75rem)] font-normal leading-relaxed text-[#0B0B0B]/80">
            Ваша безопасность — наш главный приоритет. Мы не оставляем ни одного вопроса без ответа.
          </p>
        </FlowSection>

        {/* Section 3 — Быстрое сопровождение и Полный цикл */}
        <FlowSection
          aria-label="Скорость и полный цикл"
          style={{ backgroundColor: '#0B0B0B', color: '#FAFAFA' }}
        >
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4AF37]">
            03 — Скорость
          </p>
          <hr className="my-[2vw] border-none h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <div>
            <h2 className="text-[clamp(2.5rem,10vw,12rem)] font-bold leading-[0.85] uppercase tracking-tight text-white">
              Полный
              <br />
              цикл
              <br />
              сделки
            </h2>
          </div>
          <hr className="my-[2vw] border-none h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <p className="max-w-[50ch] text-[clamp(1rem,2.5vw,2rem)] font-normal leading-relaxed text-white/70">
            От первого звонка до передачи ключей — мы берём на себя все этапы сделки. Оперативность
            и профессионализм на каждом шагу.
          </p>
          <hr className="my-[2vw] border-none h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <div className="mb-3 text-[#D4AF37]">
                <Clock className="w-6 h-6" />
              </div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                Быстрое сопровождение
              </p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
                Средний срок сделки — всего 14 дней. Мы ценим ваше время и организуем процесс
                максимально эффективно, без лишних задержек.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <div className="mb-3 text-[#D4AF37]">
                <RotateCcw className="w-6 h-6" />
              </div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                Полный цикл сделки
              </p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
                Подбор объекта, показы, переговоры, проверка, оформление, регистрация — все услуги
                в одном месте без посредников.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <div className="mb-3 text-[#D4AF37]">
                <Shield className="w-6 h-6" />
              </div>
              <p className="mb-2 text-sm font-bold uppercase tracking-wider text-[#D4AF37]">
                Гарантия результата
              </p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
                Мы несем ответственность за каждый этап сделки. Если возникнут проблемы — решим их
                за наш счёт.
              </p>
            </div>
          </div>
          <hr className="my-[2vw] border-none h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <div className="flex flex-wrap gap-[3vw]">
            <div className="min-w-[180px] flex-1">
              <p className="mb-1 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none text-[#D4AF37]">14</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
                Дней — средний срок закрытия сделки. Без срыва сроков и лишних ожиданий.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-1 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none text-[#D4AF37]">6</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
                Ключевых преимуществ, которые делают работу с нами комфортной и надёжной.
              </p>
            </div>
            <div className="min-w-[180px] flex-1">
              <p className="mb-1 text-[clamp(2rem,4vw,3.5rem)] font-bold leading-none text-[#D4AF37]">1</p>
              <p className="text-[clamp(0.85rem,1.3vw,1.05rem)] leading-relaxed text-white/60">
                Агентство для всех задач. Не нужно искать дополнительных специалистов.
              </p>
            </div>
          </div>
          <hr className="my-[2vw] border-none h-px bg-gradient-to-r from-transparent via-[#D4AF37]/60 to-transparent" />
          <p className="mt-auto ml-auto max-w-[50ch] text-right text-[clamp(1rem,2.5vw,1.75rem)] font-normal leading-relaxed text-[#D4AF37]">
            Один звонок — и мы берём всё на себя. Ваш комфорт — наша работа.
          </p>
        </FlowSection>
      </FlowArt>
    </div>
  );
}
