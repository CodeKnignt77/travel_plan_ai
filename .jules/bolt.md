## 2025-05-15 - Parallelizing Independent AI Service Calls
**Learning:** Sequential execution of independent AI requests (e.g., text generation + image generation) creates an unnecessary bottleneck. In this app, image generation often takes 2-3 seconds, while itinerary generation can take 5-8 seconds. Sequential execution would total ~10s+.
**Action:** Always wrap independent async service calls in 'Promise.all' to reduce the total critical path latency to the duration of the slowest call.
