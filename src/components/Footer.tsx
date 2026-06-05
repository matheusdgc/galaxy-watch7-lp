'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const toggleActions = 'play reverse play reverse';

    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.cta-title',
        { y: 40, opacity: 0, filter: 'blur(10px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-block',
            start: 'top 80%',
            end: 'bottom 15%',
            toggleActions,
          },
        }
      );

      gsap.fromTo(
        '.cta-description',
        { y: 30, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-block',
            start: 'top 75%',
            end: 'bottom 15%',
            toggleActions,
          },
        }
      );

      gsap.fromTo(
        '.cta-buttons',
        { y: 30, opacity: 0, filter: 'blur(8px)' },
        {
          y: 0,
          opacity: 1,
          filter: 'blur(0px)',
          duration: 0.8,
          delay: 0.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-block',
            start: 'top 75%',
            end: 'bottom 15%',
            toggleActions,
          },
        }
      );

      gsap.fromTo(
        '.cta-image',
        { y: 60, opacity: 0, scale: 1.02 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.cta-image',
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
    <section ref={sectionRef}>
      {/* CTA Block */}
      <div
        className="cta-block py-32 px-15 max-md:py-20 max-md:px-6"
        style={{ backgroundColor: 'var(--bg-base)' }}
      >
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-16 max-md:flex-col max-md:gap-10">
          <div>
            <h2
              className="cta-title leading-[1.1] mb-6"
              style={{
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 700,
                fontSize: 'clamp(2.2rem, 4vw, 4.5rem)',
                letterSpacing: '-0.03em',
                color: 'var(--text-primary)',
              }}
            >
              Comece a usar{' '}
              <span style={{ color: 'var(--color-accent)' }}>agora</span>
            </h2>
            <p
              className="cta-description max-w-[440px] text-[15px] leading-relaxed"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--text-secondary)',
              }}
            >
              Experimente o Galaxy Watch 7 e descubra como a tecnologia pode
              transformar sua rotina de saúde e produtividade.
            </p>
          </div>

          <div className="cta-buttons flex gap-4 items-center max-md:w-full max-md:flex-col max-md:items-start">
            <a href="#comprar" className="ls-btn">
              <span className="ls-btn-inner">
                Comprar agora
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7" />
                  <polyline points="7 7 17 7 17 17" />
                </svg>
              </span>
            </a>
            <a href="#specs" className="btn-outline">
              Especificações
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ marginLeft: 6 }}
              >
                <line x1="7" y1="17" x2="17" y2="7" />
                <polyline points="7 7 17 7 17 17" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Full-width image band */}
      <div className="cta-image w-full overflow-hidden relative" style={{ height: 'clamp(200px, 30vh, 500px)' }}>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url(/banner.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, var(--bg-base) 0%, transparent 30%, transparent 70%, var(--bg-alt) 100%)',
          }}
        />
      </div>

      {/* Footer */}
      <footer
        className="px-15 max-md:px-6 pt-12 pb-6"
        style={{ backgroundColor: 'var(--bg-alt)' }}
      >
        <div className="max-w-[1440px] mx-auto">
          {/* Main footer row */}
          <div className="flex items-center justify-between pb-10 border-b max-md:flex-col max-md:gap-8"
            style={{ borderColor: 'var(--border-default)' }}
          >
            {/* Logo */}
            <a
              href="#"
              className="text-lg font-bold tracking-tight no-underline"
              style={{
                fontFamily: "'Outfit', sans-serif",
                letterSpacing: '-0.02em',
                color: 'var(--text-primary)',
              }}
            >
              GALAXY WATCH 7
            </a>

            {/* Nav links */}
            <ul className="flex items-center gap-8 list-none max-md:gap-6">
              {['Design', 'Tecnologia', 'Specs', 'Suporte'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    className="text-[11px] font-medium tracking-[2px] uppercase no-underline transition-colors duration-300"
                    style={{
                      fontFamily: "'Space Grotesk', monospace",
                      color: 'var(--text-secondary)',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = 'var(--color-cyan)')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = 'var(--text-secondary)')
                    }
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>

            {/* Social icon */}
            <a
              href="#"
              className="w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300"
              style={{ borderColor: 'var(--border-default)' }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'var(--color-cyan)';
                e.currentTarget.style.backgroundColor = 'var(--color-cyan-soft)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'var(--border-default)';
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
              aria-label="X (Twitter)"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ color: 'var(--text-primary)' }}
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
          </div>

          {/* Copyright row */}
          <div className="flex items-center justify-between pt-6 pb-2 max-md:flex-col max-md:gap-4 max-md:text-center">
            <span
              className="text-[12px]"
              style={{
                fontFamily: "'Inter', sans-serif",
                color: 'var(--text-muted)',
              }}
            >
              Copyright &copy; 2026 Samsung Electronics
            </span>

            <div className="flex items-center gap-6">
              {['Termos de Uso', 'Política de Privacidade'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="text-[12px] no-underline transition-colors duration-300"
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    color: 'var(--text-muted)',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--text-secondary)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--text-muted)')
                  }
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </section>
  );
}
