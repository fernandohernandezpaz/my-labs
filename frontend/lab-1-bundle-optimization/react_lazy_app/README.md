# `react_lazy_app` — Lab 1 sample (Vite + React)

This folder is the runnable project for **[Lab 1: Bundle optimization](../README.md)** in the parent directory. The parent [`guide_to_solution.md`](../guide_to_solution.md) walks through lazy routes, conditional lazy components, and bundle analysis.

## Commands

```bash
pnpm install
pnpm dev      # local dev server with HMR
pnpm build    # production build; inspect dist/assets for split chunks
pnpm preview  # serve the production build locally
pnpm lint
```

## Stack

- React 19, Vite, `react-router-dom`

## Lab focus

- Route-level `lazy(() => import('./pages/...'))` wrapped in `Suspense`
- Optional heavy UI behind user action (lazy child chunk)
- Entry file provides `BrowserRouter` so routing works

For default Vite or ESLint template notes, see the [Vite React template documentation](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react).
