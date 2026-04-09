## 2025-05-14 - Parallelizing AI Service Calls
**Learning:** In multi-modal applications where multiple independent AI services are called (e.g., text generation for itineraries and image generation for destinations), serializing these calls significantly increases the critical path latency and degrades user experience.
**Action:** Always use `Promise.all` to parallelize independent asynchronous AI service calls to minimize total wait time for the user.
