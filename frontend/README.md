# Frontend System Design (React & Vue)

Modern frontend development is no longer just about HTML/CSS. It's about state management, bundle optimization, component patterns, and performance.

## Labs

Hands-on exercises live under this folder. Each lab has its own **README** (context, goals, how to run) and optional **`guide_to_solution.md`**.

| Lab | Topic |
|-----|--------|
| [Lab 1: Bundle optimization](./lab-1-bundle-optimization/README.md) | Code splitting, `React.lazy`, Vite chunks |
| [Lab 2: State selectors](./lab-2-state-selectors/README.md) | Memoized selectors, Redux Toolkit, Reselect |

For a ready-made PR body when you open a frontend-only PR, see [`PR_DESCRIPTION.md`](./PR_DESCRIPTION.md).

## Important Interview Questions & Answers

### 1. What is the Virtual DOM and is it still relevant?
**Answer:** The Virtual DOM is a lightweight copy of the real DOM. React uses it to calculate the minimal set of changes (diffing) to apply to the real DOM, which is expensive to update. Modern frameworks like Svelte or Solid perform updates more directly, but the concept of "Efficient State Updating" remains central.

### 2. What is State Management and when do you need Redux/Pinia?
**Answer:** State management handles data that changes over time. You should use a global store (Redux, Pinia, Vuex) when data needs to be shared across many non-related components or when managing complex business logic outside of the UI. For local UI state, use `useState` or `ref`.

### 3. What is Client-Side Rendering (CSR) vs. Server-Side Rendering (SSR)?
**Answer:**
- **CSR**: Browser downloads a minimal HTML file and a large JS bundle that builds the page. Fast once loaded, but bad for SEO and slow initial load.
- **SSR**: Server generates the full HTML for the page. Great for SEO and fast "First Meaningful Paint".

### 4. How do you optimize bundle size?
**Answer:**
- **Code Splitting**: Using `lazy()` and `import()` to only load code when needed.
- **Tree Shaking**: Removing unused code during the build process.
- **Image Optimization**: Using modern formats (WebP) and responsive sizes.

### 5. What are Higher-Order Components (HOCs) vs. Hooks/Composables?
**Answer:** Both are patterns for reusing logic. Hooks (React) and Composables (Vue) are the modern preference as they are easier to read, test, and don't lead to "wrapper hell".
