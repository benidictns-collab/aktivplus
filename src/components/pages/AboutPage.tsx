'use client';

import React from 'react';
import { Shield, CheckCircle, Scale, UserCheck, Clock, RotateCcw, Award, Users, Building, Heart } from 'lucide-react';
import ApplicationFormSection from '@/components/sections/ApplicationFormSection';

const values = [
  { icon: Shield, title: 'Честность', desc: 'Прозрачные условия и открытость на каждом этапе сотрудничества' },
  { icon: CheckCircle, title: 'Качество', desc: 'Тщательно отобранные объекты и высокий уровень сервиса' },
  { icon: Scale, title: 'Ответственность', desc: 'Мы несём полную ответственность за результат нашей работы' },
  { icon: Users, title: 'Партнёрство', desc: 'Строим долгосрочные отношения с каждым клиентом' },
];

const team = [
  { name: 'Анатолий Смирнов', role: 'Генеральный директор', avatar: 'АС' },
  { name: 'Елена Козлова', role: 'Руководитель отдела продаж', avatar: 'ЕК' },
  { name: 'Дмитрий Волков', role: 'Ведущий юрист', avatar: 'ДВ' },
  { name: 'Марина Иванова', role: 'Менеджер по работе с клиентами', avatar: 'МИ' },
  { name: 'Сергей Петров', role: 'Специалист по коммерческой недвижимости', avatar: 'СП' },
  { name: 'Ольга Новикова', role: 'Специалист по новостройкам', avatar: 'ОН' },
];

export default function AboutPage() {
  return (
    <div className="pt-20">
      {/* Banner */}
      <section className="relative py-20 md:py-32 bg-[#0B0B0B] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/about-office.jpg"
            alt="О компании"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">О компании</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Агентство <span className="gold-text">Актив Плюс</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Ваш надёжный партнёр на рынке премиальной недвижимости Ростова-на-Дону с 2009 года
            </p>
          </div>
        </div>
      </section>

      {/* History */}
      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Наша <span className="gold-text">история</span>
              </h2>
              <p className="text-white/70 leading-relaxed mb-4">
                Компания «Актив Плюс» была основана в 2009 году группой энтузиастов, объединённых
                общей целью — создать агентство недвижимости нового формата, где интересы клиента
                стоят на первом месте.
              </p>
              <p className="text-white/70 leading-relaxed mb-4">
                За 17 лет мы прошли путь от небольшого офиса до одного из ведущих агентств
                премиальной недвижимости Ростова-на-Дону. Наша команда выросла до 30
                профессионалов, а портфолио включает более 500 объектов.
              </p>
              <p className="text-white/70 leading-relaxed">
                Сегодня «Актив Плюс» — это не просто агентство недвижимости. Это команда
                единомышленников, которая помогает людям принимать важные жизненные решения,
                обеспечивая комфорт и безопасность на каждом этапе.
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="/images/about-office.jpg"
                  alt="История компании"
                  className="w-full h-[400px] object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b-2 border-r-2 border-[#D4AF37] rounded-br-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Наша <span className="gold-text">миссия</span>
            </h2>
            <p className="text-white/70 text-lg leading-relaxed">
              Создавать для каждого клиента уникальный опыт взаимодействия с рынком недвижимости,
              обеспечивая профессиональный подход, юридическую безопасность и персональное
              внимание к деталям. Мы верим, что покупка недвижимости — это не просто сделка,
              а важный жизненный этап, который должен проходить в атмосфере доверия и комфорта.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Наши <span className="gold-text">ценности</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((val) => (
              <div
                key={val.title}
                className="p-6 rounded-2xl bg-[#141414] border border-white/5 hover:border-[#D4AF37]/30 transition-all text-center"
              >
                <div className="w-14 h-14 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4">
                  <val.icon className="w-7 h-7 text-[#D4AF37]" />
                </div>
                <h3 className="text-lg font-semibold text-white mb-2">{val.title}</h3>
                <p className="text-white/60 text-sm">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Наша <span className="gold-text">команда</span>
            </h2>
            <p className="text-white/60 max-w-2xl mx-auto">
              Профессионалы с многолетним опытом работы в сфере недвижимости
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="text-center p-4 rounded-2xl bg-[#0B0B0B] border border-white/5 hover:border-[#D4AF37]/30 transition-all"
              >
                <div className="w-20 h-20 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] mx-auto mb-3 flex items-center justify-center">
                  <span className="text-[#D4AF37] font-bold">{member.avatar}</span>
                </div>
                <h4 className="text-white font-medium text-sm">{member.name}</h4>
                <p className="text-white/50 text-xs mt-1">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form */}
      <ApplicationFormSection />
    </div>
  );
}
