# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Single-page, mobile-first, Armenian-language wedding invitation site for Andranik & Zaruhi. Wedding date: **August 30, 2026, 12:00 noon, Armenia time (UTC+4)**. Vanilla HTML/CSS/JS — no frontend framework, minimal dependencies by design (see `task_description.md`).

## Commands

```bash
npm run dev             # Vite dev server with HMR, opens browser at localhost:5173
npm run build            # Production build → dist/
npm run preview          # Preview the production build locally
npm run deploy            # Build + deploy to Cloudflare Pages (production, project: ando-zara-wedding)
npm run deploy:preview     # Build + deploy to a Cloudflare Pages preview branch
```

There is no test suite or linter configured in this repo.

Deployment uses Wrangler CLI directly (`npx wrangler login` once to authenticate). Cloudflare Pages build settings if connecting via Git: build command `npm run build`, output directory `dist`, root directory `/`.

## Architecture

**Single HTML file, section-based.** `src/index.html` contains every section of the page (hero, countdown, invitation, calendar, locations, photo booth, footer) plus a fixed "minimap" nav. There is no routing or templating — new content means editing this file directly.

**Full-viewport scroll-snap sections.** `src/css/layout.css` defines `.scroll-container` (`scroll-snap-type: y mandatory`) and `.section` (`scroll-snap-align: start`, `min-height: 100dvh`). Every top-level section in `index.html` gets the `.section` class and an `id` matching its minimap dot's `data-section`/`href`. Sections have an optional `.section__arrow` link to scroll to the next section.

**CSS is split by section/concern and loaded via `@import` chain**, not bundled separately — `src/css/main.css` is the single entry point importing, in cascade order: `variables.css` (design tokens) → `reset.css` → `loader.css` → `layout.css` → `nav.css` → one file per section → `animations.css`. When adding a new section, add both the CSS file and its `@import` line (order matters for cascade).

**All colors/spacing/typography are CSS custom properties** defined once in `src/css/variables.css` (`--color-*`, `--space-*`, `--radius-*`, `--transition-*`, `--shadow-*`, font vars). Section CSS files should reference these tokens rather than hardcoding values — retheming the whole site is done by editing `variables.css` alone. A few animation/decorative rules (`loader.css` petals, `nav.css` hover states, `calendar.css` box-shadows, `animations.css` shimmer) use literal `rgba()`/hex values derived from the accent/secondary tokens instead of `var()` — keep these in sync by hand if the palette changes.

**JS is small ES module per feature, wired up in `src/js/main.js`.** Each module exports a single `init*()` function (`initCountdown`, `initNav`, `initCalendar`) called on `DOMContentLoaded`. Modules query their own DOM elements by ID/class and no-op if not found (`if (!el) return;`), so `main.js` can call all initializers unconditionally regardless of which sections exist on the page.

- `countdown.js` — computes remaining time to the hardcoded `WEDDING_DATE` and updates `#countdown-{days,hours,minutes,seconds}` every second, adding a `.flip` class to trigger a CSS animation on value change.
- `nav.js` — wires minimap dot clicks and section-arrow clicks to `scrollIntoView`, and uses an `IntersectionObserver` (rootMargin 0, threshold 0.3) to both highlight the active minimap dot and toggle a `.visible` class on sections for scroll-triggered animations (removed when out of view so animations replay on re-entry).
- `calendar.js` — builds the static August 2026 calendar grid into `#calendar-grid` at runtime (Monday-first week), highlighting day 30.

**Locations section links out rather than embedding.** `location-card__map-btn` anchors link directly to Yandex Maps org URLs (opens the native app or browser) instead of embedding map iframes/widgets.

## Conventions

- BEM-style class names (`block__element--modifier`), e.g. `minimap__dot--active`, `location-card__map-btn`.
- Fonts: `Noto Serif Armenian` for headings/serif text, `Montserrat` for body — both referenced via `--font-serif`/`--font-sans` tokens.
- Use `dvh` units (with `vh` fallback where relevant) for viewport height due to mobile browser chrome.
- Target support requires `-webkit-` prefixes for scroll-snap and similar features (see Autoprefixer config in `postcss.config.cjs`); avoid bleeding-edge CSS/JS APIs.
