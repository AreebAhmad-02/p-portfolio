# Portfolio

A single-page portfolio built with Next.js — warm editorial design, buttery smooth scrolling, and a 3D robot companion that follows you down the page.

**Everything on the site is driven by one JSON file.** Swap `src/data/portfolio.json` and the whole site rebrands for a different person — name, copy, projects, experience, socials, all of it.

## Stack

| Concern | Library |
| --- | --- |
| Framework | Next.js 16 (App Router) + React 19 + TypeScript |
| Styling | Tailwind CSS v4 (CSS-first config, design tokens in `globals.css`) |
| Animation | Motion (Framer Motion successor) |
| Smooth scroll | Lenis |
| 3D | Three.js via React Three Fiber + Drei |
| State | Zustand (scroll progress, active section, menu) |
| Theming | next-themes — light (default) & dark, both warm-toned |

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

`node scripts/screenshot.mjs` (with the dev server running on :3199) walks the page in headless Chrome and screenshots every section — handy after design changes.

## Make it yours

1. **Content** — edit `src/data/portfolio.json`. Every section reads from it:
   - `personal` — name, role, location, email, availability badge
   - `hero` / `about` / `skills` / `projects` / `experience` / `testimonials` / `contact` — per-section copy and items
   - Wrap words in `*asterisks*` in any title to render them as *italic cobalt* serif accents
   - `projects.items[].palette` — two hex colors used to generate cover art when no `image` is set; drop a screenshot into `public/` and set `image: "/shot.png"` to use a real one
   - Empty optional fields (`avatar`, project links, testimonials) degrade gracefully — leave `""` / `[]` and the UI adapts
2. **Colors** — design tokens live at the top of `src/app/globals.css` (`:root` for light, `.dark` for dark)
3. **Fonts** — configured in `src/app/layout.tsx` (Fraunces display serif + Manrope sans)
4. **3D companion** — per-section positions ("waypoints") live in `src/components/three/buddy.tsx`; tweak `fx`/`fy` (viewport fractions), rotation and scale per section id

## Architecture

```
src/
├── data/portfolio.json        ← single source of truth for all content
├── types/portfolio.ts         ← schema for the JSON
├── lib/                       ← data accessor, cn(), rich-text accent parser
├── store/use-app-store.ts     ← zustand: scroll state, active section, menu
├── hooks/                     ← useScrollTo, useMounted, useMediaQuery
├── components/
│   ├── providers/             ← theme + Lenis smooth scroll & section tracker
│   ├── three/                 ← the robot buddy, canvas, fixed overlay
│   ├── layout/                ← navbar (pill + mobile menu), footer
│   ├── sections/              ← hero, about, skills, projects, experience…
│   └── ui/                    ← Section, Reveal, TextReveal, Magnetic, Button,
│                                 Badge, Marquee, AnimatedCounter, ThemeToggle…
└── app/                       ← layout (fonts/providers/metadata), page, globals
```

Notes on how it fits together:

- Sections are tagged `[data-section]`; a scroll tracker measures them and publishes progress to zustand on every Lenis frame. The navbar's active pill and the 3D buddy both consume it — the buddy reads transiently inside its render loop, so scrolling never re-renders React.
- The buddy is procedural (no model files): capsule body, visor, blinking eyes that track your cursor, an antenna that pulses, arms that wave at the contact section. It banks with scroll velocity and glides between per-section waypoints, shrinking to a corner companion on mobile.
- All in-view animations respect `prefers-reduced-motion`.
