## 2025-05-14 - Parallelized independent AI service calls
**Learning:** In LLM-powered applications, the total latency for complex requests is often the sum of multiple independent AI service calls (e.g., text generation + image generation). Parallelizing these calls using `Promise.all` significantly reduces the critical path latency and improves user experience.
**Action:** Always identify independent asynchronous operations that can be executed in parallel, especially those involving external service calls like AI APIs.
