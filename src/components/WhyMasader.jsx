import React, { useState } from 'react';
import './WhyMasader.css';

export default function WhyMasader() {
  const [activePillar, setActivePillar] = useState(1);

  return (
    <section id="why-masader" className="mx-why">
      <div className="mx-why__container">
        <div className="mx-why__grid">
          {/* Left Column: 7 Cols - Eyebrow, Heading & 3 Value Pillars */}
          <div className="mx-why__content">
            <div className="mx-why__intro">
              <span className="mx-eyebrow">Why Masader</span>
              <h2 className="mx-why__heading">A model built for one purpose</h2>
            </div>

            {/* Value Pillars (.mx-values) */}
            <div className="mx-values" role="list">
              {/* Pillar 01 */}
              <div
                className={`mx-value mx-value--1 ${activePillar === 1 ? 'is-active' : ''}`}
                role="button"
                tabIndex={0}
                aria-pressed={activePillar === 1}
                onMouseEnter={() => setActivePillar(1)}
                onFocus={() => setActivePillar(1)}
                onClick={() => setActivePillar(1)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActivePillar(1);
                  }
                }}
              >
                <span className="mx-value__num">01</span>
                <div className="mx-value__body">
                  <h3 className="mx-value__title">Integrity</h3>
                  <p className="mx-value__desc">
                    Honest specifications and full traceability, audited against EU requirements — not asserted, demonstrated.
                  </p>
                </div>
              </div>

              {/* Pillar 02 */}
              <div
                className={`mx-value mx-value--2 ${activePillar === 2 ? 'is-active' : ''}`}
                role="button"
                tabIndex={0}
                aria-pressed={activePillar === 2}
                onMouseEnter={() => setActivePillar(2)}
                onFocus={() => setActivePillar(2)}
                onClick={() => setActivePillar(2)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActivePillar(2);
                  }
                }}
              >
                <span className="mx-value__num">02</span>
                <div className="mx-value__body">
                  <h3 className="mx-value__title">Technology Edge</h3>
                  <p className="mx-value__desc">
                    Every process unit engineered with our technology partner,{' '}
                    <a
                      href="#"
                      className="mx-why__link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      CARBON Engineering &amp; Consultancy
                    </a>
                    .
                  </p>
                </div>
              </div>

              {/* Pillar 03 */}
              <div
                className={`mx-value mx-value--3 ${activePillar === 3 ? 'is-active' : ''}`}
                role="button"
                tabIndex={0}
                aria-pressed={activePillar === 3}
                onMouseEnter={() => setActivePillar(3)}
                onFocus={() => setActivePillar(3)}
                onClick={() => setActivePillar(3)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setActivePillar(3);
                  }
                }}
              >
                <span className="mx-value__num">03</span>
                <div className="mx-value__body">
                  <h3 className="mx-value__title">Diversity &amp; Agility</h3>
                  <p className="mx-value__desc">
                    Flexible across feedstocks, direct in how we deal with buyers and suppliers — no rigid terms.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: 5 Cols - Visual Stack (.mx-why__visual) */}
          <div className="mx-why__visual">
            <div className="mx-why__visual-card">
              {/* Subtle ambient backdrop aura & circular ring */}
              <div className="mx-why__aura" aria-hidden="true" />
              <svg className="mx-why__orbit-svg" viewBox="0 0 460 460" fill="none" aria-hidden="true">
                <circle cx="230" cy="230" r="190" stroke="rgba(9, 29, 13, 0.07)" strokeWidth="1.2" strokeDasharray="4 8" />
                <circle cx="230" cy="230" r="215" stroke="rgba(244, 175, 53, 0.16)" strokeWidth="1" />
              </svg>

              {/* Strict square unified logo container */}
              <div
                className={`mx-logo-stack is-pillar-${activePillar}`}
                aria-label="Unified Masader Brand Mark"
              >
                {/* Crisp Base Full Logo (Always visible & sharp) */}
                <img
                  className="mx-logo-layer mx-logo-layer--base"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/logo-icon-full.webp"
                  alt="Masader"
                  width="420"
                  height="420"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/web/logo-icon-full-144.webp';
                  }}
                />

                {/* Pre-aligned Segment 1: Top Dark */}
                <img
                  className="mx-logo-layer mx-logo-seg mx-logo-seg--1"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg1-top-dark.webp"
                  alt=""
                  width="420"
                  height="420"
                  loading="lazy"
                  decoding="async"
                />

                {/* Pre-aligned Segment 2: Top Right Lime */}
                <img
                  className="mx-logo-layer mx-logo-seg mx-logo-seg--2"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg2-top-right-lime.webp"
                  alt=""
                  width="420"
                  height="420"
                  loading="lazy"
                  decoding="async"
                />

                {/* Pre-aligned Segment 3: Left Dark */}
                <img
                  className="mx-logo-layer mx-logo-seg mx-logo-seg--3"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg3-left-dark.webp"
                  alt=""
                  width="420"
                  height="420"
                  loading="lazy"
                  decoding="async"
                />

                {/* Pre-aligned Segment 4: Right Green */}
                <img
                  className="mx-logo-layer mx-logo-seg mx-logo-seg--4"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg4-right-green.webp"
                  alt=""
                  width="420"
                  height="420"
                  loading="lazy"
                  decoding="async"
                />

                {/* Pre-aligned Segment 5: Bottom Left */}
                <img
                  className="mx-logo-layer mx-logo-seg mx-logo-seg--5"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg5-bottom-left.webp"
                  alt=""
                  width="420"
                  height="420"
                  loading="lazy"
                  decoding="async"
                />

                {/* Pre-aligned Segment 6: Bottom Right */}
                <img
                  className="mx-logo-layer mx-logo-seg mx-logo-seg--6"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg6-bottom-right.webp"
                  alt=""
                  width="420"
                  height="420"
                  loading="lazy"
                  decoding="async"
                />

                {/* Center Drop: Gold */}
                <img
                  className="mx-logo-layer mx-logo-seg mx-logo-drop"
                  src="https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/drop-gold.webp"
                  alt=""
                  width="420"
                  height="420"
                  loading="lazy"
                  decoding="async"
                  onError={(e) => {
                    e.currentTarget.src = '/assets/oil-drop-only.png';
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
