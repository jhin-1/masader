// ==========================================================================
// MASADER MOTION ENGINE (js/motion.js)
// Single shared rAF engine for smooth 60fps animations
// Strictly adhering to cursorrules.v3.md §4 & §5
// ==========================================================================

/**
 * Shared state for the single requestAnimationFrame engine.
 */
let isRunning = false;
let rafId = null;
let lastTimestamp = 0;

// Set of registered animation update tasks
// Each task: { id: string, update: (delta: number, elapsed: number) => boolean }
// If update() returns false, the task has settled and can sleep.
const tasks = new Map();

// Global scroll state (read passively, lerped/consumed without layout thrashing)
export const scrollState = {
  current: window.scrollY || 0,
  target: window.scrollY || 0,
  velocity: 0,
  max: 0,
};

// Global pointer state (fine-pointer only)
export const pointerState = {
  x: 0, // Pixels from viewport center
  y: 0,
  normX: 0, // -1 to +1
  normY: 0,
  targetNormX: 0,
  targetNormY: 0,
  isHovering: false,
};

// Hardware / Preference capabilities
export function isReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export function isFinePointer() {
  return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

/**
 * Standard linear interpolation
 */
export function lerp(start, end, factor) {
  return start + (end - start) * factor;
}

/**
 * Register a frame update callback with the shared engine
 * @param {string} id Unique identifier for the task
 * @param {(delta: number, elapsed: number) => boolean} updateFn Returns true if still animating, false if settled
 */
export function registerTask(id, updateFn) {
  tasks.set(id, updateFn);
  wakeEngine();
}

/**
 * Unregister an animation update task
 */
export function unregisterTask(id) {
  tasks.delete(id);
  if (tasks.size === 0) {
    sleepEngine();
  }
}

/**
 * Wake the single rAF loop if sleeping
 */
export function wakeEngine() {
  if (isRunning) return;
  if (document.visibilityState === 'hidden') return;
  isRunning = true;
  lastTimestamp = performance.now();
  rafId = requestAnimationFrame(tick);
}

/**
 * Sleep the rAF loop when all tasks have settled
 */
export function sleepEngine() {
  if (!isRunning) return;
  isRunning = false;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }
}

/**
 * Central tick execution
 */
let elapsedTotal = 0;
function tick(timestamp) {
  if (!isRunning) return;

  const delta = Math.min((timestamp - lastTimestamp) / 1000, 0.1); // Cap delta to avoid huge jumps
  lastTimestamp = timestamp;
  elapsedTotal += delta;

  // Lerp pointer target values toward actual
  if (isFinePointer()) {
    pointerState.normX = lerp(pointerState.normX, pointerState.targetNormX, 0.08);
    pointerState.normY = lerp(pointerState.normY, pointerState.targetNormY, 0.08);
  }

  // Execute all registered animation tasks
  let hasActiveTasks = false;
  tasks.forEach((updateFn, id) => {
    try {
      const stillActive = updateFn(delta, elapsedTotal);
      if (stillActive) {
        hasActiveTasks = true;
      }
    } catch (err) {
      console.error(`[MotionEngine] Error in task ${id}:`, err);
    }
  });

  // If no tasks require continuous animation and pointer settled, sleep to conserve power
  const pointerSettled =
    Math.abs(pointerState.normX - pointerState.targetNormX) < 0.001 &&
    Math.abs(pointerState.normY - pointerState.targetNormY) < 0.001;

  if (!hasActiveTasks && pointerSettled) {
    sleepEngine();
    return;
  }

  rafId = requestAnimationFrame(tick);
}

/**
 * Section Visibility Observer
 * Starts/pauses idle animations when sections enter or leave the viewport
 */
const sectionObservers = new WeakMap();

export function observeSectionVisibility(element, onEnter, onLeave, threshold = 0.1) {
  if (!element || typeof IntersectionObserver === 'undefined') return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (onEnter) onEnter();
          wakeEngine();
        } else {
          if (onLeave) onLeave();
        }
      });
    },
    { threshold }
  );

  observer.observe(element);
  sectionObservers.set(element, observer);
  return observer;
}

/**
 * Passive Global Event Listeners
 */
function setupGlobalEvents() {
  // Update scroll target passively without layout thrashing
  window.addEventListener(
    'scroll',
    () => {
      scrollState.target = window.scrollY;
      wakeEngine();
    },
    { passive: true }
  );

  // Update pointer coordinates only on fine pointers
  if (isFinePointer()) {
    window.addEventListener(
      'pointermove',
      (e) => {
        const halfW = window.innerWidth / 2;
        const halfH = window.innerHeight / 2;
        pointerState.x = e.clientX - halfW;
        pointerState.y = e.clientY - halfH;
        pointerState.targetNormX = pointerState.x / halfW;
        pointerState.targetNormY = pointerState.y / halfH;
        pointerState.isHovering = true;
        wakeEngine();
      },
      { passive: true }
    );

    document.addEventListener(
      'pointerleave',
      () => {
        pointerState.targetNormX = 0;
        pointerState.targetNormY = 0;
        pointerState.isHovering = false;
        wakeEngine();
      },
      { passive: true }
    );
  }

  // Handle visibility state change (sleep on background tab)
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      sleepEngine();
    } else {
      lastTimestamp = performance.now();
      wakeEngine();
    }
  });

  // Resize handler caches window boundaries
  window.addEventListener(
    'resize',
    () => {
      scrollState.max = document.documentElement.scrollHeight - window.innerHeight;
      wakeEngine();
    },
    { passive: true }
  );
}

/**
 * Initialize motion engine
 */
export function init() {
  setupGlobalEvents();
  wakeEngine();
}
