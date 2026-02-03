'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/calismalari', label: 'Çalışmalar' },
  { href: '/iletisim', label: 'İletişim' },
];

const WHATSAPP_URL =
  'https://wa.me/905367498154?text=Merhaba%2C%20Bestemiy%20Ink%20%C3%BCzerinden%20randevu%20almak%20istiyorum.';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-black/85 backdrop-blur-xl border-b border-gold/10 shadow-[0_4px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent'
        }`}
      >
        <div className="mx-auto max-w-7xl flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <Link href="/" className="relative group">
            <Image
              src="/assets/logo.png"
              alt="Bestemiy Ink Logosu"
              width={64}
              height={64}
              className="w-14 h-14 object-contain transition-transform duration-300 group-hover:scale-110"
              priority
            />
            <div
              className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: 'radial-gradient(circle, rgba(201, 169, 110, 0.08) 0%, transparent 70%)' }}
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative py-2"
              >
                <span className="text-xs uppercase tracking-[0.25em] font-sans font-light text-foreground/70 transition-colors duration-300 group-hover:text-gold">
                  {link.label}
                </span>
                <motion.span
                  className="absolute bottom-0 left-0 h-px bg-gold"
                  initial={{ width: 0 }}
                  whileHover={{ width: '100%' }}
                  transition={{ duration: 0.3, ease: 'easeOut' }}
                />
                <span className="absolute bottom-0 left-0 w-0 h-px bg-gold transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 border border-gold/40 text-gold text-xs uppercase tracking-[0.2em] font-sans transition-all duration-300 hover:bg-gold/10 hover:border-gold/70 hover:shadow-[0_0_20px_rgba(201,169,110,0.15)]"
          >
            Randevu Al
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden relative w-8 h-8 flex items-center justify-center z-60"
            aria-label={menuOpen ? 'Menüyü kapat' : 'Menüyü aç'}
          >
            <div className="relative w-6 h-4">
              <span
                className={`absolute left-0 w-full h-px bg-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? 'top-1/2 rotate-45' : 'top-0 rotate-0'
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 w-full h-px bg-foreground transition-all duration-200 ${
                  menuOpen ? 'opacity-0 scale-x-0' : 'opacity-100 scale-x-100'
                }`}
              />
              <span
                className={`absolute left-0 w-full h-px bg-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  menuOpen ? 'top-1/2 -rotate-45' : 'top-full rotate-0'
                }`}
              />
            </div>
          </button>
        </div>
      </motion.nav>

      {/* Mobile Full-screen Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-2xl flex flex-col items-center justify-center"
          >
            {/* Decorative background elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div
                className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px]"
                style={{ background: 'radial-gradient(circle, rgba(107, 29, 42, 0.06) 0%, transparent 60%)' }}
              />
              <div
                className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px]"
                style={{ background: 'radial-gradient(circle, rgba(201, 169, 110, 0.04) 0%, transparent 55%)' }}
              />
            </div>

            <nav className="relative flex flex-col items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{
                    duration: 0.4,
                    delay: i * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className="text-2xl font-display tracking-wide text-foreground/80 transition-colors duration-300 hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  duration: 0.4,
                  delay: navLinks.length * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="mt-4"
              >
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex items-center gap-2 px-8 py-3 border border-gold/50 text-gold text-sm uppercase tracking-[0.2em] font-sans transition-all duration-300 hover:bg-gold/10"
                >
                  Randevu Al
                </a>
              </motion.div>
            </nav>

            {/* Bottom decorative line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
