'use client';

import { useState, useRef, type FormEvent } from 'react';
import { motion, useInView } from 'framer-motion';

interface FormData {
  name: string;
  email: string;
  tattooIdea: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    tattooIdea: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(formRef, { once: true, margin: '-50px' });

  const validate = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Ad Soyad gereklidir';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'E-posta gereklidir';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Mesajınız gereklidir';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    // Build mailto link with form data
    const subject = encodeURIComponent(
      `Bestemiy Ink - ${formData.name} İletişim Formu`
    );
    const body = encodeURIComponent(
      `Ad Soyad: ${formData.name}\nE-posta: ${formData.email}\n\nDövme Fikri: ${formData.tattooIdea || 'Belirtilmedi'}\n\nMesaj:\n${formData.message}`
    );

    window.open(`mailto:bestemiytattoo@gmail.com?subject=${subject}&body=${body}`);
    setSubmitted(true);
  };

  const handleChange = (
    field: keyof FormData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        {/* Success checkmark */}
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{
            type: 'spring',
            stiffness: 260,
            damping: 20,
            delay: 0.2,
          }}
          className="w-16 h-16 border border-gold/30 flex items-center justify-center mb-6"
        >
          <svg
            className="w-7 h-7 text-gold"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
          >
            <motion.path
              d="M5 13l4 4L19 7"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
          </svg>
        </motion.div>

        <h3 className="font-display text-xl text-foreground/90 tracking-wide mb-3">
          Mesajınız Alındı
        </h3>
        <p className="text-sm text-foreground/40 font-sans font-light max-w-xs">
          En kısa sürede dönüş yapacağız. Teşekkürler.
        </p>

        <div className="mt-6 w-12 h-px bg-gradient-to-r from-transparent via-gold/20 to-transparent" />

        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: '', email: '', tattooIdea: '', message: '' });
          }}
          className="mt-8 text-xs uppercase tracking-[0.2em] text-foreground/30 font-sans transition-colors duration-300 hover:text-gold/60 cursor-pointer"
        >
          Yeni Mesaj Gönder
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={formRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
    >
      <form onSubmit={handleSubmit} className="space-y-6" noValidate>
        {/* Name */}
        <div>
          <label className="block text-[10px] uppercase tracking-[0.25em] text-foreground/35 font-sans mb-2.5">
            Ad Soyad <span className="text-gold/40">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => handleChange('name', e.target.value)}
            className={`w-full bg-transparent border-b ${
              errors.name ? 'border-red-500/50' : 'border-white/[0.08]'
            } px-0 py-3 text-sm text-foreground/80 font-sans font-light placeholder:text-foreground/15 focus:border-gold/40 focus:outline-none transition-colors duration-300`}
            placeholder="Adınız ve soyadınız"
          />
          {errors.name && (
            <p className="mt-2 text-xs text-red-400/70 font-sans">
              {errors.name}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[10px] uppercase tracking-[0.25em] text-foreground/35 font-sans mb-2.5">
            E-posta <span className="text-gold/40">*</span>
          </label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={`w-full bg-transparent border-b ${
              errors.email ? 'border-red-500/50' : 'border-white/[0.08]'
            } px-0 py-3 text-sm text-foreground/80 font-sans font-light placeholder:text-foreground/15 focus:border-gold/40 focus:outline-none transition-colors duration-300`}
            placeholder="ornek@email.com"
          />
          {errors.email && (
            <p className="mt-2 text-xs text-red-400/70 font-sans">
              {errors.email}
            </p>
          )}
        </div>

        {/* Tattoo idea */}
        <div>
          <label className="block text-[10px] uppercase tracking-[0.25em] text-foreground/35 font-sans mb-2.5">
            Dövme Fikriniz
          </label>
          <input
            type="text"
            value={formData.tattooIdea}
            onChange={(e) => handleChange('tattooIdea', e.target.value)}
            className="w-full bg-transparent border-b border-white/[0.08] px-0 py-3 text-sm text-foreground/80 font-sans font-light placeholder:text-foreground/15 focus:border-gold/40 focus:outline-none transition-colors duration-300"
            placeholder="Aklınızdaki tasarım hakkında kısaca"
          />
        </div>

        {/* Message */}
        <div>
          <label className="block text-[10px] uppercase tracking-[0.25em] text-foreground/35 font-sans mb-2.5">
            Mesajınız <span className="text-gold/40">*</span>
          </label>
          <textarea
            value={formData.message}
            onChange={(e) => handleChange('message', e.target.value)}
            rows={4}
            className={`w-full bg-transparent border-b ${
              errors.message ? 'border-red-500/50' : 'border-white/[0.08]'
            } px-0 py-3 text-sm text-foreground/80 font-sans font-light placeholder:text-foreground/15 focus:border-gold/40 focus:outline-none transition-colors duration-300 resize-none`}
            placeholder="Mesajınızı buraya yazabilirsiniz..."
          />
          {errors.message && (
            <p className="mt-2 text-xs text-red-400/70 font-sans">
              {errors.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full mt-8 py-4 bg-gold/10 border border-gold/30 text-gold text-xs uppercase tracking-[0.25em] font-sans transition-all duration-300 hover:bg-gold/15 hover:border-gold/50 hover:shadow-[0_0_30px_rgba(201,169,110,0.1)] cursor-pointer"
        >
          Mesaj Gönder
        </motion.button>
      </form>
    </motion.div>
  );
}
