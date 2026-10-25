// ==========================================================================
// MASADER HEADER CONTROLLER (js/header.js)
// Floating glass header, brand segment hover assembly & accessible mobile overlay
// Strictly adhering to cursorrules.v3.md §6.1
// ==========================================================================

import { registerTask, unregisterTask, isFinePointer, isReducedMotion } from './motion.js';

export function init() {
  const header = document.querySelector('.mx-site-header');
  if (!header) return;

  const burgerBtn = header.querySelector('.mx-burger');
  const menuOverlay = document.getElementById('mx-menu-overlay');
  const closeBtn = menuOverlay ? menuOverlay.querySelector('.mx-menu-overlay__close') : null;
  const brandLink = header.querySelector('.mx-brand');
  const brandIcon = header.querySelector('.mx-brand__icon');

  // ------------------------------------------------------------------------
  // 1. Floating Smart Glass Header (Detached pill after 24px scroll)
  // ------------------------------------------------------------------------
  let isScrolled = false;
  const SCROLL_THRESHOLD = 24;

  function updateHeaderScroll() {
    const scrollY = window.scrollY || 0;
    const shouldBeScrolled = scrollY > SCROLL_THRESHOLD;

    if (shouldBeScrolled !== isScrolled) {
      isScrolled = shouldBeScrolled;
      if (isScrolled) {
        header.classList.add('is-scrolled');
      } else {
        header.classList.remove('is-scrolled');
      }
    }
  }

  // Initial check and scroll registration
  updateHeaderScroll();
  window.addEventListener('scroll', updateHeaderScroll, { passive: true });

  // ------------------------------------------------------------------------
  // 2. Interactive Segment Hover Assembly on .mx-brand__icon
  // ------------------------------------------------------------------------
  if (brandLink && brandIcon && !isReducedMotion()) {
    const segments = brandIcon.querySelectorAll('.mx-brand__seg');
    const drop = brandIcon.querySelector('.mx-brand__drop');

    const handleEnter = () => {
      brandIcon.classList.add('is-assembling');
    };

    const handleLeave = () => {
      brandIcon.classList.remove('is-assembling');
    };

    brandLink.addEventListener('mouseenter', handleEnter);
    brandLink.addEventListener('mouseleave', handleLeave);
    brandLink.addEventListener('focus', handleEnter);
    brandLink.addEventListener('blur', handleLeave);
  }

  // ------------------------------------------------------------------------
  // 3. Full-Screen Accessible Mobile Menu Overlay
  // ------------------------------------------------------------------------
  if (burgerBtn && menuOverlay) {
    let isOpen = false;
    let previousActiveElement = null;

    // Get all keyboard focusable items inside overlay
    const getFocusableElements = () => {
      return Array.from(
        menuOverlay.querySelectorAll(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      );
    };

    const openMenu = () => {
      if (isOpen) return;
      isOpen = true;
      previousActiveElement = document.activeElement;

      // Update ARIA attributes
      burgerBtn.setAttribute('aria-expanded', 'true');
      menuOverlay.setAttribute('aria-hidden', 'false');
      menuOverlay.classList.add('is-open');
      document.body.classList.add('mx-menu-locked');

      // Focus first interactive link in menu after transition starts
      const focusables = getFocusableElements();
      if (focusables.length > 0) {
        setTimeout(() => {
          focusables[0].focus();
        }, 120);
      }
    };

    const closeMenu = () => {
      if (!isOpen) return;
      isOpen = false;

      // Update ARIA attributes
      burgerBtn.setAttribute('aria-expanded', 'false');
      menuOverlay.setAttribute('aria-hidden', 'true');
      menuOverlay.classList.remove('is-open');
      document.body.classList.remove('mx-menu-locked');

      // Restore focus to trigger button
      if (previousActiveElement && typeof previousActiveElement.focus === 'function') {
        previousActiveElement.focus();
      } else {
        burgerBtn.focus();
      }
    };

    const toggleMenu = () => {
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    };

    burgerBtn.addEventListener('click', toggleMenu);

    if (closeBtn) {
      closeBtn.addEventListener('click', closeMenu);
    }

    // Close on navigation link click
    const overlayLinks = menuOverlay.querySelectorAll('a');
    overlayLinks.forEach((link) => {
      link.addEventListener('click', () => {
        closeMenu();
      });
    });

    // Close on backdrop click (click outside content)
    menuOverlay.addEventListener('click', (e) => {
      if (e.target === menuOverlay) {
        closeMenu();
      }
    });

    // Keyboard Trap and Escape Key Handling (cursorrules.v3.md §6.1)
    menuOverlay.addEventListener('keydown', (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        closeMenu();
        return;
      }

      if (e.key === 'Tab') {
        const focusables = getFocusableElements();
        if (focusables.length === 0) return;

        const firstElement = focusables[0];
        const lastElement = focusables[focusables.length - 1];

        if (e.shiftKey) {
          // Shift + Tab
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          // Tab
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    });
  }
}
