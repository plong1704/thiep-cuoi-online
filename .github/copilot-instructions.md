This repository is a small Create React App (CRA) single-page wedding invitation site. The goal
of these instructions is to help an AI coding agent become immediately productive editing,
extending, and debugging the app.

**High-level architecture**
- **Single-page React app**: Entry point is `src/index.js` which mounts `src/App.js` inside
  `React.StrictMode`.
- **UI & styles**: The entire visual layout lives in `src/App.js` and `src/App.css` — there is
  no router or multi-page setup.
- **Assets**: Images are loaded inline using remote Unsplash URLs in `src/App.js`. No local
  image assets are required, though `public/` contains the standard CRA files.
- **Third-party libs**: `react-player` plays background music; `react-icons` provides icons;
  `moment` is used for date/time calculations. These are declared in `package.json`.

**Why things are structured this way**
- The project is intentionally simple: a single-file component (`App.js`) contains layout,
  content, and interactive bits (music toggle, countdown). This favors quick edits over
  componentization — if you extract components, preserve the current CSS class names unless
  you intentionally refactor styles.

**Developer workflows / commands**
- Start development server: `npm start` (CRA default) — app opens on `http://localhost:3000`.
- Build for production: `npm run build` → produces `build/`.
- Run tests: `npm test` (note: `src/App.test.js` is the default CRA test and may be stale).
- Linting/formatting: uses CRA defaults (no custom ESLint/Prettier config in repo).

**Project-specific patterns & conventions**
- Text content is mostly Vietnamese; maintain original language in copy changes unless asked
  to translate.
- Time handling: wedding date and countdown logic are implemented with `moment` in
  `src/App.js`. To update the wedding time, edit the `weddingDate` string near the top of
  `src/App.js`: `const weddingDate = moment('2026-01-03 10:30:00');`.
- Reveal animations: `src/App.js` uses an IntersectionObserver to add `in-view` to elements
  with `class="scroll-reveal"`. Animations and layout live in `src/App.css` (`.fly-in`,
  `.fly-in-left`, `.fly-in-right`, `.scroll-reveal`, etc.).
- Music: playback uses a native hidden `<audio>` element controlled via `audioRef` and a
  user-gesture toggle button (this avoids browser autoplay blocking). The current app
  references a local file `public/Dắt Anh Về Nhà.mp3` and builds `audioUrl` with
  `encodeURIComponent(audioFile)` to handle spaces/diacritics. To change the song, replace
  the file in `public/` and update the `audioFile` string in `src/App.js`, or switch to a
  remote URL and update the `src` accordingly. Note: `react-player` is listed in
  `package.json` but is not used by the current `App.js` implementation.
- Images: inline remote images are used; when adding local images prefer `public/` or import
  them at top of `src/App.js` and keep `App.css` styles (e.g., `.hero-img`, `.gallery img`).

**Key files to inspect when making changes**
- `src/App.js` — main component: content, countdown, music toggle, image URLs, markup.
- `src/App.css` — all styling, layout, responsive rules and the `fly-in` animations.
- `src/index.js` — app bootstrap.
- `package.json` — dependencies and `start/build/test` scripts.
- `public/index.html` — root HTML (meta, title) if you need to add analytics or social tags.

**Concrete examples an agent can apply immediately**
- To change the wedding date shown in the UI and countdown: edit the `weddingDate` value in
  `src/App.js` (see the top of the file). Also update visible date text in the `.hero` section
  (`03.01.2026`) so the UI and logic match.
- To swap music: replace the local audio file `public/Dắt Anh Về Nhà.mp3` and/or update `const audioFile = 'Dắt Anh Về Nhà.mp3';` in `src/App.js` (the filename is URL-encoded with `encodeURIComponent`). Alternatively, set a remote `src` for the audio element.
- To add a new gallery photo: insert an `<img src="..." />` in the `.gallery` div and reuse
  `.gallery img` styles from `src/App.css`.
- To convert to a multi-component layout: create `src/components/` files and import them into
  `App.js`. Keep existing CSS class names or update `App.css` accordingly.

**Testing & gotchas**
- The existing `src/App.test.js` checks for the default CRA text (`learn react`) and will
  likely fail against the current UI — update or replace tests when changing components.
- `react-scripts` 5 is used; be cautious if upgrading React or build tooling — CRA conventions
  apply.

**When to ask for human review**
- Large refactors (splitting `App.js` into multiple components) — request a quick manual
  review to ensure the Vietnamese text and layout intent are preserved.
- Changes to the build configuration or dependency upgrades that could affect deployment.

If anything in these notes is unclear or you want more examples (componentization, test
examples, or deployment steps), tell me which area to expand and I will iterate.
