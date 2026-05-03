## 2025-05-14 - Parallelizing Independent AI Service Calls
**Learning:** In the `PlanCreator` component, `generateItinerary` and `generateDestinationImage` were called sequentially using `await`. Since these calls are independent, the user was waiting for the sum of both latencies. Parallelizing them with `Promise.all` reduces the critical path latency to the duration of the slowest request.
**Action:** Always audit asynchronous flows for independent operations that can be parallelized to minimize user-perceived latency.
