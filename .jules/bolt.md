## 2025-05-15 - Parallel AI Service Execution
**Learning:** Independent asynchronous AI service calls (itinerary generation and image generation) were being awaited sequentially. In this application, these calls are independent and can be executed concurrently to reduce total wait time.
**Action:** Always look for independent `await` calls in service-heavy flows and wrap them in `Promise.all` to parallelize.

## 2025-05-15 - Memoizing Derived Chart Data
**Learning:** Recharts data calculations in `ExpenseTracker.tsx` were running on every re-render, including those triggered by typing in a completely unrelated form.
**Action:** Use `useMemo` for any derived data that involves array methods like `filter`, `reduce`, or `map`, especially when the component contains frequent state updates like form inputs.
