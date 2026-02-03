'use client';

import TattooGrid from '@/components/gallery/TattooGrid';

interface Tattoo {
  id: number;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  created_at: string | null;
}

interface GalleryClientProps {
  tattoos: Tattoo[];
}

export default function GalleryClient({ tattoos }: GalleryClientProps) {
  return <TattooGrid tattoos={tattoos} />;
}
