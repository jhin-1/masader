# MASADER CONTENT SPECIFICATION (`CONTENT_SPEC.md`)

> **Source URL**: `https://masaderbio.com/web/`  
> **Extraction Date**: 2026-10-23  
> **Note**: Contains the complete, exact content, structure, headings, copy, links, buttons, and asset URLs extracted directly from the live site without summarizing, paraphrasing, or altering text.

---

## 1. Document Metadata & SEO

- **Page Title**: `masader`
- **Language**: `en-US`
- **Robots**: `max-image-preview:large`
- **Canonical URL**: `https://masaderbio.com/web/`
- **Accessibility Skip Link**: `Skip to content` (href: `#mx-main`)

---

## 2. Global Design Tokens & Typography Assets

### Fonts
- **Display Font**: `"Masader Display", Georgia, "Times New Roman", serif`
  - Preload URL: `https://masaderbio.com/web/wp-content/themes/masader/assets/fonts/masader-display.woff2`
- **Body / Sans Font**: `"Masader Sans", "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif`
  - Preload URL: `https://masaderbio.com/web/wp-content/themes/masader/assets/fonts/masader-sans.woff2`
- **Monospace Font**: `"Masader Mono", "JetBrains Mono", ui-monospace, "SFMono-Regular", Consolas, monospace`
- **Arabic Font**: `"Masader Arabic", "Amiri", "Noto Naskh Arabic", serif`

### Core Color Palette
- **Ink (Dark Background / Primary Dark)**: `#091D0D`
- **Mist (Light Background)**: `#EFF5ED`
- **Sage (Muted Text / Secondary)**: `#839085`
- **Leaf (Green Brand Accent)**: `#9DCB5B`
- **Gold (Gold Accent)**: `#F4AF35`
- **Gradient Loop**: `linear-gradient(90deg, #F4AF35 0%, #C9C05A 45%, #9DCB5B 100%)`

---

## 3. Site Header (`mx-site-header`)

### Brand Link & Logo
- **Link**: `https://masaderbio.com/web/`
- **Aria Label**: `Masader مصادر`
- **Animated Icon Segments (`.mx-brand__icon`)**:
  - Full Icon: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/logo-icon-full-96.webp` (2x: `logo-icon-full-96.webp`, 3x: `logo-icon-full-144.webp`, width: 83, height: 96)
  - Segment 1 (top dark): `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg1-top-dark-96.webp` (3x: `seg1-top-dark-144.webp`)
  - Segment 2 (top right lime): `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg2-top-right-lime-96.webp` (3x: `seg2-top-right-lime-144.webp`)
  - Segment 3 (left dark): `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg3-left-dark-96.webp` (3x: `seg3-left-dark-144.webp`)
  - Segment 4 (right green): `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg4-right-green-96.webp` (3x: `seg4-right-green-144.webp`)
  - Segment 5 (bottom left): `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg5-bottom-left-96.webp` (3x: `seg5-bottom-left-144.webp`)
  - Segment 6 (bottom right): `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg6-bottom-right-96.webp` (3x: `seg6-bottom-right-144.webp`)
  - Center Drop (gold): `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/drop-gold-96.webp` (3x: `drop-gold-144.webp`)
- **Wordmark (`.mx-brand__word`)**:
  - Image: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/masader-wordmark-96.webp` (3x: `masader-wordmark-144.webp`, width: 170, height: 96)

### Primary Navigation Menu (`.mx-nav`)
1. `About Us` (href: `#`)
2. `Products` (href: `#`)
3. `Sustainability` (href: `#`)
4. `Facilities & Process` (href: `#`)
5. `Markets & Trading` (href: `#`)
6. `Careers` (href: `#`)
7. `Contact` (href: `https://masaderbio.com/web/contact/`)

### Header Call-to-Action Button (`.mx-header-cta`)
- **Button Text**: `Request a Quotation`
- **Link**: `https://masaderbio.com/web/contact/`

### Mobile Hamburger Menu Button (`.mx-burger`)
- **Screen Reader Text**: `Menu`
- **Target Controls**: `mx-menu-overlay`

---

## 4. Mobile Menu Overlay (`mx-menu-overlay`)

- **Overlay Navigation Items**:
  1. `About Us` (href: `#`)
  2. `Products` (href: `#`)
  3. `Sustainability` (href: `#`)
  4. `Facilities & Process` (href: `#`)
  5. `Markets & Trading` (href: `#`)
  6. `Careers` (href: `#`)
  7. `Contact` (href: `https://masaderbio.com/web/contact/`)
