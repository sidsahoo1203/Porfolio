# Siddharth Sahoo — Portfolio

A dark, cinematic 3D résumé site. React + TypeScript + Vite + Tailwind CSS v4, React Three Fiber for the hero scene, Framer Motion for everything else.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build locally
```

## Deploy

The build uses relative asset paths, so `dist/` works anywhere.

- **Vercel** — import the repo; framework preset “Vite”. No config needed.
- **Netlify** — build command `npm run build`, publish directory `dist`.
- **Custom domain** — point `siddharthsahoo.in` at whichever host you use. `index.html` already has the canonical URL, Open Graph tags and a `Person` JSON-LD block.

## Everyday edits

| What | Where |
| --- | --- |
| Any text, project, skill, date or link | `src/data/resume.ts` — the only content file |
| Your photo | Put it at `public/profile.jpg` (portrait, ~4:5, ≥ 900px tall) and set `photo: './profile.jpg'` in `src/data/resume.ts` |
| The downloadable PDF | Replace `public/Siddharth_Sahoo_Resume.pdf` (keep the name, or update `resumeFile`) |
| Project screenshots | `public/projects/<id>.webp`, referenced by `image` on each project. Projects without an image get a generated cover. The current ones were cropped from LinkedIn thumbnails, so real full-size screenshots will look much sharper. |
| Colours & fonts | `@theme` block at the top of `src/index.css`; fonts load from Google Fonts in `index.html` |
| Project GitHub / live links | `links` on each project in `src/data/resume.ts` — `{ kind: 'code' \| 'live', url }` |

## Where every image lives

```
public/
├── profile.jpg                  ← your photo (add it; not there yet)
├── Siddharth_Sahoo_Resume.pdf   ← the "Download Resume" file
├── logos/                       ← issuer logos for certification cards (empty — add yours)
├── certificates/                ← certificate images (empty — add yours)
├── achievements/                ← hackathon / publication images (empty — add yours)
└── projects/
    ├── disastereye.webp         ← DisasterEye
    ├── linguaverse.webp         ← LinguaVerse AI
    ├── valence.webp             ← Valence Chemical Group
    ├── companyos.webp           ← CompanyOS
    ├── meditrack.webp           ← MediTrack
    └── tomato.webp              ← Tomato
```

- **To replace a project image:** overwrite the file with the same name. Any format works (`.png`, `.jpg`, `.webp`). If you change the extension, update `image:` for that project in `src/data/resume.ts`. Best size is a 16:10 screenshot around 1600×1000.
- **To add an image to a project that has none** (BharatAssist AI, Kaam247, Libraro, Student Management System): save it as `public/projects/<id>.webp` and add `image: './projects/<id>.webp',` to that project. The ids are `bharatassist`, `kaam247`, `libraro` and `student-management`.
- **Profile photo:** save as `public/profile.jpg` (portrait, about 4:5, at least 900px tall), then set `photo: './profile.jpg'` near the top of `src/data/resume.ts`.
- **Certificate images:** save into `public/certificates/`. Each certification in `src/data/resume.ts` already has a commented line like `image: undefined, // './certificates/aws-ai-practitioner.webp'`. Replace it with `image: './certificates/aws-ai-practitioner.webp',`. A thumbnail then appears on the card and opens full-size on click.
- **Issuer logos:** save into `public/logos/` (square PNG or SVG, transparent background). In `src/data/resume.ts`, find `issuerLogos` and replace `undefined` with the path, e.g. `Cisco: './logos/cisco.png',`. Every certificate from that issuer picks it up. To use a different image on a single certificate, such as your Credly badge, set `logo: './logos/…'` on that certificate.
- **Credential details:** on the same certification, fill in `credentialId: 'ABC…'` and `credentialUrl: 'https://…'` (the LinkedIn "Show credential" link). A field left as `undefined` stays hidden.
- **Certification skills:** add to `skills: [...]`. Clicking a skill on the card lists the projects, jobs and other certifications that use it. Certification skills also show up under "Used in" in the Skills section.
- **Hackathon / publication images and links:** save into `public/achievements/` and set `image:` (and optionally `link:`) on that item in `achievements` / `publications`.
- The favicon is an inline "SS" SVG inside `index.html`, so there's no file for it.

See `DIFFERENCES.md` for every mismatch between the resume and LinkedIn.

## How it's put together

```
src/
  data/resume.ts        content (single source of truth)
  three/HeroScene.tsx   particles, wireframe solids, grid, camera rig — lazy-loaded
  sections/             Hero, About, Experience, Projects, Skills, Education, Achievements, Contact
  components/           Nav + loader, glass Spotlight card, Reveal, Magnetic button, icons
  hooks.ts              active-section tracking, on-screen, scroll lock, focus trap
```

### Performance
- three.js is in its own lazily-imported chunk and mounts on `requestIdleCallback`, so the résumé text is interactive before any WebGL loads.
- The render loop stops when the hero scrolls off-screen (`frameloop="never"`).
- Phones get ~420 particles instead of 1,300, fewer solids, no MSAA and a lower pixel-ratio cap.
- Scroll reveals use IntersectionObserver (Framer Motion `whileInView`); animations are transform/opacity only.

### Accessibility
- Respects `prefers-reduced-motion`: no intro curtain, no parallax/tilt, static 3D frame.
- Skip link, visible focus rings, `aria-current` on the active nav item.
- Mobile menu and project dialog trap focus, close on Escape and restore focus. Arrow keys page through projects in the dialog.
- Every project card is a single keyboard-reachable button; live links are separate.
