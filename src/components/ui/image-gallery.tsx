'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Eye } from 'lucide-react';

interface GalleryImage {
  src: string;
  alt: string;
  label?: string;
}

interface ImageGalleryProps {
  images?: GalleryImage[];
  title?: string;
  subtitle?: string;
}

const defaultImages: GalleryImage[] = [
  {
    src: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    alt: 'Элитный особняк',
    label: 'Особняки',
  },
  {
    src: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=2070&auto=format&fit=crop',
    alt: 'Роскошная вилла',
    label: 'Виллы',
  },
  {
    src: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=2053&auto=format&fit=crop',
    alt: 'Интерьер квартиры',
    label: 'Квартиры',
  },
  {
    src: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2070&auto=format&fit=crop',
    alt: 'Современный дом',
    label: 'Дома',
  },
  {
    src: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?q=80&w=2070&auto=format&fit=crop',
    alt: 'Пентхаус',
    label: 'Пентхаусы',
  },
  {
    src: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2070&auto=format&fit=crop',
    alt: 'Апартаменты',
    label: 'Апартаменты',
  },
];

export default function ImageGallery({
  images = defaultImages,
  title = 'Портфолио',
  subtitle = 'Коллекция наших лучших объектов — каждый подобран с вниманием к деталям, стилю и качеству',
}: ImageGalleryProps) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mobile layout: 2-column grid
  if (isMobile) {
    return (
      <section className="w-full flex flex-col items-center justify-start py-12 bg-[#0B0B0B]">
        <div className="max-w-3xl text-center px-6 mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-xs font-medium tracking-[0.2em] uppercase">
              Наши объекты
            </span>
            <div className="h-px w-8 bg-[#D4AF37]" />
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
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
          <p className="text-sm text-white/50 mt-2">{subtitle}</p>
        </div>

        <div className="w-full px-4 grid grid-cols-2 gap-2">
          {images.map((img, idx) => (
            <div
              key={idx}
              className="relative group rounded-lg overflow-hidden aspect-[3/4]"
            >
              <img
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                src={img.src}
                alt={img.alt}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              {img.label && (
                <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                  <span className="text-xs font-medium text-[#F1D28A] bg-black/60 backdrop-blur-sm px-2 py-1 rounded">
                    {img.label}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    );
  }

  // Desktop layout: expanding panels
  return (
    <section className="w-full flex flex-col items-center justify-start py-16 bg-[#0B0B0B]">
      <div className="max-w-3xl text-center px-6 mb-10">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="h-px w-12 bg-[#D4AF37]" />
          <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
            Наши объекты
          </span>
          <div className="h-px w-12 bg-[#D4AF37]" />
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white tracking-tight">
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
        <p className="text-base text-white/50 mt-3 max-w-xl mx-auto">{subtitle}</p>
      </div>

      {/* Gallery */}
      <div className="flex items-center gap-2 h-[440px] w-full max-w-6xl px-4">
        {images.map((img, idx) => {
          const isHovered = hoveredIdx === idx;
          return (
            <div
              key={idx}
              className={cn(
                'relative group flex-grow rounded-xl overflow-hidden h-[440px] transition-all duration-500 cursor-pointer',
                'border-2',
                isHovered ? 'border-[#D4AF37]' : 'border-white/[0.04]'
              )}
              style={{
                width: isHovered ? '100%' : undefined,
                flex: isHovered ? '6 1 0%' : '1 1 0%',
                boxShadow: isHovered
                  ? '0 20px 60px rgba(212,175,55,0.12), 0 8px 20px rgba(0,0,0,0.4)'
                  : '0 4px 12px rgba(0,0,0,0.3)',
              }}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
            >
              <img
                className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                src={img.src}
                alt={img.alt}
              />

              {/* Dark overlay — always visible on sides, fades on hover */}
              <div
                className="absolute inset-0 transition-all duration-500"
                style={{
                  background: isHovered
                    ? 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)'
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

              {/* Label + eye icon overlay */}
              {img.label && (
                <div className="absolute bottom-0 left-0 right-0 px-5 pb-4">
                  <div
                    className="flex items-center gap-3 transition-all duration-500"
                    style={{
                      opacity: isHovered ? 1 : 0,
                      transform: isHovered ? 'translateY(0)' : 'translateY(12px)',
                    }}
                  >
                    <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37] flex items-center justify-center backdrop-blur-sm">
                      <Eye className="w-4 h-4 text-[#D4AF37]" />
                    </div>
                    <div>
                      <div className="text-[#F1D28A] font-semibold text-sm">{img.label}</div>
                      <div className="text-white/50 text-xs">{img.alt}</div>
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
              )}

              {/* Side number indicator when not hovered */}
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
    </section>
  );
}
