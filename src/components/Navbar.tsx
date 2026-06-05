'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    // Blur on scroll
    const handleScroll = () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Dark text while inside Hero section
    const heroEl = document.getElementById('hero');
    let st: ScrollTrigger | undefined;

    if (heroEl) {
      st = ScrollTrigger.create({
        trigger: heroEl,
        start: 'top top',
        end: 'bottom top',
        onEnter: () => nav.classList.add('nav-hero'),
        onLeave: () => nav.classList.remove('nav-hero'),
        onEnterBack: () => nav.classList.add('nav-hero'),
        onLeaveBack: () => nav.classList.remove('nav-hero'),
      });
      // Set initial state (page loads at top = inside hero)
      nav.classList.add('nav-hero');
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      st?.kill();
    };
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-[1000] flex items-center justify-between px-10 py-5 transition-all duration-400"
      style={{
        transitionTimingFunction: 'var(--easing-smooth)',
      }}
    >
      <a
        href="#"
        className="nav-logo text-lg font-bold tracking-tight no-underline transition-colors duration-500"
        style={{ fontFamily: "'Outfit', sans-serif", letterSpacing: '-0.02em' }}
      >
        GALAXY WATCH 7
      </a>

      <ul className="hidden md:flex items-center gap-8 list-none">
        {['Design', 'Tecnologia', 'Specs'].map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="nav-link text-[11px] font-medium tracking-[2px] uppercase no-underline transition-colors duration-500 hover:text-[var(--color-cyan)]"
              style={{ fontFamily: "'Space Grotesk', monospace" }}
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      <div
        className="nav-cart w-10 h-10 rounded-full border flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-[var(--color-cyan)] hover:bg-[var(--color-cyan-soft)]"
        aria-label="Carrinho"
      >
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
          <line x1="3" y1="6" x2="21" y2="6" />
          <path d="M16 10a4 4 0 01-8 0" />
        </svg>
      </div>

      <style jsx>{`
        /* Default state — light text for dark sections */
        .nav-logo {
          color: var(--text-primary);
        }
        .nav-link {
          color: var(--text-secondary);
        }
        .nav-cart {
          color: var(--text-primary);
          border-color: var(--border-default);
        }

        /* Hero state — dark text */
        nav.nav-hero .nav-logo {
          color: var(--bg-dark);
        }
        nav.nav-hero .nav-link {
          color: var(--text-muted);
        }
        nav.nav-hero .nav-cart {
          color: var(--bg-dark);
          border-color: rgba(0, 0, 0, 0.2);
        }

        /* Scrolled blur backdrop */
        nav.scrolled {
          background-color: rgba(10, 10, 11, 0.8);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--border-default);
        }
        nav.scrolled.nav-hero {
          background-color: rgba(255, 255, 255, 0.15);
          border-bottom: 1px solid rgba(0, 0, 0, 0.08);
        }

        @media (max-width: 768px) {
          nav {
            padding: 16px 20px;
          }
        }
      `}</style>
    </nav>
  );
}
