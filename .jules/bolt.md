## 2025-05-13 - Parallel AI Service Calls
**Learning:** Independent asynchronous service calls (itinerary generation and image generation) were being executed sequentially, doubling the network latency on the critical path.
**Action:** Always use `Promise.all` for independent service calls in `handleSubmit` or similar data-fetching flows to minimize user wait time.
