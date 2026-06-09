'use client';

import React, { useState, useEffect } from 'react';
import { Building, Home, Key, Scale, TrendingUp, Briefcase } from 'lucide-react';

interface SelectorOption {
  title: string;
  description: string;
  image: string;
  icon: React.ReactNode;
}

interface InteractiveSelectorProps {
  options?: SelectorOption[];
  title?: string;
  subtitle?: string;
}

const defaultOptions: SelectorOption[] = [
  {
    title: 'Продажа недвижимости',
    description: 'Профессиональная продажа на лучших условиях рынка',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1973',
    icon: <Home size={22} className="text-[#D4AF37]" />,
  },
  {
    title: 'Покупка недвижимости',
    description: 'Подберём идеальный объект под ваши потребности',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=2070',
    icon: <Key size={22} className="text-[#D4AF37]" />,
  },
  {
    title: 'Аренда недвижимости',
    description: 'Сдача и подбор арендной недвижимости быстро и надёжно',
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?q=80&w=2070',
    icon: <Building size={22} className="text-[#D4AF37]" />,
  },
  {
    title: 'Коммерческая недвижимость',
    description: 'Офисы, торговые площади и склады для вашего бизнеса',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069',
    icon: <Briefcase size={22} className="text-[#D4AF37]" />,
  },
  {
    title: 'Инвестиционные объекты',
    description: 'Выгодные инвестиции с высокой доходностью',
    image: 'https://images.unsplash.com/photo-1560520653-9e0e4c89eb11?q=80&w=2070',
    icon: <TrendingUp size={22} className="text-[#D4AF37]" />,
  },
  {
    title: 'Сопровождение сделок',
    description: 'Полное юридическое сопровождение на всех этапах',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=2070',
    icon: <Scale size={22} className="text-[#D4AF37]" />,
  },
];