- **Overlay Call-to-Action Button**:
  - **Button Text**: `Request a Quotation`
  - **Link**: `https://masaderbio.com/web/contact/`

---

## 5. Main Content Sections

```
┌────────────────────────────────────────────────────────┐
│ 1. Hero Section (mx-hero, mx-dark)                    │
├────────────────────────────────────────────────────────┤
│ 2. How The Loop Closes (mx-loop, mx-light)            │
├────────────────────────────────────────────────────────┤
│ 3. Our Products (mx-products, mx-dark)                │
├────────────────────────────────────────────────────────┤
│ 4. Why Masader (mx-why, mx-light)                     │
├────────────────────────────────────────────────────────┤
│ 5. Sustainability & Certifications (mx-sustain, dark)  │
├────────────────────────────────────────────────────────┤
│ 6. Where It Goes (mx-where, mx-dark)                  │
├────────────────────────────────────────────────────────┤
│ 7. News & Insights (mx-news, mx-light)                │
├────────────────────────────────────────────────────────┤
│ 8. Call To Action (mx-cta)                            │
├────────────────────────────────────────────────────────┤
│ 9. Footer (mx-footer, mx-dark)                        │
└────────────────────────────────────────────────────────┘
```

---

### Section 1: Hero Section (`mx-hero`, Theme: Dark)

- **Eyebrow / Kicker**:
  - Exact Text: `Masader — Arabic for “resources” · ISCC EU certified`
  - Inline Markup: `Masader — Arabic for “resources” <span class="mx-hero__sep">·</span> ISCC EU certified`
- **Main Heading (H1)**:
  - Exact Text: `Waste finds its way back into the loop.`
  - Inline Markup:
    ```html
    <h1>Waste finds<br>its way back<br><span class="mx-gradient-text">into the loop.</span></h1>
    ```
- **Lead Text**:
  - Exact Copy: `ISCC EU-certified FAME, UCOME and glycerin from used cooking oil and recovered fatty-acid oils — 12,000 MTPA, engineered with CARBON, exported across Europe and Africa.`
- **Action Buttons**:
  - Primary Button: `Request a Quotation` (href: `https://masaderbio.com/web/contact/`)
  - Ghost Button: `Feedstock Partnerships` (href: `https://masaderbio.com/web/contact/`)
- **Metrics Bar**:
  - **Metric 1**:
    - Value: `12,000`
    - Label: `MTPA certified capacity`
  - **Metric 2**:
    - Value: `85–95%`
    - Label: `GHG reduction, UCOME`
  - **Metric 3**:
    - Value: `100%`
    - Label: `mass-balance traceable`

#### Hero Visual Component (`mx-hero__visual` / `mx-visual--orbit`)
- **Ambient Hexagon Segments (744w)**:
  - `seg1-top-dark-744.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg1-top-dark-744.webp`
  - `seg2-top-right-lime-744.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg2-top-right-lime-744.webp`
  - `seg3-left-dark-744.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg3-left-dark-744.webp`
  - `seg4-right-green-744.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg4-right-green-744.webp`
  - `seg5-bottom-left-744.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg5-bottom-left-744.webp`
  - `seg6-bottom-right-744.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg6-bottom-right-744.webp`
- **Center Mark Layers (aria-label: `Masader مصادر`)**:
  - Segments (372w / 744w):
    - `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg1-top-dark-372.webp`
    - `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg2-top-right-lime-372.webp`
    - `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg3-left-dark-372.webp`
    - `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg4-right-green-372.webp`
    - `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg5-bottom-left-372.webp`
    - `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg6-bottom-right-372.webp`
  - Gold Drop (372w / 744w):
    - `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/drop-gold-372.webp`
  - Ripples: 3 `.mx-hero-ripple` elements
  - Arabic Wordmark:
    - `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/arabic-wordmark-760.webp` (2x: `arabic-wordmark-1518.webp`, width: 1518, height: 563)
  - English Wordmark:
    - `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/english-wordmark-760.webp` (2x: `english-wordmark-1518.webp`, width: 1518, height: 219)

---

### Section 2: How The Loop Closes (`mx-loop`, Theme: Light)

- **Eyebrow**: `How the loop closes`
- **Heading (H2)**: `From spent oil to certified fuel, in three governed steps`
- **Lead Text**: `Every batch is tracked from feedstock intake to certificate — the chain of custody a European buyer needs is built into how we run the plant, not bolted on afterward.`
- **Checklist (`mx-checklist`)**:
  - Item 1: `ISCC EU certified chain of custody`
  - Item 2: `Fully traceable supply chain, intake to export`
  - Item 3: `EN 14214 specifications, every batch`
