import type { Metadata } from 'next';
import HeroSection from '@/components/landing/HeroSection';
import AboutSection from '@/components/landing/AboutSection';
import FeaturedWork from '@/components/landing/FeaturedWork';
import StyleApproach from '@/components/landing/StyleApproach';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';

export const metadata: Metadata = {
  title: 'Bestemiy Ink — Profesyonel Dövme Sanatı | Isparta',
  description:
    'Beste Bozkurt tarafından kurulan Bestemiy Ink, Isparta\'da profesyonel dövme sanatı sunmaktadır. Realism, line work, cover up, minimalist ve renkli tarzlarda çalışmalar.',
  keywords: [
    'dövme',
    'tattoo',
    'Isparta',
    'dövme sanatçısı',
    'Bestemiy Ink',
    'Beste Bozkurt',
    'realism',
    'line work',
    'cover up',
    'minimalist',
    'renkli',
  ],
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <FeaturedWork />
      <StyleApproach />
      <TestimonialsSection />
      <CTASection />

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TattooParlor',
            name: 'Bestemiy Ink',
            alternateName: 'Beste Bozkurt Dövme',
            description: 'Isparta\'da profesyonel dövme sanatı',
            telephone: '+905367498154',
            url: 'https://bestemiyink.com',
            image: 'https://bestemiyink.com/assets/logo.png',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Kutlubey Mahallesi Ak Fatma Sevil Sokak No:3 Kat:3 Daire:3',
              addressLocality: 'Isparta',
              postalCode: '32100',
              addressCountry: 'TR',
            },
            founder: {
              '@type': 'Person',
              name: 'Beste Bozkurt',
            },
            sameAs: ['https://instagram.com/bestemiy'],
          }),
        }}
      />
    </>
  );
}
