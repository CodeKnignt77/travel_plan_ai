## 2025-05-15 - Parallel AI Execution
**Learning:** In multi-modal AI applications, independent service calls (e.g., text generation and image generation) often form a significant part of the critical path. Sequential execution of these calls unnecessarily multiplies wait time.
**Action:** Always look for opportunities to use `Promise.all` for independent AI service calls to minimize user-perceived latency.
