'use client';

import React, { useEffect, useRef, useState } from 'react';

function AnimatedCounter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const duration = 2000;
          const startTime = Date.now();

          const animate = () => {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.floor(eased * target);

            setCount(current);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 500, suffix: '+', label: 'объектов' },
  { value: 1200, suffix: '+', label: 'клиентов' },
  { value: 800, suffix: '+', label: 'сделок' },
  { value: 15, suffix: '+', label: 'лет работы' },
];

export default function AboutSection() {
  return (
    <section className="py-20 md:py-28 bg-[#0B0B0B] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-[#D4AF37]/3 rounded-full blur-[80px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative">
        {/* Section Header — always visible */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
              О компании
            </span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Агентство <span className="gold-text">Актив Плюс</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          {/* Image */}
          <div className="relative max-w-lg mx-auto lg:max-w-none">
            <div className="relative rounded-2xl overflow-hidden">
              <img
                src="/images/about-office.jpg"
                alt="О компании Актив Плюс"
                className="w-full h-[300px] md:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0B0B]/60 to-transparent" />
            </div>
            {/* Gold accent corner */}
            <div className="absolute -top-3 -left-3 sm:-top-4 sm:-left-4 w-16 sm:w-20 h-16 sm:h-20 border-t-2 border-l-2 border-[#D4AF37] rounded-tl-2xl" />
            <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 w-16 sm:w-20 h-16 sm:h-20 border-b-2 border-r-2 border-[#D4AF37] rounded-br-2xl" />
          </div>

          {/* Text Content */}
          <div>
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Ваш надёжный партнёр <br />
              <span className="text-[#D4AF37]">на рынке недвижимости</span>
            </h3>
            <p className="text-white/70 leading-relaxed mb-4">
              Агентство недвижимости «Актив Плюс» — это команда профессионалов с многолетним опытом
              работы на рынке Ростова-на-Дону. Мы специализируемся на премиальной недвижимости
              и обеспечиваем полный цикл сопровождения сделок.
            </p>
            <p className="text-white/70 leading-relaxed mb-4">
              Наша миссия — помочь каждому клиенту найти недвижимость мечты, обеспечив
              юридическую безопасность и комфорт на каждом этапе сделки.
            </p>
            <p className="text-white/70 leading-relaxed">
              За 15 лет работы мы завоевали доверие более 1200 клиентов и успешно провели
              свыше 800 сделок с недвижимостью различной категории.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="text-center p-6 rounded-2xl bg-[#141414] border border-white/5 hover:border-[#D4AF37]/30 transition-all"
            >
              <div className="text-3xl md:text-4xl font-bold gold-text mb-2">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-white/60 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
