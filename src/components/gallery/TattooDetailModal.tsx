'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Tattoo {
  id: number;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  created_at: string | null;
}

interface TattooDetailModalProps {
  tattoo: Tattoo | null;
  onClose: () => void;
}

export default function TattooDetailModal({
  tattoo,
  onClose,
}: TattooDetailModalProps) {
  useEffect(() => {
    if (tattoo) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [tattoo]);

  const formattedDate = tattoo?.created_at
    ? new Intl.DateTimeFormat('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      }).format(new Date(tattoo.created_at))
    : null;

  if (typeof window === 'undefined') return null;

  return createPortal(
    <AnimatePresence>
      {tattoo && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-black/85 backdrop-blur-md"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 top-4 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 z-[60] md:max-w-3xl md:w-full md:max-h-[90vh] bg-[#0c0c0c] border border-white/[0.06] overflow-hidden flex flex-col rounded-xl md:rounded-none"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 z-20 w-10 h-10 flex items-center justify-center bg-black/60 backdrop-blur-sm border border-white/10 transition-all duration-300 hover:border-gold/30 hover:bg-black/80 cursor-pointer"
              aria-label="Kapat"
            >
              <svg
                className="w-4 h-4 text-foreground/60"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <div className="flex-1 overflow-y-auto">
              {/* Image */}
              <div className="relative w-full aspect-[4/5] md:aspect-[3/4] max-h-[60vh] bg-[#111]">
                <Image
                  src={tattoo.image_url}
                  alt={tattoo.title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 768px"
                  priority
                />

                {/* Bottom gradient for image-to-content transition */}
                <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#0c0c0c] to-transparent" />
              </div>

              {/* Content */}
              <div className="relative px-6 pb-8 md:px-8 -mt-4">
                {/* Category badge */}
                <span className="inline-block px-3 py-1.5 text-[10px] uppercase tracking-[0.25em] text-gold/70 border border-gold/20 mb-4">
                  {tattoo.category}
                </span>

                {/* Title */}
                <h2 className="font-display text-2xl md:text-3xl text-foreground/90 tracking-wide mb-3">
                  {tattoo.title}
                </h2>

                {/* Decorative line */}
                <div className="w-10 h-px bg-gradient-to-r from-gold/30 to-transparent mb-5" />

                {/* Description */}
                {tattoo.description && (
                  <p className="text-sm md:text-base text-foreground/40 font-sans font-light leading-relaxed mb-6">
                    {tattoo.description}
                  </p>
                )}

                {/* Date */}
                {formattedDate && (
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-px bg-white/10" />
                    <time className="text-xs text-foreground/20 font-sans tracking-wide">
                      {formattedDate}
                    </time>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
}
