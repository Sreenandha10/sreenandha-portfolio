# Sreenandha S — Portfolio

Next.js 15 (App Router) · React 19 · TypeScript · Tailwind CSS 4 · Lenis. White / black / gray only, no WebGL, no GSAP.

## Run

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
```

All content lives in `src/lib/data.ts` (taken from `public/Sreenandha_S_resume.pdf`). Components only read from it.

## Sections

| # | id | Component | Idea |
|---|----|-----------|------|
| – | `top` | `hero/Hero.tsx` | Looping intro video (multiply-blended into the page), outlined ghost name, voice pauses when <35% visible, icon-only sound button |
| 01 | `about` | `sections/About.tsx` + `ui/Lanyard.tsx` | Hanging ID card: damped pendulum, idle sway, flips on hover / tap / the hidden "Flip ID card" button |
| 02 | `skills` | `sections/Skills.tsx` | Periodic table of skills, family filter, logo inspector |
| 03 | `work` | `sections/Work.tsx` | Expanding accordion gallery with illustrative (non-screenshot) UIs |
| 04 | `certifications` | `sections/Certifications.tsx` | Ink-flood index list (not in the nav) |
| 05 | `experience` | `sections/Experience.tsx` | Education + internships on a scroll-drawn spine |
| 06 | `achievements` | `sections/Achievements.tsx` | Pinned horizontal gallery with count-up numbers |
| 07 | `contact` | `sections/Contact.tsx` | Letter-hop heading, copy-email chip, spinning badge, footer |

## Rebuilding the hero video

Needs `ffmpeg`, `numpy`, `Pillow` (and `fonttools` + `brotli` for the OG title font).

```bash
python3 scripts/build-hero-assets.py --src intro.mp4 --photo photo.jpg
# optional: --crop W:H:X:Y  (otherwise the person is auto-detected and centred)
```

It crops head-to-toe, whitens the backdrop, builds a seamless 9.5 s loop (0.5 s picture x-fade via ffmpeg `xfade`, sample-accurate equal-power audio cross-fade in numpy), exports `public/hero/hero.mp4` (H.264/AAC) and `hero.webm` (VP9/Opus), plus `poster.jpg`, `portrait-bust.webp` (from `--photo`) and `og.jpg`.

## Notes on content

- Résumé's embedded email link points to a different address than the printed one; the site uses the printed one (`sreenandhanakshathra@gmail.com`). Fix the PDF link.
- The résumé lists "MEARN Stack Development"; the site shows "MERN Stack Development".
- No repo / certificate links exist in the résumé, so those buttons are omitted.
- The achievements gallery uses only stated items and scores (Shaastra Techathon 2024, Tech Fest 2024, 100%, 94.9%, CGPA 7.01).
- Set `NEXT_PUBLIC_SITE_URL` for correct Open Graph URLs in production.

## Credits and licences

- Tech logos in `public/logos/`: [devicon](https://devicon.dev) "original" SVGs, MIT (`LICENSE-devicon.txt`). Logos remain trademarks of their owners.
- Fonts (self-hosted, SIL OFL 1.1): Inter Tight, Instrument Serif, JetBrains Mono via Fontsource.
