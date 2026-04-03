## 2026-04-03 - Parallelizing Multi-Modal AI Requests
**Learning:** In GenAI applications, different models (e.g., text vs. image) often have independent latencies. Sequential execution is a common bottleneck that can be easily solved with `Promise.all`.
**Action:** Always check if multiple AI service calls can be parallelized to improve user-perceived performance.
