'use client';

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

const styles = [
  {
    name: 'Realism',
    turkish: 'Gerçekçi Portre',
    description:
      'Fotoğraf kalitesinde detaylı çalışmalar. Işık, gölge ve doku kullanımıyla canlı ve nefes kesen portreler, doğa sahneleri.',
    accent: 'rgba(201, 169, 110, 0.8)',
    pattern: (
      <svg viewBox="0 0 120 120" className="w-full h-full opacity-[0.04]">
        <circle cx="60" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="60" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="60" cy="50" r="8" fill="currentColor" opacity="0.3" />
        <ellipse cx="60" cy="90" rx="35" ry="15" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </svg>
    ),
  },
  {
    name: 'Line Work',
    turkish: 'Çizgi Sanatı',
    description:
      'Zarif ve hassas çizgi çalışmaları. Botanik desenler, geometrik formlar ve detaylı illustrasyonlar için ideal teknik.',
    accent: 'rgba(201, 169, 110, 0.6)',
    pattern: (
      <svg viewBox="0 0 120 120" className="w-full h-full opacity-[0.04]">
        <path d="M20 100 Q60 10 100 100" fill="none" stroke="currentColor" strokeWidth="0.4" />
        <path d="M30 95 Q60 25 90 95" fill="none" stroke="currentColor" strokeWidth="0.3" />
        <path d="M40 90 Q60 35 80 90" fill="none" stroke="currentColor" strokeWidth="0.2" />
        <path d="M50 85 Q60 50 70 85" fill="none" stroke="currentColor" strokeWidth="0.15" />
      </svg>
    ),
  },
  {
    name: 'Cover Up',
    turkish: 'Kapatma & Yenileme',
    description:
      'Eski dövmelere ikinci şans. Yaratıcı tasarım ve teknik ustalıkla geçmişi geleceğe dönüştürme sanatı.',
    accent: 'rgba(255, 255, 255, 0.9)',
    pattern: (
      <svg viewBox="0 0 120 120" className="w-full h-full opacity-[0.04]">
        <circle cx="45" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="0.3" strokeDasharray="4 4" />
        <circle cx="75" cy="60" r="25" fill="currentColor" opacity="0.3" />
        <circle cx="75" cy="60" r="25" fill="none" stroke="currentColor" strokeWidth="0.4" />
      </svg>
    ),
  },
  {
    name: 'Minimalist',
    turkish: 'Az Çoktur',
    description:
      'Sade çizgiler, negatif alan ve anlam yüklü semboller. Küçük ama güçlü, zamansız tasarımlar.',
    accent: 'rgba(255, 255, 255, 0.7)',
    pattern: (
      <svg viewBox="0 0 120 120" className="w-full h-full opacity-[0.04]">
        <circle cx="60" cy="60" r="3" fill="currentColor" />
        <circle cx="60" cy="60" r="30" fill="none" stroke="currentColor" strokeWidth="0.3" />
      </svg>
    ),
  },
  {
    name: 'Renkli',
    turkish: 'Canlı Renkler',
    description:
      'Cesur renk paletleri ve canlı tonlarla hayat bulan dövmeler. Renklerin gücüyle dikkat çeken, enerjik tasarımlar.',
    accent: 'rgba(201, 169, 110, 0.7)',
    pattern: (
      <svg viewBox="0 0 120 120" className="w-full h-full opacity-[0.04]">
        <circle cx="40" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="0.4" />
        <circle cx="60" cy="70" r="18" fill="none" stroke="currentColor" strokeWidth="0.3" />
        <circle cx="80" cy="50" r="18" fill="none" stroke="currentColor" strokeWidth="0.4" />
      </svg>
    ),
  },
];

