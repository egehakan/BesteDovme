'use client';

import { useEffect, useState, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Instagram } from 'lucide-react';

interface SiteContent {
  contact_phone?: string;
  contact_email?: string;
  contact_address?: string;
  working_hours?: string;
  instagram_url?: string;
}

const itemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function StudioInfo() {
  const [content, setContent] = useState<SiteContent>({});
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });

  useEffect(() => {
    fetch('/api/content')
      .then((res) => res.json())
      .then((data) => setContent(data))
      .catch(() => {});
  }, []);

  const contactItems = [
    {
      icon: Phone,
      label: 'Telefon',
      value: content.contact_phone || '+90 536 749 81 54',
      href: `tel:${content.contact_phone || '+905367498154'}`,
    },
    {
      icon: Mail,
      label: 'E-posta',
      value: content.contact_email || 'bestemiytattoo@gmail.com',
      href: `mailto:${content.contact_email || 'bestemiytattoo@gmail.com'}`,
    },
    {
      icon: MapPin,
      label: 'Adres',
      value: content.contact_address || 'Kutlubey Mah. Ak Fatma Sevil Sok. No:3, Isparta',
      href: null,
    },
    {
      icon: Clock,
      label: 'Çalışma Saatleri',
      value: content.working_hours || 'Pzt-Cmt: 10:00 - 20:00',
      href: null,
    },
  ];

  return (
    <motion.div
      ref={sectionRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.1 } },
      }}
      className="relative"
    >
      {/* Studio name */}
      <motion.div variants={itemVariants} className="mb-10">
        <p className="text-xs uppercase tracking-[0.35em] text-gold/40 font-sans mb-3">
          Artist
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-foreground/90 tracking-wide">
          Beste Bozkurt
        </h3>
        <p className="text-sm text-foreground/30 font-sans font-light mt-1">
          Bestemiy Ink
        </p>
        <div className="mt-4 w-10 h-px bg-gradient-to-r from-gold/25 to-transparent" />
      </motion.div>

      {/* Contact items */}
      <div className="space-y-6">
        {contactItems.map((item) => (
          <motion.div key={item.label} variants={itemVariants}>
            {item.href ? (
              <a
                href={item.href}
                className="group flex items-start gap-4 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-10 h-10 border border-white/[0.06] flex items-center justify-center transition-colors duration-300 group-hover:border-gold/20">
                  <item.icon className="w-4 h-4 text-foreground/25 transition-colors duration-300 group-hover:text-gold/60" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/25 font-sans mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground/60 font-sans font-light transition-colors duration-300 group-hover:text-gold/80">
                    {item.value}
                  </p>
                </div>
              </a>
            ) : (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-10 h-10 border border-white/[0.06] flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-foreground/25" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-foreground/25 font-sans mb-1">
                    {item.label}
                  </p>
                  <p className="text-sm text-foreground/60 font-sans font-light">
                    {item.value}
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Instagram link */}
      <motion.div variants={itemVariants} className="mt-10 pt-8 border-t border-white/[0.04]">
        <a
          href={content.instagram_url || 'https://instagram.com/bestemiy'}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-3 transition-all duration-300"
        >
          <div className="w-10 h-10 border border-white/[0.06] flex items-center justify-center transition-all duration-300 group-hover:border-gold/30 group-hover:bg-gold/5">
            <Instagram className="w-4 h-4 text-foreground/25 transition-colors duration-300 group-hover:text-gold" />
          </div>
          <div>
            <p className="text-sm text-foreground/50 font-sans transition-colors duration-300 group-hover:text-gold/80">
              Instagram&apos;da Takip Et
            </p>
            <p className="text-[10px] text-foreground/20 font-sans tracking-wide">
              @bestemiy
            </p>
          </div>
          <svg
            className="w-4 h-4 text-foreground/15 transition-all duration-300 group-hover:text-gold/50 group-hover:translate-x-1 ml-auto"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75"
            />
          </svg>
        </a>
      </motion.div>
    </motion.div>
  );
}
