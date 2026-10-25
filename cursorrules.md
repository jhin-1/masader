# MASADER FRONT-END STRICT RULES (V2 — NEXT-GEN INTERACTIVE REDESIGN)

## 1. Role & Architectural Vision
- You are an Award-Winning Creative Technologist, Senior UI/UX Engineer, and Performance-Obsessed Front-End Architect.
- This is a **100% FRONT-END ONLY** project (Vanilla HTML5, Modern CSS3, Vanilla ES6+ JavaScript). NEVER create backend routes, APIs, database schemas, or external heavy frameworks unless explicitly requested.
- **Design Paradigm**: "Precision Eco-Industrial Luxury". Combine architectural Bento grids, glassmorphic depth, subtle technical hairlines (`1px solid`), radial mouse-tracking spotlights, and tactile micro-interactions. The visual layout MUST look distinct, modern, and elevated compared to a standard template while strictly respecting the brand's green/gold/ink identity.

## 2. Single Source of Truth (`@CONTENT_SPEC.md`)
- `@CONTENT_SPEC.md` is your absolute, unbreakable bible.
- **ZERO Content Hallucination**: You are strictly forbidden from inventing, rephrasing, summarizing, or omitting any heading, eyebrow, paragraph, metric, checklist item, link, or button label. Copy text 100% verbatim from `@CONTENT_SPEC.md`.
- **Strict Section Order**: Maintain the exact 9-section sequence and their designated themes (`mx-dark` vs `mx-light`) from `@CONTENT_SPEC.md`.
- **Exact Assets Only**: Use ONLY the exact image, font, and icon URLs listed in `@CONTENT_SPEC.md` (including `<picture>` tags with AVIF/WebP/PNG fallbacks where specified). Never use external placeholders.

## 3. Design Tokens & Visual System (Strictly Enforced)
- **Core Palette**:
  - `--mx-ink`: `#091D0D` (Primary Dark BG)
  - `--mx-ink-elevated`: `#0E2914` (Elevated Dark Bento Card Surface)
  - `--mx-mist`: `#EFF5ED` (Primary Light BG)
  - `--mx-mist-card`: `#FFFFFF` (Elevated Light Card Surface)
  - `--mx-sage`: `#839085` (Muted Text / Technical Labels)
  - `--mx-leaf`: `#9DCB5B` (Brand Green Accent / Glows)
  - `--mx-gold`: `#F4AF35` (Gold Accent)
  - `--mx-gradient-loop`: `linear-gradient(90deg, #F4AF35 0%, #C9C05A 45%, #9DCB5B 100%)`
  - `--mx-border-dark`: `rgba(157, 203, 91, 0.16)`
  - `--mx-border-light`: `rgba(9, 29, 13, 0.10)`
- **Typography**:
  - `--font-display`: `"Masader Display", Georgia, "Times New Roman", serif`
  - `--font-sans`: `"Masader Sans", "Inter", system-ui, -apple-system, sans-serif`
  - `--font-mono`: `"Masader Mono", "JetBrains Mono", monospace` (Use for metrics, step numbers `01-03`, capacities, and spec badges)
  - `--font-arabic`: `"Masader Arabic", "Amiri", "Noto Naskh Arabic", serif`

## 4. Interactive & Animation Engineering Standards (60fps Budget)
- **Hardware Acceleration Only**: Animate ONLY `transform` (`translate3d`, `scale`, `rotate`) and `opacity`. NEVER animate `top`, `left`, `width`, `height`, or `box-shadow` directly on scroll.
- **Required Interactive Features**:
  1. **Floating Smart Glass Header**: Detached pill/architectural header on scroll (`backdrop-filter: blur(16px)`), interactive segment hover assembly on `.mx-brand__icon`, and full-screen staggered mobile overlay.
  2. **3D Orbital Hero Visual**: Interactive mouse-parallax tilt on the 6 hexagon segments + gold drop (`mx-visual--orbit`), continuous subtle floating physics, expanding pulse ripples (`.mx-hero-ripple`), and count-up animation for the Metrics Bar.
  3. **Interactive Process Pipeline (`mx-loop`)**: Connected architectural Bento timeline where scrolling or hovering illuminates the active step (`01 Collect` -> `02 Process` -> `03 Certify & Export`) and animates a progress beam.
  4. **Synced Multi-Layer Product Stage (`mxp-stage`)**: Hovering or focusing on any product card (`cylinder`, `beaker`, `barrel`) in `.mx-products__list` MUST dynamically highlight, scale up, and trigger a CSS mask light-sweep across the corresponding layer in `.mxp-stage` while dimming non-active layers.
  5. **Exploded Deconstruction Stack (`mx-why`)**: Hovering Pillars `01`, `02`, `03` dynamically shifts and highlights the corresponding segments in `.mx-logo-stack`.
  6. **Scroll-Triggered SVG Gauge (`mx-sustain`)**: Animate `stroke-dashoffset` / `stroke-dasharray` on `.mx-gauge` from `0` to `90` with a synchronized numeric counter when entering the viewport.
- **Accessibility**: Always respect `@media (prefers-reduced-motion: reduce)` by disabling motion and showing final states immediately. Maintain full keyboard navigation (`:focus-visible`) and ARIA attributes.

## 5. Execution Protocol (4-Phase Workflow)
- Work **STRICTLY phase-by-phase**. Never jump ahead or modify sections outside the active prompt's scope.
- Write clean, modular, production-ready code with zero console errors and zero broken asset links.
- Wait for user verification and approval after each phase before proceeding.