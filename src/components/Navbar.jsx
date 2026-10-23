import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sun, Moon, Globe, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navbar() {
  const { lang, toggleLang, theme, toggleTheme, setIsQuoteModalOpen } = useApp();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isAr = lang === 'ar';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: isAr ? 'من نحن' : 'About Us', href: '#about' },
    { label: isAr ? 'المنتجات' : 'Products', href: '#products' },
    { label: isAr ? 'الاستدامة' : 'Sustainability', href: '#sustainability' },
    { label: isAr ? 'المنشأة والعمليات' : 'Facilities & Process', href: '#governed-steps' },
    { label: isAr ? 'الأسواق والتصدير' : 'Markets & Trading', href: '#markets' },
    { label: isAr ? 'الوظائف' : 'Careers', href: '#careers' },
    { label: isAr ? 'اتصل بنا' : 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#07190D]/95 backdrop-blur-md shadow-md border-b border-[#091D0D]/10 dark:border-[#EFF5ED]/10 text-[#091D0D] dark:text-white'
          : 'bg-white/90 dark:bg-[#091D0D] text-[#091D0D] dark:text-white border-b border-[#091D0D]/10 dark:border-[#EFF5ED]/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo with official hexagon icon and wordmark */}
          <a href="#home" className="flex items-center gap-3 group">
            <img
              src="/assets/web/logo-icon-full-144.webp"
              alt="Masader Icon"
              className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
            <img
              src="/assets/web/masader-wordmark-144.webp"
              alt="Masader"
              className="h-7 w-auto object-contain dark:brightness-0 dark:invert transition-all"
            />
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                className="px-3 py-1.5 text-xs font-semibold tracking-wide text-[#091D0D]/80 hover:text-[#7FAF3E] dark:text-[#EFF5ED]/80 dark:hover:text-[#F4AF35] transition-colors rounded-lg hover:bg-black/5 dark:hover:bg-white/5"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Controls: Language, Theme, Quotation CTA */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Language Switcher */}
            <button
              onClick={toggleLang}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-mono font-semibold border border-[#091D0D]/15 dark:border-[#EFF5ED]/20 bg-black/5 dark:bg-white/5 text-[#091D0D] dark:text-[#EFF5ED] hover:border-[#F4AF35] hover:text-[#D9921A] dark:hover:text-[#F4AF35] transition-colors shadow-sm"
              title="Toggle Language"
            >
              <Globe className="w-3.5 h-3.5 text-[#F4AF35]" />
              <span>{isAr ? 'English' : 'عربي'}</span>
            </button>

            {/* Theme Toggle (Dark / Light) */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full border border-[#091D0D]/15 dark:border-[#EFF5ED]/20 bg-black/5 dark:bg-white/5 text-[#091D0D] dark:text-[#EFF5ED] hover:border-[#F4AF35] hover:text-[#D9921A] dark:hover:text-[#F4AF35] transition-colors shadow-sm"
              title={theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-[#F4AF35] animate-spin-slow" />
              ) : (
                <Moon className="w-4 h-4 text-[#091D0D]" />
              )}
            </button>

            {/* CTA Button */}
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-xs uppercase tracking-wider text-[#091D0D] bg-[#F4AF35] hover:bg-[#D9921A] active:scale-95 transition-all shadow-md"
            >
              <span>{isAr ? 'طلب تسعير' : 'Request a Quotation'}</span>
              <ArrowUpRight className="w-3.5 h-3.5 rtl:rotate-90" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={toggleLang}
              className="px-2.5 py-1 rounded-lg border border-[#091D0D]/15 dark:border-[#EFF5ED]/20 text-xs font-mono text-[#091D0D] dark:text-[#EFF5ED]"
            >
              {isAr ? 'EN' : 'عربي'}
            </button>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border border-[#091D0D]/15 dark:border-[#EFF5ED]/20 text-[#091D0D] dark:text-[#EFF5ED]"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-[#F4AF35]" /> : <Moon className="w-4 h-4 text-[#091D0D]" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-[#091D0D] dark:text-[#EFF5ED] hover:bg-black/5 dark:hover:bg-white/10 transition"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-white/98 dark:bg-[#07190D]/98 backdrop-blur-xl border-b border-[#091D0D]/10 dark:border-[#EFF5ED]/10 px-5 pt-3 pb-6 space-y-4">
          <nav className="flex flex-col space-y-1">
            {navLinks.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-[#091D0D]/80 dark:text-[#EFF5ED]/80 hover:text-[#7FAF3E] dark:hover:text-[#F4AF35] hover:bg-black/5 dark:hover:bg-white/5 transition"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setIsQuoteModalOpen(true);
              }}
              className="w-full flex justify-center items-center gap-2 py-3 rounded-xl font-bold text-xs uppercase tracking-wider text-[#091D0D] bg-[#F4AF35] shadow"
            >
              <span>{isAr ? 'طلب عرض أسعار' : 'Request a Quotation'}</span>
              <ArrowUpRight className="w-4 h-4 rtl:rotate-90" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
