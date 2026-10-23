import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SiteHeader({ isMenuOpen, setIsMenuOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const brandIconRef = useRef(null);
  const dropRef = useRef(null);
  const segRefs = useRef([]);

  const navItems = [
    { label: 'About Us', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Facilities & Process', href: '#' },
    { label: 'Markets & Trading', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: 'https://masaderbio.com/web/contact/' },
  ];

  // Scroll visibility and compact header logic
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > 100 && currentScrollY > lastScrollY.current + 5) {
        setIsHidden(true); // scrolling down
      } else if (currentScrollY < lastScrollY.current - 5) {
        setIsHidden(false); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Assemble brand icon animation on mount
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const FROM = {
      1: [-0.45, -0.9],
      2: [0.85, -0.55],
      3: [-1, 0],
      4: [1, 0.05],
      5: [-0.85, 0.55],
      6: [0.45, 0.9],
    };

    const iconEl = brandIconRef.current;
    const dropEl = dropRef.current;
    const segs = segRefs.current.filter(Boolean);

    if (!iconEl || !dropEl || segs.length < 6) return;

    const unit = iconEl.getBoundingClientRect().height * 0.28 || 14;

    segs.forEach((el, idx) => {
      const v = FROM[idx + 1] || [0, 0];
      gsap.set(el, {
        opacity: 0,
        x: v[0] * unit,
        y: v[1] * unit,
        rotation: (idx % 2 ? 1 : -1) * 8,
        transformOrigin: '50% 50%',
      });
    });

    gsap.set(dropEl, { opacity: 0, scale: 0.5, transformOrigin: '50% 62%' });

    // Assemble timeline after brief delay
    const tl = gsap.timeline({ delay: 0.2 });
    tl.to(
      segs,
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.6,
        ease: 'power3.out',
        stagger: 0.04,
      },
      0
    )
      .to(
        dropEl,
        {
          opacity: 1,
          scale: 1,
          duration: 0.45,
          ease: 'back.out(1.8)',
        },
        0.45
      );

    return () => tl.kill();
  }, []);

  // Interactive hover assembly on logo
  const handleBrandHover = () => {
    const dropEl = dropRef.current;
    if (!dropEl) return;
    gsap.fromTo(
      dropEl,
      { scale: 0.92 },
      { scale: 1, duration: 0.4, ease: 'back.out(2)' }
    );
  };

  return (
    <header
      className={`mx-site-header ${isScrolled ? 'is-scrolled' : ''} ${
        isHidden && !isMenuOpen ? 'is-hidden' : ''
      }`}
      role="banner"
      data-mx-header
    >
      <div className="mx-site-header__inner">
        {/* Brand Link & Logo (Section 3 of spec) */}
        <a
          className="mx-brand group"
          href="https://masaderbio.com/web/"
          rel="home"
          aria-label="Masader مصادر"
          onMouseEnter={handleBrandHover}
        >
          <span className="mx-brand__icon" ref={brandIconRef}>
            {/* 6 Animated Segments */}
            <img
              ref={(el) => (segRefs.current[0] = el)}
              className="mx-brand__layer mx-brand__seg-1"
              src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg1-top-dark-96.webp"
              srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg1-top-dark-96.webp 2x, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg1-top-dark-144.webp 3x"
              width="83"
              height="96"
              alt=""
              decoding="async"
            />
            <img
              ref={(el) => (segRefs.current[1] = el)}
              className="mx-brand__layer mx-brand__seg-2"
              src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg2-top-right-lime-96.webp"
              srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg2-top-right-lime-96.webp 2x, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg2-top-right-lime-144.webp 3x"
              width="83"
              height="96"
              alt=""
              decoding="async"
            />
            <img
              ref={(el) => (segRefs.current[2] = el)}
              className="mx-brand__layer mx-brand__seg-3"
              src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg3-left-dark-96.webp"
              srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg3-left-dark-96.webp 2x, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg3-left-dark-144.webp 3x"
              width="83"
              height="96"
              alt=""
              decoding="async"
            />
            <img
              ref={(el) => (segRefs.current[3] = el)}
              className="mx-brand__layer mx-brand__seg-4"
              src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg4-right-green-96.webp"
              srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg4-right-green-96.webp 2x, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg4-right-green-144.webp 3x"
              width="83"
              height="96"
              alt=""
              decoding="async"
            />
            <img
              ref={(el) => (segRefs.current[4] = el)}
              className="mx-brand__layer mx-brand__seg-5"
              src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg5-bottom-left-96.webp"
              srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg5-bottom-left-96.webp 2x, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg5-bottom-left-144.webp 3x"
              width="83"
              height="96"
              alt=""
              decoding="async"
            />
            <img
              ref={(el) => (segRefs.current[5] = el)}
              className="mx-brand__layer mx-brand__seg-6"
              src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg6-bottom-right-96.webp"
              srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg6-bottom-right-96.webp 2x, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg6-bottom-right-144.webp 3x"
              width="83"
              height="96"
              alt=""
              decoding="async"
            />

            {/* Center Gold Drop */}
            <img
              ref={dropRef}
              className="mx-brand__layer mx-brand__drop"
              src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/drop-gold-96.webp"
              srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/drop-gold-96.webp 2x, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/drop-gold-144.webp 3x"
              width="83"
              height="96"
              alt=""
              decoding="async"
            />
          </span>

          {/* Wordmark */}
          <img
            fetchPriority="high"
            className="mx-brand__word"
            src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/masader-wordmark-96.webp"
            srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/masader-wordmark-96.webp 2x, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/masader-wordmark-144.webp 3x"
            width="170"
            height="96"
            alt=""
            decoding="async"
          />
        </a>

        {/* Primary Navigation Menu (Section 3 of spec: .mx-nav) */}
        <nav className="mx-nav" aria-label="Primary">
          <ul id="menu-primary-menu" className="mx-nav__list">
            {navItems.map((item, idx) => (
              <li key={idx} className={`menu-item menu-item-${idx + 17}`}>
                <a href={item.href}>{item.label}</a>
                <span className="mx-nav__line" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Call-to-Action Button (.mx-header-cta) */}
        <a
          className="mx-header-cta"
          href="https://masaderbio.com/web/contact/"
        >
          Request a Quotation
        </a>

        {/* Mobile Hamburger Button (.mx-burger) */}
        <button
          className="mx-burger"
          type="button"
          aria-expanded={isMenuOpen}
          aria-controls="mx-menu-overlay"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span className="mx-burger__bar" aria-hidden="true"></span>
          <span className="mx-burger__bar" aria-hidden="true"></span>
          <span className="screen-reader-text">Menu</span>
        </button>
      </div>
    </header>
  );
}
