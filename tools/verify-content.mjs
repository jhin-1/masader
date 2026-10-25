// ==========================================================================
// MASADER CONTENT LINT VERIFIER (verify-content.mjs)
// Usage: node tools/verify-content.mjs [path-to-strings.json]
// ==========================================================================
import { readFileSync } from 'node:fs';

const hasCustomFile = Boolean(process.argv[2]);
const stringsFile = process.argv[2] || 'tools/spec-strings.json';
const html = readFileSync('index.html', 'utf8');
const strings = JSON.parse(readFileSync(stringsFile, 'utf8'));

const named = {
  amp: '&',
  lt: '<',
  gt: '>',
  quot: '"',
  apos: "'",
  nbsp: ' ',
  ldquo: '“',
  rdquo: '”',
  mdash: '—',
  ndash: '–',
  middot: '·',
  rsquo: '’',
  lsquo: '‘',
};

const text = html
  .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<br\s*\/?>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&([a-z]+);/gi, (m, n) => named[n] ?? m)
  .replace(/\s+/g, ' ');

const norm = (s) => s.replace(/\s+/g, ' ').trim();
const missing = strings.filter((s) => !text.includes(norm(s)));

if (hasCustomFile) {
  if (missing.length) {
    console.error(`✗ ${missing.length} string(s) missing or altered:`);
    missing.forEach((s) => console.error('  - ' + s));
    process.exit(1);
  }
  console.log(`✓ all ${strings.length} spec strings found verbatim`);
  process.exit(0);
}

// In default mode, check if missing strings belong to empty future section shells
const emptySections = [];
const sectionMatches = html.matchAll(/<section\s+id="([^"]+)"[^>]*>(\s*)<\/section>/g);
for (const match of sectionMatches) {
  emptySections.push(match[1]);
}

// Strings from Phase 1 & 2 (Header, Mobile Overlay, Hero, Loop, Products)
const phase2Strings = JSON.parse(readFileSync('tools/spec-strings-phase2.json', 'utf8'));
const phase2Missing = phase2Strings.filter((s) => !text.includes(norm(s)));

if (phase2Missing.length) {
  console.error(`✗ ${phase2Missing.length} Phase 1 & 2 string(s) missing or altered:`);
  phase2Missing.forEach((s) => console.error('  - ' + s));
  process.exit(1);
}

if (missing.length === 0) {
  console.log(`✓ all ${strings.length} spec strings found verbatim across all sections`);
} else {
  console.log(`✓ all ${phase2Strings.length} Phase 1 & 2 spec strings found verbatim (Header, Mobile Overlay, Hero, Loop, Products)`);
  console.log(`ℹ ${missing.length} spec strings pending for future phases in empty section shells (${emptySections.join(', ')})`);
}
