'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  text: string;
}

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px' });

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => {
        setTestimonials(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const stagger = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const },
    },
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((w) => w[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden"
    >

      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 md:mb-14"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="inline-block w-2 h-2 bg-gold/60 rotate-45" />
            <span className="text-[10px] uppercase tracking-[0.5em] text-gold/40 font-sans">
              Deneyimler
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground/90 tracking-tight leading-[0.9]">
            Müşteri{' '}
            <span className="italic text-gold/80">Yorumları</span>
          </h2>
        </motion.div>

        {/* Testimonials */}
        {!loading && testimonials.length > 0 ? (
          <motion.div
            variants={stagger}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-5"
          >
            {testimonials.map((t, i) => (
              <motion.div
                key={t.id}
                variants={fadeUp}
                className="group relative flex flex-col"
              >
                {/* Top row: quote mark + index */}
                <div className="flex items-start justify-between mb-6">
                  <span className="font-display text-4xl text-gold/25 leading-none select-none">
                    &ldquo;
                  </span>
                  <span className="font-display text-[10px] text-foreground/15 tracking-[0.3em]">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Quote */}
                <p className="font-display text-base md:text-lg text-foreground/80 leading-relaxed italic tracking-wide flex-1">
                  {t.text}
                </p>

                {/* Divider */}
                <div className="w-8 h-px bg-gold/20 mt-8 mb-5 group-hover:w-12 group-hover:bg-gold/40 transition-all duration-500" />

                {/* Attribution */}
                <div className="flex items-center gap-3">
                  <div className="relative w-8 h-8 flex items-center justify-center shrink-0">
                    <div className="absolute inset-0 border border-gold/15 rotate-45 group-hover:border-gold/30 transition-colors duration-500" />
                    <span className="font-display text-[9px] text-gold/50 tracking-wider">
                      {getInitials(t.name)}
                    </span>
                  </div>
                  <span className="text-sm text-foreground/60 font-display tracking-wide">
                    {t.name}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : !loading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col items-center justify-center py-20 relative"
          >
            <div className="relative w-24 h-24 mb-6">
              <div className="absolute inset-0 border border-white/[0.04] rotate-45" />
              <div className="absolute inset-3 border border-gold/10 rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-3xl text-foreground/[0.06] select-none">
                  &ldquo;
                </span>
              </div>
            </div>
            <p className="text-xs text-foreground/15 font-display tracking-[0.4em] uppercase italic">
              Yakında — Isparta
            </p>
          </motion.div>
        ) : null}
      </div>
    </section>
  );
}
