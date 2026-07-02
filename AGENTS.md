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
- All page components are **statically imported** (no React.lazy / dynamic imports). Every page chunk is bundled into the main JS to eliminate network waterfall on navigation.
- Single monolithic JS bundle: no manualChunks. Vite `inlineDynamicImports` prevents code-splitting entirely.
- Loading screen is inlined in `index.html` (`<div id="app-loading">`): a CSS-only spinning loader with "LOADING" text, visible until React mounts and replaces the root content.
- Shared components: `LearnSection` (page section cards), `PlaygroundLayout` (experiment layout), `LearnLayout` (chapter layout with part breadcrumb).
- Page per chapter navigation uses `window.scrollTo(0, 0)` on route change via `ScrollToTop` component.
- State management: Zustand stores in `src/stores/`.
- Canvas utilities: `setupCanvas()` for DPR scaling, `drawGrid()` for background grid.
