import type { Metadata } from 'next';
import { db } from '@/lib/db';
import { tattoos } from '@/lib/schema';
import { desc } from 'drizzle-orm';
import GalleryClient from './GalleryClient';

export const metadata: Metadata = {
  title: 'Çalışmalar',
  description:
    'Bestemiy Ink dövme portföyü. Realism, line work, cover up, minimalist ve renkli tarzlarda dövme çalışmalarını keşfedin.',
};

export const dynamic = 'force-dynamic';

export default async function CalismalariPage() {
  const allTattoos = await db
    .select()
    .from(tattoos)
    .orderBy(desc(tattoos.created_at));

  return (
    <main className="relative min-h-screen pt-28 pb-20">
      {/* Background atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 40% at 50% 20%, rgba(107, 29, 42, 0.08) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 40% 30% at 80% 70%, rgba(201, 169, 110, 0.03) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Page header */}
        <div className="mb-16 md:mb-24 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold/40 font-sans mb-5">
            Portfolyo
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground/90 tracking-wide">
            Çalışmalar
          </h1>
          <div className="mt-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <p className="mt-6 text-sm md:text-base text-foreground/30 font-sans font-light max-w-lg mx-auto">
            Her dövme bir hikaye anlatır. Farklı stillerdeki çalışmalarımı
            keşfedin.
          </p>
        </div>

        {/* Gallery */}
        <GalleryClient tattoos={allTattoos} />
      </div>
    </main>
  );
}
