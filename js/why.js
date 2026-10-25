// ==========================================================================
// MASADER WHY CONTROLLER (js/why.js)
// Exploded logo stack deconstruction & value pillar interactions
// Strictly adhering to cursorrules.v3.md §4, §5 & §6.5
// ==========================================================================

import { isReducedMotion, isFinePointer } from './motion.js';

export function init() {
  const section = document.querySelector('.mx-why');
  if (!section) return;

  const stack = section.querySelector('#mx-logo-stack');
  const pillars = section.querySelectorAll('.mx-value');
  if (!stack || pillars.length === 0) return;

  let activePillar = null;

  /**
   * Activate a specific pillar by number ('01', '02', '03') or null for rest
   */
  function setActivePillar(pillarNum) {
    activePillar = pillarNum;

    // Update pillar card classes
    pillars.forEach((p) => {
      const pNum = p.getAttribute('data-pillar');
      if (pillarNum && pNum === pillarNum) {
        p.classList.add('is-active');
      } else {
        p.classList.remove('is-active');
      }
    });

    // Update logo stack exploded state
    if (pillarNum) {
      stack.classList.add('is-exploded');
      stack.setAttribute('data-active-pillar', pillarNum);
    } else {
      stack.classList.remove('is-exploded');
      stack.removeAttribute('data-active-pillar');
    }
  }

  // Attach event handlers to each pillar
  pillars.forEach((pillar) => {
    const pillarNum = pillar.getAttribute('data-pillar');
    const card = pillar.querySelector('.mx-value__card');

    // Pointer hover (fine pointer)
    pillar.addEventListener('mouseenter', () => {
      setActivePillar(pillarNum);
    });

    pillar.addEventListener('mouseleave', () => {
      if (activePillar === pillarNum) {
        setActivePillar(null);
      }
    });

    // Keyboard focus & blur
    pillar.addEventListener('focus', () => {
      setActivePillar(pillarNum);
    });

    pillar.addEventListener('blur', () => {
      // Delay check slightly in case focus moved within same pillar
      setTimeout(() => {
        if (!pillar.contains(document.activeElement)) {
          if (activePillar === pillarNum) {
            setActivePillar(null);
          }
        }
      }, 20);
    });

    // Touch / click toggle
    pillar.addEventListener('click', (e) => {
      // Don't intercept clicks on inner links
      if (e.target.closest('a')) return;

      if (activePillar === pillarNum) {
        setActivePillar(null);
      } else {
        setActivePillar(pillarNum);
      }
    });

    // Pointer spotlight tracking (--mx, --my) per §6.8
    if (card && isFinePointer()) {
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
    }
  });

  // Tap outside resets touch selection
  document.addEventListener('click', (e) => {
    if (!section.contains(e.target) && activePillar !== null) {
      setActivePillar(null);
    }
  });
}
