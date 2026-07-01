# Design Document
## PropValuate -  House Price Prediction System (Linear Regression)
**Design language derived from Zillow, Redfin, and Realtor.com**

---

## 1. Purpose

This document defines the visual and interaction design system for the House Price Prediction System. The aesthetic is synthesized from the three dominant U.S. real estate platforms so the app feels immediately native to anyone who has browsed a property listing site — trustworthy, data-forward, and map/photo-friendly — while presenting a machine learning tool (linear regression price estimator) rather than a listings marketplace.

---

## 2. Source Aesthetic Analysis

### 2.1 Zillow
- **Color:** Signature "Zillow Blue" (`#006AFF`) as the dominant brand/action color, paired with near-black text and generous white space. Blue is used aggressively for CTAs, links, and active states — it's the most saturated, tech-forward palette of the three.
- **Layout:** Card-based grids for listings (photo-dominant), sticky top navigation with mega-menus, large hero search bar as the primary above-the-fold element.
- **Typography:** Clean grotesque sans-serif, bold condensed headlines, tight line-heights on data-dense areas (price, beds/baths/sqft stats).
- **Components:** Rounded-corner cards with subtle shadow-on-hover, pill-shaped filter chips, prominent numeric "Zestimate" callouts styled like a badge/stat block.

### 2.2 Redfin
- **Color:** Deep brick red (`#A02021`) as primary brand color against white/light-gray backgrounds, with charcoal/near-black text. More restrained and editorial than Zillow — red is used sparingly (logo, key CTAs, map pins) rather than flooding the UI.
- **Layout:** Map-and-list split view is the signature pattern; dense data tables for comparables; clear left-nav filter rail.
- **Typography:** Slightly more serif-adjacent, humanist sans for body copy; heavier use of small-caps/uppercase labels for metadata (status tags like "Redfin Estimate," "Hot Home").
- **Components:** Sharp-ish corners (less rounded than Zillow), red numeric badges for estimates, strong data-table styling with alternating row treatment.

### 2.3 Realtor.com
- **Color:** Red (`#D92228`-range) as the primary accent, dark navy/near-black header, white body — closest to the NAR "REALTOR® Blue" heritage but modernized with red as the action color.
- **Layout:** Similar card-grid listings, strong emphasis on trust badges/certifications, prominent search-by-location bar, more conservative/institutional spacing than Zillow.
- **Typography:** Traditional, slightly more formal sans-serif; clear hierarchy between listing price (large, bold) and secondary details (smaller, gray).
- **Components:** Standard rounded cards, badge-style tags ("New," "Price Reduced"), form-heavy contact/agent modules.

### 2.4 Synthesized Cross-Platform Patterns
| Attribute | Common Thread |
|---|---|
| Base palette | White/off-white background, near-black body text, one saturated brand color as the hero accent |
| Price display | Always the largest, boldest number on any card or page |
| Cards | Rounded corners (8–12px), soft shadow, image or chart on top, stats below |
| Navigation | Sticky top bar, logo left, primary actions right |
| Data density | Comfortable but efficient — stat blocks (bed/bath/sqft-style) using label + value pairs |
| Trust signals | Badges, disclaimers, small-caps labels |
| Motion | Subtle hover elevation, no flashy animation |

---

## 3. Design System for the House Price Prediction System

### 3.1 Color Palette

Primary accent chosen as a **blue-to-teal hybrid** — closer to Zillow's confidence and tech-forward feel (appropriate for an ML tool) while borrowing Redfin's restraint (accent used sparingly, not flooding the UI).

| Token | Hex | Usage |
|---|---|---|
| `--color-primary` | `#0B5FFF` | Primary CTA buttons, active nav, links, chart accent line |
| `--color-primary-dark` | `#0041B3` | Hover/pressed states |
| `--color-primary-light` | `#E5F0FF` | Selected chip backgrounds, subtle highlight fills |
| `--color-accent-red` | `#A02021` | Reserved for alerts/warnings and "high confidence deviation" flags only (Redfin-inspired restraint) |
| `--color-ink-900` | `#111116` | Primary text |
| `--color-ink-600` | `#4A4A52` | Secondary text / labels |
| `--color-ink-300` | `#9CA0AA` | Placeholder text, disabled states |
| `--color-surface` | `#FFFFFF` | Card and panel backgrounds |
| `--color-bg` | `#F6F7F9` | Page background |
| `--color-border` | `#E2E4E9` | Card borders, dividers |
| `--color-success` | `#1F9D55` | "Prediction within confidence interval" indicator |

**Rule of thumb:** 70% neutral (white/gray/ink), 20% primary blue, 10% accent red — mirroring the restrained, single-accent discipline seen across all three source sites.

### 3.2 Typography

| Role | Font stack | Size | Weight |
|---|---|---|---|
| Display / Hero price | `Inter, "Helvetica Neue", sans-serif` | 40–56px | 700 |
| H1 (page title) | Inter | 32px | 700 |
| H2 (section) | Inter | 22px | 600 |
| Body | Inter | 16px | 400 |
| Label / metadata (uppercase, tracked) | Inter | 12px | 600, letter-spacing 0.06em |
| Numeric stat (sqft, bed/bath-equivalent for ML features) | Inter, tabular-nums | 20px | 600 |

Inter is chosen as a free, geometric-humanist equivalent to the grotesque sans used across Zillow/Redfin/Realtor — it renders numerals (critical for a price-prediction tool) cleanly at all weights.

### 3.3 Layout Structure

