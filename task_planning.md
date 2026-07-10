# Implementation Plan — Ando & Zara Wedding Invitation

## Tech Stack Decision

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Markup | HTML5 | Minimal, fast, no framework overhead |
| Styling | CSS3 (custom properties, scroll-snap) | Native scroll-snap for full-viewport sections, CSS animations for countdown digits |
| Logic | Vanilla JS (ES6+) | Countdown timer, smooth-scroll nav, minimap highlight |
| Build | Vite (or plain npm scripts) | Fast dev server, handles minification, bundling, asset hashing out of the box |
| Hosting | GitHub Pages / Netlify / Cloudflare Pages | Free, HTTPS, fast CDN |

## Project Structure (proposed)

```
ando-zara-wedding/
├── src/
│   ├── index.html
│   ├── css/
│   │   ├── reset.css
│   │   ├── variables.css      # colors, fonts, spacing
│   │   ├── layout.css         # scroll-snap container, sections
│   │   ├── hero.css
│   │   ├── countdown.css
│   │   ├── invitation.css
│   │   ├── calendar.css
│   │   ├── locations.css
│   │   ├── photobooth.css
│   │   └── footer.css
│   ├── js/
│   │   ├── main.js            # entry: imports modules
│   │   ├── countdown.js       # animated countdown logic
│   │   ├── nav.js             # minimap + scroll observer
│   │   └── map.js             # lazy-load map iframes
│   └── assets/
│       ├── images/            # flowers, rings, QR code (later)
│       └── fonts/             # Armenian-friendly font files
├── package.json
├── vite.config.js
├── task_description.md
└── task_planning.md
```

## Section Breakdown

### 1. Hero
- Full viewport, decorative floral border (SVG/CSS)
- Names: **Անդրանիկ և Զառա** in elegant Armenian serif font (Noto Serif Armenian)
- Possible subtle parallax or fade-in animation on load

### 2. Countdown
- Target: **2026-08-30T12:00:00+04:00** (Armenia timezone UTC+4)
- Four flip-card / digit-roll boxes: Days | Hours | Minutes | Seconds
- CSS animation on digit change (flip or slide)

### 3. Invitation Text
- Centered card with Armenian text
- Decorative divider above/below

### 4. Calendar (August)
- Static grid: Mon–Sun header, 1–31 cells
- Aug 30 highlighted inside a golden ring SVG/CSS circle

### 5. Locations
- Two cards side by side (stack on mobile)
  - Church: name, address, embedded map
  - Restaurant: name, address, embedded map
- Use `<iframe>` with lazy loading (`loading="lazy"`) for Google/Yandex maps

### 6. Photo Booth
- QR code image (placeholder for now)
- Short instruction text in Armenian

### 7. Footer
- Warm closing words
- Maybe hearts / floral ornament

## Navigation / Scroll

- **CSS `scroll-snap-type: y mandatory`** on the container for full-viewport snap
- **Minimap**: fixed top-right column of small icons (heart, clock, letter, calendar, pin, camera)
  - `IntersectionObserver` to highlight active section
  - Click → `element.scrollIntoView({ behavior: 'smooth' })`
- Each section has a small "↓" arrow button at the bottom to advance

## Color Palette (initial suggestion)

| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#FDF8F4` | warm ivory background |
| `--color-primary` | `#8B5E3C` | headings, accents (warm brown/gold) |
| `--color-secondary` | `#C9956B` | secondary text, borders |
| `--color-accent` | `#D4AF37` | gold highlights (ring, countdown) |
| `--color-text` | `#3A2E2A` | body text |
| `--color-muted` | `#A08070` | subtle elements |

## Font

- **Noto Serif Armenian** (Google Fonts, free) for headings
- **Noto Sans Armenian** for body text
- Self-host subsets to minimize network requests

## Cross-Browser & Device Compatibility

### Target Browsers
- Chrome (desktop + Android)
- Safari (desktop + iOS)
- Opera (desktop + mobile)
- Samsung Internet
- Firefox (bonus — widely used)

### Target Devices
- **Mobile**: iPhone (Safari/Chrome), Samsung Galaxy (Samsung Internet/Chrome), various Android
- **Tablet**: iPad, Android tablets
- **Desktop**: large screens (1440px+), standard (1024–1440px)

### Strategy
- **CSS**: use only widely-supported features; add `-webkit-` prefixes where needed (scroll-snap, backdrop-filter, etc.)
- **`scroll-snap`**: well supported across all targets; use `scroll-snap-type` + `scroll-snap-align` (no prefix needed for modern versions, add `-webkit-scroll-snap-type` fallback for older Safari)
- **Viewport units**: use `dvh` (dynamic viewport height) for mobile address-bar handling, with `vh` fallback
- **Flexbox/Grid**: fully supported — use as primary layout tools
- **Fonts**: `font-display: swap` to avoid FOIT; test Armenian glyphs on all platforms
- **JS**: ES6 is fine (all targets support it); avoid newer APIs without checking `caniuse`
- **Touch**: ensure tap targets ≥ 44×44px; no hover-only interactions
- **Testing checklist**:
  - iOS Safari (iPhone SE, iPhone 14 — different viewport sizes)
  - Chrome Android (Samsung Galaxy S series)
  - Samsung Internet
  - Desktop Chrome, Safari, Opera, Firefox
  - Large screen (1920×1080+)
- **Autoprefixer**: add via Vite PostCSS config to auto-insert vendor prefixes
- **Responsive breakpoints**:
  - `< 480px` — small phones
  - `480–768px` — large phones / small tablets
  - `768–1024px` — tablets
  - `1024–1440px` — standard desktop
  - `> 1440px` — large desktop

## Performance Considerations

- No heavy JS frameworks
- Lazy-load map iframes and images below the fold
- Inline critical CSS for first viewport (hero)
- Preload hero background/image
- Vite handles tree-shaking, minification, gzip/brotli via plugin
- Use `<picture>` + `srcset` for responsive images (WebP with JPEG fallback)
- Test Lighthouse scores on mobile throttling

## Build & Deploy

- `npm run dev` → Vite dev server with HMR
- `npm run build` → production build to `dist/`
- Deploy `dist/` to **Cloudflare Pages** (free tier, global CDN, auto HTTPS, deploy from Git)
  - Alternative: Netlify or GitHub Pages

## Decisions (locked in ✅)

| Question | Answer |
|----------|--------|
| Wedding date | **August 30, 2026, 12:00 (noon)** Armenia time (UTC+4) |
| Names on hero | **Անdelays և Զdelays** |
| Color palette | Warm ivory + gold ✅ |
| Build tool | **Vite** |
| Hosting | **Cloudflare Pages** |
| Map provider | **Yandex Maps** |
| Locations | Placeholders for now (details later) |

---

## Next Steps

1. Initialize project: `npm init`, install Vite
2. Set up project structure (HTML, CSS modules, JS modules)
3. Implement sections top-to-bottom (hero → footer)
4. Wire up scroll-snap + minimap navigation
5. Add countdown logic
6. Add Yandex Map iframes (placeholder coordinates)
7. QR code placeholder for photo booth
8. Test on mobile viewport, polish animations
9. Configure Vite build (minify, compress)
10. Deploy to Cloudflare Pages



