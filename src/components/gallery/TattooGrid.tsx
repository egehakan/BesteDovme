'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import CategoryFilter from './CategoryFilter';
import TattooDetailModal from './TattooDetailModal';

interface Tattoo {
  id: number;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  created_at: string | null;
}

interface TattooGridProps {
  tattoos: Tattoo[];
}

const itemVariants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function TattooGrid({ tattoos }: TattooGridProps) {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [selectedTattoo, setSelectedTattoo] = useState<Tattoo | null>(null);

  const filtered = useMemo(() => {
    if (!activeCategory) return tattoos;
    return tattoos.filter((t) => t.category === activeCategory);
  }, [tattoos, activeCategory]);

  return (
    <>
      {/* Filter */}
      <div className="mb-12 md:mb-16">
        <CategoryFilter
          activeCategory={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((tattoo) => (
              <motion.div
                key={tattoo.id}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                onClick={() => setSelectedTattoo(tattoo)}
                className="group relative aspect-[3/4] bg-[#111] overflow-hidden cursor-pointer"
              >
                <Image
                  src={tattoo.image_url}
                  alt={tattoo.title}
                  fill
                  loading="lazy"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />

                {/* Persistent bottom gradient for readability */}
                <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 md:opacity-60 md:group-hover:opacity-90 transition-opacity duration-500" />

                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500" />

                {/* Content — always visible on mobile, slides up on hover for desktop */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-0 opacity-100 md:translate-y-2 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500">
                  <span className="inline-block px-2.5 py-1 text-[10px] uppercase tracking-[0.2em] text-gold/80 border border-gold/20 mb-2.5">
                    {tattoo.category}
                  </span>
                  <p className="text-sm text-foreground/90 font-display tracking-wide">
                    {tattoo.title}
                  </p>
                  {tattoo.description && (
                    <p className="mt-1.5 text-xs text-foreground/40 font-sans font-light line-clamp-2 leading-relaxed">
                      {tattoo.description}
                    </p>
                  )}
                </div>

                {/* Subtle border on hover */}
                <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/15 transition-colors duration-500" />

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-transparent group-hover:border-gold/15 transition-colors duration-500" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        /* Empty state */
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center justify-center py-24"
        >
          {/* Decorative frame */}
          <div className="relative w-24 h-24 border border-white/[0.04] flex items-center justify-center mb-8">
            <svg
              className="w-10 h-10 text-foreground/8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={0.75}
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
            <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-gold/15" />
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-gold/15" />
          </div>
          <p className="text-sm text-foreground/20 font-display tracking-wide italic">
            {activeCategory
              ? `${activeCategory} kategorisinde henüz çalışma bulunmuyor`
              : 'Yakında...'}
          </p>
          <div className="mt-4 w-12 h-px bg-gradient-to-r from-transparent via-gold/15 to-transparent" />
        </motion.div>
      )}

      {/* Detail Modal */}
      <TattooDetailModal
        tattoo={selectedTattoo}
        onClose={() => setSelectedTattoo(null)}
      />
    </>
  );
}
