'use client';

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

export default function AboutSection() {
  const [aboutText, setAboutText] = useState('');
  const [aboutImage, setAboutImage] = useState('');
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%']);

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => {
        if (data.about_text) setAboutText(data.about_text);
        if (data.about_image) setAboutImage(data.about_image);
      })
      .catch(() => {});
  }, []);

  const displayText =
    aboutText ||
    'Beste Bozkurt, Isparta merkezli profesyonel dövme sanatçısı. Yılların deneyimi ve sanatsal bakış açısıyla, her müşterisinin hikayesini cilde işliyor. Realism, line work, cover up, minimalist ve renkli tarzlarda uzmanlaşmış olan Beste, her dövmeyi benzersiz bir sanat eserine dönüştürüyor.';

  // Split text into first sentence and rest for typographic hierarchy
  const firstPeriod = displayText.indexOf('.');
  const leadSentence = firstPeriod > -1 ? displayText.slice(0, firstPeriod + 1) : displayText;
  const restText = firstPeriod > -1 ? displayText.slice(firstPeriod + 1).trim() : '';

  return (
    <section
      id="hakkimda"
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
              Sanatçı — Isparta
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground/90 tracking-tight leading-[0.9]">
            Hakkımda
          </h2>
        </motion.div>

        {/* Content layout — asymmetric overlap */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-0 items-start">
          {/* Image — spans 5 cols, overlaps into text area */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-5 relative z-10"
          >
            <div className="relative aspect-[3/4] overflow-hidden group">
              {/* Parallax image */}
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                {aboutImage ? (
                  <Image
                    src={aboutImage}
                    alt="Beste Bozkurt — Bestemiy Ink"
                    fill
                    className="object-cover scale-105 transition-transform duration-[1.5s] ease-out group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 42vw"
                  />
                ) : (
                  <div className="absolute inset-0 bg-charcoal-dark flex flex-col items-center justify-center gap-4">
                    <svg
                      className="w-10 h-10 text-foreground/8"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={0.8}
                    >
                      <circle cx="12" cy="8" r="4" />
                      <path d="M20 21a8 8 0 10-16 0" />
                    </svg>
                    <span className="font-display text-sm text-foreground/15 tracking-[0.2em]">
                      Beste Bozkurt
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Bottom gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

              {/* Corner marks */}
              <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold/20 pointer-events-none" />
              <div className="absolute bottom-3 right-3 w-6 h-6 border-b border-r border-gold/20 pointer-events-none" />

              {/* Bottom caption on image */}
              <div className="absolute bottom-0 left-0 right-0 p-4 flex items-end justify-between pointer-events-none">
                <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/30 font-sans">
                  Isparta, TR
                </span>
                <span className="text-[9px] uppercase tracking-[0.4em] text-foreground/20 font-sans">
                  Est. 2024
                </span>
              </div>
            </div>
          </motion.div>

          {/* Text — spans 6 cols, offset 1 col from image, pushed down */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-6 md:col-start-7 md:pt-16 relative"
          >
            {/* Lead sentence — larger, display font */}
            <p className="font-display text-xl md:text-2xl text-foreground/80 leading-relaxed italic tracking-wide mb-6">
              {leadSentence}
            </p>

            {/* Rest of text — body font, lighter */}
            {restText && (
              <p className="text-sm md:text-base text-foreground/45 leading-[1.9] font-sans font-light">
                {restText}
              </p>
            )}

            {/* Signature line */}
            <div className="mt-10 flex items-center gap-4">
              <div className="w-10 h-px bg-gold/25" />
              <span className="font-display text-sm text-gold/50 tracking-wide italic">
                Beste Bozkurt
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
