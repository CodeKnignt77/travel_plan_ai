## 2025-04-16 - Parallel AI Execution Pattern
**Learning:** In applications relying on multiple independent AI service calls (e.g., text generation + image generation), sequential execution significantly increases perceived latency. Since these calls are I/O bound and handled by external APIs, they can be parallelized without increasing local resource contention.
**Action:** Always look for independent 'await' calls in the same scope and wrap them in 'Promise.all' to overlap network wait times.
