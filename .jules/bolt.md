# ⚡ Bolt Performance Journal

This journal tracks critical performance learnings, bottlenecks, and optimizations identified within the Vagabond AI codebase.

## Philosophy

- **Speed is a feature**: Every millisecond saved improves user experience.
- **Measure first**: Use instrumentation (console.time) to identify actual bottlenecks.
- **Bolt Optimization**: One measurable win (<50 lines) at a time.
- **Readability matters**: Do not sacrifice code clarity for micro-optimizations.
- **Parallelism is key**: Leverage concurrent execution for independent asynchronous tasks.

## 2025-05-15 - Parallel AI Execution

**Learning:** Generating itineraries and images sequentially in `PlanCreator.tsx` was causing a significant delay (sum of both API response times). Since these tasks are independent, they are perfect candidates for parallel execution.

**Action:** Refactored `handleSubmit` to use `Promise.all`, reducing total latency to `max(T(itinerary), T(image))`. Added `console.time` instrumentation for continuous monitoring.

## 2025-05-15 - Stable References & Memoization

**Learning:** The `ExpenseTracker.tsx` component was re-allocating static arrays and re-calculating chart data on every render, even when irrelevant state (like a description input) changed.

**Action:** Moved `CATEGORIES` and `COLORS` outside the component. Wrapped `chartData` and `selectedCurrencySymbol` in `useMemo` and `convert` in `useCallback`.