export default function InteractiveSelector({
  options = defaultOptions,
  title = 'Наши услуги',
  subtitle = 'Полный спектр услуг для решения любых задач в сфере недвижимости',
}: InteractiveSelectorProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animatedOptions, setAnimatedOptions] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleOptionClick = (index: number) => {
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    options.forEach((_, i) => {
      const timer = setTimeout(() => {
        setAnimatedOptions((prev) => [...prev, i]);
      }, 150 * i);
      timers.push(timer);
    });
    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [options]);

  // Mobile layout: vertical cards
  if (isMobile) {
    return (
      <div className="relative flex flex-col items-center w-full bg-[#0B0B0B] font-sans text-white py-8">
        {/* Header */}
        <div className="w-full px-6 mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-medium tracking-[0.2em] uppercase">
              Что мы предлагаем
            </span>
            <div className="h-px w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-3 tracking-tight">
            {title.split(' ').map((word, i) =>
              i === title.split(' ').length - 1 ? (
                <span key={i} className="gold-text">
                  {' '}{word}
                </span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-sm text-white/60 max-w-md mx-auto">{subtitle}</p>
        </div>

        {/* Mobile: vertical card list */}
        <div className="w-full px-4 flex flex-col gap-3">
          {options.map((option, index) => {
            const isActive = activeIndex === index;
            return (
              <div
                key={index}
                className="relative overflow-hidden rounded-xl cursor-pointer transition-all duration-500 ease-in-out"
                style={{
                  backgroundImage: `url('${option.image}')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  height: isActive ? '160px' : '64px',
                  opacity: animatedOptions.includes(index) ? 1 : 0,
                  transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-30px)',
                  border: `1.5px solid ${isActive ? '#D4AF37' : 'rgba(255,255,255,0.08)'}`,
                  boxShadow: isActive
                    ? '0 8px 30px rgba(212,175,55,0.15)'
                    : '0 4px 12px rgba(0,0,0,0.3)',
                  transition: 'all 0.5s ease-in-out',
                }}
                onClick={() => handleOptionClick(index)}
              >
                {/* Dark overlay */}
                <div
                  className="absolute inset-0 transition-all duration-500"
                  style={{
                    background: isActive
                      ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 100%)'
                      : 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 100%)',
                  }}
                />

                {/* Content */}
                <div className="relative z-10 flex items-center h-full px-4 gap-3">
                  <div
                    className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      width: '36px',
                      height: '36px',
                      background: isActive ? 'rgba(212,175,55,0.2)' : 'rgba(255,255,255,0.08)',
                      border: `1.5px solid ${isActive ? '#D4AF37' : 'rgba(255,255,255,0.15)'}`,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    {option.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      className="font-semibold text-sm text-white transition-all duration-500"
                      style={{
                        opacity: 1,
                        color: isActive ? '#F1D28A' : 'rgba(255,255,255,0.8)',
                      }}
                    >
                      {option.title}
                    </div>
                    <div
                      className="text-xs text-white/50 transition-all duration-500 overflow-hidden"
                      style={{
                        maxHeight: isActive ? '40px' : '0',
                        opacity: isActive ? 1 : 0,
                      }}
                    >
                      {option.description}
                    </div>
                  </div>
                  {/* Gold indicator */}
                  {isActive && (
                    <div className="flex-shrink-0 w-1.5 h-8 rounded-full bg-[#D4AF37]" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Desktop layout: horizontal expanding panels
  return (
    <div className="relative flex flex-col items-center w-full bg-[#0B0B0B] font-sans text-white py-10">
      {/* Header */}
      <div className="w-full max-w-4xl px-6 mb-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
            Что мы предлагаем
          </span>
          <div className="h-px w-12 bg-[#D4AF37]" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 tracking-tight">
          {title.split(' ').map((word, i) =>
            i === title.split(' ').length - 1 ? (
              <span key={i} className="gold-text">
                {' '}{word}
              </span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h2>
        <p className="text-base md:text-lg text-white/60 max-w-xl mx-auto">{subtitle}</p>
      </div>

      <div className="h-8" />

      {/* Options Container */}
      <div className="flex w-full max-w-[1000px] h-[420px] mx-auto items-stretch overflow-hidden relative px-4">
        {options.map((option, index) => {
          const isActive = activeIndex === index;
          return (
            <div
              key={index}
              className="relative flex flex-col justify-end overflow-hidden cursor-pointer"
              style={{
                backgroundImage: `url('${option.image}')`,
                backgroundSize: isActive ? 'auto 110%' : 'auto 130%',
                backgroundPosition: 'center',
                backfaceVisibility: 'hidden',
                opacity: animatedOptions.includes(index) ? 1 : 0,
                transform: animatedOptions.includes(index) ? 'translateX(0)' : 'translateX(-60px)',
                minWidth: '50px',
                minHeight: '80px',
                margin: '0 2px',
                borderRadius: '12px',
                borderWidth: '2px',
                borderStyle: 'solid',
                borderColor: isActive ? '#D4AF37' : 'rgba(255,255,255,0.06)',
                backgroundColor: '#111',
                boxShadow: isActive
                  ? '0 20px 60px rgba(212,175,55,0.12), 0 8px 20px rgba(0,0,0,0.4)'
                  : '0 10px 30px rgba(0,0,0,0.3)',
                flex: isActive ? '5 1 0%' : '0.8 1 0%',
                zIndex: isActive ? 10 : 1,
                willChange: 'flex-grow, box-shadow, background-size, background-position',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onClick={() => handleOptionClick(index)}
            >
              {/* Bottom gradient shadow */}
              <div
                className="absolute left-0 right-0 pointer-events-none transition-all duration-700 ease-in-out"
                style={{
                  bottom: isActive ? '0' : '-50px',
                  height: '140px',
                  boxShadow: isActive
                    ? 'inset 0 -140px 140px -120px #000, inset 0 -100px 100px -80px rgba(0,0,0,0.8)'
                    : 'inset 0 -140px 0px -120px #000, inset 0 -100px 0px -80px rgba(0,0,0,0.8)',
                }}
              />

              {/* Top vignette for inactive panels */}
              {!isActive && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0.3) 100%)',
                  }}
                />
              )}

              {/* Number indicator */}
              <div
                className="absolute top-3 left-3 flex items-center justify-center rounded-full transition-all duration-500"
                style={{
                  width: '28px',
                  height: '28px',
                  background: isActive ? 'rgba(212,175,55,0.9)' : 'rgba(255,255,255,0.08)',
                  border: `1.5px solid ${isActive ? '#D4AF37' : 'rgba(255,255,255,0.12)'}`,
                  opacity: isActive ? 0 : 0.7,
                  fontSize: '11px',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.7)',
                  zIndex: 5,
                }}
              >
                {String(index + 1).padStart(2, '0')}
              </div>

              {/* Label with icon and info */}
              <div
                className="absolute left-0 right-0 bottom-4 flex items-center justify-start h-14 z-10 pointer-events-none px-4 gap-3 w-full"
              >
                <div
                  className="flex-shrink-0 flex items-center justify-center rounded-full transition-all duration-300"
                  style={{
                    width: '44px',
                    height: '44px',
                    background: isActive ? 'rgba(212,175,55,0.2)' : 'rgba(11,11,11,0.85)',
                    border: `2px solid ${isActive ? '#D4AF37' : 'rgba(255,255,255,0.12)'}`,
                    backdropFilter: 'blur(10px)',
                    boxShadow: isActive
                      ? '0 0 20px rgba(212,175,55,0.15)'
                      : '0 1px 4px rgba(0,0,0,0.18)',
                  }}
                >
                  {option.icon}
                </div>
                <div className="text-white whitespace-nowrap relative overflow-hidden">
                  <div
                    className="font-bold text-base md:text-lg transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                      color: '#F1D28A',
                    }}
                  >
                    {option.title}
                  </div>
                  <div
                    className="text-sm text-white/60 transition-all duration-700 ease-in-out"
                    style={{
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'translateX(0)' : 'translateX(25px)',
                      transitionDelay: '0.1s',
                    }}
                  >
                    {option.description}
                  </div>
                </div>
              </div>

              {/* Gold accent line at bottom when active */}
              <div
                className="absolute bottom-0 left-4 right-4 h-0.5 rounded-full transition-all duration-700"
                style={{
                  background: isActive
                    ? 'linear-gradient(90deg, #D4AF37, #F1D28A, #D4AF37)'
                    : 'transparent',
                  opacity: isActive ? 1 : 0,
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Navigation dots */}
      <div className="flex items-center gap-2 mt-6">
        {options.map((_, index) => (
          <button
            key={index}
            className="rounded-full transition-all duration-300"
            style={{
              width: activeIndex === index ? '24px' : '8px',
              height: '8px',
              background: activeIndex === index ? '#D4AF37' : 'rgba(255,255,255,0.2)',
              cursor: 'pointer',
            }}
            onClick={() => handleOptionClick(index)}
          />
        ))}
      </div>
    </div>
  );
}
