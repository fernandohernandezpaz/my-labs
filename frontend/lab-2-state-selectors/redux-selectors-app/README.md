# `redux-selectors-app` — Lab 2 sample (Vite + React + RTK)

This folder is the runnable project for **[Lab 2: Memoized selectors](../README.md)** in the parent directory. The parent [`guide_to_solution.md`](../guide_to_solution.md) explains the selector pattern and store shape.

## Commands

```bash
pnpm install
pnpm dev      # local dev server
pnpm build    # typecheck + production build
pnpm preview
pnpm lint
```

## Stack

- React 19, TypeScript, Vite, Redux Toolkit, React Redux

## Lab focus

- `createSelector` for filtered order lists (status + date)
- Unrelated slice fields (for example user display name) to verify memoization
- `Provider` + `configureStore` wiring in `src/main.tsx` and `src/store/`

Ensure `App.tsx` renders `OrderList` (or your main lab screen) so the UI is visible.

For template-level ESLint or TypeScript notes, see the [Vite React TypeScript template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts).