export default function StyleApproach() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section ref={sectionRef} className="relative py-28 md:py-40 overflow-hidden">
      {/* Deep background with texture */}
      <div className="absolute inset-0 bg-[#060606]" />

      {/* Ink wash atmospheric effect */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(107, 29, 42, 0.05) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 60% at 80% 20%, rgba(201, 169, 110, 0.03) 0%, transparent 50%)',
        }}
      />

      {/* Top & bottom gradient fades into body bg */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[1]" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Editorial section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 md:mb-28"
        >
          <div className="flex items-center gap-6 mb-8">
            <div className="w-16 md:w-24 h-px bg-gold/30" />
            <p className="text-[10px] md:text-xs uppercase tracking-[0.5em] text-gold/50 font-sans">
              Uzmanlık Alanları
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-7">
              <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-foreground/90 tracking-wide leading-[1.1]">
                Her Tarz,{' '}
                <span className="italic text-gold/70">Bir Hikaye</span>
              </h2>
            </div>
            <div className="md:col-span-5 flex items-end">
              <p className="text-sm md:text-base text-foreground/30 font-sans font-light leading-relaxed max-w-md">
                Her tarzda deneyimli bir dokunuş, tamamen size özel tasarımlar.
                Her dövme başlı başına bir sanat eseri.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Styles — Stacked editorial cards */}
        <div className="space-y-px">
          {styles.map((style, i) => (
            <motion.div
              key={style.name}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              onMouseEnter={() => setActiveIndex(i)}
              onMouseLeave={() => setActiveIndex(null)}
              className="group relative cursor-default"
            >
              {/* Card row */}
              <div
                className="relative flex items-center gap-6 md:gap-10 py-7 md:py-9 px-6 md:px-10 border border-white/[0.03] transition-all duration-700"
                style={{
                  backgroundColor:
                    activeIndex === i ? 'rgba(255,255,255,0.02)' : 'transparent',
                }}
              >
                {/* Background pattern */}
                <div className="absolute right-0 top-0 bottom-0 w-1/3 overflow-hidden pointer-events-none">
                  {style.pattern}
                </div>

                {/* Index number */}
                <div className="hidden md:flex flex-shrink-0 w-12 items-center justify-center">
                  <span
                    className="font-display text-3xl transition-colors duration-500"
                    style={{
                      color:
                        activeIndex === i ? style.accent : 'rgba(255,255,255,0.07)',
                    }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Vertical divider */}
                <div
                  className="hidden md:block w-px self-stretch transition-colors duration-500"
                  style={{
                    backgroundColor:
                      activeIndex === i ? style.accent : 'rgba(255,255,255,0.05)',
                  }}
                />

                {/* Title column */}
                <div className="flex-shrink-0 w-36 md:w-48">
                  <h3 className="font-display text-lg md:text-xl text-foreground/80 tracking-wide transition-colors duration-300 group-hover:text-foreground">
                    {style.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.25em] text-foreground/20 font-sans mt-1 transition-colors duration-300 group-hover:text-gold/40">
                    {style.turkish}
                  </p>
                </div>

                {/* Description — expands on hover */}
                <div className="flex-1 overflow-hidden">
                  <AnimatePresence mode="wait">
                    {activeIndex === i ? (
                      <motion.p
                        key="full"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -8 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="text-sm text-foreground/50 font-sans font-light leading-relaxed"
                      >
                        {style.description}
                      </motion.p>
                    ) : (
                      <motion.p
                        key="short"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-sm text-foreground/45 font-sans font-light truncate"
                      >
                        {style.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>

                {/* Right accent line */}
                <div className="hidden md:block flex-shrink-0">
                  <motion.div
                    className="w-8 h-px origin-left"
                    style={{ backgroundColor: style.accent }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: activeIndex === i ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </div>

                {/* Left accent bar — active indicator */}
                <motion.div
                  className="absolute left-0 top-0 bottom-0 w-[2px]"
                  style={{ backgroundColor: style.accent }}
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: activeIndex === i ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom flourish */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 md:mt-20 flex items-center justify-center gap-4"
        >
          <div className="w-12 h-px bg-gradient-to-r from-transparent to-gold/20" />
          <div className="w-1.5 h-1.5 rotate-45 border border-gold/25" />
          <div className="w-12 h-px bg-gradient-to-l from-transparent to-gold/20" />
        </motion.div>
      </div>
    </section>
  );
}
