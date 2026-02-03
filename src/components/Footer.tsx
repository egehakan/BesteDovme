import Link from 'next/link';
import Image from 'next/image';

const quickLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/calismalari', label: 'Çalışmalar' },
  { href: '/iletisim', label: 'İletişim' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#080808] border-t border-white/5">
      {/* Top decorative gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

      <div className="mx-auto max-w-7xl px-6 pt-16 pb-8">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand column */}
          <div className="md:col-span-4 flex flex-col items-start">
            <Image
              src="/assets/logo.png"
              alt="Bestemiy Ink Logosu"
              width={80}
              height={80}
              className="w-20 h-20 object-contain mb-4"
            />
            <p className="font-display text-xl tracking-wide text-foreground/80">
              Bestemiy Ink
            </p>
            <p className="mt-3 text-sm text-foreground/40 leading-relaxed max-w-xs">
              Cildinize sanat, ruhunuza dokunuş. Her dövme bir hikaye anlatır.
            </p>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/bestemiy"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-foreground/40 transition-colors duration-300 hover:text-gold group"
            >
              <svg
                className="w-5 h-5 transition-transform duration-300 group-hover:scale-110"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="5" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
              </svg>
              <span className="text-xs uppercase tracking-[0.2em]">Instagram</span>
            </a>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3 md:col-start-6">
            <h3 className="text-xs uppercase tracking-[0.3em] text-gold/60 mb-6 font-sans">
              Sayfalar
            </h3>
            <nav className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-foreground/50 transition-colors duration-300 hover:text-foreground/90 w-fit"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-3 md:col-start-10">
            <h3 className="text-xs uppercase tracking-[0.3em] text-gold/60 mb-6 font-sans">
              İletişim
            </h3>
            <div className="flex flex-col gap-3 text-sm text-foreground/50">
              <a
                href="tel:+905367498154"
                className="transition-colors duration-300 hover:text-foreground/90 w-fit"
              >
                +90 536 749 81 54
              </a>
              <a
                href="mailto:bestemiytattoo@gmail.com"
                className="transition-colors duration-300 hover:text-foreground/90 w-fit"
              >
                bestemiytattoo@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-foreground/25 tracking-wide">
            © {new Date().getFullYear()} Bestemiy Ink — Beste Bozkurt
          </p>
          <p className="text-xs text-foreground/20 tracking-wide">
            Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
