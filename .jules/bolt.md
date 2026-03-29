## 2025-05-15 - [Parallel AI Call Optimization]
**Learning:** In AI-driven applications that require multiple model outputs (e.g., text itineraries and images), sequential execution creates a significant performance bottleneck. Since these API calls are independent and network-bound, they can be parallelized using `Promise.all`.
**Action:** Always identify independent asynchronous operations and execute them in parallel to minimize total latency and improve user experience. This optimization is especially effective when using high-latency AI services.
