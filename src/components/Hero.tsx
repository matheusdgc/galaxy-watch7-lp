'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import Loader from './Loader';

gsap.registerPlugin(ScrollTrigger);

const DPR = typeof window !== 'undefined' ? Math.min(devicePixelRatio, 2) : 1;
const IS_MOBILE = typeof window !== 'undefined' && window.innerWidth <= 768;
const TOTAL_FRAMES = 96;
const LERP = IS_MOBILE ? 0.18 : 0.12;
const COVER_ZOOM = IS_MOBILE ? 1.12 : 1;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const scrollProgressRef = useRef(0);
  const currentFrameRef = useRef(0);
  const rafIdRef = useRef<number>(0);

  const [progress, setProgress] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const sizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth * DPR;
    canvas.height = window.innerHeight * DPR;
    ctxRef.current = canvas.getContext('2d', { alpha: false });

    if (imagesRef.current.length) {
      paintFrame(Math.round(scrollProgressRef.current * (imagesRef.current.length - 1)));
    }
  }, []);

  const paintFrame = useCallback((index: number) => {
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    const images = imagesRef.current;
    if (!canvas || !ctx || !images.length) return;

    const img = images[Math.max(0, Math.min(index, images.length - 1))];
    if (!img.complete || !img.naturalWidth) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const iR = iw / ih;
    const cR = cw / ch;

    let sx: number, sy: number, sw: number, sh: number;
    if (cR > iR) {
      sw = iw; sh = iw / cR; sx = 0; sy = (ih - sh) / 2;
    } else {
      sh = ih; sw = ih * cR; sx = (iw - sw) / 2; sy = 0;
    }

    if (COVER_ZOOM > 1) {
      const zw = sw / COVER_ZOOM;
      const zh = sh / COVER_ZOOM;
      sx += (sw - zw) / 2;
      sy += (sh - zh) / 2;
      sw = zw;
      sh = zh;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Lenis smooth scroll
    const lenis = new Lenis();
    lenis.on('scroll', ScrollTrigger.update);
    const tickerId = gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    sizeCanvas();
    window.addEventListener('resize', sizeCanvas);

    // Preload all frame images
    let loadedCount = 0;
    const images: HTMLImageElement[] = [];

    for (let i = 1; i <= TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/frames/frame_${String(i).padStart(3, '0')}.webp`;
      images.push(img);

      img.onload = () => {
        loadedCount++;
        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));

        // Paint first frame as soon as it loads
        if (i === 1) {
          imagesRef.current = images;
          paintFrame(0);
        }

        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
          initScroll();
          gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
          playEntrance();
        }
      };

      img.onerror = () => {
        // Count errors as loaded to avoid hanging
        loadedCount++;
        setProgress(Math.round((loadedCount / TOTAL_FRAMES) * 100));
        if (loadedCount === TOTAL_FRAMES) {
          imagesRef.current = images;
          setLoaded(true);
          initScroll();
          gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 0.6, ease: 'power2.out' });
          playEntrance();
        }
      };
    }

    // ScrollTrigger + render loop
    const initScroll = () => {
      gsap.to({}, {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: true,
          onUpdate: (self) => {
            scrollProgressRef.current = self.progress;
          },
        },
      });

      const tick = () => {
        rafIdRef.current = requestAnimationFrame(tick);
        const imgs = imagesRef.current;
        const maxIdx = imgs.length - 1;
        if (maxIdx < 0) return;

        const targetFrame = scrollProgressRef.current * maxIdx;
        const delta = targetFrame - currentFrameRef.current;
        if (Math.abs(delta) < 0.05) return;

        currentFrameRef.current += delta * LERP;
        currentFrameRef.current = Math.max(0, Math.min(currentFrameRef.current, maxIdx));
        paintFrame(Math.round(currentFrameRef.current));
      };
      tick();
    };

    const playEntrance = () => {
      const blur = (px: number) => IS_MOBILE ? {} : { filter: `blur(${px}px)` };
      const blurClear = IS_MOBILE ? {} : { filter: 'blur(0px)' };

      const intro = gsap.timeline({ delay: 0.2 });
      intro
        .fromTo('#anim-section',
          { y: 20, opacity: 0, ...blur(8) },
          { y: 0, opacity: 1, ...blurClear, duration: 0.8, ease: 'power3.out' }
        )
        .fromTo(['#anim-line1', '#anim-line2', '#anim-line3'],
          { y: 40, opacity: 0, ...blur(10) },
          { y: 0, opacity: 1, ...blurClear, duration: 0.9, stagger: 0.15, ease: 'power3.out' },
          '-=0.4'
        )
        .fromTo('#anim-subtitle',
          { y: 20, opacity: 0, ...blur(8) },
          { y: 0, opacity: 1, ...blurClear, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        )
        .fromTo('#anim-buttons',
          { y: 30, opacity: 0, ...blur(8) },
          { y: 0, opacity: 1, ...blurClear, duration: 0.8, ease: 'power3.out' },
          '-=0.3'
        );

      // Scroll-driven exit
      const exitTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '12% top',
          end: '45% top',
          scrub: 0.6,
        },
      });

      exitTl
        .to('#anim-section', { y: -25, opacity: 0, ...blur(10), duration: 1, ease: 'none' }, 0)
        .to('#anim-line1', { y: -40, opacity: 0, ...blur(12), duration: 1, ease: 'none' }, 0.05)
        .to('#anim-line2', { y: -40, opacity: 0, ...blur(12), duration: 1, ease: 'none' }, 0.1)
        .to('#anim-line3', { y: -40, opacity: 0, ...blur(12), duration: 1, ease: 'none' }, 0.15)
        .to('#anim-subtitle', { y: -25, opacity: 0, ...blur(10), duration: 1, ease: 'none' }, 0.2)
        .to('#anim-buttons', { y: -30, opacity: 0, ...blur(10), duration: 1, ease: 'none' }, 0.25);
    };

    return () => {
      window.removeEventListener('resize', sizeCanvas);
      cancelAnimationFrame(rafIdRef.current);
      gsap.ticker.remove(tickerId as unknown as gsap.TickerCallback);
      ScrollTrigger.getAll().forEach((t) => t.kill());
      lenis.destroy();
    };
  }, [sizeCanvas, paintFrame]);

  return (
    <>
      <Loader progress={progress} visible={!loaded} />

      <section ref={sectionRef} id="hero" className="relative h-[300vh]">
        <div className="sticky top-0 h-screen overflow-hidden">
          {/* Display canvas — fullscreen, starts transparent */}
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-0" />

          {/* Gradient overlay */}
          <div
            className="absolute inset-0 z-[1]"
            style={{
              background:
                'linear-gradient(90deg, rgba(10,10,11,0.85) 0%, rgba(10,10,11,0.5) 35%, transparent 65%)',
            }}
          />

          {/* Content */}
          <div className="relative z-[2] h-full flex flex-col justify-center px-15 max-w-[750px] max-md:px-6 max-md:justify-end max-md:pb-15 max-md:max-w-full">
            <div className="ambient-glow -top-[100px] -left-[100px]" />

            <div
              id="anim-section"
              className="mb-8 text-xs font-medium tracking-[2px]"
              style={{
                fontFamily: "'Space Grotesk', monospace",
                color: 'var(--text-muted)',
              }}
            >
              01
            </div>

            <h1
              className="leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 6.5rem)' }}
            >
              <span
                id="anim-line1"
                className="block will-change-transform"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.04em',
                }}
              >
                O smartwatch
              </span>
              <span
                id="anim-line2"
                className="block will-change-transform"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 300,
                  WebkitTextStroke: '1.2px var(--text-primary)',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-0.04em',
                }}
              >
                mais inteligente
              </span>
              <span
                id="anim-line3"
                className="block will-change-transform"
                style={{
                  fontFamily: "'Outfit', sans-serif",
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  letterSpacing: '-0.04em',
                }}
              >
                do mundo.
              </span>
            </h1>

            <p
              id="anim-subtitle"
              className="text-[clamp(0.9rem,1.1vw,1.125rem)] leading-relaxed max-w-[480px] mb-10 will-change-transform max-md:text-sm"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--text-secondary)',
              }}
            >
              Monitoramento avançado de saúde, IA integrada e design premium. Tudo no seu
              pulso com o Galaxy Watch 7.
            </p>

            <div
              id="anim-buttons"
              className="flex gap-4 items-center will-change-transform max-md:flex-col max-md:items-start"
            >
              <a href="#comprar" className="ls-btn">
                <span className="ls-btn-inner">
                  Comprar agora
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
              </a>
              <a href="#specs" className="btn-outline">
                Explorar
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile overlay override */}
      <style jsx>{`
        @media (max-width: 768px) {
          .sticky > div:nth-child(3) {
            background: linear-gradient(
              0deg,
              rgba(10, 10, 11, 0.9) 0%,
              rgba(10, 10, 11, 0.4) 50%,
              transparent 100%
            ) !important;
          }
        }
      `}</style>
    </>
  );
}
