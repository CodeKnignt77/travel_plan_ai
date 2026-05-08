# Bolt Performance Journal ⚡

This journal tracks critical performance learnings and optimizations for Vagabond AI.

## 2025-05-15 - Parallelizing AI Service Calls
**Learning:** Independent asynchronous AI service calls (itinerary generation and image generation) were being executed sequentially, leading to unnecessary user wait time.
**Action:** Use `Promise.all` to parallelize independent AI requests to reduce total critical path latency.
