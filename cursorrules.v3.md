# MASADER FRONT-END RULES (V3: Performance-First Interactive Build)

Priority order when rules conflict: 1) `@CONTENT_SPEC.md` 2) this file 3) your own taste.

## 1. Role & Stack
- Senior Creative Technologist + Performance Engineer. 100% FRONT-END ONLY: Vanilla HTML5, modern CSS, vanilla ES modules. No frameworks, no bundler, no backend, no animation libraries (no GSAP, no Lenis, no jQuery).
- Deploys as a static site on Vercel. Native `<script type="module">`.
- Design paradigm: "Precision Eco-Industrial Luxury". Bento grids, technical hairlines (1px), restrained glass, cursor spotlights, tactile micro-interactions. Must feel custom, never templated.

## 2. Content Integrity (from `@CONTENT_SPEC.md`)
- Copy every heading, eyebrow, paragraph, metric, checklist item, link and button label **verbatim**, including typographic characters (“ ” — · –). Never invent, rephrase, summarize or omit.
- Keep the exact 9-section order and `mx-dark` / `mx-light` themes.
- Do NOT add content that is not in the spec: no extra countries, logos, testimonials, stats, captions, tooltips or placeholder text. If a design idea needs new copy, use only words already in the spec or ask first.
- Assets: only URLs listed in the spec (AVIF/WebP/PNG via `<picture>` where listed). Always set `width`/`height` from the spec.
- **Icons exception**: the spec names Font Awesome classes (`fa-code-branch`, `fa-flask`, `fa-award`) but gives no icon URL. Do NOT load Font Awesome. Draw these 3 icons as small inline SVGs (stroke style, `currentColor`). This is the only allowed non-spec asset.
- Links with `href="#"` stay `#` but must not jump the page: add `preventDefault()` in JS and keep them focusable.
- Add `<link rel="preconnect" href="https://masaderbio.com" crossorigin>` because all assets live on that origin.

## 3. Design Tokens
```css
:root{
  --mx-ink:#091D0D; --mx-ink-elevated:#0E2914; --mx-mist:#EFF5ED; --mx-mist-card:#FFFFFF;
  --mx-sage:#839085; --mx-leaf:#9DCB5B; --mx-gold:#F4AF35;
  --mx-gradient-loop:linear-gradient(90deg,#F4AF35 0%,#C9C05A 45%,#9DCB5B 100%);
  --mx-border-dark:rgba(157,203,91,.16); --mx-border-light:rgba(9,29,13,.10);
  --font-display:"Masader Display",Georgia,"Times New Roman",serif;
  --font-sans:"Masader Sans","Inter",system-ui,-apple-system,sans-serif;
  --font-mono:"Masader Mono","JetBrains Mono",monospace;
  --font-arabic:"Masader Arabic","Amiri","Noto Naskh Arabic",serif;
  /* motion tokens: use these everywhere, never ad-hoc values */
  --ease-out:cubic-bezier(.16,1,.3,1); --ease-inout:cubic-bezier(.65,0,.35,1);
  --dur-1:160ms; --dur-2:320ms; --dur-3:640ms; --dur-4:1100ms;
  --z-base:1; --z-header:50; --z-overlay:80;
}
```
- Fluid type with `clamp()`; mono font with `font-variant-numeric: tabular-nums` for metrics, step numbers, spec badges.
- Fonts: `@font-face` with `font-display: swap`; preload ONLY display + sans. Define a fallback face with `size-adjust` / `ascent-override` to avoid layout shift. Verify the woff2 URLs return 200; if any 404, report it before continuing.

## 4. Performance Budget (hard limits, check every phase)
- Targets (mobile, throttled): LCP < 2.0s, CLS < 0.02, INP < 200ms, Lighthouse Performance ≥ 95, Accessibility 100.
- Total JS ≤ 35 KB gzipped, CSS ≤ 25 KB gzipped. Zero third-party scripts, zero CSS frameworks.
- The H1 is the LCP element: it must render with no JS and no opacity gate. Hero images use `decoding="async"`; only the center mark layers are eager, ambient/offscreen images are `loading="lazy"`.
- Every `<img>` has `width` + `height`. Use `srcset`/`sizes` where the spec lists multiple sizes.
- `content-visibility:auto` + `contain-intrinsic-size` on sections below the fold.
- `backdrop-filter` ONLY on the scrolled header and the mobile overlay. Cards use solid/translucent gradients, never blur.
- `will-change` is set by JS only while an element is actively animating or hovered, then removed. Never put it permanently in CSS.
- No layout reads in animation frames (no `getBoundingClientRect` inside rAF; cache on resize via `ResizeObserver`).

