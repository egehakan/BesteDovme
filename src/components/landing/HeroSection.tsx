'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';

const WHATSAPP_URL =
  'https://wa.me/905367498154?text=Merhaba%2C%20Bestemiy%20Ink%20%C3%BCzerinden%20randevu%20almak%20istiyorum.';

export default function HeroSection() {
  const [tagline, setTagline] = useState('');
  const heroRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentY = useTransform(scrollYProgress, [0, 0.5], ['0%', '8%']);
  const parallaxSlow = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);
  const parallaxFast = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.hero_tagline) setTagline(data.hero_tagline);
      })
      .catch(() => {});
  }, []);

  const displayTagline = tagline || 'Cildinize Sanat, Ruhunuza Dokunuş';

  return (
    <section ref={heroRef} className="relative h-screen w-full overflow-hidden">
      {/* === BACKGROUND LAYERS === */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <div className="absolute inset-0 bg-[#030303]" />

        {/* Ink-bleed atmospheric washes — single composited layer */}
        <div
          className="absolute inset-0"
          style={{
            background: [
              'radial-gradient(ellipse 90% 70% at 30% 60%, rgba(107, 29, 42, 0.12) 0%, transparent 60%)',
              'radial-gradient(ellipse 50% 50% at 75% 25%, rgba(201, 169, 110, 0.06) 0%, transparent 55%)',
              'radial-gradient(ellipse 40% 60% at 60% 80%, rgba(107, 29, 42, 0.06) 0%, transparent 50%)',
            ].join(', '),
          }}
        />

        {/* Vignette — heavier on edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 40% 50%, transparent 30%, rgba(0,0,0,0.7) 100%)',
          }}
        />
      </motion.div>

      {/* Bottom fade into body bg */}
      <div className="absolute bottom-0 left-0 right-0 h-32 md:h-48 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[1]" />

      {/* === DECORATIVE LINES — tattoo needle precision feel === */}
      {/* Horizontal hairlines */}
      <div className="absolute top-[12%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.025] to-transparent" />
      <div className="absolute top-[88%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/[0.04] to-transparent" />

      {/* Vertical side accents */}
      <motion.div
        className="absolute left-[6%] md:left-[8%] top-[15%] bottom-[15%] w-px"
        style={{ y: parallaxSlow }}
      >
        <div className="h-full bg-gradient-to-b from-transparent via-gold/[0.08] to-transparent" />
      </motion.div>
      <motion.div
        className="absolute right-[6%] md:right-[8%] top-[20%] bottom-[20%] w-px"
        style={{ y: parallaxFast }}
      >
        <div className="h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
      </motion.div>

      {/* === MAIN CONTENT === */}
      <motion.div
        className="relative z-10 h-full flex items-center"
        style={{ opacity: contentOpacity, y: contentY }}
      >
        <div className="mx-auto max-w-7xl w-full px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 items-center">
            {/* LEFT — Typography block */}
            <div className="md:col-span-7 lg:col-span-7">
              {/* Isparta location tag */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="flex items-center gap-4 mb-8 md:mb-10"
              >
                <div className="w-10 md:w-14 h-px bg-gold/40" />
                <span className="text-xs md:text-sm uppercase tracking-[0.5em] text-gold/50 font-sans">
                  Isparta, Türkiye
                </span>
              </motion.div>

              {/* Main title — large, asymmetric */}
              <div className="space-y-1 md:space-y-2">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide text-foreground/90 leading-[1.2]">
                    Bestemiy
                  </h1>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden flex items-baseline gap-4 md:gap-6"
                >
                  <span className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wide italic text-gold/80 leading-[1.2]">
                    Ink
                  </span>
                  <span className="hidden sm:inline-block w-16 md:w-24 h-px bg-gradient-to-r from-gold/30 to-transparent translate-y-[-4px]" />
                </motion.div>
              </div>

              {/* Tagline */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
                className="mt-8 md:mt-10 text-base md:text-lg text-foreground/35 font-sans font-light leading-relaxed max-w-md"
              >
                {displayTagline}
              </motion.p>

              {/* CTA row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 1.15, ease: [0.22, 1, 0.36, 1] }}
                className="mt-10 md:mt-12 flex items-center gap-6"
              >
                <motion.a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group inline-flex items-center gap-3 px-8 py-3.5 border border-gold/40 text-gold text-xs uppercase tracking-[0.3em] font-sans transition-all duration-500 hover:bg-gold/10 hover:border-gold/60 hover:shadow-[0_0_30px_rgba(201,169,110,0.1)]"
                >
                  Randevu Al
                  <svg
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={1.5}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
                  </svg>
                </motion.a>

                <a
                  href="#hakkimda"
                  className="text-xs uppercase tracking-[0.25em] text-foreground/25 font-sans transition-colors duration-300 hover:text-foreground/50"
                >
                  Keşfet
                </a>
              </motion.div>
            </div>

            {/* RIGHT — Logo + decorative composition */}
            <div className="hidden md:flex md:col-span-5 lg:col-span-5 justify-center items-center relative">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Outer decorative ring */}
                <div className="absolute -inset-12 lg:-inset-16">
                  <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_60s_linear_infinite]">
                    <circle
                      cx="100"
                      cy="100"
                      r="95"
                      fill="none"
                      stroke="rgba(201, 169, 110, 0.08)"
                      strokeWidth="0.5"
                      strokeDasharray="4 8"
                    />
                  </svg>
                </div>

                {/* Inner ring */}
                <div className="absolute -inset-6 lg:-inset-8">
                  <svg viewBox="0 0 200 200" className="w-full h-full animate-[spin_45s_linear_infinite_reverse]">
                    <circle
                      cx="100"
                      cy="100"
                      r="95"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.03)"
                      strokeWidth="0.5"
                      strokeDasharray="2 12"
                    />
                  </svg>
                </div>

                {/* Logo */}
                <Image
                  src="/assets/logo.png"
                  alt="Bestemiy Ink Logosu"
                  width={280}
                  height={280}
                  className="w-44 h-44 lg:w-56 lg:h-56 object-contain relative z-10"
                  priority
                />

                {/* Glow behind logo — radial gradients instead of blur filter to avoid pixelation */}
                <div
                  className="absolute inset-0 scale-[2.5] pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(107, 29, 42, 0.12) 0%, transparent 60%)',
                  }}
                />
                <div
                  className="absolute inset-0 scale-[1.8] pointer-events-none"
                  style={{
                    background: 'radial-gradient(circle, rgba(201, 169, 110, 0.06) 0%, transparent 55%)',
                  }}
                />

                {/* Corner marks — tattoo stencil feel */}
                <div className="absolute -top-4 -left-4 w-6 h-6 border-t border-l border-gold/15" />
                <div className="absolute -top-4 -right-4 w-6 h-6 border-t border-r border-gold/15" />
                <div className="absolute -bottom-4 -left-4 w-6 h-6 border-b border-l border-gold/15" />
                <div className="absolute -bottom-4 -right-4 w-6 h-6 border-b border-r border-gold/15" />
              </motion.div>

              {/* Vertical text — side detail */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
                className="absolute -right-2 lg:right-0 top-1/2 -translate-y-1/2"
              >
                <span
                  className="text-[9px] uppercase tracking-[0.6em] text-foreground/10 font-sans"
                  style={{ writingMode: 'vertical-rl' }}
                >
                  Dövme Sanatı
                </span>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* === BOTTOM BAR === */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.8 }}
        className="absolute bottom-0 left-0 right-0 z-10"
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 pb-8 flex items-end justify-between">
          {/* Left — small brand mark */}
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 rotate-45 border border-gold/25" />
            <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/15 font-sans">
              Est. 2020
            </span>
          </div>

          {/* Center — scroll indicator */}
          <div className="absolute left-1/2 -translate-x-1/2 bottom-8 flex flex-col items-center gap-2">
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <div className="w-px h-8 bg-gradient-to-b from-gold/30 to-transparent" />
            </motion.div>
          </div>

          {/* Right — Isparta */}
          <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/15 font-sans">
            37°46&apos;N 30°33&apos;E
          </span>
        </div>
      </motion.div>

    </section>
  );
}
