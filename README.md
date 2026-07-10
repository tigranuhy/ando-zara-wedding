# Անdelays ❤️ Զdelays — Wedding Invitation

Wedding invitation website for Andranik & Zaruhi. Single-page, mobile-first, Armenian-language.

## Quick Start

```bash
npm install
npm run dev        # Start dev server at http://localhost:5173
```

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Production build → `dist/` |
| `npm run preview` | Preview production build locally |
| `npm run deploy` | Build + deploy to Cloudflare Pages (production) |
| `npm run deploy:preview` | Build + deploy preview branch |

## Deployment

### First-time setup (one-time)

1. **Create a free Cloudflare account** at https://dash.cloudflare.com/sign-up
2. **Login via CLI:**
   ```bash
   npx wrangler login
   ```
   This opens a browser to authenticate. Once done, you're set.

3. **Deploy:**
   ```bash
   npm run deploy
   ```
   First deploy creates the project. Cloudflare gives you a URL like:
   `https://ando-zara-wedding.pages.dev`

4. **(Optional) Custom domain:** In Cloudflare dashboard → Pages → your project → Custom domains → add your domain.

### Future deployments

After making changes:

```bash
# 1. Make your edits
# 2. Test locally
npm run dev

# 3. Deploy
npm run deploy

# That's it! Live in ~30 seconds.
```

### With GitHub (automated)

Once you connect a GitHub repo:

1. Go to Cloudflare Dashboard → Pages → Create a project → Connect to Git
2. Select the repo
3. Set build settings:
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Root directory: `/`
4. Every push to `main` will auto-deploy 🚀

## Project Structure

```
src/
├── index.html          # Main page (all sections)
├── css/
│   ├── main.css        # Entry (imports all modules)
│   ├── variables.css   # Design tokens
│   ├── reset.css       # CSS reset
│   ├── layout.css      # Scroll-snap, sections
│   ├── nav.css         # Minimap navigation
│   ├── hero.css        # Hero section
│   ├── countdown.css   # Countdown timer
│   ├── invitation.css  # Invitation text
│   ├── calendar.css    # August calendar
│   ├── locations.css   # Map cards
│   ├── photobooth.css  # QR code section
│   └── footer.css      # Footer
├── js/
│   ├── main.js         # Entry (inits modules)
│   ├── countdown.js    # Live countdown to Aug 30
│   ├── nav.js          # Minimap observer
│   └── calendar.js     # Calendar grid builder
└── assets/
    ├── images/         # (add later)
    └── fonts/          # (add later)
```

## Tech Stack

- **HTML/CSS/JS** — no frameworks
- **Vite** — dev server + build
- **Autoprefixer** — cross-browser CSS
- **Cloudflare Pages** — hosting (free tier)

