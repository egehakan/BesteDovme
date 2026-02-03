import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import "./globals.css";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://bestemiyink.com"
  ),
  title: {
    default: "Bestemiy Ink — Dövme Sanatı",
    template: "%s | Bestemiy Ink",
  },
  description:
    "Bestemiy Ink — Profesyonel dövme sanatçısı Beste Bozkurt ile cildinize sanat katın. Isparta merkezli dövme artisti.",
  manifest: "/site.webmanifest",
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Bestemiy Ink",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bestemiy Ink — Dövme Sanatı",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@bestemiy",
    images: [
      {
        url: "/twitter-image.png",
        width: 1200,
        height: 600,
        alt: "Bestemiy Ink — Dövme Sanatı",
      },
    ],
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/favicon-32x32.png",
      },
    ],
  },
  other: {
    "msapplication-TileColor": "#0f0f0f",
    "msapplication-config": "/browserconfig.xml",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${playfairDisplay.variable} ${inter.variable}`}>
      <body className="font-sans bg-background text-foreground antialiased">
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
