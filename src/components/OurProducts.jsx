import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './OurProducts.css';

const GLOW_COLORS = {
  cylinder: 'rgba(244, 175, 53, 0.32)',
  beaker: 'rgba(239, 236, 200, 0.25)',
  barrel: 'rgba(157, 203, 91, 0.22)',
  default: 'rgba(244, 175, 53, 0.20)',
};

export default function OurProducts() {
  const sectionRef = useRef(null);
  const stageRef = useRef(null);
  const tiltRef = useRef(null);
  const [activeProduct, setActiveProduct] = useState(null);

  // 3D Tilt and Parallax Effect on desktop
  useEffect(() => {
    const isFinePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const stage = stageRef.current;
    const tilt = tiltRef.current;

    if (!isFinePointer || !stage || !tilt) return;

    const rotX = gsap.quickTo(tilt, 'rotationX', { duration: 0.8, ease: 'power3.out' });
    const rotY = gsap.quickTo(tilt, 'rotationY', { duration: 0.8, ease: 'power3.out' });

    const barrel = stage.querySelector('.mxp-layer--barrel img');
    const cylinder = stage.querySelector('.mxp-layer--cylinder img');
    const beaker = stage.querySelector('.mxp-layer--beaker img');

    const barrelX = barrel ? gsap.quickTo(barrel, 'x', { duration: 0.9, ease: 'power3.out' }) : null;
    const cylinderX = cylinder ? gsap.quickTo(cylinder, 'x', { duration: 0.9, ease: 'power3.out' }) : null;
    const beakerX = beaker ? gsap.quickTo(beaker, 'x', { duration: 0.9, ease: 'power3.out' }) : null;

    const handleMouseMove = (e) => {
      const rect = stage.getBoundingClientRect();
      const nx = Math.max(-1, Math.min(1, ((e.clientX - rect.left) / rect.width) * 2 - 1));
      const ny = Math.max(-1, Math.min(1, ((e.clientY - rect.top) / rect.height) * 2 - 1));

      rotY(nx * 4);
      rotX(-ny * 3);

      if (barrelX) barrelX(nx * 3);
      if (cylinderX) cylinderX(nx * 7);
      if (beakerX) beakerX(nx * 11);
    };

    const handleMouseLeave = () => {
      rotX(0);
      rotY(0);
      if (barrelX) barrelX(0);
      if (cylinderX) cylinderX(0);
      if (beakerX) beakerX(0);
    };

    stage.addEventListener('mousemove', handleMouseMove);
    stage.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      stage.removeEventListener('mousemove', handleMouseMove);
      stage.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  // Entrance animation
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section || isReducedMotion) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const intro = section.querySelector('.mx-products__intro');
            const stage = section.querySelector('.mxp-stage');
            const items = section.querySelectorAll('.mx-product');

            const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

            if (intro) {
              tl.fromTo(intro, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.8 }, 0);
            }
            if (stage) {
              tl.fromTo(stage, { opacity: 0, scale: 0.95 }, { opacity: 1, scale: 1, duration: 0.9 }, 0.2);
            }
            if (items.length) {
              tl.fromTo(
                items,
                { opacity: 0, y: 16 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.12 },
                0.35
              );
            }

            observer.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const currentGlow = activeProduct ? GLOW_COLORS[activeProduct] : GLOW_COLORS.default;

  return (
    <section className="mx-section mx-products mx-dark" id="products" ref={sectionRef}>
      <div className="mx-products__container">
        <div className="mx-products__grid">
          {/* Header & Intro (Section 5.3 of CONTENT_SPEC.md) */}
          <div className="mx-products__intro">
            {/* Eyebrow */}
            <p className="mx-eyebrow">Our Products</p>

            {/* Heading (H2) */}
            <div className="mx-title">
              <h2>Specification-backed, export ready</h2>
            </div>

            {/* Lead Text */}
            <p className="mx-lead">
              From the same UCOME stream entering our Alexandria plant, three certified lines leave it — biodiesel, glycerine, and soap-stock derivatives — each produced to specification, not approximated.
            </p>

            {/* Specification Line (.mx-specline) */}
            <div className="mx-specline">
              <span>12,000 MTPA certified capacity · Ex-Works Alexandria · EN 14214</span>
            </div>

            {/* Catalog Link */}
            <a className="mx-products__catalog-link" href="#">
              <span>All products &amp; data sheets</span>
              <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path
                  fillRule="evenodd"
                  d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>

          {/* Interactive Products Visual Stage (.mxp-stage) */}
          <div className="mx-products__stage-col">
            <div
              className="mxp-stage"
              data-active={activeProduct || ''}
              style={{ '--mxp-glow': currentGlow }}
              ref={stageRef}
            >
              {/* Radial Lighting Atmosphere */}
              <div className="mxp-glow" aria-hidden="true" />

              {/* 3D Tilt Container */}
              <div className="mxp-tilt" ref={tiltRef}>
                {/* Layer 1: Background (.mxp-layer--bg) */}
                <picture
                  className="mxp-layer mxp-layer--bg"
                  data-layer="bg"
                  style={{ '--l': '7.815%', '--t': '5.104%', '--w': '88.995%', '--h': '90.112%' }}
                >
                  <source
                    type="image/avif"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/bg-558.avif 558w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/bg-1116.avif 1116w"
                    sizes="(min-width: 1025px) calc(min(44vw, 640px) * 0.88995), calc(92vw * 0.88995)"
                  />
                  <source
                    type="image/webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/bg-558.webp 558w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/bg-1116.webp 1116w"
                    sizes="(min-width: 1025px) calc(min(44vw, 640px) * 0.88995), calc(92vw * 0.88995)"
                  />
                  <img
                    loading="lazy"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/bg-1116.png"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/bg-558.png 558w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/bg-1116.png 1116w"
                    sizes="auto, (min-width: 1025px) calc(min(44vw, 640px) * 0.88995), calc(92vw * 0.88995)"
                    width="1116"
                    height="1130"
                    alt=""
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/web/bg-1116.png';
                    }}
                  />
                </picture>

                {/* Layer 2: Steel Drum / Barrel (.mxp-layer--barrel) */}
                <picture
                  className="mxp-layer mxp-layer--barrel"
                  data-layer="barrel"
                  style={{ '--l': '26.475%', '--t': '10.526%', '--w': '46.571%', '--h': '81.978%' }}
                  onMouseEnter={() => setActiveProduct('barrel')}
                  onMouseLeave={() => setActiveProduct(null)}
                  onClick={() => setActiveProduct(activeProduct === 'barrel' ? null : 'barrel')}
                >
                  <source
                    type="image/avif"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-292.avif 292w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-584.avif 584w"
                    sizes="(min-width: 1025px) calc(min(44vw, 640px) * 0.46571), calc(92vw * 0.46571)"
                  />
                  <source
                    type="image/webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-292.webp 292w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-584.webp 584w"
                    sizes="(min-width: 1025px) calc(min(44vw, 640px) * 0.46571), calc(92vw * 0.46571)"
                  />
                  <img
                    loading="lazy"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-584.png"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-292.png 292w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-584.png 584w"
                    sizes="auto, (min-width: 1025px) calc(min(44vw, 640px) * 0.46571), calc(92vw * 0.46571)"
                    width="584"
                    height="1028"
                    alt="Steel drum"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/web/barrel-584.png';
                    }}
                  />
                </picture>
                <span
                  className="mxp-sweep mxp-sweep--barrel"
                  aria-hidden="true"
                  style={{
                    '--l': '26.475%',
                    '--t': '10.526%',
                    '--w': '46.571%',
                    '--h': '81.978%',
                    '--mask': 'url(https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-292.webp)',
                  }}
                />

                {/* Layer 3: Graduated Cylinder (.mxp-layer--cylinder) */}
                <picture
                  className="mxp-layer mxp-layer--cylinder"
                  data-layer="cylinder"
                  style={{ '--l': '20.893%', '--t': '22.967%', '--w': '22.807%', '--h': '72.408%' }}
                  onMouseEnter={() => setActiveProduct('cylinder')}
                  onMouseLeave={() => setActiveProduct(null)}
                  onClick={() => setActiveProduct(activeProduct === 'cylinder' ? null : 'cylinder')}
                >
                  <source
                    type="image/avif"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-143.avif 143w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-286.avif 286w"
                    sizes="(min-width: 1025px) calc(min(44vw, 640px) * 0.22807), calc(92vw * 0.22807)"
                  />
                  <source
                    type="image/webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-143.webp 143w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-286.webp 286w"
                    sizes="(min-width: 1025px) calc(min(44vw, 640px) * 0.22807), calc(92vw * 0.22807)"
                  />
                  <img
                    loading="lazy"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-286.png"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-143.png 143w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-286.png 286w"
                    sizes="auto, (min-width: 1025px) calc(min(44vw, 640px) * 0.22807), calc(92vw * 0.22807)"
                    width="286"
                    height="908"
                    alt="Graduated cylinder of biodiesel"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/web/cylinder-286.png';
                    }}
                  />
                </picture>
                <span
                  className="mxp-sweep mxp-sweep--cylinder"
                  aria-hidden="true"
                  style={{
                    '--l': '20.893%',
                    '--t': '22.967%',
                    '--w': '22.807%',
                    '--h': '72.408%',
                    '--mask': 'url(https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-143.webp)',
                  }}
                />

                {/* Layer 4: Beaker (.mxp-layer--beaker) */}
                <picture
                  className="mxp-layer mxp-layer--beaker"
                  data-layer="beaker"
                  style={{ '--l': '49.003%', '--t': '61.523%', '--w': '21.93%', '--h': '34.051%' }}
                  onMouseEnter={() => setActiveProduct('beaker')}
                  onMouseLeave={() => setActiveProduct(null)}
                  onClick={() => setActiveProduct(activeProduct === 'beaker' ? null : 'beaker')}
                >
                  <source
                    type="image/avif"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-138.avif 138w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-275.avif 275w"
                    sizes="(min-width: 1025px) calc(min(44vw, 640px) * 0.2193), calc(92vw * 0.2193)"
                  />
                  <source
                    type="image/webp"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-138.webp 138w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-275.webp 275w"
                    sizes="(min-width: 1025px) calc(min(44vw, 640px) * 0.2193), calc(92vw * 0.2193)"
                  />
                  <img
                    loading="lazy"
                    src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-275.png"
                    srcSet="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-138.png 138w, https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-275.png 275w"
                    sizes="auto, (min-width: 1025px) calc(min(44vw, 640px) * 0.2193), calc(92vw * 0.2193)"
                    width="275"
                    height="427"
                    alt="Beaker of glycerine"
                    decoding="async"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/web/beaker-275.png';
                    }}
                  />
                </picture>
                <span
                  className="mxp-sweep mxp-sweep--beaker"
                  aria-hidden="true"
                  style={{
                    '--l': '49.003%',
                    '--t': '61.523%',
                    '--w': '21.93%',
                    '--h': '34.051%',
                    '--mask': 'url(https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-138.webp)',
                  }}
                />
              </div>
            </div>
          </div>

          {/* Product Items List (.mx-products__list) */}
          <div className="mx-products__list">
            {/* Product 1: Cylinder */}
            <div
              className={`mx-product mx-product--cylinder ${activeProduct === 'cylinder' ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveProduct('cylinder')}
              onMouseLeave={() => setActiveProduct(null)}
              onClick={() => setActiveProduct(activeProduct === 'cylinder' ? null : 'cylinder')}
            >
              <div className="mx-product__title">
                <h3>
                  <span className="mx-product__chip" aria-hidden="true" />
                  Biodiesel — PURE &amp; PUREMAX
                </h3>
              </div>
              <div className="mx-product__text">
                <p>
                  FAME and UCOME from used cooking oil and fatty acids, produced to EN 14214 in two grades.
                </p>
              </div>
              <div className="mx-product__link">
                <a href="#">
                  <span>Data sheet</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product 2: Beaker */}
            <div
              className={`mx-product mx-product--beaker ${activeProduct === 'beaker' ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveProduct('beaker')}
              onMouseLeave={() => setActiveProduct(null)}
              onClick={() => setActiveProduct(activeProduct === 'beaker' ? null : 'beaker')}
            >
              <div className="mx-product__title">
                <h3>
                  <span className="mx-product__chip" aria-hidden="true" />
                  Crude &amp; Technical Glycerine
                </h3>
              </div>
              <div className="mx-product__text">
                <p>
                  Recovered with distillation residue and methanol from every production stream.
                </p>
              </div>
              <div className="mx-product__link">
                <a href="#">
                  <span>Data sheet</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Product 3: Barrel */}
            <div
              className={`mx-product mx-product--barrel ${activeProduct === 'barrel' ? 'is-active' : ''}`}
              onMouseEnter={() => setActiveProduct('barrel')}
              onMouseLeave={() => setActiveProduct(null)}
              onClick={() => setActiveProduct(activeProduct === 'barrel' ? null : 'barrel')}
            >
              <div className="mx-product__title">
                <h3>
                  <span className="mx-product__chip" aria-hidden="true" />
                  Soap-Stock &amp; Fatty-Acid Derivatives
                </h3>
              </div>
              <div className="mx-product__text">
                <p>
                  From our CARBON-designed glycerolysis line — recovered value from every stream.
                </p>
              </div>
              <div className="mx-product__link">
                <a href="#">
                  <span>Data sheet</span>
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
