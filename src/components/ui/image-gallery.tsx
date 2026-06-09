'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye, MapPin, ArrowRight } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  label?: string;
  price?: string;
  district?: string;
  id?: number;
}

interface ImageGalleryProps {
  images?: GalleryImage[];
  title?: string;
  subtitle?: string;
  label?: string;
  onImageClick?: (id: number) => void;
  onViewAll?: () => void;
}

const defaultImages: GalleryImage[] = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    alt: 'Пентхаус на Набережной',
    label: 'Пентхаус',
    price: '45 000 000 ₽',
    district: 'Ворошиловский',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    alt: 'Коттедж в Западном',
    label: 'Коттедж',
    price: '65 000 000 ₽',
    district: 'Западный',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    alt: 'Апартаменты в Центре',
    label: 'Апартаменты',
    price: '28 000 000 ₽',
    district: 'Кировский',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    alt: 'Вилла на Левом берегу',
    label: 'Вилла',
    price: '85 000 000 ₽',
    district: 'Левенцовка',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop',
    alt: 'Таунхаус в Суворовском',
    label: 'Таунхаус',
    price: '32 000 000 ₽',
    district: 'Суворовский',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop',
    alt: 'Студия с панорамным видом',
    label: 'Студия',
    price: '12 500 000 ₽',
    district: 'Советский',
  },
];

export default function ImageGallery({
  images = defaultImages,
  title = 'Популярные объекты',
  subtitle = 'Самые востребованные предложения на рынке недвижимости Ростова-на-Дону',
  label = 'Портфолио',
  onImageClick,
  onViewAll,
}: ImageGalleryProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handleClick = (img: GalleryImage) => {
    if (onImageClick && img.id) {
      onImageClick(img.id);
    }
  };

  // Mobile layout: 2-column grid with property info
  if (isMobile) {
    return (
      <section className="w-full flex flex-col items-center justify-start py-12 bg-[#0B0B0B]">
        <div className="max-w-3xl text-center px-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-medium tracking-[0.2em] uppercase">
              {label}
            </span>
            <div className="h-px w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            {title.split(' ').map((word, i) =>
              i === title.split(' ').length - 1 ? (
                <span key={i} className="gold-text">{' '}{word}</span>
              ) : (
                <span key={i}>{word} </span>
              )
            )}
          </h2>
          <p className="text-sm text-white/50 mt-2">{subtitle}</p>
        </div>

        <div className="w-full px-4 grid grid-cols-2 gap-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative group rounded-xl overflow-hidden aspect-[3/4] cursor-pointer"
              onClick={() => handleClick(img)}
            >
              <img
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                src={img.src}
                alt={img.alt}
              />
              {/* Always-visible bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              {/* Property info */}
              <div className="absolute bottom-0 left-0 right-0 p-3">
                {img.label && (
                  <span className="inline-block text-[10px] font-semibold text-black bg-[#D4AF37] px-2 py-0.5 rounded mb-1.5">
                    {img.label}
                  </span>
                )}
                <div className="text-white text-xs font-semibold leading-tight">{img.alt}</div>
                {img.price && (
                  <div className="text-[#F1D28A] text-xs font-bold mt-0.5">{img.price}</div>
                )}
                {img.district && (
                  <div className="flex items-center gap-1 mt-1">
                    <MapPin className="w-3 h-3 text-white/40" />
                    <span className="text-white/40 text-[10px]">{img.district}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View all button */}
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="mt-6 flex items-center gap-2 text-[#D4AF37] hover:text-[#F1D28A] text-sm font-medium transition-colors"
          >
            Смотреть все объекты
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </section>
    );
  }

  // Desktop layout: expanding panels with property details
  return (
    <section className="w-full flex flex-col items-center justify-start py-16 bg-[#0B0B0B]">
      <div className="max-w-3xl text-center px-6 mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
            {label}
          </span>
          <div className="h-px w-12 bg-[#D4AF37]" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
          {title.split(' ').map((word, i) =>
            i === title.split(' ').length - 1 ? (
              <span key={i} className="gold-text">{' '}{word}</span>
            ) : (
              <span key={i}>{word} </span>
            )
          )}
        </h2>
        <p className="text-base text-white/50 mt-3 max-w-xl mx-auto">{subtitle}</p>
      </div>

      {/* Gallery */}
      <div className="flex items-center gap-2 h-[460px] w-full max-w-6xl px-4">
        {images.map((img, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={idx}
              className={cn(
                'relative group flex-grow rounded-xl overflow-hidden h-[460px] transition-all duration-500 cursor-pointer',
                'border-2',
                isHovered ? 'border-[#D4AF37]' : 'border-white/[0.04]'
              )}
              style={{
                flex: isHovered ? '5 1 0%' : '1 1 0%',
                boxShadow: isHovered
                  ? '0 20px 60px rgba(212,175,55,0.12), 0 8px 20px rgba(0,0,0,0.4)'
                  : '0 4px 12px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              onClick={() => handleClick(img)}
            >
              <img
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                src={img.src}
                alt={img.alt}
              />

              {/* Dark overlay */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: isHovered
                    ? 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.2) 50%, transparent 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.4) 100%)',
                }}
              />

              {/* Gold accent line at top */}
              <div
                className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
                style={{
                  background: isHovered
                    ? 'linear-gradient(90deg, transparent, #D4AF37, #F1D28A, #D4AF37, transparent)'
                    : 'transparent',
                }}
              />

              {/* Property info overlay */}
              <div className="absolute bottom-0 left-0 right-0 px-5 pb-5">
                {/* Type badge */}
                {img.label && (
                  <div
                    className="transition-all duration-500 mb-2"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
                    }}
                  >
                    <span className="text-xs font-semibold text-black bg-[#D4AF37] px-3 py-1 rounded-full">
                      {img.label}
                    </span>
                  </div>
                )}

                {/* Title + details */}
                <div
                  className="flex items-start gap-3 transition-all duration-500"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
                  }}
                >
                  <div className="w-11 h-11 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center backdrop-blur-sm flex-shrink-0">
                    <Eye className="w-5 h-5 text-[#D4AF37]" />
                  </div>
                  <div className="min-w-0">
                    <div className="text-[#F1D28A] font-semibold text-sm leading-tight">{img.alt}</div>
                    {img.price && (
                      <div className="text-white font-bold text-base mt-0.5">{img.price}</div>
                    )}
                    {img.district && (
                      <div className="flex items-center gap-1 mt-1">
                        <MapPin className="w-3 h-3 text-white/40" />
                        <span className="text-white/40 text-xs">{img.district}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Gold line separator */}
                <div
                  className="mt-3 h-px transition-all duration-700"
                  style={{
                    background: isHovered
                      ? 'linear-gradient(90deg, #D4AF37, transparent)'
                      : 'transparent',
                    width: isHovered ? '100%' : '0%',
                  }}
                />
              </div>

              {/* Number indicator when not hovered */}
              {!isHovered && (
                <div className="absolute bottom-3 left-0 right-0 flex justify-center">
                  <span className="text-white/30 text-xs font-bold tracking-wider">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* View all link */}
      {onViewAll && (
        <button
          onClick={onViewAll}
          className="mt-8 flex items-center gap-2 text-[#D4AF37] hover:text-[#F1D28A] text-sm font-medium transition-colors underline underline-offset-4"
        >
          Смотреть все объекты
          <ArrowRight className="w-4 h-4" />
        </button>
      )}
    </section>
  );
}
