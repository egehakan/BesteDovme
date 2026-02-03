'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const WHATSAPP_URL =
  'https://wa.me/905367498154?text=Merhaba%2C%20Bestemiy%20Ink%20%C3%BCzerinden%20randevu%20almak%20istiyorum.';

export default function CTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
    >
      {/* Background atmosphere */}
      <div className="absolute inset-0 bg-[#060606]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(201, 169, 110, 0.04) 0%, transparent 70%)',
        }}
      />

      {/* Top & bottom gradient fades into body bg */}
      <div className="absolute top-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-b from-[#0a0a0a] to-transparent z-[1]" />
      <div className="absolute bottom-0 left-0 right-0 h-24 md:h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent z-[1]" />


      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Small label */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-xs uppercase tracking-[0.4em] text-gold/40 font-sans mb-8"
        >
          Randevu
        </motion.p>

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.8,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="font-display text-3xl sm:text-4xl md:text-5xl text-foreground/90 leading-tight tracking-wide"
        >
          Hayalinizdeki Dövmeyi Birlikte Tasarlayalım
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-6 text-base md:text-lg text-foreground/35 font-sans font-light"
        >
          Ücretsiz danışmanlık için hemen iletişime geçin
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.7,
            delay: 0.45,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mt-10"
        >
          <motion.a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 px-10 py-4 bg-gold text-black text-sm uppercase tracking-[0.25em] font-sans font-medium transition-shadow duration-300 hover:shadow-[0_0_40px_rgba(201,169,110,0.25)]"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Randevu Al
          </motion.a>
        </motion.div>

        {/* Phone number */}
        <motion.a
          href="tel:+905367498154"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="inline-block mt-6 text-sm text-foreground/20 font-sans tracking-wide transition-colors duration-300 hover:text-foreground/40"
        >
          +90 536 749 81 54
        </motion.a>
      </div>
    </section>
  );
}
