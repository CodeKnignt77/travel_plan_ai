## 2025-05-15 - Parallelizing AI Service Calls
**Learning:** Independent asynchronous operations (like generating an itinerary and a destination image) in 'PlanCreator.tsx' were being awaited serially. This doubled the total critical path latency for the user.
**Action:** Use 'Promise.all' to execute independent AI service calls in parallel, effectively cutting the generation wait time by half.

## 2025-05-15 - Memoizing Recharts Data Transformations
**Learning:** The 'ExpenseTracker.tsx' component was recalculating the 'chartData' for Recharts on every re-render, even when the 'expenses' array hadn't changed. This causes UI stutter in complex dashboards.
**Action:** Wrap expensive data transformations in 'useMemo' to ensure stable references and avoid redundant processing.
