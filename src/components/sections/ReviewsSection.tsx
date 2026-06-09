'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { reviews } from '@/lib/data';

export default function ReviewsSection() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = () => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  // Auto-rotate
  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, []);

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  const review = reviews[current];

  return (
    <section className="py-20 md:py-28 bg-[#0B0B0B] relative">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header — always visible */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-12 bg-[#D4AF37]" />
            <span className="text-[#D4AF37] text-sm font-medium tracking-[0.2em] uppercase">
              Отзывы
            </span>
            <div className="h-px w-12 bg-[#D4AF37]" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Что говорят <span className="gold-text">клиенты</span>
          </h2>
        </div>

        {/* Review Card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative min-h-[280px] md:min-h-[320px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="bg-[#141414] rounded-2xl border border-white/5 p-5 sm:p-8 md:p-12 text-center"
              >
                {/* Quote icon */}
                <Quote className="w-8 h-8 md:w-10 md:h-10 text-[#D4AF37]/30 mx-auto mb-4 md:mb-6" />

                {/* Avatar */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-[#D4AF37]/20 border-2 border-[#D4AF37] mx-auto mb-3 md:mb-4 flex items-center justify-center">
                  <span className="text-[#D4AF37] font-bold text-base md:text-lg">{review.avatar}</span>
                </div>

                {/* Stars */}
                <div className="flex items-center justify-center gap-1 mb-3 md:mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 md:w-5 md:h-5 ${
                        i < review.rating ? 'text-[#D4AF37] fill-[#D4AF37]' : 'text-white/20'
                      }`}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-white/80 text-base md:text-lg leading-relaxed mb-4 md:mb-6 italic">
                  &ldquo;{review.text}&rdquo;
                </p>

                {/* Author */}
                <div>
                  <h4 className="text-white font-semibold text-base md:text-lg">{review.name}</h4>
                  <p className="text-white/50 text-xs md:text-sm">{review.role}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    i === current ? 'bg-[#D4AF37] w-8' : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
