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
        'flow-art-container relative flex min-h-screen w-full flex-col justify-between gap-6 px-[4vw] pt-[clamp(2rem,8vw,4vw)] pb-[4vw]',
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

      const triggers: ScrollTrigger[] = [];
      const tweens: gsap.core.Tween[] = [];

      // Stack sections: later sections on top
      sections.forEach((section, i) => {
        gsap.set(section, { zIndex: i + 1 });
      });

      // All sections except the first start slightly below and transparent
      // (but with visibility:visible so content is accessible)
      sections.forEach((section, i) => {
        if (i === 0) return;

        const inner = section.querySelector<HTMLElement>('.flow-art-container');
        if (!inner) return;

        // Initial state: slightly translated down and faded
        gsap.set(inner, {
          y: 60,
          opacity: 0,
        });

        // Animate in: section slides up and fades in as it enters viewport
        const enterTween = gsap.to(inner, {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            end: 'top 20%',
            scrub: 1.5, // Longer scrub = smoother
          },
        });
        if (enterTween.scrollTrigger) triggers.push(enterTween.scrollTrigger);
        tweens.push(enterTween);
      });

      // Pin each section (except last) so the next section slides over it
      sections.forEach((section, i) => {
        if (i < sections.length - 1) {
          const pinTrigger = ScrollTrigger.create({
            trigger: section,
            start: 'bottom bottom',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
          });
          triggers.push(pinTrigger);
        }
      });

      // Fade-out the outgoing section as the next one covers it
      sections.forEach((section, i) => {
        if (i === 0) return; // First section doesn't need fade-out from scroll

        const prevSection = sections[i - 1];
        const prevInner = prevSection.querySelector<HTMLElement>('.flow-art-container');
        if (!prevInner) return;

        const fadeOutTween = gsap.to(prevInner, {
          opacity: 0.3,
          scale: 0.97,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
            end: 'top 30%',
            scrub: 1.5,
          },
        });
        if (fadeOutTween.scrollTrigger) triggers.push(fadeOutTween.scrollTrigger);
        tweens.push(fadeOutTween);
      });

      // Content reveal animations within each section
      sections.forEach((section, i) => {
        const inner = section.querySelector<HTMLElement>('.flow-art-container');
        if (!inner) return;

        // Staggered reveal of child elements
        const children = inner.children;
        if (children.length > 0) {
          const revealTween = gsap.from(children, {
            y: 30,
            opacity: 0,
            stagger: 0.05,
            duration: 1,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              end: 'top 30%',
              scrub: 1,
            },
          });
          if (revealTween.scrollTrigger) triggers.push(revealTween.scrollTrigger);
          tweens.push(revealTween);
        }
      });

      ScrollTrigger.refresh();

      return () => {
        triggers.forEach((t) => t.kill());
        tweens.forEach((t) => t.kill());
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
