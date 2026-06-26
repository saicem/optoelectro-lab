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
- Use existing libraries: Tailwind CSS v4, Zustand, React Router, framer-motion.
