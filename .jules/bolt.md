## 2026-04-13 - Parallelizing Asynchronous AI Service Calls

**Learning:** In applications relying on multiple independent LLM/AI service calls (like generating an itinerary AND an image), sequential `await` calls create a significant and unnecessary performance bottleneck. Users perceive the sum of all latencies, which can often exceed 10-15 seconds.

**Action:** Always identify independent asynchronous operations and use `Promise.all` to execute them in parallel. This reduces the critical path latency to the duration of the slowest single call rather than the sum of all calls.