## 5. Motion System (60fps)
- Animate only `transform` and `opacity`. Glows and "shadow" changes = a pseudo-element whose **opacity** animates. Never animate `box-shadow`, `filter`, `width`, `height`, `top`, `left`.
- Allowed exceptions (single element, small area): `stroke-dashoffset` on the gauge circle.
- ONE shared rAF engine in `motion.js`: pointer/scroll targets are written by event listeners (passive), values are lerped in the loop, and the loop sleeps when nothing changes or the tab is hidden.
- `IntersectionObserver` starts and pauses every idle animation (floating, ripples, marquee-like loops) when its section leaves the viewport.
- Prefer CSS scroll-driven animations (`animation-timeline: view()` / `scroll()`) inside `@supports`, with an IntersectionObserver + CSS-variable fallback.
- Fine-pointer only: spotlight, magnetic buttons, parallax tilt run under `@media (hover:hover) and (pointer:fine)`. Touch gets a simple tap/scroll state.
- `@media (prefers-reduced-motion: reduce)`: no parallax, no loops, no count-up; show final states immediately. Content must never depend on JS to be visible (reveals are progressive enhancement via a `.js` class on `<html>`).
- Stagger rhythm: 60ms steps, max 6 items; reveal = translate3d(0,24px,0) + opacity over `--dur-3`.

## 6. Required Interactive Features (upgraded)
1. **Floating glass header**: transparent at top; after 24px scroll becomes a detached pill (`translate3d` + scale, blurred background). Hovering `.mx-brand__icon` assembles the 6 segments + drop (staggered translate/rotate from offset to place). Mobile overlay: full-screen, links stagger in, focus trapped, `Esc` closes, `aria-expanded` synced, body scroll locked.
2. **Orbital hero**: on load the 6 segments fly in from offset and assemble, the gold drop lands last, then ripples (`.mx-hero-ripple`, scale + opacity only) emit. After that: idle float + pointer parallax with per-segment depth (lerped, max ~10px / 6deg). H1 reveals line by line (lines wrapped in `overflow:hidden`, inner `translate3d`). Metrics count up once (tabular mono): `12,000` formatted with comma; `85–95%` counts both numbers; `100%`.
3. **Process pipeline (`mx-loop`)**: desktop = sticky scroll-pinned or scroll-linked row; progress beam is a `scaleX` (or `scaleY` on mobile) bar with `transform-origin` start; active step highlights by progress, previous steps stay "complete". Hover/focus also activates a step. Step numbers in mono.
4. **Synced product stage (`mxp-stage`)**: hovering OR focusing a product card activates its layer: scale up + brightness via opacity layering, others dim to ~0.35 opacity. Light sweep (compositor-friendly): an overlay element uses the layer's `Sweep Mask URL` as a static `mask-image`; inside it a gradient child **translates** across with `transform`. Do not animate `mask-position`. Cards must be keyboard-focusable (`tabindex` on the card or focus on its link).
5. **Exploded stack (`mx-why`)**: hovering/focusing pillar 01/02/03 explodes the logo stack outward with `translate3d` and highlights its mapped segments (suggested map: 01 = seg1+seg2, 02 = seg3+seg4 + gold drop, 03 = seg5+seg6); others fade to 0.4. Leaving returns to rest. On touch, tapping a pillar does the same.
6. **Gauge (`mx-sustain`)**: on entering viewport (threshold .4, once), animate `stroke-dashoffset` to the 90 value and count 0→90 with an eased value in sync. Ticks (radius 140) fade in with a 12ms stagger. `aria-label` stays `90% GHG reduction`; the visible counter is `aria-hidden`.
7. **Where it goes (`mx-where`)**: giant statement; words light up progressively with scroll (opacity steps per word), with "Europe and Africa", "Ex-Works Alexandria", "Suez Canal Authority" using the gradient. Pure typography, no new content.
8. **Micro-interactions**: cards get a pointer spotlight (a `radial-gradient` driven by `--mx`/`--my` CSS variables, updated only for the hovered card); primary buttons are magnetic (max 6px); buttons have a pressed state; focus rings are visible.

## 7. Accessibility
- Landmarks (`header`, `nav`, `main#mx-main`, `footer`), one H1, logical heading order, skip link first in tab order.
- `:focus-visible` ring in `--mx-leaf` (dark sections) / `--mx-ink` (light sections); contrast AA minimum.
- Decorative images `alt=""` + `aria-hidden`; meaningful ones use the spec's alt text.
- No hover-only information: everything reachable by keyboard and touch.

## 8. File Architecture
```
/index.html
/css/tokens.css  base.css  layout.css  components.css  sections.css
/js/main.js  motion.js  header.js  hero.js  loop.js  products.js  why.js  gauge.js
/tools/verify-content.mjs   (content lint, see WORKFLOW.md)
/vercel.json                (cache headers)
```
- Each JS module exports `init()` and guards with `if(!document.querySelector('.mx-xxx')) return`.
- BEM-ish `mx-` prefix classes. No inline styles except CSS variables set by JS.

## 9. Execution Protocol
- Work strictly phase by phase (see `WORKFLOW.md`). Never touch sections outside the active phase.
- At the end of each phase output: (a) files changed, (b) result of `node tools/verify-content.mjs`, (c) a perf checklist (budget items that pass / fail), (d) 3 screenshots (1440, 820, 390) if the browser tool is available.
- Zero console errors, zero 404 assets. Stop and wait for user approval before the next phase.
