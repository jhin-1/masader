import React, { useEffect, useRef, useState } from 'react';
import './SustainabilityCertifications.css';

export default function SustainabilityCertifications() {
  const sectionRef = useRef(null);
  const [gaugeValue, setGaugeValue] = useState(0);
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section) return;

    if (isReducedMotion) {
      setGaugeValue(90);
      setIsAnimated(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isAnimated) {
            setIsAnimated(true);

            // Counter animation from 0 to 90 over 1.8s matching cubic-bezier(0.22, 1, 0.36, 1)
            const startTime = performance.now();
            const duration = 1800;

            const updateCounter = (now) => {
              const elapsed = now - startTime;
              const progress = Math.min(elapsed / duration, 1);
              // Approximation of cubic-bezier(0.22, 1, 0.36, 1)
              const eased = 1 - Math.pow(1 - progress, 3.2);
              setGaugeValue(Math.round(eased * 90));

              if (progress < 1) {
                requestAnimationFrame(updateCounter);
              } else {
                setGaugeValue(90);
              }
            };

            requestAnimationFrame(updateCounter);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isAnimated]);

  return (
    <section id="sustainability" ref={sectionRef} className="mx-sustain">
      <div className="mx-sustain__container">
        <div className="mx-sustain__grid">
          {/* Left Column: 7 Cols - Eyebrow, Heading, Lead & Action Button */}
          <div className="mx-sustain__content">
            <span className="mx-eyebrow">Sustainability &amp; Certifications</span>
            <h2 className="mx-sustain__heading">
              See the ISCC EU certificate and our GHG methodology
            </h2>
            <p className="mx-lead">
              Certificate number, scope, mass-balance approach, and the circular-economy impact behind every tonne we ship.
            </p>

            <div className="mx-sustain__actions">
              <a href="#" className="mx-btn-primary">
                <span>View Certifications</span>
                <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            <div className="mx-sustain__tags">
              <span className="mx-sustain__tag">
                <span className="mx-sustain__tag-dot" />
                ISCC EU mass-balance
              </span>
              <span className="mx-sustain__tag">
                <span className="mx-sustain__tag-dot" />
                RED II / RED III compliant
              </span>
              <span className="mx-sustain__tag">
                <span className="mx-sustain__tag-dot" />
                12,000 MTPA audited
              </span>
            </div>
          </div>

          {/* Right Column: 5 Cols - Gauge Visual (.mx-gauge.mx-ring) */}
          <div className="mx-sustain__visual">
            <div className="mx-gauge-wrapper">
              {/* Subtle ambient glow & circular plate */}
              <div className="mx-gauge-glow" aria-hidden="true" />
              <div className="mx-gauge-plate" aria-hidden="true" />

              {/* Exact SVG Gauge */}
              <svg
                className={`mx-gauge mx-ring ${isAnimated ? 'is-animated' : ''}`}
                viewBox="0 0 300 300"
                aria-label="90% GHG reduction"
                role="img"
              >
                <defs>
                  {/* Linear Gradient per spec */}
                  <linearGradient id="mxv9ea0009-g" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#F4AF35" />
                    <stop offset="100%" stopColor="#9DCB5B" />
                  </linearGradient>

                  {/* Soft Drop Glow */}
                  <filter id="mxs-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="0" stdDeviation="5" floodColor="#9DCB5B" floodOpacity="0.45" />
                  </filter>
                </defs>

                {/* Outer decorative ticks ring (r="140", dashed stroke, 60s continuous rotation) */}
                <circle
                  cx="150"
                  cy="150"
                  r="140"
                  fill="none"
                  stroke="rgba(239, 245, 237, 0.16)"
                  strokeWidth="1.5"
                  strokeDasharray="4 8"
                  className="mx-gauge__ticks-ring"
                  aria-hidden="true"
                />

                {/* Track circle (r="118") */}
                <circle
                  cx="150"
                  cy="150"
                  r="118"
                  fill="none"
                  stroke="rgba(239, 245, 237, 0.08)"
                  strokeWidth="12"
                  strokeLinecap="round"
                />

                {/* Progress Ring: r="118", pathLength="100", transform="rotate(-90 150 150)" */}
                <circle
                  cx="150"
                  cy="150"
                  r="118"
                  fill="none"
                  stroke="url(#mxv9ea0009-g)"
                  strokeWidth="12"
                  strokeLinecap="round"
                  pathLength="100"
                  strokeDasharray="100"
                  transform="rotate(-90 150 150)"
                  className="mx-gauge__progress"
                  filter="url(#mxs-glow)"
                />
              </svg>

              {/* Center Readout Overlay */}
              <div className="mx-gauge__readout">
                <div className="mx-gauge__value-row">
                  <span className="mx-gauge__val">{gaugeValue}</span>
                  <span className="mx-gauge__unit">%</span>
                </div>
                <span className="mx-gauge__label">GHG reduction</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