- **Scope Box (`mx-scope`)**:
  - **Title (H3)**: `Scope`
  - **Text**: `ISCC EU mass-balance certification covers UCOME, FAME and glycerin from intake through export documentation.`

#### Steps (`mx-loop__steps`)
- **Step 01**:
  - Number: `01`
  - Title (H3): `Collect`
  - Icon: Code branch icon (`fa-code-branch`)
  - Description: `Used cooking oil and recovered soap-stock / fatty-acid oils, sourced through our feedstock network and logged at intake.`
- **Step 02**:
  - Number: `02`
  - Title (H3): `Process`
  - Icon: Flask icon (`fa-flask`)
  - Description: `Transesterification, separation, vacuum methanol recovery and distillation engineered with CARBON — every unit in the train, holding EN 14214 at every batch.`
- **Step 03**:
  - Number: `03`
  - Title (H3): `Certify & Export`
  - Icon: Award ribbon icon (`fa-award`)
  - Description: `ISCC EU mass-balance certified FAME, UCOME and glycerin, shipped Ex-Works Alexandria to buyers across Europe and Africa.`

---

### Section 3: Our Products (`mx-products`, Theme: Dark)

- **Eyebrow**: `Our Products`
- **Heading (H2)**: `Specification-backed, export ready`
- **Lead Text**: `From the same UCOME stream entering our Alexandria plant, three certified lines leave it — biodiesel, glycerine, and soap-stock derivatives — each produced to specification, not approximated.`
- **Specification Line (`mx-specline`)**: `12,000 MTPA certified capacity · Ex-Works Alexandria · EN 14214`
- **Catalog Link**: `All products & data sheets` (href: `#`)

#### Interactive Products Visual Stage (`mxp-stage`)
- **Layer 1: Background (`mxp-layer--bg`)**:
  - AVIF: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/bg-558.avif`, `bg-1116.avif`
  - WebP: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/bg-558.webp`, `bg-1116.webp`
  - PNG Fallback: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/bg-1116.png` (width: 1116, height: 1130)
- **Layer 2: Steel Drum / Barrel (`mxp-layer--barrel`)**:
  - Alt: `Steel drum`
  - AVIF: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-292.avif`, `barrel-584.avif`
  - WebP: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-292.webp`, `barrel-584.webp`
  - PNG Fallback: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-584.png` (width: 584, height: 1028)
  - Sweep Mask URL: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-292.webp`
- **Layer 3: Graduated Cylinder (`mxp-layer--cylinder`)**:
  - Alt: `Graduated cylinder of biodiesel`
  - AVIF: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-143.avif`, `cylinder-286.avif`
  - WebP: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-143.webp`, `cylinder-286.webp`
  - PNG Fallback: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-286.png` (width: 286, height: 908)
  - Sweep Mask URL: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-143.webp`
- **Layer 4: Beaker (`mxp-layer--beaker`)**:
  - Alt: `Beaker of glycerine`
  - AVIF: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-138.avif`, `beaker-275.avif`
  - WebP: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-138.webp`, `beaker-275.webp`
  - PNG Fallback: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-275.png` (width: 275, height: 427)
  - Sweep Mask URL: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-138.webp`

#### Product Items (`mx-products__list`)
1. **Product 1 (`mx-product--cylinder`)**:
   - Title (H3): `Biodiesel — PURE & PUREMAX`
   - Description: `FAME and UCOME from used cooking oil and fatty acids, produced to EN 14214 in two grades.`
   - Link / Button: `Data sheet` (href: `#`)
2. **Product 2 (`mx-product--beaker`)**:
   - Title (H3): `Crude & Technical Glycerine`
   - Description: `Recovered with distillation residue and methanol from every production stream.`
   - Link / Button: `Data sheet` (href: `#`)
3. **Product 3 (`mx-product--barrel`)**:
   - Title (H3): `Soap-Stock & Fatty-Acid Derivatives`
   - Description: `From our CARBON-designed glycerolysis line — recovered value from every stream.`
   - Link / Button: `Data sheet` (href: `#`)

---

### Section 4: Why Masader (`mx-why`, Theme: Light)

- **Eyebrow**: `Why Masader`
- **Heading (H2)**: `A model built for one purpose`

#### Value Pillars (`mx-values`)
1. **Pillar 01 (`mx-value--1`)**:
   - Number: `01`
   - Title (H3): `Integrity`
   - Description: `Honest specifications and full traceability, audited against EU requirements — not asserted, demonstrated.`
