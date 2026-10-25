// ==========================================================================
// MASADER LOOP CONTROLLER (js/loop.js)
// Process pipeline progress beam & step interactions
// Strictly adhering to cursorrules.v3.md §4, §5 & §6.3
// ==========================================================================

import { registerTask, isReducedMotion, isFinePointer } from './motion.js';

export function init() {
  const section = document.querySelector('.mx-loop');
  if (!section) return;

  const beam = section.querySelector('.mx-pipeline__beam');
  const steps = Array.from(section.querySelectorAll('.mx-step'));
  if (!beam || steps.length === 0) return;

  // Cached layout metrics (prevent layout thrashing in rAF per §4)
  let sectionTop = 0;
  let sectionHeight = 0;
  let isMobile = window.innerWidth <= 820;
  let currentProgress = 0;
  let targetProgress = 0;
  let userSelectedStep = null;
  let isHovered = false;

  function updateMetrics() {
    const rect = section.getBoundingClientRect();
    const scrollY = window.scrollY || window.pageYOffset;
    sectionTop = rect.top + scrollY;
    sectionHeight = rect.height || 600;
    isMobile = window.innerWidth <= 820;
  }

  updateMetrics();
  window.addEventListener('resize', updateMetrics, { passive: true });

  // If reduced motion is requested, show all steps as complete immediately (§5)
  if (isReducedMotion()) {
    steps.forEach((step) => {
      step.classList.add('is-active', 'is-complete');
    });
    if (beam) {
      beam.style.transform = isMobile ? 'scaleY(1)' : 'scaleX(1)';
    }
    return;
  }

  function setStepStates(activeIndex) {
    steps.forEach((step, idx) => {
      const stepIndex = idx + 1;
      if (stepIndex < activeIndex) {
        step.classList.add('is-complete');
        step.classList.remove('is-active');
      } else if (stepIndex === activeIndex) {
        step.classList.add('is-active');
        step.classList.remove('is-complete');
      } else {
        step.classList.remove('is-active', 'is-complete');
      }
    });
  }

  // Calculate loop scroll progress
  function calculateProgress() {
    if (isHovered && userSelectedStep !== null) {
      const hoverTargets = [0.15, 0.55, 1.0];
      return hoverTargets[userSelectedStep - 1] ?? 0;
    }

    const scrollY = window.scrollY || window.pageYOffset;
    const vh = window.innerHeight;

    // Progress begins as section enters upper-mid viewport
    const startY = sectionTop - vh * 0.45;
    const distance = sectionHeight + vh * 0.1;
    const rawProgress = (scrollY - startY) / distance;
    return Math.max(0, Math.min(1, rawProgress));
  }

  // Register task with shared rAF engine
  const taskId = 'loop-pipeline-beam';
  registerTask(taskId, () => {
    targetProgress = calculateProgress();

    // Smooth linear interpolation
    const diff = targetProgress - currentProgress;
    if (Math.abs(diff) > 0.002) {
      currentProgress += diff * 0.12;
    } else {
      currentProgress = targetProgress;
    }

    // Apply compositor-only transform
    if (isMobile) {
      beam.style.transform = `scaleY(${currentProgress.toFixed(4)})`;
    } else {
      beam.style.transform = `scaleX(${currentProgress.toFixed(4)})`;
    }

    // Determine active and complete steps
    let activeStepNum = 1;
    if (userSelectedStep !== null && isHovered) {
      activeStepNum = userSelectedStep;
    } else if (currentProgress >= 0.75) {
      activeStepNum = 3;
    } else if (currentProgress >= 0.35) {
      activeStepNum = 2;
    } else {
      activeStepNum = 1;
    }

    setStepStates(activeStepNum);

    return Math.abs(diff) > 0.001;
  });

  // Passive scroll listener
  window.addEventListener(
    'scroll',
    () => {
      targetProgress = calculateProgress();
    },
    { passive: true }
  );

  // Hover & Keyboard focus interaction on step cards
  steps.forEach((step, idx) => {
    const stepNum = idx + 1;

    // Hover interactions
    step.addEventListener('pointerenter', () => {
      isHovered = true;
      userSelectedStep = stepNum;
      setStepStates(stepNum);
    });

    step.addEventListener('pointerleave', () => {
      isHovered = false;
      userSelectedStep = null;
    });

    // Pointer spotlight coordinate tracking on card (§6.8)
    if (isFinePointer()) {
      step.addEventListener(
        'pointermove',
        (e) => {
          const card = step.querySelector('.mx-step__card');
          if (!card) return;
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mx', `${x}px`);
          card.style.setProperty('--my', `${y}px`);
        },
        { passive: true }
      );
    }

    // Accessible keyboard focus interactions
    step.addEventListener('focus', () => {
      userSelectedStep = stepNum;
      setStepStates(stepNum);
    });

    step.addEventListener('blur', () => {
      userSelectedStep = null;
    });

    step.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        userSelectedStep = stepNum;
        setStepStates(stepNum);
      }
    });
  });
}
