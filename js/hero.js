// ==========================================================================
// MASADER HERO CONTROLLER (js/hero.js)
// Orbital assembly, ripples, idle float, 3D pointer parallax & count-up metrics
// Strictly adhering to cursorrules.v3.md §4, §5 & §6.2
// ==========================================================================

import {
  registerTask,
  unregisterTask,
  pointerState,
  isFinePointer,
  isReducedMotion,
  lerp,
  observeSectionVisibility,
  wakeEngine,
} from './motion.js';

export function init() {
  const heroSection = document.querySelector('.mx-hero');
  if (!heroSection) return;

  const visualOrbit = heroSection.querySelector('.mx-visual--orbit');
  const markWrap = heroSection.querySelector('.mx-hero__mark-wrap');
  const markContainer = heroSection.querySelector('.mx-hero__mark');
  const wordmarks = heroSection.querySelector('.mx-hero__wordmarks');
  const segments = heroSection.querySelectorAll('.mx-hero-seg');
  const drop = heroSection.querySelector('.mx-hero-drop');
  const ripples = heroSection.querySelectorAll('.mx-hero-ripple');
  const metricValues = heroSection.querySelectorAll('.mx-hero__metric-value');
  const primaryButtons = heroSection.querySelectorAll('.mx-btn--primary');

  const reducedMotion = isReducedMotion();

  // ------------------------------------------------------------------------
  // 1. Orbital Assembly Sequence on Load
  // ------------------------------------------------------------------------
  let isAssembled = false;

  function runAssembly() {
    if (reducedMotion || !visualOrbit) {
      if (visualOrbit) visualOrbit.classList.add('is-assembled');
      isAssembled = true;
      return;
    }

    // Set initial entrance state via classes
    visualOrbit.classList.add('is-animating');

    // Clockwise order of segments: 1, 2, 4, 6, 5, 3
    const clockwiseOrder = [1, 2, 4, 6, 5, 3];
    clockwiseOrder.forEach((segNum, idx) => {
      const segEl = heroSection.querySelector(`.mx-hero-seg--${segNum}`);
      if (segEl) {
        segEl.style.transitionDelay = `${idx * 75}ms`;
      }
    });

    // After segments settle (~450ms), trigger gold drop land
    setTimeout(() => {
      if (drop) {
        drop.classList.add('has-landed');
      }

      // 200ms after drop lands, emit the 3 ripples
      setTimeout(() => {
        ripples.forEach((ripple, idx) => {
          setTimeout(() => {
            ripple.classList.add('is-pulsing');
          }, idx * 180);
        });

        // Mark as fully assembled to reveal wordmarks and activate idle float & parallax
        setTimeout(() => {
          visualOrbit.classList.remove('is-animating');
          visualOrbit.classList.add('is-assembled');
          isAssembled = true;
          wakeEngine();
        }, 500);
      }, 200);
    }, 400);
  }

  // ------------------------------------------------------------------------
  // 2. Idle Floating & Per-Segment Parallax Motion in Shared rAF Loop
  // ------------------------------------------------------------------------
  // Segment parallax depth multipliers
  const segmentDepths = [0.7, 0.9, 1.1, 1.3, 0.8, 1.0];
  const dropDepth = 1.45;

  let isHeroVisible = true;

  function heroMotionTask(delta, elapsed) {
    if (!isHeroVisible) return false;
    if (reducedMotion) return false;
    if (!isAssembled) return true;

    // Idle sinusoidal floating on the unified markWrap container (mark + wordmarks float together)
    const floatY = Math.sin(elapsed * 1.5) * 6;
    const floatRotate = Math.cos(elapsed * 1.2) * 0.7;

    if (markWrap) {
      markWrap.style.transform = `translate3d(0, ${floatY.toFixed(2)}px, 0) rotate(${floatRotate.toFixed(2)}deg)`;
    }

    // Per-segment parallax on fine pointers
    if (isFinePointer() && segments.length === 6) {
      const normX = pointerState.normX;
      const normY = pointerState.normY;

      // Update segments
      segments.forEach((seg, idx) => {
        const depth = segmentDepths[idx] || 1;
        const tx = (normX * 10 * depth).toFixed(2);
        const ty = (normY * 10 * depth).toFixed(2);
        const r = (normX * 3.5 * depth).toFixed(2);
        seg.style.transform = `translate3d(${tx}px, ${ty}px, 0) rotate(${r}deg)`;
      });

      // Update gold drop (forward parallax)
      if (drop) {
        const dtx = (normX * 14 * dropDepth).toFixed(2);
        const dty = (normY * 14 * dropDepth).toFixed(2);
        drop.style.transform = `translate3d(${dtx}px, ${dty}px, 0)`;
      }

      // Wordmarks subtle parallax follow
      if (wordmarks) {
        const wtx = (normX * 5).toFixed(2);
        const wty = (normY * 5).toFixed(2);
        wordmarks.style.transform = `translate3d(${wtx}px, ${wty}px, 0)`;
      }
    }

    return true; // Keep idle loop active while hero is visible
  }

  // Register task with motion engine
  registerTask('hero-motion', heroMotionTask);

  // Pause motion when hero is scrolled out of view to save battery & CPU
  observeSectionVisibility(
    heroSection,
    () => {
      isHeroVisible = true;
      wakeEngine();
    },
    () => {
      isHeroVisible = false;
    },
    0.05
  );

  // ------------------------------------------------------------------------
  // 3. Tabular Mono Metrics Count-Up (Single run on viewport entry)
  // ------------------------------------------------------------------------
  let hasCountedMetrics = false;

  function countUpMetrics() {
    if (hasCountedMetrics || reducedMotion) return;
    hasCountedMetrics = true;

    const DURATION = 1100; // ms
    const startTime = performance.now();

    const metric1El = heroSection.querySelector('[data-format="comma"]');
    const metric2El = heroSection.querySelector('[data-format="range"]');
    const metric3El = heroSection.querySelector('[data-format="percent"]');

    function updateCounter(now) {
      const progress = Math.min((now - startTime) / DURATION, 1);
      // Cubic ease-out: 1 - (1 - t)^3
      const ease = 1 - Math.pow(1 - progress, 3);

      if (metric1El) {
        const val1 = Math.round(ease * 12000);
        metric1El.textContent = val1.toLocaleString('en-US');
      }

      if (metric2El) {
        const low = Math.round(ease * 85);
        const high = Math.round(ease * 95);
        metric2El.textContent = `${low}–${high}%`;
      }

      if (metric3El) {
        const val3 = Math.round(ease * 100);
        metric3El.textContent = `${val3}%`;
      }

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        // Ensure exact final verbatim values at completion
        if (metric1El) metric1El.textContent = '12,000';
        if (metric2El) metric2El.textContent = '85–95%';
        if (metric3El) metric3El.textContent = '100%';
      }
    }

    requestAnimationFrame(updateCounter);
  }

  // Trigger metrics count-up once when hero enters viewport
  observeSectionVisibility(
    heroSection,
    () => {
      countUpMetrics();
    },
    null,
    0.2
  );

  // ------------------------------------------------------------------------
  // 4. Magnetic Buttons Micro-interaction (cursorrules.v3.md §6.8)
  // ------------------------------------------------------------------------
  if (isFinePointer() && !reducedMotion) {
    primaryButtons.forEach((btn) => {
      let isHovered = false;
      let btnRect = null;

      const onEnter = () => {
        isHovered = true;
        btnRect = btn.getBoundingClientRect(); // Cached on enter, not inside rAF loop
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

  // Trigger initial assembly
  runAssembly();
}
