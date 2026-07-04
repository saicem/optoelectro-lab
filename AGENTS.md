# Project Conventions

## Package Management
- Use **pnpm** only. Do NOT use npm or yarn.

## Scripts
```bash
pnpm run dev       # Start development server
pnpm run build     # Type-check + build for production
pnpm run preview   # Preview production build
pnpm run lint      # Run ESLint
pnpm run check     # Type-check only (no emit)
```

## Git
All commits MUST follow [Conventional Commits](https://www.conventionalcommits.org/).

## Code Style
- TypeScript strict mode is **not** enabled.
- Use existing libraries: Tailwind CSS v4, Zustand 5, React Router v7, framer-motion 12.
- Route paths MUST use `ROUTES` constants from `src/constants/routes.ts` (not hardcoded strings).
- Chapter index is computed from `CHAPTERS` array in `src/constants/chapters.ts`.

## Architecture Notes
- All page components are **statically imported** (no `React.lazy` / dynamic imports). Every page is bundled into a single `index.js` to eliminate network waterfall on navigation.
- Single monolithic JS bundle: no `manualChunks`, no code-splitting. `cssCodeSplit: false` produces one CSS file.
- Loading screen is inlined in `index.html` (`<div id="app-loading">`): a CSS-only spinning cyan spinner with "LOADING" text, visible until React mounts and replaces the `#root` content. No JS required to show it.
- Route changes scroll to top via `window.scrollTo(0, 0)` and `contentRef.scrollTop = 0` in `Layout.tsx`.
- Shared components: `LearnSection` (page section cards), `PlaygroundLayout` (experiment layout), `LearnLayout` (chapter layout with part breadcrumb).
- State management: Zustand stores in `src/stores/`.
- Canvas utilities: `setupCanvas()` for DPR scaling, `drawGrid()` for background grid.
