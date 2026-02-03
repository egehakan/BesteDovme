'use client';

import StudioInfo from '@/components/contact/StudioInfo';

export default function ContactClient() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-16 lg:gap-12">
      {/* Left — Studio Info (2/5) */}
      <div className="lg:col-span-2">
        <StudioInfo />
      </div>

      {/* Right — Map (3/5) */}
      <div className="lg:col-span-3 lg:pl-8 lg:border-l lg:border-white/[0.04]">
        <p className="text-xs uppercase tracking-[0.35em] text-gold/40 font-sans mb-3">
          Konum
        </p>
        <h3 className="font-display text-2xl md:text-3xl text-foreground/80 tracking-wide mb-6">
          Adres
        </h3>

        <div className="relative overflow-hidden border border-white/[0.04]">
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-gold/15 z-10" />
          <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-gold/15 z-10" />
          <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-gold/15 z-10" />
          <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-gold/15 z-10" />

          <iframe
            src="https://maps.google.com/maps?q=37.765860,30.554851&t=&z=17&ie=UTF8&iwloc=&output=embed"
            width="100%"
            height="450"
            style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) brightness(0.7) contrast(1.1)' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bestemiy Ink Konumu"
            className="w-full"
          />
        </div>

        <p className="mt-4 text-sm text-foreground/25 font-sans font-light">
          Kutlubey Mahallesi, Ak Fatma Sevil Sokak No:3 Kat:3 Daire:3, 32100 Burdur Merkez/Isparta
        </p>
      </div>
    </div>
  );
}
