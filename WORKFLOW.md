# MASADER × ANTIGRAVITY WORKFLOW

## Setup (once)
1. Put `CONTENT_SPEC.md` and `cursorrules.v3.md` in the project root. Antigravity does not auto-read a file called `cursorrules.md`, so either save the rules where your version loads rules from (check the Customizations / Rules panel; commonly `.agent/rules/`), or mention `@cursorrules.v3.md` in every prompt like you do with the spec.
2. Create `tools/verify-content.mjs` (below) and a `tools/spec-strings.json` file (prompt in Phase 0).
3. Use Planning mode for each phase. Ask the agent to show its plan first, and only then approve.
4. Deploy to Vercel from Git; every push gives a preview URL to review.

## Phases

### Phase 0: Foundation (no visuals yet)
Prompt:
> Read @CONTENT_SPEC.md and @cursorrules.v3.md fully. Do ONLY this: create the file architecture, `tokens.css` and `base.css`, font-face + fallback metrics, the empty 9 section shells with the right `mx-dark`/`mx-light` classes and ids, `vercel.json` cache headers, and `tools/spec-strings.json` (every verbatim text string from the spec: eyebrows, headings, leads, buttons, list items, metric labels, footer text). Check that every font URL in the spec returns 200 and report. Stop and wait.

### Phase 1: Header + Hero (+ motion engine)
> Phase 1 only: sections 3, 4 and 5.1 (header, mobile overlay, hero). Build `motion.js` (single rAF engine) first, then header.js and hero.js per rules §6 items 1-2. Run `node tools/verify-content.mjs` and the perf checklist. Screenshots at 1440/820/390. Stop.

### Phase 2: Loop + Products
> Phase 2 only: `mx-loop` and `mx-products` per §6 items 3-4 (compositor-only sweep, no mask-position animation). Inline SVG for the 3 step icons. Run the checks. Stop.

### Phase 3: Why + Sustain + Where + News + CTA + Footer
> Phase 3 only: remaining sections per §6 items 5-8. Run the checks. Stop.

### Phase 4: Polish, performance, accessibility
> Phase 4: no new features. Run Lighthouse mobile on the preview, fix everything under budget (§4). Record a trace of scroll through the page and fix any long frames. Keyboard-only pass, reduced-motion pass, 320px and 1920px pass. Report before/after numbers.

## Per-phase review checklist (for you)
- [ ] Content lint passes (no missing or changed text)
- [ ] No console errors / 404s (open DevTools Network, filter by failed)
- [ ] Scroll feels smooth on a mid-range phone, not only your laptop
- [ ] Hover AND keyboard focus both trigger interactions
- [ ] Reduced motion on shows final states
- [ ] DevTools > Performance: no red frames while scrolling

## Tips to get better output from the agent
- One phase per conversation turn; never "build the whole site".
- If it adds copy not in the spec, answer: "Remove it. Content must be verbatim from @CONTENT_SPEC.md."
- When something looks generic, give a concrete reference ("make the hairlines and spacing feel like a technical drawing"), not "make it more modern".
- Ask it to use the browser tool for screenshots and to compare against the previous phase.

## `tools/verify-content.mjs`
```js
// usage: node tools/verify-content.mjs   (needs index.html + tools/spec-strings.json: an array of strings)
import { readFileSync } from 'node:fs';

const html = readFileSync('index.html', 'utf8');
const strings = JSON.parse(readFileSync('tools/spec-strings.json', 'utf8'));

const named = { amp:'&', lt:'<', gt:'>', quot:'"', apos:"'", nbsp:' ', ldquo:'“', rdquo:'”', mdash:'—', ndash:'–', middot:'·', rsquo:'’', lsquo:'‘' };
const text = html
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&([a-z]+);/gi, (m, n) => named[n] ?? m)
  .replace(/\s+/g, ' ');

const norm = s => s.replace(/\s+/g, ' ').trim();
const missing = strings.filter(s => !text.includes(norm(s)));

if (missing.length) {
  console.error(`✗ ${missing.length} string(s) missing or altered:`);
  missing.forEach(s => console.error('  - ' + s));
  process.exit(1);
}
console.log(`✓ all ${strings.length} spec strings found verbatim`);
```
Note: text that the JS count-up writes (12,000 / 85–95% / 90) must also exist in the static HTML as the final value, so the lint and no-JS users both see it. The script strips tags, so split text such as the H1 with `<br>` and the gradient span still matches after whitespace normalisation.

## `vercel.json`
```json
{
  "headers": [
    { "source": "/(css|js)/(.*)", "headers": [{ "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }] },
    { "source": "/(.*)", "headers": [
      { "key": "X-Content-Type-Options", "value": "nosniff" },
      { "key": "Referrer-Policy", "value": "strict-origin-when-cross-origin" }
    ]}
  ]
}
```
If you serve CSS/JS without hashed filenames, drop `immutable` or use a short max-age while iterating.
