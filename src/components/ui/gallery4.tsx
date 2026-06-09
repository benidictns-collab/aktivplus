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
import { MapPin, Maximize, BedDouble, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { properties, type Property } from '@/lib/data';

interface Gallery4Props {
  onPropertyClick?: (id: number) => void;
}

function PropertyCard({ property, onClick }: { property: Property; onClick?: () => void }) {
  return (
    <motion.div
      className="premium-card group relative overflow-hidden rounded-2xl bg-[#141414] border border-white/5 cursor-pointer"
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      onClick={onClick}
    >
      {/* Image */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={property.images[0]}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />

        {/* Status badge */}
        <div className="absolute top-4 left-4">
          <span className="bg-[#D4AF37] text-black text-xs font-semibold px-3 py-1.5 rounded-full">
            {property.status}
          </span>
        </div>

        {/* Favorite button */}
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/60 hover:text-[#D4AF37] transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          <Heart className="w-5 h-5" />
        </button>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-[#D4AF37] transition-colors">
          {property.title}
        </h3>
        <div className="flex items-center gap-1 text-white/50 text-sm mb-3">
          <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
          {property.district}
        </div>

        <div className="flex items-center gap-4 text-sm text-white/60 mb-4">
          <div className="flex items-center gap-1.5">
            <Maximize className="w-4 h-4 text-[#D4AF37]" />
            {property.area}
          </div>
          <div className="flex items-center gap-1.5">
            <BedDouble className="w-4 h-4 text-[#D4AF37]" />
            {property.rooms}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-xl font-bold gold-text">{property.price}</span>
          <Button
            size="sm"
            className="bg-[#D4AF37] text-black hover:bg-[#F1D28A] text-xs font-semibold"
            onClick={(e) => {
              e.stopPropagation();
              onClick?.();
            }}
          >
            Подробнее
          </Button>
        </div>
      </div>
    </motion.div>
  );
}

export default function Gallery4({ onPropertyClick }: Gallery4Props) {
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
          {properties.map((property) => (
            <CarouselItem key={property.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <PropertyCard
                property={property}
                onClick={() => onPropertyClick?.(property.id)}
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-0 -translate-x-1/2 bg-[#D4AF37] text-black border-none hover:bg-[#F1D28A] disabled:opacity-50" />
        <CarouselNext className="right-0 translate-x-1/2 bg-[#D4AF37] text-black border-none hover:bg-[#F1D28A] disabled:opacity-50" />
      </Carousel>
    </div>
  );
}
