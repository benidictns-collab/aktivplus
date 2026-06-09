'use client';

import React from 'react';
import { ArrowRight, CheckCircle, Shield, Clock, UserCheck, FileText, Search, Handshake } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/data';
import ApplicationFormSection from '@/components/sections/ApplicationFormSection';
import { useNavigationStore } from '@/store/navigation';

const workStages = [
  { icon: Search, title: 'Консультация', desc: 'Бесплатная консультация и определение ваших потребностей' },
  { icon: FileText, title: 'Подбор объектов', desc: 'Подбираем объекты, соответствующие вашим критериям' },
  { icon: Shield, title: 'Проверка', desc: 'Тщательная юридическая и техническая проверка объекта' },
  { icon: Handshake, title: 'Сделка', desc: 'Оформление и подписание всех необходимых документов' },
  { icon: CheckCircle, title: 'Передача', desc: 'Передача ключей и полное завершение сделки' },
];

const serviceAdvantages = [
  'Бесплатная консультация',
  'Индивидуальный подход',
  'Полное юридическое сопровождение',
  'Гарантия безопасности сделки',
  'Доступ к закрытым предложениям',
  'Персональный менеджер 24/7',
];

export default function ServicesPage() {
  const { navigate } = useNavigationStore();

  return (
    <div className="pt-20">
      {/* Banner */}
      <section className="relative py-20 md:py-32 bg-[#0B0B0B] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973"
            alt="Услуги"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0B] via-[#0B0B0B]/80 to-transparent" />
        </div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-[#D4AF37]" />
              <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">Услуги</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
              Наши <span className="gold-text">услуги</span>
            </h1>
            <p className="text-white/60 text-lg max-w-2xl">
              Полный спектр услуг для решения любых задач в сфере недвижимости
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div
                key={service.id}
                className="premium-card group relative overflow-hidden rounded-2xl bg-[#141414] border border-white/5"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="w-10 h-10 rounded-full bg-[#D4AF37] text-black text-sm font-bold flex items-center justify-center">
                      {String(service.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advantages */}
      <section className="py-20 bg-[#141414]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Почему <span className="gold-text">выбирают нас</span>
              </h2>
              <p className="text-white/60 mb-8">
                Мы предоставляем комплексный подход к решению любых задач в сфере недвижимости
              </p>
              <div className="space-y-4">
                {serviceAdvantages.map((adv) => (
                  <div key={adv} className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-[#D4AF37] shrink-0" />
                    <span className="text-white/80">{adv}</span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070"
                  alt="Преимущества"
                  className="w-full h-[400px] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Work Stages */}
      <section className="py-20 bg-[#0B0B0B]">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Этапы <span className="gold-text">работы</span>
            </h2>
          </div>
          <div className="grid md:grid-cols-5 gap-4">
            {workStages.map((stage, i) => (
              <div
                key={stage.title}
                className="text-center p-6 rounded-2xl bg-[#141414] border border-white/5 relative"
              >
                <div className="w-12 h-12 rounded-full bg-[#D4AF37]/10 flex items-center justify-center mx-auto mb-4">
                  <stage.icon className="w-6 h-6 text-[#D4AF37]" />
                </div>
                <div className="text-[#D4AF37] text-sm font-bold mb-2">0{i + 1}</div>
                <h3 className="text-white font-semibold mb-2">{stage.title}</h3>
                <p className="text-white/50 text-sm">{stage.desc}</p>
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
