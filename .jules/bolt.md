# Bolt's Performance Journal

This journal documents critical performance-related learnings discovered in the Vagabond AI codebase.

## 2025-05-15 - Parallel AI Service Calls

**Learning:** Independent asynchronous AI service calls (itinerary generation and destination imaging) were being executed sequentially in `PlanCreator.tsx`, leading to unnecessary user wait time. Because these calls do not depend on each other's output, they are perfect candidates for parallelization.

**Action:** Always check for independent `await` statements in event handlers or `useEffect` hooks and use `Promise.all` to execute them concurrently.

## 2025-05-15 - Memoizing Recharts Data

**Learning:** The budget analytics pie chart in `ExpenseTracker.tsx` was re-calculating its data set on every re-render, including when typing in the "Description" or "Amount" fields. While the dataset is small, this is a common anti-pattern that can lead to jank in more complex dashboards.

**Action:** Use `useMemo` for any data transformation that is passed to charting libraries or involves filtering/reducing arrays within the render cycle.
