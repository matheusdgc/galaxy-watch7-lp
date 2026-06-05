'use client';

import { useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FEATURES = [
  {
    id: 'DSG-01',
    title: 'Design Premium',
    description:
      'Caixa em alumínio Armor com cristal de safira e acabamento que une sofisticação e resistência no seu dia a dia.',
    image: '/image1.png',
    alt: 'Galaxy Watch 7 em ambiente urbano com reflexos na superfície molhada',
    badge: 'Craft & Design',
  },
  {
    id: 'RST-02',
    title: 'Resistência Extrema',
    description:
      'Certificação 5ATM + IP68 e MIL-STD-810H. Projetado para acompanhar você da piscina à trilha sem hesitar.',
    image: '/image2.jpeg',
    alt: 'Galaxy Watch 7 submerso na água entre peixes e corais',
  },
  {
    id: 'GAI-03',
    title: 'Galaxy AI',
    description:
      'Inteligência artificial integrada que aprende seus padrões de saúde, otimiza rotinas e antecipa suas necessidades em tempo real.',
    image: '/image3.png',
    alt: 'Galaxy Watch 7 flutuando no céu entre nuvens',
  },
];

function ParallaxCard({
  children,
  className,
  index,
}: {
  children: React.ReactNode;
  className?: string;
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const img = imgRef.current;
    const glow = glowRef.current;
    if (!card || !img) return;

    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    gsap.to(img, {
      x: x * 24,
      y: y * 24,
      scale: 1.08,
      duration: 0.6,
      ease: 'power2.out',
    });

    if (glow) {
      gsap.to(glow, {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        opacity: 1,
        duration: 0.4,
        ease: 'power2.out',
      });
    }
  }, []);

  const handleMouseLeave = useCallback(() => {
    const img = imgRef.current;
    const glow = glowRef.current;
    if (!img) return;

    gsap.to(img, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    });

    if (glow) {
      gsap.to(glow, { opacity: 0, duration: 0.5, ease: 'power2.out' });
    }
  }, []);

  return (
    <div
      ref={cardRef}
      className={`feature-card group relative overflow-hidden rounded-2xl border cursor-default ${className ?? ''}`}
      style={{
        borderColor: 'var(--border-default)',
        backgroundColor: 'var(--bg-surface)',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-feature-index={index}
    >
      {/* Mouse-follow glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 z-[1]"
        style={{
          background:
            'radial-gradient(circle, rgba(51,210,255,0.08) 0%, transparent 70%)',
        }}
      />

      {/* Parallax image wrapper */}
      <div
        ref={imgRef}
        className="feature-parallax-img absolute inset-0 will-change-transform"
      >
        {children}
      </div>
    </div>
  );
}

export default function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const toggleActions = 'play reverse play reverse';

      // Header animations
      gsap.fromTo(
        '.features-title',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 15%',
            toggleActions,
          },
        }
      );

      gsap.fromTo(
        '.features-description',
        { y: 30, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            end: 'bottom 15%',
            toggleActions,
          },
        }
      );

      // Cards staggered entrance
      gsap.fromTo(
        '.feature-card',
        { y: 60, opacity: 0, filter: 'blur(12px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.features-grid',
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions,
          },
        }
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="tecnologia"
      className="relative py-32 px-15 max-md:px-6 max-md:py-20"
      style={{ backgroundColor: 'var(--bg-base)' }}
    >
      {/* Section header */}
      <div className="max-w-[1440px] mx-auto mb-16 flex justify-between items-start gap-12 max-md:flex-col max-md:gap-6 max-md:mb-10">
        <div>
          <h2
            className="features-title leading-[1.1]"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4vw, 4.5rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}
          >
            Inovação no
            <br />
            seu pulso.
          </h2>
        </div>

        <p
          className="features-description max-w-[400px] text-[15px] leading-relaxed pt-14 max-md:pt-0"
          style={{
            fontFamily: "'Inter', sans-serif",
            color: 'var(--text-secondary)',
          }}
        >
          Tecnologia de ponta unida a um design que impõe respeito. Cada detalhe
          foi pensado para elevar sua experiência.
        </p>
      </div>

      {/* Bento grid */}
      <div className="features-grid max-w-[1440px] mx-auto grid grid-cols-2 gap-4 max-md:grid-cols-1 max-md:gap-3"
        style={{ gridAutoRows: 'minmax(0, 1fr)' }}
      >
        {/* Card 1 — Design Premium (left, tall) */}
        <ParallaxCard
          className="row-span-2 min-h-[clamp(420px,55vh,720px)] max-md:min-h-[400px]"
          index={0}
        >
          <Image
            src={FEATURES[0].image}
            alt={FEATURES[0].alt}
            fill
            className="object-cover"
            quality={80}
            sizes="(max-width: 768px) 100vw, (max-width: 1920px) 50vw, 720px"
          />

          {/* Dark overlay for readability */}
          <div
            className="absolute inset-0 z-[2]"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,11,0.7) 0%, rgba(10,10,11,0.15) 45%, rgba(10,10,11,0.6) 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-[3] h-full flex flex-col justify-between p-8 max-md:p-6">
            <div>
              <span
                className="text-[11px] font-medium tracking-[2px] uppercase block mb-4"
                style={{
                  fontFamily: "'Space Grotesk', monospace",
                  color: 'var(--color-cyan)',
                }}
              >
                {FEATURES[0].id}
              </span>
              <h3
                className="text-[26px] font-bold mb-3 max-md:text-[22px]"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.02em',
                }}
              >
                {FEATURES[0].title}
              </h3>
              <p
                className="text-[14px] leading-relaxed max-w-[280px]"
                style={{
                  fontFamily: "'Inter', sans-serif",
                  color: 'var(--text-secondary)',
                }}
              >
                {FEATURES[0].description}
              </p>
            </div>

            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full self-start text-[11px] font-medium tracking-[1px]"
              style={{
                fontFamily: "'Space Grotesk', monospace",
                backgroundColor: 'rgba(51, 210, 255, 0.1)',
                color: 'var(--color-cyan)',
                border: '1px solid rgba(51, 210, 255, 0.2)',
              }}
            >
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse"
                style={{ backgroundColor: 'var(--color-cyan)' }}
              />
              {FEATURES[0].badge}
            </div>
          </div>
        </ParallaxCard>

        {/* Card 2 — Resistência Extrema (right top) */}
        <ParallaxCard className="min-h-[250px] max-md:min-h-[320px]" index={1}>
          <Image
            src={FEATURES[1].image}
            alt={FEATURES[1].alt}
            fill
            className="object-cover"
            quality={80}
            sizes="(max-width: 768px) 100vw, (max-width: 1920px) 50vw, 720px"
          />

          {/* Dark overlay */}
          <div
            className="absolute inset-0 z-[2]"
            style={{
              background:
                'linear-gradient(180deg, rgba(10,10,11,0.3) 0%, rgba(10,10,11,0.75) 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-[3] h-full flex flex-col justify-end p-8 max-md:p-6">
            <span
              className="text-[11px] font-medium tracking-[2px] uppercase block mb-3"
              style={{
                fontFamily: "'Space Grotesk', monospace",
                color: 'var(--color-cyan)',
              }}
            >
              {FEATURES[1].id}
            </span>
            <h3
              className="text-[22px] font-bold mb-2 max-md:text-[20px]"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              {FEATURES[1].title}
            </h3>
            <p
              className="text-[13px] leading-relaxed max-w-[340px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--text-secondary)',
              }}
            >
              {FEATURES[1].description}
            </p>
          </div>
        </ParallaxCard>

        {/* Card 3 — Galaxy AI (right bottom) */}
        <ParallaxCard className="min-h-[250px] max-md:min-h-[320px]" index={2}>
          <Image
            src={FEATURES[2].image}
            alt={FEATURES[2].alt}
            fill
            className="object-cover"
            quality={80}
            sizes="(max-width: 768px) 100vw, (max-width: 1920px) 50vw, 720px"
          />

          {/* Dark overlay */}
          <div
            className="absolute inset-0 z-[2]"
            style={{
              background:
                'linear-gradient(90deg, rgba(10,10,11,0.8) 0%, rgba(10,10,11,0.2) 60%, rgba(10,10,11,0.4) 100%)',
            }}
          />

          {/* Content */}
          <div className="relative z-[3] h-full flex flex-col justify-end p-8 max-md:p-6">
            <span
              className="text-[11px] font-medium tracking-[2px] uppercase block mb-3"
              style={{
                fontFamily: "'Space Grotesk', monospace",
                color: 'var(--color-cyan)',
              }}
            >
              {FEATURES[2].id}
            </span>
            <h3
              className="text-[22px] font-bold mb-2 max-md:text-[20px]"
              style={{
                fontFamily: "'Outfit', sans-serif",
                color: 'var(--text-primary)',
                letterSpacing: '-0.02em',
              }}
            >
              {FEATURES[2].title}
            </h3>
            <p
              className="text-[13px] leading-relaxed max-w-[340px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--text-secondary)',
              }}
            >
              {FEATURES[2].description}
            </p>
          </div>
        </ParallaxCard>
      </div>
    </section>
  );
}
