import React from 'react';
import { useApp } from '../context/AppContext';
import { Clock, MapPin, Phone, Facebook, Instagram, Linkedin } from 'lucide-react';

export default function TopBar() {
  const { t, setIsQuoteModalOpen } = useApp();

  return (
    <div className="bg-[#eef3eb] dark:bg-[#06120b] border-b border-brand-200/50 dark:border-forest-700/50 text-xs text-brand-900/80 dark:text-emerald-200/70 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-3">
        {/* Left Side: Hours & Location */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-brand-500/20 text-brand-700 dark:text-brand-400">
              <Clock className="w-3.5 h-3.5" />
            </span>
            <span className="font-medium">{t.topBar.hours}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded-full bg-brand-500/20 text-brand-700 dark:text-brand-400">
              <MapPin className="w-3.5 h-3.5" />
            </span>
            <span className="font-medium">{t.topBar.location}</span>
          </div>
        </div>

        {/* Right Side: Phone, Social & Quick Quote */}
        <div className="flex items-center gap-4 sm:gap-6 ms-auto">
          <a
            href="tel:+20347011465"
            dir="ltr"
            className="hidden sm:flex items-center gap-1.5 font-semibold text-brand-700 dark:text-brand-400 hover:text-brand-600 transition"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{t.topBar.phone}</span>
          </a>

          <div className="flex items-center gap-2.5 text-brand-700 dark:text-emerald-300">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Facebook"
              className="hover:text-gold-600 dark:hover:text-gold-400 transition"
            >
              <Facebook className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hover:text-gold-600 dark:hover:text-gold-400 transition"
            >
              <Instagram className="w-3.5 h-3.5" />
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="hover:text-gold-600 dark:hover:text-gold-400 transition"
            >
              <Linkedin className="w-3.5 h-3.5" />
            </a>
          </div>

          <button
            onClick={() => setIsQuoteModalOpen(true)}
            className="sm:hidden px-2.5 py-1 rounded bg-gold-600 hover:bg-gold-500 text-white font-medium text-[11px] transition"
          >
            {t.topBar.getQuote}
          </button>
        </div>
      </div>
    </div>
  );
}
