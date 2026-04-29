# Bolt's Performance Journal - Vagabond AI

This journal tracks critical performance learnings, bottlenecks, and optimization results for the Vagabond AI codebase.

## 2025-05-15 - Initial Assessment
**Learning:** Independent asynchronous AI service calls in `PlanCreator.tsx` (itinerary generation and destination image generation) are currently sequential, leading to unnecessary user wait time.
**Action:** Parallelize these calls using `Promise.all` to reduce total critical path latency.
