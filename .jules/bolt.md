# Bolt's Performance Journal

## 2025-05-15 - Parallelizing AI Service Calls
**Learning:** Independent AI service calls (itinerary generation and image generation) were being awaited sequentially in `PlanCreator.tsx`, creating a significant bottleneck in the user-perceived latency.
**Action:** Implemented `Promise.all` to execute these calls concurrently. This reduces the critical path from `T(itinerary) + T(image)` to `max(T(itinerary), T(image))`, roughly halving the wait time for the user. Always look for independent `await` statements in async handlers.
