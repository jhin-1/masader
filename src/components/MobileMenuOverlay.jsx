import React, { useEffect } from 'react';

export default function MobileMenuOverlay({ isMenuOpen, setIsMenuOpen }) {
  const navItems = [
    { label: 'About Us', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Facilities & Process', href: '#' },
    { label: 'Markets & Trading', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: 'https://masaderbio.com/web/contact/' },
  ];

  // Lock body scroll and ESC key handling when overlay is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
          setIsMenuOpen(false);
        }
      };
      window.addEventListener('keydown', handleKeyDown);
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
      className={`mx-menu-overlay ${isMenuOpen ? 'is-open' : ''}`}
      id="mx-menu-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
      hidden={!isMenuOpen}
    >
      <nav className="mx-menu-overlay__nav" aria-label="Primary">
        <ul id="menu-primary-menu-1" className="mx-menu-overlay__list">
          {navItems.map((item, idx) => (
            <li
              key={idx}
              className={`menu-item menu-item-type-custom menu-item-object-custom menu-item-${idx + 17}`}
            >
              <a
                href={item.href}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* Overlay CTA Button (Section 4 of spec) */}
      <a
        className="mx-header-cta mx-header-cta--overlay"
        href="https://masaderbio.com/web/contact/"
        onClick={() => setIsMenuOpen(false)}
      >
        Request a Quotation
      </a>
    </div>
  );
}
