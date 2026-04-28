## 2025-05-14 - Parallel AI Service Execution
**Learning:** In applications relying on multiple independent AI service calls (e.g., itinerary generation and image generation), sequential execution significantly impacts the critical path latency.
**Action:** Always identify independent asynchronous operations and parallelize them using `Promise.all` to reduce total wait time to `max(latency_i)` instead of `sum(latency_i)`.

## 2025-05-14 - React Rendering Bottlenecks
**Learning:** Recharts and complex data transformations (like `chartData` in `ExpenseTracker`) can trigger expensive re-renders even when the underlying data hasn't changed, especially if the component tree is large.
**Action:** Proactively use `useMemo` for data transformations that are used as props for heavy visualization components.
