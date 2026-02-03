'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

interface Tattoo {
  id: number;
  title: string;
  category: string;
  image_url: string;
}

export default function FeaturedWork() {
  const [tattoos, setTattoos] = useState<Tattoo[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '12%']);
  const lineWidth = useTransform(scrollYProgress, [0.1, 0.4], ['0%', '100%']);

  useEffect(() => {
    fetch('/api/tattoos?featured=true')
      .then((res) => res.json())
      .then((data) => {
        setTattoos(Array.isArray(data) ? data.slice(0, 6) : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 50, scale: 0.97 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const count = tattoos.length;
  // Layout: alternating sizes for visual rhythm
  const getCardClass = (index: number) => {
    if (count <= 3) return 'col-span-1';
    const pattern = index % 3;
    if (pattern === 0) return 'sm:col-span-2 sm:row-span-2';
    return 'col-span-1';
  };

  const getAspect = (index: number) => {
    if (count <= 3) return 'aspect-[3/4]';
    const pattern = index % 3;
    if (pattern === 0) return 'aspect-[4/5] sm:aspect-auto sm:h-full';
    return 'aspect-[3/4]';
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >
      {/* Atmospheric background layer */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{ y: bgY }}
      >
        {/* Ink splatter texture via radial gradients */}
        <div
          className="absolute top-1/4 -left-32 w-[600px] h-[600px]"
          style={{ background: 'radial-gradient(circle, rgba(107, 29, 42, 0.05) 0%, transparent 60%)' }}
        />
        <div
          className="absolute bottom-1/3 -right-20 w-[500px] h-[500px]"
          style={{ background: 'radial-gradient(circle, rgba(201, 169, 110, 0.04) 0%, transparent 55%)' }}
        />
      </motion.div>

      {/* Vertical side text — right */}
      <div className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-3 z-10">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
        <span className="font-sans text-[9px] tracking-[0.4em] text-foreground/10 [writing-mode:vertical-lr] uppercase select-none">
          Est. 2024
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/5 to-transparent" />
      </div>

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section header — editorial / magazine style */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14 relative"
        >
          {/* Overline with dot accent */}
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block w-2 h-2 bg-gold/60 rotate-45" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold/40 font-sans">
              Portfolyo
            </span>
          </div>

          {/* Main heading — large, dramatic */}
          <div className="relative">
            <h2 className="font-display text-4xl sm:text-5xl md:text-7xl text-foreground/90 tracking-tight leading-[0.9]">
              Öne Çıkan{' '}
              <span className="relative inline-block">
                <span className="italic text-gold/80">Çalışmalar</span>
                {/* Underline decoration */}
                <motion.span
                  className="absolute -bottom-2 left-0 h-px bg-gradient-to-r from-gold/40 via-gold/20 to-transparent"
                  style={{ width: lineWidth }}
                />
              </span>
            </h2>
          </div>

          {/* Subtitle */}
          <p className="mt-6 text-sm text-foreground/30 font-sans max-w-md leading-relaxed tracking-wide">
            Her çalışma özgün, her çizgi bilinçli.
          </p>
        </motion.div>

        {/* ── Gallery Grid ── */}
        {!loading && tattoos.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-4 auto-rows-auto"
          >
            {tattoos.map((tattoo, i) => (
              <motion.div
                key={tattoo.id}
                variants={fadeUp}
                className={`group relative overflow-hidden bg-charcoal-dark cursor-pointer ${getCardClass(i)} ${getAspect(i)}`}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <Link href="/calismalari" className="absolute inset-0 z-20">
                  <span className="sr-only">{tattoo.title}</span>
                </Link>

                {/* Image */}
                <Image
                  src={tattoo.image_url}
                  alt={tattoo.title}
                  fill
                  className="object-cover transition-all duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110 group-hover:brightness-75"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Dark vignette — always present */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20 pointer-events-none" />

                {/* Diagonal corner accent */}
                <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none">
                  <div className="absolute top-3 right-3 w-5 h-px bg-gold/20 rotate-0 transition-all duration-500 group-hover:w-8 group-hover:bg-gold/50" />
                  <div className="absolute top-3 right-3 w-px h-5 bg-gold/20 transition-all duration-500 group-hover:h-8 group-hover:bg-gold/50" />
                </div>

                {/* Bottom-left corner accent */}
                <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none">
                  <div className="absolute bottom-3 left-3 w-5 h-px bg-gold/20 transition-all duration-500 group-hover:w-8 group-hover:bg-gold/50" />
                  <div className="absolute bottom-3 left-3 w-px h-5 bg-gold/20 transition-all duration-500 group-hover:h-8 group-hover:bg-gold/50" />
                </div>

                {/* Content overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6 z-10">
                  {/* Index number */}
                  <span className="block font-display text-[10px] text-gold/30 tracking-[0.3em] mb-1 transition-colors duration-500 group-hover:text-gold/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Category tag */}
                  <span className="inline-block text-[9px] uppercase tracking-[0.35em] text-foreground/40 font-sans mb-2 transition-all duration-500 group-hover:text-gold/70 group-hover:tracking-[0.5em]">
                    {tattoo.category}
                  </span>

                  {/* Title — slides up on hover */}
                  <p className="text-sm md:text-base text-foreground/70 font-display tracking-wide translate-y-2 opacity-70 md:opacity-0 md:translate-y-6 transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-0 group-hover:opacity-100">
                    {tattoo.title}
                  </p>
                </div>

                {/* Horizontal scan line effect on hover */}
                <motion.div
                  className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent pointer-events-none"
                  initial={{ top: '0%', opacity: 0 }}
                  animate={
                    activeIndex === i
                      ? { top: ['0%', '100%'], opacity: [0, 0.6, 0] }
                      : { top: '0%', opacity: 0 }
                  }
                  transition={{ duration: 1.5, ease: 'linear' }}
                />
              </motion.div>
            ))}
          </motion.div>
        ) : !loading ? (
          /* Empty state — stylized */
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center justify-center py-28 relative"
          >
            {/* Decorative frame */}
            <div className="relative w-32 h-32 mb-8">
              <div className="absolute inset-0 border border-white/[0.04] rotate-45" />
              <div className="absolute inset-3 border border-gold/10 rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  className="w-8 h-8 text-foreground/8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={0.8}
                >
                  <path d="M12 2L12 22M2 12L22 12" />
                  <circle cx="12" cy="12" r="8" />
                </svg>
              </div>
            </div>
            <p className="text-xs text-foreground/15 font-display tracking-[0.4em] uppercase italic">
              Yakında — Isparta
            </p>
          </motion.div>
        ) : null}

        {/* ── Bottom bar — View All CTA ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.7 }}
          className="mt-10 md:mt-14 flex flex-col sm:flex-row items-center justify-between gap-6 pt-8 border-t border-white/[0.04]"
        >
          {/* Left: location marker */}
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 bg-gold/40 rounded-full" />
            <span className="text-[10px] uppercase tracking-[0.4em] text-foreground/20 font-sans">
              Isparta, Türkiye
            </span>
          </div>

          {/* Center/Right: CTA link */}
          <Link
            href="/calismalari"
            className="group inline-flex items-center gap-4"
          >
            <span className="text-xs uppercase tracking-[0.3em] text-foreground/30 font-sans transition-colors duration-500 group-hover:text-gold">
              Tüm Çalışmaları Gör
            </span>
            <span className="relative flex items-center justify-center w-10 h-10 border border-white/[0.06] transition-all duration-500 group-hover:border-gold/30 group-hover:bg-gold/[0.04]">
              <svg
                className="w-4 h-4 text-foreground/30 transition-all duration-500 group-hover:text-gold group-hover:translate-x-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
