# ⚡ Bolt's Performance Journal

This journal tracks critical performance-related learnings and optimizations in the Vagabond AI codebase.

## 2025-05-22 - [Planned Optimizations]
**Learning:** Independent asynchronous AI service calls in `PlanCreator.tsx` (itinerary generation and image generation) can be parallelized to reduce the total critical path latency.
**Action:** Use `Promise.all` for `generateItinerary` and `generateDestinationImage` in `PlanCreator.tsx`.

**Learning:** Expensive data transformations in React components (like `chartData` in `ExpenseTracker.tsx`) should be memoized with `useMemo` to prevent redundant processing and UI stutter during re-renders, especially when multiple independent state updates occur (like currency syncing).
**Action:** Apply `useMemo` to `chartData` and move static constants (`categories`, `colors`) outside the component body.
