## 2026-04-08 - Parallelizing Independent AI Service Calls
**Learning:** In applications relying on multiple LLM/GenAI model calls, sequential execution (await call1; await call2) creates a massive bottleneck. Since `generateItinerary` (text) and `generateDestinationImage` (image) do not depend on each other's output (both only need the `destination`), they should always be parallelized.
**Action:** Always use `Promise.all` or `Promise.allSettled` when making independent asynchronous service calls to reduce total critical path latency.
