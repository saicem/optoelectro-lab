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

## Documentation Rules
- `doc/` 中的 Markdown 文档是内容唯一权威来源（Single Source of Truth）。
- 当 `doc/` 中的 md 文档与 `src/pages/` 中的 React 页面组件内容冲突时，**以 `doc/` 中的 md 为准**。
- 内容变更时遵循**文档优先工作流**：先更新 `doc/` 中的 md 文档，再同步修改 `src/pages/` 中的页面组件，最后一起提交。
- `doc/learn/` 按大章节分目录：`part1-basics/`、`part2-source-transmission/`、`part3-modulator/`、`part4-system/`，术语表 `glossary.md` 在根目录。
- `doc/lab/` 包含 5 个交互实验的设计文档。

## Architecture Notes
- All page components are **statically imported** (no `React.lazy` / dynamic imports). Every page is bundled into a single `index.js` to eliminate network waterfall on navigation.
- Single monolithic JS bundle: no `manualChunks`, no code-splitting. `cssCodeSplit: false` produces one CSS file.
- Loading screen is inlined in `index.html` (`<div id="app-loading">`): a CSS-only spinning cyan spinner with "LOADING" text, visible until React mounts and replaces the `#root` content. No JS required to show it.
- Route changes scroll to top via `window.scrollTo(0, 0)` and `contentRef.scrollTop = 0` in `Layout.tsx`.
- Shared components: `LearnSection` (page section cards), `PlaygroundLayout` (experiment layout), `LearnLayout` (chapter layout with part breadcrumb).
- State management: Zustand stores in `src/stores/`.
- Canvas utilities: `setupCanvas()` for DPR scaling, `drawGrid()` for background grid.
