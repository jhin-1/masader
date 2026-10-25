import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function MobileMenuOverlay({ isMenuOpen, setIsMenuOpen }) {
  const overlayRef = useRef(null);
  const listRef = useRef(null);
  const ctaRef = useRef(null);

  const navItems = [
    { label: 'About Us', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Facilities & Process', href: '#' },
    { label: 'Markets & Trading', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: 'https://masaderbio.com/web/contact/' },
  ];

  // Lock body scroll and handle ESC key
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);

      // Staggered GSAP reveal animation
      if (listRef.current) {
        const items = listRef.current.querySelectorAll('li');
        gsap.fromTo(
          items,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            stagger: 0.05,
            ease: 'power3.out',
            delay: 0.1,
          }
        );
      }

      if (ctaRef.current) {
        gsap.fromTo(
          ctaRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            delay: 0.48,
            ease: 'power3.out',
          }
        );
      }

      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <div
      ref={overlayRef}
      className={`mx-menu-overlay ${isMenuOpen ? 'is-open' : ''}`}
      id="mx-menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      hidden={!isMenuOpen}
    >
      <div className="mx-menu-overlay__backdrop" aria-hidden="true" onClick={() => setIsMenuOpen(false)} />
      
      <div className="mx-menu-overlay__content">
        <nav className="mx-menu-overlay__nav" aria-label="Primary">
          <ul id="menu-primary-menu-1" className="mx-menu-overlay__list" ref={listRef}>
            {navItems.map((item, idx) => (
              <li
                key={idx}
                className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-${idx + 17}`}
              >
                <a
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  <span className="mx-menu-overlay__num" aria-hidden="true">0{idx + 1}</span>
                  <span className="mx-menu-overlay__label">{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Overlay CTA Button (Section 4 of CONTENT_SPEC.md) */}
        <div className="mx-menu-overlay__footer" ref={ctaRef}>
          <a
            className="mx-header-cta mx-header-cta--overlay"
            href="https://masaderbio.com/web/contact/"
            onClick={() => setIsMenuOpen(false)}
          >
            <span className="mx-header-cta__text">Request a Quotation</span>
            <span className="mx-header-cta__shimmer" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
