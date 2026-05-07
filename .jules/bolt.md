## 2026-05-07 - Sequential AI Service Calls
**Learning:** In `PlanCreator.tsx`, the application was making sequential await calls to `generateItinerary` and `generateDestinationImage`. Since these calls are independent and both involve significant network latency (Gemini AI requests), they are ideal candidates for parallelization.
**Action:** Use `Promise.all` to execute independent AI service calls concurrently to reduce total critical path latency.
