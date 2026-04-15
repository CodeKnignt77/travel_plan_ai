# ⚡ Bolt's Performance Journal

## 2025-05-14 - Parallelizing Independent AI Service Calls
**Learning:** In applications heavily reliant on multiple generative AI models (e.g., text generation + image generation), the critical path is often dominated by the slowest single request. Executing these calls sequentially is a common anti-pattern that doubles perceived latency.
**Action:** Always identify independent asynchronous operations (like generating an itinerary and a destination image) and use `Promise.all` to parallelize them, effectively reducing the wait time to `max(T1, T2)` instead of `T1 + T2`.