2. **Pillar 02 (`mx-value--2`)**:
   - Number: `02`
   - Title (H3): `Technology Edge`
   - Description: `Every process unit engineered with our technology partner, CARBON Engineering & Consultancy.`
   - Link Inside Description: `CARBON Engineering & Consultancy` (href: `#`)
3. **Pillar 03 (`mx-value--3`)**:
   - Number: `03`
   - Title (H3): `Diversity & Agility`
   - Description: `Flexible across feedstocks, direct in how we deal with buyers and suppliers — no rigid terms.`

#### Visual Stack (`mx-why__visual` / `mx-logo-stack`)
- Full Logo: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/logo-icon-full.webp`
- Segments:
  - `seg1-top-dark.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg1-top-dark.webp`
  - `seg2-top-right-lime.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg2-top-right-lime.webp`
  - `seg3-left-dark.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg3-left-dark.webp`
  - `seg4-right-green.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg4-right-green.webp`
  - `seg5-bottom-left.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg5-bottom-left.webp`
  - `seg6-bottom-right.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg6-bottom-right.webp`
- Center Drop:
  - `drop-gold.webp`: `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/drop-gold.webp`

---

### Section 5: Sustainability & Certifications (`mx-sustain`, Theme: Dark)

- **Eyebrow**: `Sustainability & Certifications`
- **Heading (H2)**: `See the ISCC EU certificate and our GHG methodology`
- **Lead Text**: `Certificate number, scope, mass-balance approach, and the circular-economy impact behind every tonne we ship.`
- **Action Button**:
  - Button Text: `View Certifications`
  - Link: `#`

#### Sustainability Gauge Visual (`mx-gauge mx-ring`)
- **Aria Label**: `90% GHG reduction`
- **Value**: `90`
- **Unit**: `%`
- **Label**: `GHG reduction`
- **SVG Specification**:
  - SVG viewBox: `0 0 300 300`
  - Gradient ID: `mxv9ea0009-g` (stop 0: `var(--mx-gold)`, stop 1: `var(--mx-leaf)`)
  - Track Radius: `118`, Ticks Radius: `140`
  - Progress: stroke-dasharray `90 100`

---

### Section 6: Where It Goes (`mx-where`, Theme: Dark)

- **Eyebrow**: `Where it goes`
- **Statement Headline**: `Exporting across Europe and Africa, Ex-Works Alexandria — and supplying Egypt's own Suez Canal Authority.`

---

### Section 7: News & Insights (`mx-news`, Theme: Light)

- **Eyebrow**: `News & Insights`
- **Heading (H2)**: `Updates on our certification programme and the export market`
- **Lead Text**: `Plant updates, ISCC audit milestones, and export-market notes — coming soon.`
- **Action Link / Button**:
  - Button Text: `Read all news`
  - Link: `https://masaderbio.com/web/news/`

---

### Section 8: Final Call to Action (`mx-cta`)

- **Heading (H2)**: `Ready to bring Masader into your supply chain?`
- **Lead Text**: `Talk to us about offtake volumes, samples, or feedstock partnerships.`
- **Action Buttons**:
  - **Phone Button (`mx-btn--phone`)**:
    - Label: `+2 03 4701 1465`
    - Link: `tel:+20347011465`
  - **Contact Button (`mx-btn--dark`)**:
    - Label: `Contact Us`
    - Link: `https://masaderbio.com/web/contact/`

---

### Section 9: Footer (`mx-footer`, Theme: Dark)

#### Column 1: Brand & Location (`mx-footer__brand`)
- **Logo Image**:
  - Image URL: `https://masaderbio.com/web/wp-content/uploads/2026/10/masader-logo.png`
  - Alt Text: `Masader`
  - Width: 1200, Height: 402
  - Srcset Sizes: `300w`, `768w`, `1024w`, `1200w`
- **Address Text**:
  ```text
  Km 26 Alexandria–Cairo Desert Road,
  Alexandria, Egypt
  ```

#### Column 2: Company (`mx-footer__col`)
- **Title (H4)**: `Company`
- **Links**:
  1. `About Us` (href: `#`)
  2. `Facilities & Process` (href: `#`)
  3. `Markets & Trading` (href: `#`)
  4. `Careers` (href: `#`)

#### Column 3: Products (`mx-footer__col`)
- **Title (H4)**: `Products`
- **Links**:
  1. `Biodiesel — PURE & PUREMAX` (href: `#`)
  2. `Technical Glycerine` (href: `#`)
  3. `Soap-Stock Derivatives` (href: `#`)

