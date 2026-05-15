# Bolt's Performance Journal ⚡

## 2025-05-15 - Initial Performance Audit
**Learning:** Found sequential AI service calls in `PlanCreator.tsx`. `generateItinerary` and `generateDestinationImage` are independent but currently executed one after the other, doubling the critical path latency for plan generation.
**Action:** Use `Promise.all()` to parallelize independent AI calls.

**Learning:** `ExpenseTracker.tsx` recalculates `chartData` on every render, even when the underlying data hasn't changed. This is especially impactful when toggling currencies or waiting for exchange rate syncs.
**Action:** Implement `useMemo` for expensive or frequently recalculated derived state.
