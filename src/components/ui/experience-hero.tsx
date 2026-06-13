"use client";

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Phone, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ─────────────────── Interface ─────────────────── */
export interface ExperienceHeroProps {
  onNavigate?: (section: string) => void;
}

/* ─────────────────── Main Component ─────────────────── */
export const Component = ({ onNavigate }: ExperienceHeroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const revealRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (revealRef.current) {
      gsap.set(revealRef.current, { visibility: 'visible' });
    }

    const ctx = gsap.context(() => {
      const mainHeading = containerRef.current?.querySelector('.hero-main-heading');
      if (mainHeading) {
        gsap.fromTo(
          mainHeading,
          { filter: "blur(20px)", opacity: 0 },
          { filter: "blur(0px)", opacity: 1, duration: 1.8, ease: "expo.out" }
        );
      }

      const heroSubtitle = containerRef.current?.querySelector('.hero-subtitle');
      if (heroSubtitle) {
        gsap.fromTo(
          heroSubtitle,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1.2, ease: "power3.out", delay: 0.4 }
        );
      }

      const heroLabel = containerRef.current?.querySelector('.hero-label');
      if (heroLabel) {
        gsap.fromTo(
          heroLabel,
          { opacity: 0, x: -20 },
          { opacity: 1, x: 0, duration: 1, ease: "power3.out", delay: 0.2 }
        );
      }

      const heroCta = containerRef.current?.querySelector('.hero-cta');
      if (heroCta) {
        gsap.fromTo(
          heroCta,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 }
        );
      }

      gsap.from(".command-cell", {
        x: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power4.out",
        delay: 0.8,
        clearProps: "all",
      });

      // Magnetic CTA button effect
      const handleMouseMove = (e: MouseEvent) => {
        if (!ctaRef.current) return;
        const rect = ctaRef.current.getBoundingClientRect();
        const dist = Math.hypot(
          e.clientX - (rect.left + rect.width / 2),
          e.clientY - (rect.top + rect.height / 2)
        );
        if (dist < 150) {
          gsap.to(ctaRef.current, {
            x: (e.clientX - (rect.left + rect.width / 2)) * 0.4,
            y: (e.clientY - (rect.top + rect.height / 2)) * 0.4,
            duration: 0.6,
          });
        } else {
          gsap.to(ctaRef.current, {
            x: 0,
            y: 0,
            duration: 0.8,
            ease: "elastic.out(1, 0.3)",
          });
        }
      };
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#0B0B0B] flex flex-col selection:bg-[#D4AF37] selection:text-black overflow-hidden"
    >
      {/* Animated CSS Background - Gold shimmer effect */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#0B0B0B]" />
        <div className="hero-gradient-orb absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/[0.03] blur-[120px] animate-float-slow" />
        <div className="hero-gradient-orb absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-[#D4AF37]/[0.04] blur-[100px] animate-float-medium" />
        <div className="hero-gradient-orb absolute top-1/2 left-1/2 w-[300px] h-[300px] rounded-full bg-[#F1D28A]/[0.02] blur-[80px] animate-float-fast" />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(212,175,55,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.3) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      {/* Content overlay */}
      <div
        ref={revealRef}
        className="relative z-10 w-full flex flex-col md:flex-row px-5 sm:px-6 md:px-14 lg:px-20 pt-24 sm:pt-28 md:pt-32 pb-20 md:pb-10 min-h-screen items-center md:items-stretch gap-6 md:gap-10"
        style={{ visibility: 'visible' }}
      >
        {/* Left Column */}
        <div className="flex-1 min-w-0 flex flex-col justify-center pb-4 md:pb-8 w-full">
          <div className="max-w-4xl pr-0 sm:pr-12">
            <div className="hero-label flex items-center gap-3 mb-6" style={{ opacity: 1 }}>
              <div className="relative w-2.5 h-2.5 bg-[#D4AF37] rounded-full">
                <div className="absolute inset-0 bg-[#D4AF37] rounded-full animate-ping opacity-30" />
              </div>
              <span className="font-mono text-[11px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase">
                Агентство премиальной недвижимости
              </span>
            </div>

            <h1 className="hero-main-heading text-[clamp(2.2rem,9vw,9rem)] font-black leading-[1.05] tracking-tighter text-white uppercase" style={{ opacity: 1 }}>
              ПРЕМИАЛЬНАЯ
              <br />
              <span className="text-outline-gold">НЕДВИЖИМОСТЬ</span>
            </h1>
            <p className="hero-subtitle mt-8 font-mono text-[11px] text-white/40 uppercase tracking-[0.35em] max-w-sm leading-relaxed" style={{ opacity: 1 }}>
              Элитные квартиры, дома и коммерческие объекты в Ростове-на-Дону.
              Полное сопровождение сделок от подбора до передачи ключей.
            </p>
          </div>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            className="hero-cta w-fit flex items-center gap-6 group mt-10"
            onClick={() => onNavigate?.('catalog')}
            style={{ opacity: 1 }}
          >
            <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-500 overflow-hidden">
              <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover:text-black transition-colors duration-500" />
            </div>
            <span className="font-mono text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
              Подобрать объект
            </span>
          </button>
        </div>

        {/* Right Side Deck */}
        <div className="w-full md:w-80 lg:w-96 flex-shrink-0 flex flex-col gap-3 sm:gap-4 justify-center z-20">
          {/* Panel 1: Availability */}
          <div className="command-cell glass-panel p-6 sm:p-7">
            <span className="font-mono text-[9px] text-[#D4AF37]/50 uppercase tracking-widest block mb-3">
              001 // ПРИЁМ ЗАЯВОК
            </span>
            <div className="flex justify-between items-end mt-2">
              <h4 className="text-2xl sm:text-3xl font-bold text-white tracking-tighter">Открыт</h4>
              <div className="h-[2px] w-20 bg-white/5 rounded-full overflow-hidden">
                <div className="h-full bg-[#D4AF37] w-[85%] animate-loading" />
              </div>
            </div>
            <p className="text-[10px] font-mono text-white/30 mt-2">Подбор объектов в активном режиме</p>
          </div>

          {/* Panel 2: Stats */}
          <div className="command-cell glass-panel p-6 sm:p-7">
            <span className="font-mono text-[9px] text-[#D4AF37]/50 uppercase tracking-widest block mb-3">
              002 // СТАТИСТИКА
            </span>
            <div className="mt-4 flex flex-col gap-3">
              <div className="flex justify-between text-[10px] font-mono text-white/50">
                <span>Сделок закрыто</span>
                <span className="text-[#D4AF37]">500+</span>
              </div>
              <div className="h-[1px] w-full bg-white/5" />
              <div className="flex justify-between text-[10px] font-mono text-white/50">
                <span>Лет на рынке</span>
                <span className="text-[#D4AF37]">15</span>
              </div>
              <div className="h-[1px] w-full bg-white/5" />
              <div className="flex justify-between text-[10px] font-mono text-white/50">
                <span>Довольных клиентов</span>
                <span className="text-[#D4AF37]">98.2%</span>
              </div>
            </div>
          </div>

          {/* Panel 3: Expertise */}
          <div className="command-cell glass-panel p-6 sm:p-7">
            <span className="font-mono text-[9px] text-[#D4AF37]/50 uppercase tracking-widest block mb-3">
              003 // ЭКСПЕРТИЗА
            </span>
            <h3 className="text-sm font-medium text-white/70 mt-3 leading-snug">
              Превращаем поиск недвижимости в&nbsp;
              <span className="italic text-[#D4AF37]">премиальный опыт</span>, где каждая деталь продумана.
            </h3>
          </div>

          {/* Contact line */}
          <div className="command-cell glass-panel p-5 flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 flex items-center justify-center">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="flex-1">
              <p className="text-[10px] font-mono text-white/30 uppercase tracking-wider">Звоните прямо сейчас</p>
              <p className="text-sm font-semibold text-white">+7 (900) 120-13-15</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-5 sm:px-6 md:px-14 lg:px-20 pb-4 sm:pb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-white/30 text-xs font-mono uppercase tracking-wider">
            <MapPin className="w-3 h-3 text-[#D4AF37]" />
            Ростов-на-Дону, ул. Обороны д. 49/22
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="border-[#D4AF37]/30 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black font-mono text-[10px] tracking-wider uppercase h-8"
              onClick={() => onNavigate?.('contacts')}
            >
              Контакты
            </Button>
            <div className="w-5 h-8 border border-[#D4AF37]/30 rounded-full flex items-start justify-center p-1">
              <div className="w-1 h-1.5 bg-[#D4AF37] rounded-full animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Component;
