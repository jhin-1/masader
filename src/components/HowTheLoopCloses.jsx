import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './HowTheLoopCloses.css';

export default function HowTheLoopCloses() {
  const sectionRef = useRef(null);
  const introRef = useRef(null);
  const stepsContainerRef = useRef(null);
  const railLineRef = useRef(null);
  const [activeStep, setActiveStep] = useState(1);
  const [reachedSteps, setReachedSteps] = useState([1]);

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    const intro = introRef.current;
    const stepsEl = stepsContainerRef.current;
    const railLine = railLineRef.current;

    if (!section || !intro || !stepsEl) return;

    // Scroll progress handler for rail and active cards
    const handleScroll = () => {
      if (!stepsEl) return;
      const rect = stepsEl.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const start = windowHeight * 0.75;
      const end = windowHeight * 0.25;

      const totalDist = rect.height;
      const currentScroll = start - rect.top;
      let progress = Math.max(0, Math.min(1, currentScroll / (totalDist + (start - end))));

      if (railLine) {
        railLine.style.strokeDashoffset = (1 - progress).toFixed(4);
      }

      // Check which card is in focus based on position
      const cards = stepsEl.querySelectorAll('.mx-step');
      const mid = windowHeight / 2;
      let closestStep = 1;
      let minDistance = Infinity;
      const newReached = [1];

      cards.forEach((card, idx) => {
        const stepNum = idx + 1;
        const cRect = card.getBoundingClientRect();
        const center = cRect.top + cRect.height / 2;
        const dist = Math.abs(center - mid);

        if (cRect.top < windowHeight * 0.65) {
          if (!newReached.includes(stepNum)) {
            newReached.push(stepNum);
          }
        }

        if (dist < minDistance) {
          minDistance = dist;
          closestStep = stepNum;
        }
      });

      setReachedSteps(newReached);
      setActiveStep(closestStep);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if (!isReducedMotion) {
      // Entrance reveal animation for intro elements
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const eyebrow = intro.querySelector('.mx-eyebrow');
              const heading = intro.querySelector('.mx-title h2');
              const lead = intro.querySelector('.mx-lead');
              const checklistItems = intro.querySelectorAll('.mx-checklist__item');
              const scope = intro.querySelector('.mx-scope');
              const cards = stepsEl.querySelectorAll('.mx-step');

              const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

              if (eyebrow) {
                tl.fromTo(eyebrow, { opacity: 0, y: 15 }, { opacity: 1, y: 0, duration: 0.6 }, 0);
              }
              if (heading) {
                tl.fromTo(heading, { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.8 }, 0.15);
              }
              if (lead) {
                tl.fromTo(lead, { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 }, 0.3);
              }
              if (checklistItems.length) {
                tl.fromTo(
                  checklistItems,
                  { opacity: 0, x: -14 },
                  { opacity: 1, x: 0, duration: 0.5, stagger: 0.12 },
                  0.45
                );
              }
              if (scope) {
                tl.fromTo(scope, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.7 }, 0.7);
              }
              if (cards.length) {
                tl.fromTo(
                  cards,
                  { opacity: 0, y: 30 },
                  { opacity: 1, y: 0, duration: 0.8, stagger: 0.15 },
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
      return () => {
        observer.disconnect();
        window.removeEventListener('scroll', handleScroll);
      };
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <section className="mx-section mx-loop mx-light" id="loop" ref={sectionRef}>
      <div className="mx-loop__container">
        <div className="mx-loop__grid">
          {/* Left Column: Intro (Section 5.2 of CONTENT_SPEC.md) */}
          <div className="mx-loop__intro" ref={introRef}>
            {/* Eyebrow */}
            <p className="mx-eyebrow">How the loop closes</p>

            {/* Heading (H2) */}
            <div className="mx-title">
              <h2>From spent oil to certified fuel, in three governed steps</h2>
            </div>

            {/* Lead Text */}
            <p className="mx-lead">
              Every batch is tracked from feedstock intake to certificate — the chain of custody a European buyer needs is built into how we run the plant, not bolted on afterward.
            </p>

            {/* Checklist (.mx-checklist) */}
            <ul className="mx-checklist">
              <li className="mx-checklist__item">
                <span className="mx-checklist__icon" aria-hidden="true">
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                  </svg>
                </span>
                <span className="mx-checklist__text">ISCC EU certified chain of custody</span>
              </li>
              <li className="mx-checklist__item">
                <span className="mx-checklist__icon" aria-hidden="true">
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                  </svg>
                </span>
                <span className="mx-checklist__text">Fully traceable supply chain, intake to export</span>
              </li>
              <li className="mx-checklist__item">
                <span className="mx-checklist__icon" aria-hidden="true">
                  <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z" />
                  </svg>
                </span>
                <span className="mx-checklist__text">EN 14214 specifications, every batch</span>
              </li>
            </ul>

            {/* Scope Box (.mx-scope) */}
            <div className="mx-scope">
              <div className="mx-scope__title">
                <h3>Scope</h3>
              </div>
              <div className="mx-scope__text">
                <p>
                  ISCC EU mass-balance certification covers UCOME, FAME and glycerin from intake through export documentation.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: 3 Governed Steps (.mx-loop__steps) */}
          <div className="mx-loop__steps" ref={stepsContainerRef}>
            {/* SVG Connecting Flow Rail */}
            <svg className="mxl-rail" aria-hidden="true">
              <line
                ref={railLineRef}
                x1="1"
                y1="0"
                x2="1"
                y2="100%"
                pathLength="1"
                strokeDasharray="1 1"
                strokeDashoffset="1"
              />
            </svg>

            {/* Step 01 */}
            <div
              className={`mx-step ${activeStep === 1 ? 'is-current' : ''} ${
                reachedSteps.includes(1) ? 'is-reached' : ''
              }`}
              onClick={() => setActiveStep(1)}
              onMouseEnter={() => setActiveStep(1)}
            >
              <div className="mx-step__icon">
                <div className="mx-step__icon-wrapper">
                  <svg aria-hidden="true" className="fa-code-branch" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M384 144c0-44.2-35.8-80-80-80s-80 35.8-80 80c0 36.4 24.3 67.1 57.5 76.8-.6 16.1-4.2 28.5-11 36.9-15.4 19.2-49.3 22.4-85.2 25.7-28.2 2.6-57.4 5.4-81.3 16.9v-144c32.5-10.2 56-40.5 56-76.3 0-44.2-35.8-80-80-80S0 35.8 0 80c0 35.8 23.5 66.1 56 76.3v199.3C23.5 365.9 0 396.2 0 432c0 44.2 35.8 80 80 80s80-35.8 80-80c0-34-21.2-63.1-51.2-74.6 3.1-5.2 7.8-9.8 14.9-13.4 16.2-8.2 40.4-10.4 66.1-12.8 42.2-3.9 90-8.4 118.2-43.4 14-17.4 21.1-39.8 21.6-67.9 31.6-10.8 54.4-40.7 54.4-75.9zM80 64c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16zm0 384c-8.8 0-16-7.2-16-16s7.2-16 16-16 16 7.2 16 16-7.2 16-16 16zm224-320c8.8 0 16 7.2 16 16s-7.2 16-16 16-16-7.2-16-16 7.2-16 16-16z" />
                  </svg>
                </div>
              </div>
              <div className="mx-step__num">
                <span className="mx-step__num-badge">01</span>
              </div>
              <div className="mx-step__title">
                <h3>Collect</h3>
              </div>
              <div className="mx-step__text">
                <p>
                  Used cooking oil and recovered soap-stock / fatty-acid oils, sourced through our feedstock network and logged at intake.
                </p>
              </div>
            </div>

            {/* Step 02 */}
            <div
              className={`mx-step ${activeStep === 2 ? 'is-current' : ''} ${
                reachedSteps.includes(2) ? 'is-reached' : ''
              }`}
              onClick={() => setActiveStep(2)}
              onMouseEnter={() => setActiveStep(2)}
            >
              <div className="mx-step__icon">
                <div className="mx-step__icon-wrapper">
                  <svg aria-hidden="true" className="fa-flask" viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M437.2 403.5L320 215V64h8c13.3 0 24-10.7 24-24V24c0-13.3-10.7-24-24-24H120c-13.3 0-24 10.7-24 24v16c0 13.3 10.7 24 24 24h8v151L10.8 403.5C-18.5 450.6 15.3 512 70.9 512h306.2c55.7 0 89.4-61.5 60.1-108.5zM137.9 320l48.2-77.6c3.7-5.2 5.8-11.6 5.8-18.4V64h64v160c0 6.9 2.2 13.2 5.8 18.4l48.2 77.6h-172z" />
                  </svg>
                </div>
              </div>
              <div className="mx-step__num">
                <span className="mx-step__num-badge">02</span>
              </div>
              <div className="mx-step__title">
                <h3>Process</h3>
              </div>
              <div className="mx-step__text">
                <p>
                  Transesterification, separation, vacuum methanol recovery and distillation engineered with CARBON — every unit in the train, holding EN 14214 at every batch.
                </p>
              </div>
            </div>

            {/* Step 03 */}
            <div
              className={`mx-step ${activeStep === 3 ? 'is-current' : ''} ${
                reachedSteps.includes(3) ? 'is-reached' : ''
              }`}
              onClick={() => setActiveStep(3)}
              onMouseEnter={() => setActiveStep(3)}
            >
              <div className="mx-step__icon">
                <div className="mx-step__icon-wrapper">
                  <svg aria-hidden="true" className="fa-award" viewBox="0 0 384 512" xmlns="http://www.w3.org/2000/svg">
                    <path d="M97.12 362.63c-8.69-8.69-4.16-6.24-25.12-11.85-9.51-2.55-17.87-7.45-25.43-13.32L1.2 448.7c-4.39 10.77 3.81 22.47 15.43 22.03l52.69-2.01L105.56 507c8 8.44 22.04 5.81 26.43-4.96l52.05-127.62c-10.84 6.04-22.87 9.58-35.31 9.58-19.5 0-37.82-7.59-51.61-21.37zM382.8 448.7l-45.37-111.24c-7.56 5.88-15.92 10.77-25.43 13.32-21.07 5.64-16.45 3.18-25.12 11.85-13.79 13.78-32.12 21.37-51.62 21.37-12.44 0-24.47-3.55-35.31-9.58L252 502.04c4.39 10.77 18.44 13.4 26.43 4.96l36.25-38.28 52.69 2.01c11.62.44 19.82-11.27 15.43-22.03zM263 340c15.28-15.55 17.03-14.21 38.79-20.14 13.89-3.79 24.75-14.84 28.47-28.98 7.48-28.4 5.54-24.97 25.95-45.75 10.17-10.35 14.14-25.44 10.42-39.58-7.47-28.38-7.48-24.42 0-52.83 3.72-14.14-.25-29.23-10.42-39.58-20.41-20.78-18.47-17.36-25.95-45.75-3.72-14.14-14.58-25.19-28.47-28.98-27.88-7.61-24.52-5.62-44.95-26.41-10.17-10.35-25-14.4-38.89-10.61-27.87 7.6-23.98 7.61-51.9 0-13.89-3.79-28.72.25-38.89 10.61-20.41 20.78-17.05 18.8-44.94 26.41-13.89 3.79-24.75 14.84-28.47 28.98-7.47 28.39-5.54 24.97-25.95 45.75-10.17 10.35-14.15 25.44-10.42 39.58 7.47 28.36 7.48 24.4 0 52.82-3.72 14.14.25 29.23 10.42 39.59 20.41 20.78 18.47 17.35 25.95 45.75 3.72 14.14 14.58 25.19 28.47 28.98C104.6 325.96 106.27 325 121 340c13.23 13.47 33.84 15.88 49.74 5.82a39.676 39.676 0 0 1 42.53 0c15.89 10.06 36.5 7.65 49.73-5.82zM97.66 175.96c0-53.03 42.24-96.02 94.34-96.02s94.34 42.99 94.34 96.02-42.24 96.02-94.34 96.02-94.34-42.99-94.34-96.02z" />
                  </svg>
                </div>
              </div>
              <div className="mx-step__num">
                <span className="mx-step__num-badge">03</span>
              </div>
              <div className="mx-step__title">
                <h3>Certify &amp; Export</h3>
              </div>
              <div className="mx-step__text">
                <p>
                  ISCC EU mass-balance certified FAME, UCOME and glycerin, shipped Ex-Works Alexandria to buyers across Europe and Africa.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
