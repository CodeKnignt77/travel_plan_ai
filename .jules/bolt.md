## 2025-05-17 - [AI Call Parallelization]
**Learning:** Independent AI service calls (itinerary generation and image generation) were being executed sequentially, doubling the total user wait time.
**Action:** Use `Promise.all` to parallelize these calls, reducing the critical path to the duration of the longest single call.
