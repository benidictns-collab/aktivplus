'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from '@studio-freight/lenis';

export interface ParallaxHeroProps {
  onNavigate?: (section: string) => void;
}

export function ParallaxHero({ onNavigate }: ParallaxHeroProps) {
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector('[data-parallax-layers]');

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: '0% 0%',
          end: '100% 0%',
          scrub: 0,
        },
      });

      const layers = [
        { layer: '1', yPercent: 70 },
        { layer: '2', yPercent: 55 },
        { layer: '3', yPercent: 40 },
        { layer: '4', yPercent: 10 },
      ];

      layers.forEach((layerObj, idx) => {
        tl.to(
          triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`),
          {
            yPercent: layerObj.yPercent,
            ease: 'none',
          },
          idx === 0 ? undefined : '<'
        );
      });
    }

    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      lenis.destroy();
    };
  }, []);

  return (
    <div className="parallax" ref={parallaxRef}>
      <section className="parallax__header">
        <div className="parallax__visuals">
          <div className="parallax__black-line-overflow" />
          <div data-parallax-layers className="parallax__layers">
            {/* Layer 1 — Farthest back: dark city silhouette */}
            <img
              src="/images/parallax/parallax-1.jpg"
              loading="eager"
              width="1200"
              data-parallax-layer="1"
              alt="Городской силуэт"
              className="parallax__layer-img"
            />
            {/* Layer 2 — Middle: luxury building */}
            <img
              src="/images/properties/property-1.jpg"
              loading="eager"
              width="1200"
              data-parallax-layer="2"
              alt="Элитный дом"
              className="parallax__layer-img"
            />
            {/* Layer 3 — Title overlay */}
            <div data-parallax-layer="3" className="parallax__layer-title">
              <h2 className="parallax__title">
                АКТИВ
                <br />
                <span className="parallax__title-accent">ПЛЮС</span>
              </h2>
              <p className="parallax__subtitle">Агентство премиальной недвижимости</p>
            </div>
            {/* Layer 4 — Foreground: architectural detail */}
            <img
              src="/images/properties/property-3.jpg"
              loading="eager"
              width="1200"
              data-parallax-layer="4"
              alt="Архитектурная деталь"
              className="parallax__layer-img"
            />
          </div>
          <div className="parallax__fade" />
        </div>
      </section>
    </div>
  );
}

export default ParallaxHero;
