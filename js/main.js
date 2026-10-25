// ==========================================================================
// MASADER MAIN APPLICATION ENTRY (js/main.js)
// Native ES Module bootstrapping and progressive enhancement
// ==========================================================================

import { init as initMotion } from './motion.js';
import { init as initHeader } from './header.js';
import { init as initHero } from './hero.js';
import { init as initLoop } from './loop.js';
import { init as initProducts } from './products.js';
import { init as initWhy } from './why.js';
import { init as initGauge } from './gauge.js';
import { init as initWhere } from './where.js';

function init() {
  // Add .js class to document element for progressive enhancement reveals
  document.documentElement.classList.add('js');

  // Prevent jumping on placeholder links while keeping them accessible/focusable
  document.addEventListener('click', (event) => {
    const link = event.target.closest('a[href="#"]');
    if (link) {
      event.preventDefault();
    }
  });

  // Initialize modular controllers
  initMotion();
  initHeader();
  initHero();
  initLoop();
  initProducts();
  initWhy();
  initGauge();
  initWhere();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
