## 2025-05-15 - [Parallelize AI Calls]
**Learning:** In applications using multiple generative AI models (e.g., one for text, one for images), calling them sequentially can lead to unacceptably high user-perceived latency.
**Action:** Always identify independent asynchronous operations and execute them concurrently using `Promise.all` to minimize total response time.

## 2025-05-15 - [Memoize Budget Analytics]
**Learning:** Recharts components often require specific data transformations that can become expensive as datasets grow. Unnecessary re-calculation on every render can cause UI stutter.
**Action:** Use `useMemo` to wrap data transformations for charts, ensuring they only update when the underlying source data actually changes.
