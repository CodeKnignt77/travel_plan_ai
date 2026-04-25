## 2025-05-15 - Parallel AI Service Calls

**Learning:** Sequential `await` calls for independent AI services (e.g., text generation + image generation) create a significant and unnecessary bottleneck. In this multi-modal app, wait times were nearly doubled by waiting for the itinerary BEFORE starting image generation.

**Action:** Always wrap independent asynchronous service calls in `Promise.all` to parallelize execution. This is especially critical for generative AI features where individual request latency can be high (3-10 seconds).

## 2025-05-15 - Redundant Render Calculations in Data Tables

**Learning:** Components handling user input (like a search bar or a transaction form) alongside complex data visualizations (like Recharts) suffer from stuttering if expensive filter/map/reduce logic runs on every keystroke.

**Action:** Identify and memoize heavy data transformations (like `chartData` or `totalUSD`) using `useMemo`. This ensures that updating a small piece of local state doesn't trigger an expensive re-computation of the entire dataset's derived properties.
