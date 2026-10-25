// ==========================================================================
// MASADER WHERE & MICRO-INTERACTIONS (js/where.js)
// Progressive scroll illumination for mx-where statement & Phase 3 micro-interactions
// Strictly adhering to cursorrules.v3.md §4, §5, §6.7 & §6.8
// ==========================================================================

import { isReducedMotion, isFinePointer, registerTask, unregisterTask } from './motion.js';

export function init() {
  initWhereStatement();
  initMicroInteractions();
}

/**
 * Section 6: Where It Goes progressive word illumination (§6.7)
 */
function initWhereStatement() {
  const section = document.querySelector('.mx-where');
  if (!section) return;

  const words = section.querySelectorAll('.mx-word');
  if (words.length === 0) return;

  // Immediate final state if reduced motion is requested
  if (isReducedMotion()) {
    words.forEach((w) => w.classList.add('is-lit'));
    return;
  }

  let isIntersecting = false;
  let cachedRect = null;

  function updateRect() {
    cachedRect = section.getBoundingClientRect();
  }

  function updateWordIllumination() {
    if (!cachedRect) updateRect();

    const vh = window.innerHeight;
    // Enter threshold: when top enters 85% of viewport
    // Exit threshold: when bottom reaches top 15% of viewport
    const startY = vh * 0.85;
    const endY = vh * 0.2;
    const totalDist = startY - endY + cachedRect.height;
    const currentDist = startY - cachedRect.top;

    const progress = Math.max(0, Math.min(1, currentDist / totalDist));
    const activeCount = Math.ceil(progress * words.length);

    words.forEach((word, index) => {
      if (index < activeCount) {
        word.classList.add('is-lit');
      } else {
        word.classList.remove('is-lit');
      }
    });

    return isIntersecting;
  }

  // Optimize scroll tracking with IntersectionObserver
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isIntersecting = entry.isIntersecting;
          if (isIntersecting) {
            updateRect();
            updateWordIllumination();
            window.addEventListener('scroll', onScroll, { passive: true });
          } else {
            window.removeEventListener('scroll', onScroll);
          }
        });
      },
      { threshold: 0.05 }
    );

    observer.observe(section);
  } else {
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function onScroll() {
    updateRect();
    updateWordIllumination();
  }

  window.addEventListener('resize', updateRect, { passive: true });
}

/**
 * Micro-interactions: spotlights & magnetic buttons (§6.8)
 */
function initMicroInteractions() {
  if (!isFinePointer() || isReducedMotion()) return;

  // 1. Pointer spotlight on news and CTA cards
  const spotlightCards = document.querySelectorAll('.mx-news__card, .mx-cta__card');
  spotlightCards.forEach((card) => {
    card.addEventListener(
      'pointermove',
      (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mx', `${x.toFixed(1)}px`);
        card.style.setProperty('--my', `${y.toFixed(1)}px`);
      },
      { passive: true }
    );
  });

  // 2. Magnetic buttons (max 6px clamp)
  const magneticButtons = document.querySelectorAll(
    '.mx-sustain .mx-btn--primary, .mx-cta .mx-btn--phone, .mx-cta .mx-btn--dark'
  );

  magneticButtons.forEach((btn) => {
    let isHovered = false;
    let btnRect = null;

    const onEnter = () => {
      isHovered = true;
      btnRect = btn.getBoundingClientRect(); // Cached on enter, not in rAF
    };

    const onMove = (e) => {
      if (!isHovered || !btnRect) return;
      const centerX = btnRect.left + btnRect.width / 2;
      const centerY = btnRect.top + btnRect.height / 2;
      const deltaX = (e.clientX - centerX) * 0.18;
      const deltaY = (e.clientY - centerY) * 0.18;
      // Clamp to max 6px per rule §6.8
      const clampedX = Math.max(-6, Math.min(6, deltaX));
      const clampedY = Math.max(-6, Math.min(6, deltaY));
      btn.style.transform = `translate3d(${clampedX.toFixed(1)}px, ${clampedY.toFixed(1)}px, 0)`;
    };

    const onLeave = () => {
      isHovered = false;
      btn.style.transform = 'translate3d(0, 0, 0)';
    };

    btn.addEventListener('mouseenter', onEnter);
    btn.addEventListener('mousemove', onMove);
    btn.addEventListener('mouseleave', onLeave);
  });
}
