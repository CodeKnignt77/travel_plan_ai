## 2025-05-22 - Parallel AI Execution
**Learning:** Independent AI service calls (generation and visualization) were being executed sequentially, doubling the user-perceived latency. Using Promise.all reduced the critical path to the duration of the longest single call.
**Action:** Always check for independent async operations that can be parallelized, especially when dealing with multiple LLM or image generation endpoints.
