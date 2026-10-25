// ==========================================================================
// MASADER GAUGE CONTROLLER (js/gauge.js)
// Sustainability gauge SVG dashoffset & numeric count-up
// Strictly adhering to cursorrules.v3.md §4, §5 & §6.6
// ==========================================================================

import { isReducedMotion, registerTask, unregisterTask } from './motion.js';

export function init() {
  const section = document.querySelector('.mx-sustain');
  if (!section) return;

  const gauge = section.querySelector('.mx-gauge');
  const progressCircle = section.querySelector('#mx-gauge-progress');
  const counterVal = section.querySelector('#mx-gauge-val');
  if (!gauge || !progressCircle || !counterVal) return;

  const targetValue = 90;
  let hasTriggered = false;

  // Immediate final state for reduced motion
  if (isReducedMotion()) {
    gauge.classList.add('is-active');
    progressCircle.style.strokeDashoffset = '0';
    counterVal.textContent = String(targetValue);
    return;
  }

  // Pre-animation state: progress empty (dashoffset 90), counter at 0
  progressCircle.style.strokeDashoffset = '90';
  counterVal.textContent = '0';

  /**
   * Easing function matching --ease-out: cubic-bezier(.16, 1, .3, 1)
   */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  /**
   * Run the synchronized gauge arc & counter animation once (§6.6)
   */
  function runGaugeAnimation() {
    if (hasTriggered) return;
    hasTriggered = true;

    // Activate gauge ticks (triggers CSS 12ms stagger animation)
    gauge.classList.add('is-active');

    const duration = 1200; // ms
    const startTime = performance.now();

    registerTask('sustain-gauge', () => {
      const now = performance.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      // Dashoffset from 90 (0% fill) down to 0 (90% fill)
      const currentOffset = 90 * (1 - eased);
      progressCircle.style.strokeDashoffset = currentOffset.toFixed(2);

      // Numeric count-up synchronized
      const currentNumber = Math.round(eased * targetValue);
      counterVal.textContent = String(currentNumber);

      if (progress >= 1) {
        progressCircle.style.strokeDashoffset = '0';
        counterVal.textContent = String(targetValue);
        unregisterTask('sustain-gauge');
        return false;
      }

      return true;
    });
  }

  // IntersectionObserver at threshold 0.4 once per §6.6
  if (typeof IntersectionObserver !== 'undefined') {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
            runGaugeAnimation();
            observer.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(section);
  } else {
    // Fallback if IntersectionObserver unsupported
    runGaugeAnimation();
  }
}
