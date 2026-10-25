// ==========================================================================
// MASADER PRODUCTS CONTROLLER (js/products.js)
// Synced product stage & compositor-only light sweep engine
// Strictly adhering to cursorrules.v3.md §4, §5 & §6.4
// ==========================================================================

import { isReducedMotion, isFinePointer } from './motion.js';

export function init() {
  const section = document.querySelector('.mx-products');
  if (!section) return;

  const cardsList = section.querySelector('.mx-products__list');
  const cards = Array.from(section.querySelectorAll('.mx-product-card'));
  const stage = section.querySelector('.mxp-stage');
  const layers = Array.from(section.querySelectorAll('.mxp-layer--item'));

  if (!cardsList || cards.length === 0 || !stage || layers.length === 0) return;

  let activeProduct = 'cylinder'; // Default active product per spec (biodiesel cylinder)

  // Trigger compositor-only light sweep animation (§6.4)
  function triggerLightSweep(layer) {
    const beam = layer.querySelector('.mxp-sweep__beam');
    if (!beam) return;

    // Reset and trigger animation cleanly without layout thrashing
    beam.style.animation = 'none';
    void beam.offsetWidth; // Reflow trigger
    beam.style.animation = 'mxpLightSweep 800ms var(--ease-out) forwards';
  }

  // Activate specific product item and synchronize stage
  function activateProduct(productKey, shouldSweep = true) {
    if (!productKey) return;
    activeProduct = productKey;

    // Synchronize product cards
    cards.forEach((card) => {
      const isTarget = card.dataset.product === productKey;
      card.classList.toggle('is-active', isTarget);
      card.setAttribute('aria-selected', isTarget ? 'true' : 'false');
    });

    cardsList.classList.add('has-active');
    stage.classList.add('has-active');

    // Synchronize visual stage layers
    layers.forEach((layer) => {
      const isTarget = layer.dataset.layer === productKey;
      layer.classList.toggle('is-active', isTarget);

      if (isTarget && shouldSweep && !isReducedMotion()) {
        triggerLightSweep(layer);
      }
    });
  }

  // Attach card event listeners (Hover, Focus, Pointer Spotlight)
  cards.forEach((card) => {
    const productKey = card.dataset.product;

    // Hover interaction
    card.addEventListener('pointerenter', () => {
      activateProduct(productKey, true);
    });

    // Keyboard focus interaction (Card itself or inner links/buttons)
    card.addEventListener('focusin', () => {
      activateProduct(productKey, true);
    });

    // Click / touch selection
    card.addEventListener('click', () => {
      activateProduct(productKey, true);
    });

    // Keyboard Enter / Space support
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        if (e.target === card) {
          e.preventDefault();
          activateProduct(productKey, true);
        }
      }
    });

    // Cursor spotlight overlay tracking (--mx, --my) per §6.8
    if (isFinePointer()) {
      card.addEventListener(
        'pointermove',
        (e) => {
          const rect = card.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          card.style.setProperty('--mx', `${x}px`);
          card.style.setProperty('--my', `${y}px`);
        },
        { passive: true }
      );
    }
  });

  // Fallback image resilience for local development / offline network
  section.querySelectorAll('img').forEach((img) => {
    img.addEventListener(
      'error',
      () => {
        const src = img.getAttribute('src') || '';
        if (src.includes('masaderbio.com')) {
          const filename = src.split('/').pop();
          if (filename) {
            img.src = `/assets/web/${filename}`;
          }
        }
      },
      { once: true }
    );
  });

  // Initialize with default product active
  activateProduct(activeProduct, false);
}
