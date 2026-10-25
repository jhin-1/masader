import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function HeroSection() {
  const sectionRef = useRef(null);
  const visualRef = useRef(null);
  const markRef = useRef(null);
  const dropRef = useRef(null);
  const fallRef = useRef(null);
  const ripplesRef = useRef([]);
  const segRefs = useRef([]);
  const hexSegRefs = useRef([]);
  const wordArRef = useRef(null);
  const wordEnRef = useRef(null);
  const wordsContainerRef = useRef(null);
  const gradientTextRef = useRef(null);
  const hexRef = useRef(null);
  const primaryBtnRef = useRef(null);
  const ghostBtnRef = useRef(null);

  const [metric1, setMetric1] = useState('12,000');
  const [metric2, setMetric2] = useState('85–95%');
  const [metric3, setMetric3] = useState('100%');
  const [isAssembled, setIsAssembled] = useState(false);

  // Clockwise order of segment IDs from top: 1, 2, 4, 6, 5, 3
  const CLOCKWISE = [1, 2, 4, 6, 5, 3];

  // 1. Initial Assembly & Entrance Animation
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) {
      setIsAssembled(true);
      return;
    }

    const drop = dropRef.current;
    const fall = fallRef.current;
    const rings = ripplesRef.current.filter(Boolean);
    const segs = CLOCKWISE.map((num) => segRefs.current[num - 1]).filter(Boolean);
    const wordAr = wordArRef.current;
    const wordEn = wordEnRef.current;
    const goldText = gradientTextRef.current;

    if (!drop || !fall || rings.length < 3 || segs.length < 6 || !wordAr || !wordEn) {
      setIsAssembled(true);
      return;
    }

    // Set initial states
    gsap.set(segs, { opacity: 0.15 });
    gsap.set(drop, { opacity: 0, transformOrigin: '50% 75%' });
    gsap.set(rings, { scale: 0.2, opacity: 0 });
    gsap.set(wordAr, { clipPath: 'inset(0% 0% 0% 100%)' }); // Right to left reveal
    gsap.set(wordEn, { clipPath: 'inset(0% 100% 0% 0%)' }); // Left to right reveal

    const tl = gsap.timeline({
      delay: 0.2,
      onComplete: () => {
        setIsAssembled(true);
        if (visualRef.current) {
          visualRef.current.classList.add('is-assembled');
        }
      },
    });

    // 0.2s - 1.1s: Vertical guide line and falling drop
    tl.fromTo(
      fall,
      { scaleY: 0, opacity: 0 },
      { scaleY: 1, opacity: 0.85, duration: 0.45, ease: 'power2.out' },
      0.2
    )
      .to(drop, { opacity: 1, duration: 0.1 }, 0.35)
      .fromTo(
        drop,
        { y: -180, scaleY: 1.4, scaleX: 0.75 },
        { y: 0, duration: 0.75, ease: 'power2.in' },
        0.35
      )
      // 1.1s: Impact - squash & bounce
      .to(drop, { scaleY: 0.75, scaleX: 1.25, duration: 0.09, ease: 'power2.out' }, 1.1)
      .to(drop, { scaleY: 1, scaleX: 1, duration: 0.45, ease: 'back.out(3.2)' }, 1.19)
      .to(fall, { opacity: 0, duration: 0.3 }, 1.1)
      // 1.12s: Impact waves (3 ripples)
      .fromTo(
        rings,
        { scale: 0.25, opacity: 0.9 },
        { scale: 2.6, opacity: 0, duration: 1.2, ease: 'power2.out', stagger: 0.16 },
        1.12
      )
      // 1.18s: Clockwise lighting of the 6 segments
      .to(segs, { opacity: 1, duration: 0.35, ease: 'power1.out', stagger: 0.1 }, 1.18)
      // 1.8s - 2.5s: Arabic & English wordmark reveals
      .to(wordAr, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.65, ease: 'power2.inOut' }, 1.75)
      .to(wordEn, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.65, ease: 'power2.inOut' }, 2.1);

    // Headline gold text sheen wipe
    if (goldText) {
      tl.call(
        () => {
          goldText.classList.add('is-sheen');
          gsap.fromTo(
            goldText,
            { backgroundPosition: '0% 50%' },
            {
              backgroundPosition: '100% 50%',
              duration: 1.1,
              ease: 'power2.inOut',
              onComplete: () => {
                goldText.classList.remove('is-sheen');
              },
            }
          );
        },
        null,
        1.0
      );
    }

    // Monospace Metric numbers counter animation
    const metricObj = { val1: 0, val2a: 0, val2b: 0, val3: 0 };
    gsap.to(metricObj, {
      val1: 12000,
      val2a: 85,
      val2b: 95,
      val3: 100,
      duration: 1.9,
      delay: 0.7,
      ease: 'power2.out',
      onUpdate: () => {
        setMetric1(Math.round(metricObj.val1).toLocaleString('en-US'));
        setMetric2(`${Math.round(metricObj.val2a)}–${Math.round(metricObj.val2b)}%`);
        setMetric3(`${Math.round(metricObj.val3)}%`);
      },
      onComplete: () => {
        setMetric1('12,000');
        setMetric2('85–95%');
        setMetric3('100%');
      },
    });

    return () => {
      tl.kill();
    };
  }, []);

  // 2. 60fps 3D Mouse Parallax & Orbital Float Interaction
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(hover: none)').matches;
    if (isReducedMotion || isTouch) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animFrameId = null;

    const handleMouseMove = (e) => {
      const section = sectionRef.current;
      if (!section) return;

      const rect = section.getBoundingClientRect();
      if (
        e.clientY < rect.top - 100 ||
        e.clientY > rect.bottom + 100 ||
        e.clientX < rect.left ||
        e.clientX > rect.right
      ) {
        targetX = 0;
        targetY = 0;
        return;
      }

      // Normalized coordinates: -1 to 1 from center
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      targetX = Math.max(-1, Math.min(1, (e.clientX - centerX) / (rect.width / 2)));
      targetY = Math.max(-1, Math.min(1, (e.clientY - centerY) / (rect.height / 2)));
    };

    const handleMouseLeave = () => {
      targetX = 0;
      targetY = 0;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    // 60fps Render Loop using lerp
    const render = () => {
      currentX += (targetX - currentX) * 0.075;
      currentY += (targetY - currentY) * 0.075;

      const rotX = -currentY * 14;
      const rotY = currentX * 16;

      // Center mark 3D tilt
      if (markRef.current) {
        markRef.current.style.transform = `translate3d(${currentX * 18}px, ${
          currentY * 18
        }px, 0px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
      }

      // Gold drop forward parallax
      if (dropRef.current) {
        dropRef.current.style.transform = `translate3d(${currentX * 15}px, ${
          currentY * 15
        }px, 35px)`;
      }

      // Wordmarks 3D offset
      if (wordsContainerRef.current) {
        wordsContainerRef.current.style.transform = `translate3d(${currentX * 10}px, ${
          currentY * 10
        }px, 20px) rotateX(${rotX * 0.4}deg) rotateY(${rotY * 0.4}deg)`;
      }

      // Ambient hexagon background counter-parallax
      if (hexRef.current) {
        hexRef.current.style.transform = `translate3d(${-currentX * 24}px, ${
          -currentY * 24
        }px, -45px)`;
      }

      // Differential segment depths for exploded 3D effect
      const segmentOffsets = [
        { z: 12, mul: 0.7 },
        { z: 18, mul: 1.1 },
        { z: 14, mul: 0.8 },
        { z: 20, mul: 1.2 },
        { z: 16, mul: 0.9 },
        { z: 17, mul: 1.0 },
      ];

      segRefs.current.forEach((seg, idx) => {
        if (!seg) return;
        const config = segmentOffsets[idx] || { z: 15, mul: 1 };
        seg.style.transform = `translate3d(${currentX * 8 * config.mul}px, ${
          currentY * 8 * config.mul
        }px, ${config.z}px)`;
      });

      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, []);

  // 3. Magnetic Button Hover Micro-interactions
  useEffect(() => {
    const isDesktop = window.matchMedia('(min-width: 1025px) and (hover: hover)').matches;
    if (!isDesktop) return;

    const cleanups = [];
    [primaryBtnRef.current, ghostBtnRef.current].filter(Boolean).forEach((btn) => {
      const handleMove = (e) => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width / 2)) * 0.28;
        const y = (e.clientY - (rect.top + rect.height / 2)) * 0.28;
        gsap.to(btn, { x, y, duration: 0.35, ease: 'power3.out' });
      };
      const handleLeave = () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: 'power3.out' });
      };

      btn.addEventListener('mousemove', handleMove);
      btn.addEventListener('mouseleave', handleLeave);
      cleanups.push(() => {
        btn.removeEventListener('mousemove', handleMove);
        btn.removeEventListener('mouseleave', handleLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <section className="mx-hero mx-dark" id="hero" ref={sectionRef}>
      {/* Background Architectural Grid Lines & Glow Orbs */}
      <div className="mx-hero__bg-grid" aria-hidden="true" />
      <div className="mx-hero__ambient-glow" aria-hidden="true" />

      <div className="mx-hero__container">
        <div className="mx-hero__grid">
          {/* Left Column: Exact Content from Section 5.1 of CONTENT_SPEC.md */}
          <div className="mx-hero__content">
            {/* Eyebrow / Kicker */}
            <div className="mx-hero__eyebrow-row">
              <p className="mx-hero__kicker">
                Masader — Arabic for “resources” <span className="mx-hero__sep">·</span> ISCC EU certified
              </p>
            </div>

            {/* Main Heading (H1) */}
            <div className="mx-hero__title">
              <h1>
                Waste finds
                <br />
                its way back
                <br />
                <span className="mx-gradient-text" ref={gradientTextRef}>
                  into the loop.
                </span>
              </h1>
            </div>

            {/* Lead Text */}
            <p className="mx-lead">
              ISCC EU-certified FAME, UCOME and glycerin from used cooking oil and recovered fatty-acid oils — 12,000 MTPA, engineered with CARBON, exported across Europe and Africa.
            </p>

            {/* Action Buttons */}
            <div className="mx-actions">
              <a
                ref={primaryBtnRef}
                className="mx-btn-primary"
                href="https://masaderbio.com/web/contact/"
              >
                <span className="mx-btn-primary__text">Request a Quotation</span>
                <span className="mx-btn-primary__shimmer" aria-hidden="true" />
              </a>
              <a
                ref={ghostBtnRef}
                className="mx-btn-ghost"
                href="https://masaderbio.com/web/contact/"
              >
                Feedstock Partnerships
              </a>
            </div>

            {/* Redesigned Glassmorphic Bento Strip Metrics Bar */}
            <div className="mx-metrics mx-metrics--bento" role="region" aria-label="Key Metrics">
              <div className="mx-metric mx-metric--bento">
                <div className="mx-metric__header">
                  <span className="mx-metric__dot" aria-hidden="true" />
                  <span className="mx-metric__tag">CAPACITY</span>
                </div>
                <div className="mx-metric__value">{metric1}</div>
                <div className="mx-metric__label">MTPA certified capacity</div>
              </div>

              <div className="mx-metric mx-metric--bento">
                <div className="mx-metric__header">
                  <span className="mx-metric__dot mx-metric__dot--leaf" aria-hidden="true" />
                  <span className="mx-metric__tag">GHG IMPACT</span>
                </div>
                <div className="mx-metric__value">{metric2}</div>
                <div className="mx-metric__label">GHG reduction, UCOME</div>
              </div>

              <div className="mx-metric mx-metric--bento">
                <div className="mx-metric__header">
                  <span className="mx-metric__dot mx-metric__dot--verified" aria-hidden="true" />
                  <span className="mx-metric__tag">AUDITED</span>
                </div>
                <div className="mx-metric__value">{metric3}</div>
                <div className="mx-metric__label">mass-balance traceable</div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Component (mx-hero__visual / mx-visual--orbit) */}
          <div className="mx-hero__visual">
            <div
              className={`mx-visual mx-visual--orbit ${isAssembled ? 'is-assembled' : ''}`}
              data-mx-visual="orbit"
              ref={visualRef}
            >
              {/* Ambient 6 Hexagon Segments (744w) Background Art */}
              <span className="mx-hero-hex" aria-hidden="true" ref={hexRef}>
                <img
                  ref={(el) => (hexSegRefs.current[0] = el)}
                  loading="lazy"
                  className="mx-hero-hex__seg mx-hero-hex__seg-1"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg1-top-dark-744.webp"
                  srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg1-top-dark-744.webp 744w"
                  sizes="(min-width: 1025px) min(104vw, 1180px), 130vw"
                  width="744"
                  height="858"
                  alt=""
                  decoding="async"
                />
                <img
                  ref={(el) => (hexSegRefs.current[1] = el)}
                  loading="lazy"
                  className="mx-hero-hex__seg mx-hero-hex__seg-2"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg2-top-right-lime-744.webp"
                  srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg2-top-right-lime-744.webp 744w"
                  sizes="(min-width: 1025px) min(104vw, 1180px), 130vw"
                  width="744"
                  height="858"
                  alt=""
                  decoding="async"
                />
                <img
                  ref={(el) => (hexSegRefs.current[2] = el)}
                  loading="lazy"
                  className="mx-hero-hex__seg mx-hero-hex__seg-3"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg3-left-dark-744.webp"
                  srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg3-left-dark-744.webp 744w"
                  sizes="(min-width: 1025px) min(104vw, 1180px), 130vw"
                  width="744"
                  height="858"
                  alt=""
                  decoding="async"
                />
                <img
                  ref={(el) => (hexSegRefs.current[3] = el)}
                  loading="lazy"
                  className="mx-hero-hex__seg mx-hero-hex__seg-4"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg4-right-green-744.webp"
                  srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg4-right-green-744.webp 744w"
                  sizes="(min-width: 1025px) min(104vw, 1180px), 130vw"
                  width="744"
                  height="858"
                  alt=""
                  decoding="async"
                />
                <img
                  ref={(el) => (hexSegRefs.current[4] = el)}
                  loading="lazy"
                  className="mx-hero-hex__seg mx-hero-hex__seg-5"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg5-bottom-left-744.webp"
                  srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg5-bottom-left-744.webp 744w"
                  sizes="(min-width: 1025px) min(104vw, 1180px), 130vw"
                  width="744"
                  height="858"
                  alt=""
                  decoding="async"
                />
                <img
                  ref={(el) => (hexSegRefs.current[5] = el)}
                  loading="lazy"
                  className="mx-hero-hex__seg mx-hero-hex__seg-6"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg6-bottom-right-744.webp"
                  srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg6-bottom-right-744.webp 744w"
                  sizes="(min-width: 1025px) min(104vw, 1180px), 130vw"
                  width="744"
                  height="858"
                  alt=""
                  decoding="async"
                />
              </span>

              {/* Center Mark Layers (aria-label: Masader مصادر) */}
              <span className="mx-hero-layer mx-hero-logo">
                <span
                  className="mx-hero-mark"
                  role="img"
                  aria-label="Masader مصادر"
                  ref={markRef}
                >
                  {/* Vertical Fall Line */}
                  <span className="mx-hero-fall" aria-hidden="true" ref={fallRef}></span>

                  {/* 6 Center Mark Segments (372w / 744w) */}
                  <img
                    ref={(el) => (segRefs.current[0] = el)}
                    fetchPriority="high"
                    className="mx-hero-seg mx-hero-seg-1"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg1-top-dark-372.webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg1-top-dark-372.webp 372w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg1-top-dark-744.webp 744w"
                    sizes="(min-width: 1025px) min(13vw, 22svh, 200px), 30vw"
                    width="744"
                    height="858"
                    alt=""
                    decoding="async"
                  />
                  <img
                    ref={(el) => (segRefs.current[1] = el)}
                    fetchPriority="high"
                    className="mx-hero-seg mx-hero-seg-2"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg2-top-right-lime-372.webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg2-top-right-lime-372.webp 372w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg2-top-right-lime-744.webp 744w"
                    sizes="(min-width: 1025px) min(13vw, 22svh, 200px), 30vw"
                    width="744"
                    height="858"
                    alt=""
                    decoding="async"
                  />
                  <img
                    ref={(el) => (segRefs.current[2] = el)}
                    fetchPriority="high"
                    className="mx-hero-seg mx-hero-seg-3"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg3-left-dark-372.webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg3-left-dark-372.webp 372w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg3-left-dark-744.webp 744w"
                    sizes="(min-width: 1025px) min(13vw, 22svh, 200px), 30vw"
                    width="744"
                    height="858"
                    alt=""
                    decoding="async"
                  />
                  <img
                    ref={(el) => (segRefs.current[3] = el)}
                    fetchPriority="high"
                    className="mx-hero-seg mx-hero-seg-4"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg4-right-green-372.webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg4-right-green-372.webp 372w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg4-right-green-744.webp 744w"
                    sizes="(min-width: 1025px) min(13vw, 22svh, 200px), 30vw"
                    width="744"
                    height="858"
                    alt=""
                    decoding="async"
                  />
                  <img
                    ref={(el) => (segRefs.current[4] = el)}
                    fetchPriority="high"
                    className="mx-hero-seg mx-hero-seg-5"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg5-bottom-left-372.webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg5-bottom-left-372.webp 372w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg5-bottom-left-744.webp 744w"
                    sizes="(min-width: 1025px) min(13vw, 22svh, 200px), 30vw"
                    width="744"
                    height="858"
                    alt=""
                    decoding="async"
                  />
                  <img
                    ref={(el) => (segRefs.current[5] = el)}
                    fetchPriority="high"
                    className="mx-hero-seg mx-hero-seg-6"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg6-bottom-right-372.webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg6-bottom-right-372.webp 372w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg6-bottom-right-744.webp 744w"
                    sizes="(min-width: 1025px) min(13vw, 22svh, 200px), 30vw"
                    width="744"
                    height="858"
                    alt=""
                    decoding="async"
                  />

                  {/* 3 Ripple Waves */}
                  <span className="mx-hero-ripples" aria-hidden="true">
                    <span className="mx-hero-ripple mx-hero-ripple--1" ref={(el) => (ripplesRef.current[0] = el)}></span>
                    <span className="mx-hero-ripple mx-hero-ripple--2" ref={(el) => (ripplesRef.current[1] = el)}></span>
                    <span className="mx-hero-ripple mx-hero-ripple--3" ref={(el) => (ripplesRef.current[2] = el)}></span>
                  </span>

                  {/* Gold Center Drop (372w / 744w) */}
                  <img
                    ref={dropRef}
                    fetchPriority="high"
                    className="mx-hero-drop"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/drop-gold-372.webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/drop-gold-372.webp 372w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/drop-gold-744.webp 744w"
                    sizes="(min-width: 1025px) min(13vw, 22svh, 200px), 30vw"
                    width="744"
                    height="858"
                    alt=""
                    decoding="async"
                  />
                </span>

                {/* Wordmarks: Arabic & English */}
                <span className="mx-hero-words" aria-hidden="true" ref={wordsContainerRef}>
                  <img
                    ref={wordArRef}
                    fetchPriority="high"
                    className="mx-hero-word mx-hero-word--ar"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/arabic-wordmark-760.webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/arabic-wordmark-760.webp 760w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/arabic-wordmark-1518.webp 1518w"
                    sizes="(min-width: 1025px) min(20vw, 34svh, 300px), 46vw"
                    width="1518"
                    height="563"
                    alt="مصادر"
                    decoding="async"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.fallback) {
                        e.currentTarget.dataset.fallback = '1';
                        e.currentTarget.src = '/assets/web/arabic-wordmark-1518.webp';
                        e.currentTarget.srcset = '';
                      }
                    }}
                  />
                  <img
                    ref={wordEnRef}
                    fetchPriority="high"
                    className="mx-hero-word mx-hero-word--en"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/english-wordmark-760.webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/english-wordmark-760.webp 760w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/english-wordmark-1518.webp 1518w"
                    sizes="(min-width: 1025px) min(20vw, 34svh, 300px), 46vw"
                    width="1518"
                    height="219"
                    alt="masader"
                    decoding="async"
                    onError={(e) => {
                      if (!e.currentTarget.dataset.fallback) {
                        e.currentTarget.dataset.fallback = '1';
                        e.currentTarget.src = '/assets/web/english-wordmark-1518.webp';
                        e.currentTarget.srcset = '';
                      }
                    }}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
