import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function SiteHeader({ isMenuOpen, setIsMenuOpen }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [pillStyle, setPillStyle] = useState({ opacity: 0, left: 0, width: 0 });

  const lastScrollY = useRef(0);
  const brandIconRef = useRef(null);
  const dropRef = useRef(null);
  const segRefs = useRef([]);
  const navListRef = useRef(null);

  const navItems = [
    { label: 'About Us', href: '#' },
    { label: 'Products', href: '#' },
    { label: 'Sustainability', href: '#' },
    { label: 'Facilities & Process', href: '#' },
    { label: 'Markets & Trading', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Contact', href: 'https://masaderbio.com/web/contact/' },
  ];

  // Scroll detection: compact header and hide/reveal on scroll direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 20);

      if (currentScrollY > 120 && currentScrollY > lastScrollY.current + 8) {
        setIsHidden(true); // scrolling down
      } else if (currentScrollY < lastScrollY.current - 8) {
        setIsHidden(false); // scrolling up
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Initial mount assembly animation of the brand mark segments
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

    const tl = gsap.timeline({ delay: 0.25 });
    tl.to(
      segs,
      {
        opacity: 1,
        x: 0,
        y: 0,
        rotation: 0,
        duration: 0.65,
        ease: 'power3.out',
        stagger: 0.04,
      },
      0
    ).to(
      dropEl,
      {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(2)',
      },
      0.45
    );

    return () => tl.kill();
  }, []);

  // Brand Logo micro-interaction: hover gently blooms & aligns segments with luminous pulse
  const handleBrandHover = () => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const segs = segRefs.current.filter(Boolean);
    const dropEl = dropRef.current;
    if (!segs.length || !dropEl) return;

    const bloomOffsets = [
      { x: 0, y: -3.5, r: 2 },
      { x: 3, y: -2, r: -2.5 },
      { x: -3.5, y: 0, r: -2 },
      { x: 3.5, y: 1, r: 3 },
      { x: -2.5, y: 3, r: 2.5 },
      { x: 2.5, y: 3, r: -2.5 },
    ];

    segs.forEach((seg, idx) => {
      const off = bloomOffsets[idx] || { x: 0, y: 0, r: 0 };
      gsap.to(seg, {
        x: off.x,
        y: off.y,
        rotation: off.r,
        duration: 0.22,
        ease: 'power2.out',
        yoyo: true,
        repeat: 1,
      });
    });

    gsap.fromTo(
      dropEl,
      { scale: 0.92, filter: 'drop-shadow(0 0 10px rgba(244, 175, 53, 0.8))' },
      {
        scale: 1.14,
        filter: 'drop-shadow(0 0 16px rgba(244, 175, 53, 0.95))',
        duration: 0.3,
        ease: 'back.out(2.2)',
        yoyo: true,
        repeat: 1,
      }
    );
  };

  // Magnetic pill navigation tracking
  const handleNavHover = (e) => {
    const target = e.currentTarget;
    const navList = navListRef.current;
    if (!target || !navList) return;

    const listRect = navList.getBoundingClientRect();
    const itemRect = target.getBoundingClientRect();

    setPillStyle({
      opacity: 1,
      left: itemRect.left - listRect.left,
      width: itemRect.width,
    });
  };

  const handleNavLeave = () => {
    setPillStyle((prev) => ({ ...prev, opacity: 0 }));
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
        {/* Brand Link & Logo (Section 3 of CONTENT_SPEC.md) */}
        <a
          className="mx-brand group"
          href="https://masaderbio.com/web/"
          rel="home"
          aria-label="Masader مصادر"
          onMouseEnter={handleBrandHover}
        >
          <span className="mx-brand__icon" ref={brandIconRef}>
            {/* Full Icon Base Layer */}
            <img
              className="mx-brand__layer mx-brand__full"
              src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/logo-icon-full-96.webp"
              srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/logo-icon-full-96.webp 2x, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/logo-icon-full-144.webp 3x"
              width="83"
              height="96"
              alt=""
              decoding="async"
            />

            {/* 6 Animated Hexagon Segments */}
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

          {/* Wordmark (Section 3 of spec: .mx-brand__word) */}
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

        {/* Primary Navigation Menu with Magnetic Indicator (.mx-nav) */}
        <nav className="mx-nav" aria-label="Primary" onMouseLeave={handleNavLeave}>
          <ul id="menu-primary-menu" className="mx-nav__list" ref={navListRef}>
            {/* Magnetic Sliding Background Pill */}
            <span
              className="mx-nav__magnetic-pill"
              aria-hidden="true"
              style={{
                left: `${pillStyle.left}px`,
                width: `${pillStyle.width}px`,
                opacity: pillStyle.opacity,
              }}
            />

            {navItems.map((item, idx) => (
              <li
                key={idx}
                className={`menu-item menu-item-${idx + 17}`}
                onMouseEnter={handleNavHover}
              >
                <a href={item.href}>{item.label}</a>
                <span className="mx-nav__line" aria-hidden="true" />
              </li>
            ))}
          </ul>
        </nav>

        {/* Header Call-to-Action Button with Gradient Shimmer (.mx-header-cta) */}
        <a
          className="mx-header-cta"
          href="https://masaderbio.com/web/contact/"
        >
          <span className="mx-header-cta__text">Request a Quotation</span>
          <span className="mx-header-cta__shimmer" aria-hidden="true" />
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
