'use client';

import { useRef } from 'react';
import { motion } from 'framer-motion';

const categories = [
  { key: null, label: 'Tümü' },
  { key: 'Realism', label: 'Realism' },
  { key: 'Line Work', label: 'Line Work' },
  { key: 'Cover Up', label: 'Cover Up' },
  { key: 'Minimalist', label: 'Minimalist' },
  { key: 'Renkli', label: 'Renkli' },
] as const;

interface CategoryFilterProps {
  activeCategory: string | null;
  onChange: (category: string | null) => void;
}

export default function CategoryFilter({
  activeCategory,
  onChange,
}: CategoryFilterProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div className="relative">
      {/* Fade edges for scroll indication */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#0a0a0a] to-transparent z-10 pointer-events-none md:hidden" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#0a0a0a] to-transparent z-10 pointer-events-none md:hidden" />

      <div
        ref={scrollRef}
        className="flex items-center gap-2 md:gap-3 overflow-x-auto scrollbar-hide px-1 py-1 md:flex-wrap md:justify-center"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {categories.map((cat) => {
          const isActive = activeCategory === cat.key;

          return (
            <button
              key={cat.key ?? 'all'}
              onClick={() => onChange(cat.key)}
              className="relative flex-shrink-0 px-5 py-2.5 text-xs uppercase tracking-[0.2em] font-sans transition-colors duration-300 cursor-pointer outline-none"
            >
              {/* Active pill background — shared layoutId for smooth morph */}
              {isActive && (
                <motion.div
                  layoutId="active-filter-pill"
                  className="absolute inset-0 bg-gold/10 border border-gold/30"
                  style={{ borderRadius: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 380,
                    damping: 30,
                  }}
                />
              )}

              {/* Inactive hover state */}
              {!isActive && (
                <div className="absolute inset-0 border border-white/[0.04] transition-colors duration-300 hover:border-white/10" />
              )}

              <span
                className={`relative z-10 whitespace-nowrap transition-colors duration-300 ${
                  isActive
                    ? 'text-gold'
                    : 'text-foreground/40 hover:text-foreground/70'
                }`}
              >
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
