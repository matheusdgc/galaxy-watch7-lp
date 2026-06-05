'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CircularGallery } from './circular-gallery-2';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_ITEMS = [
  { image: '/image-carroussel1.jpeg', text: 'Watch Face' },
  { image: '/image-carroussel2.jpeg', text: 'Perfil Lateral' },
  { image: '/image-carroussel3.jpeg', text: 'Sensores' },
  { image: '/image-carroussel5.jpeg', text: 'Mostrador' },
  { image: '/image-carroussel6.jpeg', text: 'Pulseira' },
];

export default function Gallery() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const toggleActions = 'play reverse play reverse';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.gallery-title',
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
        '.gallery-description',
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

      gsap.fromTo(
        '.gallery-canvas',
        { y: 80, opacity: 0, filter: 'blur(14px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.gallery-canvas',
            start: 'top 85%',
            end: 'bottom 10%',
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
      id="design"
      className="relative py-32 max-md:py-20"
      style={{ backgroundColor: 'var(--bg-dark)' }}
    >
      {/* Header */}
      <div className="px-15 max-md:px-6 max-w-[1440px] mx-auto mb-12 max-md:mb-8">
        <div className="flex justify-between items-start gap-12 max-md:flex-col max-md:gap-6">
          <h2
            className="gallery-title leading-[1.1]"
            style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: 'clamp(2.2rem, 4vw, 4.5rem)',
              letterSpacing: '-0.03em',
              color: 'var(--text-primary)',
            }}
          >
            Cada ângulo,
            <br />
            uma obra-prima.
          </h2>

          <p
            className="gallery-description max-w-[400px] text-[15px] leading-relaxed pt-4 max-md:pt-0"
            style={{
              fontFamily: "'Inter', sans-serif",
              color: 'var(--text-secondary)',
            }}
          >
            Arraste para explorar cada detalhe do Galaxy Watch 7. Design que
            impressiona de todos os ângulos.
          </p>
        </div>
      </div>

      {/* Gallery */}
      <div className="gallery-canvas w-full" style={{ height: 'clamp(400px, 55vh, 800px)' }}>
        <CircularGallery
          items={GALLERY_ITEMS}
          bend={3}
          borderRadius={0.05}
          scrollSpeed={2}
          scrollEase={0.05}
        />
      </div>
    </section>
  );
}