#### Column 4: Useful Links & Working Hours (`mx-footer__col`)
- **Title (H4)**: `Useful Links`
- **Links**:
  1. `ISCC EU Certificate` (href: `#`)
  2. `Terms & Conditions` (href: `#`)
  3. `Privacy Policy` (href: `#`)
- **Title (H4)**: `Working Hours`
- **Hours Text**:
  ```text
  Sun–Sat 09:00–23:00
  Phone support 24/7
  ```

---

## 6. Complete Inventory of Image & Asset URLs

| Category | Filename / Identifier | Full URL |
|---|---|---|
| Brand | `logo-icon-full-96.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/logo-icon-full-96.webp` |
| Brand | `logo-icon-full-144.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/logo-icon-full-144.webp` |
| Brand | `seg1-top-dark-96.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg1-top-dark-96.webp` |
| Brand | `seg2-top-right-lime-96.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg2-top-right-lime-96.webp` |
| Brand | `seg3-left-dark-96.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg3-left-dark-96.webp` |
| Brand | `seg4-right-green-96.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg4-right-green-96.webp` |
| Brand | `seg5-bottom-left-96.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg5-bottom-left-96.webp` |
| Brand | `seg6-bottom-right-96.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/seg6-bottom-right-96.webp` |
| Brand | `drop-gold-96.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/drop-gold-96.webp` |
| Brand | `masader-wordmark-96.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/brand/masader-wordmark-96.webp` |
| Hero | `seg1-top-dark-744.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg1-top-dark-744.webp` |
| Hero | `seg2-top-right-lime-744.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg2-top-right-lime-744.webp` |
| Hero | `seg3-left-dark-744.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg3-left-dark-744.webp` |
| Hero | `seg4-right-green-744.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg4-right-green-744.webp` |
| Hero | `seg5-bottom-left-744.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg5-bottom-left-744.webp` |
| Hero | `seg6-bottom-right-744.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg6-bottom-right-744.webp` |
| Hero | `seg1-top-dark-372.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg1-top-dark-372.webp` |
| Hero | `seg2-top-right-lime-372.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg2-top-right-lime-372.webp` |
| Hero | `seg3-left-dark-372.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg3-left-dark-372.webp` |
| Hero | `seg4-right-green-372.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg4-right-green-372.webp` |
| Hero | `seg5-bottom-left-372.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg5-bottom-left-372.webp` |
| Hero | `seg6-bottom-right-372.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/seg6-bottom-right-372.webp` |
| Hero | `drop-gold-372.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/drop-gold-372.webp` |
| Hero | `drop-gold-744.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/drop-gold-744.webp` |
| Hero | `arabic-wordmark-760.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/arabic-wordmark-760.webp` |
| Hero | `arabic-wordmark-1518.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/arabic-wordmark-1518.webp` |
| Hero | `english-wordmark-760.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/english-wordmark-760.webp` |
| Hero | `english-wordmark-1518.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/hero/english-wordmark-1518.webp` |
| Products | `bg-1116.png` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/bg-1116.png` |
| Products | `bg-1116.webp` / `bg-558.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/bg-1116.webp` |
| Products | `barrel-584.png` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-584.png` |
| Products | `barrel-584.webp` / `barrel-292.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/barrel-584.webp` |
| Products | `cylinder-286.png` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-286.png` |
| Products | `cylinder-286.webp` / `cylinder-143.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/cylinder-286.webp` |
| Products | `beaker-275.png` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-275.png` |
| Products | `beaker-275.webp` / `beaker-138.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/products/beaker-275.webp` |
| Why Masader | `logo-icon-full.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/logo-icon-full.webp` |
| Why Masader | `seg1-top-dark.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg1-top-dark.webp` |
| Why Masader | `seg2-top-right-lime.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg2-top-right-lime.webp` |
| Why Masader | `seg3-left-dark.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg3-left-dark.webp` |
| Why Masader | `seg4-right-green.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg4-right-green.webp` |
| Why Masader | `seg5-bottom-left.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg5-bottom-left.webp` |
| Why Masader | `seg6-bottom-right.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/seg6-bottom-right.webp` |
| Why Masader | `drop-gold.webp` | `https://masaderbio.com/web/wp-content/themes/masader-child/assets/img/logo/drop-gold.webp` |
| Footer | `masader-logo.png` | `https://masaderbio.com/web/wp-content/uploads/2026/10/masader-logo.png` |
