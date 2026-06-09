"use client";

import React, { useRef, useEffect, useMemo, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Phone, ChevronRight, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ─────────────────── 3D: Liquid Gold Background ─────────────────── */
const LiquidBackground = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    const { clock, mouse } = state;
    if (meshRef.current) {
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uTime.value = clock.getElapsedTime();
      (meshRef.current.material as THREE.ShaderMaterial).uniforms.uMouse.value.lerp(mouse, 0.05);
    }
  });

  return (
    <mesh ref={meshRef} scale={[viewport.width, viewport.height, 1]}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        transparent
        uniforms={uniforms}
        vertexShader={`
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={`
          uniform float uTime;
          uniform vec2 uMouse;
          varying vec2 vUv;

          void main() {
            vec2 uv = vUv;
            float t = uTime * 0.15;
            vec2 m = uMouse * 0.1;

            // Dark base with subtle gold shimmer
            float pattern = smoothstep(0.0, 1.0,
              (sin(uv.x * 8.0 + t + m.x * 12.0) + sin(uv.y * 6.0 - t + m.y * 12.0)) * 0.5 + 0.5
            );

            // Mix near-black with very subtle gold tone
            vec3 darkBase = vec3(0.02, 0.02, 0.02);
            vec3 goldHint = vec3(0.08, 0.06, 0.02);
            vec3 color = mix(darkBase, goldHint, pattern * 0.6);

            gl_FragColor = vec4(color, 1.0);
          }
        `}
      />
    </mesh>
  );
};

/* ─────────────────── 3D: Gold Monolith ─────────────────── */
const Monolith = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.25;
    }
  });
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[13, 1]} />
        <MeshDistortMaterial
          color="#1a1508"
          speed={4}
          distort={0.4}
          roughness={0.05}
          metalness={1.0}
        />
      </mesh>
    </Float>
  );
};

/* ─────────────────── 3D: Gold Particles ─────────────────── */
const GoldParticles = () => {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 120;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 80;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.05) * 0.1;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#D4AF37"
        size={0.3}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

/* ─────────────────── 3D Scene Wrapper ─────────────────── */
const HeroScene = () => (
  <Canvas camera={{ position: [0, 0, 60], fov: 35 }}>
    <ambientLight intensity={0.4} />
    <spotLight position={[50, 50, 50]} intensity={3} color="#D4AF37" />
    <spotLight position={[-30, -30, 40]} intensity={1.5} color="#F1D28A" />
    <LiquidBackground />
    <Monolith />
    <GoldParticles />
  </Canvas>
);

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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        revealRef.current,
        { filter: "blur(30px)", opacity: 0, scale: 1.02 },
        { filter: "blur(0px)", opacity: 1, scale: 1, duration: 2.2, ease: "expo.out" }
      );

      gsap.from(".command-cell", {
        x: 60,
        opacity: 0,
        stagger: 0.1,
        duration: 1.5,
        ease: "power4.out",
        delay: 1,
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
      {/* 3D Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Suspense
          fallback={
            <div className="w-full h-full bg-[#0B0B0B]" />
          }
        >
          <HeroScene />
        </Suspense>
      </div>

      {/* Content overlay */}
      <div
        ref={revealRef}
        className="relative z-10 w-full flex flex-col md:flex-row px-5 sm:px-6 md:px-14 lg:px-20 pt-24 sm:pt-28 md:pt-32 pb-20 md:pb-10 min-h-screen items-center md:items-stretch gap-6 md:gap-10"
      >
        {/* ── Left Column ── */}
        <div className="flex-1 min-w-0 flex flex-col justify-center pb-4 md:pb-8 w-full">
          {/* Main heading */}
          <div className="max-w-4xl pr-0 sm:pr-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-2.5 h-2.5 bg-[#D4AF37] rounded-full">
                <div className="absolute inset-0 bg-[#D4AF37] rounded-full animate-ping opacity-30" />
              </div>
              <span className="font-mono text-[11px] font-bold text-[#D4AF37] tracking-[0.2em] uppercase">
                Агентство премиальной недвижимости
              </span>
            </div>

            <h1 className="text-[clamp(2.2rem,9vw,9rem)] font-black leading-[0.9] tracking-tighter text-white uppercase">
              ПРЕМИАЛЬНАЯ
              <br />
              <span className="text-outline-gold">НЕДВИЖИМОСТЬ</span>
            </h1>
            <p className="mt-8 font-mono text-[11px] text-white/40 uppercase tracking-[0.35em] max-w-sm leading-relaxed">
              Элитные квартиры, дома и коммерческие объекты в Ростове-на-Дону.
              Полное сопровождение сделок от подбора до передачи ключей.
            </p>
          </div>

          {/* CTA Button */}
          <button
            ref={ctaRef}
            className="w-fit flex items-center gap-6 group mt-10"
            onClick={() => onNavigate?.('catalog')}
          >
            <div className="w-14 h-14 rounded-full border border-[#D4AF37]/30 flex items-center justify-center group-hover:bg-[#D4AF37] transition-all duration-500 overflow-hidden">
              <ChevronRight className="w-5 h-5 text-[#D4AF37] group-hover:text-black transition-colors duration-500" />
            </div>
            <span className="font-mono text-[11px] font-bold text-[#D4AF37] uppercase tracking-[0.2em]">
              Подобрать объект
            </span>
          </button>
        </div>

        {/* ── Right Side Deck ── */}
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
              <p className="text-sm font-semibold text-white">+7 (863) 000-00-00</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar: location + scroll hint */}
      <div className="absolute bottom-0 left-0 right-0 z-20 px-5 sm:px-6 md:px-14 lg:px-20 pb-4 sm:pb-6">
        <div className="flex items-center justify-between gap-3">
          <div className="hidden sm:flex items-center gap-2 text-white/30 text-xs font-mono uppercase tracking-wider">
            <MapPin className="w-3 h-3 text-[#D4AF37]" />
            Ростов-на-Дону, ул. Обороны, 49
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