**Global shell** (all three sites share this skeleton):
1. Sticky top navbar — logo left, nav links center/right, primary CTA button far right (e.g., "New Prediction")
2. Full-width hero band on the landing/input page — large heading + a prominent input form, echoing the search-bar-as-hero pattern
3. Main content area on a `1200–1280px` max-width container, `24px` gutters
4. Footer with model disclaimers ("Estimates are not appraisals" — a direct nod to Zillow's Zestimate disclaimers)

**Page-by-page layout:**

- **Landing / Input Page**
  Hero band (primary blue gradient or flat fill) containing the property feature input form (sliders + number fields for sqft, bedrooms, bathrooms, location, year built, etc.), similar to a listings search hero.

- **Prediction Results Page**
  - Large "Estimated Price" stat card at top (styled like a Zestimate/Redfin Estimate badge) — big bold number in `--color-primary`, with a confidence range below in `--color-ink-600`.
  - Below: a two-column layout — left column shows the input feature summary as label/value stat pairs (mirrors bed/bath/sqft strip on listing cards); right column shows a regression chart (predicted vs. actual scatter plot / feature importance bar chart) rendered in a white card with rounded corners and soft shadow.
  - Comparable "training data" homes shown as a card grid below, echoing listing cards: thumbnail-style placeholder or icon, price, key stats.

- **Model Insights / Analytics Page**
  Dashboard layout with card-based metric tiles (R², RMSE, MAE) styled as compact stat cards, plus a data table of feature coefficients styled with Redfin-style alternating row shading and uppercase column headers.

### 3.4 Components

| Component | Style spec |
|---|---|
| **Button (primary)** | `--color-primary` fill, white text, 8px border-radius, 12–20px padding, subtle darken on hover (`--color-primary-dark`) |
| **Button (secondary)** | White fill, `--color-border` outline, `--color-ink-900` text |
| **Card** | White surface, `1px solid --color-border`, `12px` border-radius, `0 1px 3px rgba(0,0,0,0.08)` shadow, `4px` lift + slightly stronger shadow on hover |
| **Input field** | White background, `1px solid --color-border`, `8px` radius, `--color-primary` border + subtle blue glow on focus |
| **Slider (for numeric features)** | Track in `--color-border`, filled portion in `--color-primary`, circular thumb with white fill + blue ring |
| **Stat badge (predicted price)** | Large bold numeral, light blue pill background (`--color-primary-light`) or plain white card with the number as sole focus — Zestimate-style |
| **Tag / Label chip** | Pill-shaped, `--color-primary-light` background with `--color-primary` text for informational tags; `--color-accent-red` outline for warning/outlier tags |
| **Data table** | Uppercase tracked headers in `--color-ink-600`, alternating row background `#FAFBFC` / white, right-aligned numeric columns |
| **Navigation bar** | White background, `1px` bottom border, logo + wordmark left, links in `--color-ink-600` (active link in `--color-primary`), CTA button far right |

### 3.5 Iconography & Imagery
- Line-style icons (1.5–2px stroke), matching the clean grotesque feel of the reference sites.
- Since this is a prediction tool (not a listings site), replace hero photography with abstract data visuals: subtle line-chart motifs, a stylized house silhouette outline, or a soft gradient map-blur — keeping the "real estate" visual DNA without needing actual property photos.

### 3.6 Motion
- Hover elevation on cards (translateY -2px + shadow increase), 150–200ms ease-out.
- Number "count-up" animation when the predicted price renders — reinforces the moment of insight, similar to how listing sites animate Zestimate reveals.
- No heavy transitions elsewhere; motion stays subtle and functional, consistent with the source sites' restrained approach.

---

## 4. Component Hierarchy Summary (for implementation)

```
App Shell
├── Navbar (logo, nav links, CTA)
├── Hero / Input Section
│   ├── Heading + subtext
│   └── Feature Input Form (sliders + fields) → [Predict] button
├── Results Section
│   ├── Predicted Price Stat Card (hero numeral + confidence range)
│   ├── Feature Summary Panel (label/value stat pairs)
│   ├── Regression Visualization Card (chart)
│   └── Comparable Data Card Grid
├── Model Insights Dashboard
│   ├── Metric Tiles (R², RMSE, MAE)
│   └── Coefficient Data Table
└── Footer (disclaimers, links)
```

---

## 5. Design Tokens (CSS variables, ready to drop into a stylesheet)

```css
:root {
  --color-primary: #0B5FFF;
  --color-primary-dark: #0041B3;
  --color-primary-light: #E5F0FF;
  --color-accent-red: #A02021;
  --color-ink-900: #111116;
  --color-ink-600: #4A4A52;
  --color-ink-300: #9CA0AA;
  --color-surface: #FFFFFF;
  --color-bg: #F6F7F9;
  --color-border: #E2E4E9;
  --color-success: #1F9D55;

  --font-family: 'Inter', 'Helvetica Neue', sans-serif;
  --radius-card: 12px;
  --radius-input: 8px;
  --radius-button: 8px;
  --shadow-card: 0 1px 3px rgba(0,0,0,0.08);
  --shadow-card-hover: 0 6px 16px rgba(0,0,0,0.10);
  --max-width: 1280px;
}
```

---

## 6. Notes & Rationale

- **Why blue, not red, as the primary accent:** Blue reads as "analytical/tech" (aligns with an ML-driven estimate) whereas red reads more as "brand/marketplace" (Redfin/Realtor.com). Zillow's blue is the closest existing convention users already associate with an automated home-value estimate (Zestimate), so leaning blue creates instant familiarity for the "prediction" use case.
- **Why restrained accent usage:** All three sites keep bright color to <15% of any given screen. Overusing the accent would make the ML tool feel like a marketing page rather than a utility.
- **Disclaimers matter:** Real estate estimate tools always caveat that the number is an estimate, not an appraisal — replicate this pattern under the predicted price for credibility and to set correct user expectations about model uncertainty.