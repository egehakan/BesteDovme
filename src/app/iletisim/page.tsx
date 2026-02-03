import type { Metadata } from 'next';
import ContactClient from './ContactClient';

export const metadata: Metadata = {
  title: 'İletişim',
  description:
    'Bestemiy Ink ile iletişime geçin. Randevu almak, dövme fikirinizi paylaşmak veya bilgi almak için beni arayın. Isparta.',
};

export default function IletisimPage() {
  return (
    <main className="relative min-h-screen pt-28 pb-20">
      {/* Background atmosphere */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[#050505]" />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 50% 40% at 30% 30%, rgba(107, 29, 42, 0.07) 0%, transparent 60%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 40% 30% at 70% 60%, rgba(201, 169, 110, 0.03) 0%, transparent 50%)',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Page header */}
        <div className="mb-16 md:mb-24 text-center">
          <p className="text-xs uppercase tracking-[0.4em] text-gold/40 font-sans mb-5">
            Bana Ulaşın
          </p>
          <h1 className="font-display text-4xl sm:text-5xl md:text-6xl text-foreground/90 tracking-wide">
            İletişim
          </h1>
          <div className="mt-6 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
          <p className="mt-6 text-sm md:text-base text-foreground/30 font-sans font-light max-w-lg mx-auto">
            Dövme fikrinizi paylaşın, birlikte hayata geçirelim.
          </p>
        </div>

        {/* Content — studio info + map */}
        <ContactClient />
      </div>
    </main>
  );
}
