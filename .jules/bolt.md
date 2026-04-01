# Bolt's Journal - Vagabond AI Performance

## 2025-05-14 - Initial Performance Audit
**Learning:** The application uses Recharts for data visualization in `ExpenseTracker` and makes multiple AI calls in `PlanCreator`.
**Action:** Look for `useMemo` opportunities in data transformations for Recharts and check if AI calls can be optimized or results cached.

## 2025-05-14 - Parallelizing Independent AI Service Calls
**Learning:** In the `PlanCreator` component, the `generateItinerary` and `generateDestinationImage` AI calls were being awaited sequentially. Since these operations are independent, their total latency was the sum of their individual response times.
**Action:** Use `Promise.all` to execute these independent asynchronous tasks concurrently. This reduces the user's total wait time to the duration of the single longest-running request, often halving the perceived generation time.
