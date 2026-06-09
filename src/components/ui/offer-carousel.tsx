'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from '@/components/ui/carousel';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { services } from '@/lib/data';

interface OfferCarouselProps {
  onServiceClick?: (id: number) => void;
}

export default function OfferCarousel({ onServiceClick }: OfferCarouselProps) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4">
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {services.map((service) => (
            <CarouselItem key={service.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <motion.div
                className="premium-card group relative overflow-hidden rounded-2xl bg-[#141414] border border-white/5 h-full"
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-[#141414]/50 to-transparent" />

                  {/* Number badge */}
                  <div className="absolute top-4 left-4">
                    <span className="w-10 h-10 rounded-full bg-[#D4AF37] text-black text-sm font-bold flex items-center justify-center">
                      {String(service.id).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#D4AF37] transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm leading-relaxed mb-5">
                    {service.description}
                  </p>
                  <Button
                    variant="ghost"
                    className="text-[#D4AF37] hover:text-[#F1D28A] p-0 h-auto font-medium"
                    onClick={() => onServiceClick?.(service.id)}
                  >
                    Подробнее
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </motion.div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-1/2 bg-[#D4AF37] text-black border-none hover:bg-[#F1D28A] disabled:opacity-50" />
        <CarouselNext className="right-0 translate-x-1/2 bg-[#D4AF37] text-black border-none hover:bg-[#F1D28A] disabled:opacity-50" />
      </Carousel>
    </div>
  );
}
