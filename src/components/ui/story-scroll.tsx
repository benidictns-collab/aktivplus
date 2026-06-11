'use client';

import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

function cx(...parts: Array<string | undefined | false | null>): string {
  return parts.filter(Boolean).join(' ');
}

export interface FlowSectionProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  'aria-label'?: string;
}

export const FlowSection: React.FC<FlowSectionProps> = ({
  className,
  style = {},
  children,
  'aria-label': ariaLabel,
}) => (
  <section
    data-flow-section
    aria-label={ariaLabel}
    className={cx('relative min-h-screen w-full', className)}
  >
    <div
      data-flow-inner
      className={cx(
        'flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-10 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw] will-change-transform',
      )}
      style={{ ...style }}
    >
      {children}
    </div>
  </section>
);

export interface FlowArtProps {
  children: React.ReactNode;
  className?: string;
  'aria-label'?: string;
}

const childCount = (children: React.ReactNode) => React.Children.count(children);

const FlowArt: React.FC<FlowArtProps> = ({
  children,
  className,
  'aria-label': ariaLabel = 'Story scroll',
}) => {
  const containerRef = useRef<HTMLElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReducedMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  useGSAP(
    () => {
      if (!containerRef.current || reducedMotion) return;

      const sections = Array.from(
        containerRef.current.querySelectorAll<HTMLElement>('[data-flow-section]'),
      );
      if (sections.length === 0) return;

      const isMobile = window.innerWidth < 768;

      const triggers: ScrollTrigger[] = [];

      // Stack: later sections render on top
      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });
      });

      // Pin each section (except the last) so the next one
      // simply scrolls over it — no fade, no slide, no rotation
      sections.forEach((section, i) => {
        if (i < sections.length - 1) {
          triggers.push(
            ScrollTrigger.create({
              trigger: section,
              start: 'bottom bottom',
              end: 'bottom top',
              pin: true,
              pinSpacing: false,
              pinReparent: isMobile,
            }),
          );
        }
      });

      // Scale-down on outgoing section for depth feeling
      // On mobile: lighter effect with longer scrub for smoothness
      sections.forEach((section, i) => {
        if (i === 0) return;

        const prevInner = sections[i - 1].querySelector<HTMLElement>('.flow-art-container');
        if (!prevInner) return;

        const tween = gsap.to(prevInner, {
          scale: isMobile ? 0.98 : 0.96,
          ease: 'none',
          force3D: true,
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'top top',
            scrub: isMobile ? 1.5 : 3,
          },
        });
        if (tween.scrollTrigger) triggers.push(tween.scrollTrigger);
      });

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((t) => t.kill());
      };
    },
    { scope: containerRef, dependencies: [childCount(children), reducedMotion] },
  );

  return (
    <main
      ref={containerRef}
      aria-label={ariaLabel}
      className={cx('w-full overflow-x-hidden', className)}
    >
      {children}
    </main>
  );
};

export default FlowArt;
