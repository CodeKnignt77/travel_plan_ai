## 2026-04-14 - Parallelizing Independent AI Service Calls
**Learning:** In multi-modal AI applications, separate calls for text generation and image generation are often independent and can be parallelized to significantly reduce total latency. Sequential execution of these calls is a common bottleneck that doubles the wait time for the user.
**Action:** Always check if multiple 'await' calls can be wrapped in 'Promise.all' when they don't depend on each other's results.

## 2026-04-14 - Missing React Entry Point in Vite Projects
**Learning:** Some Vite/React projects might be missing the explicit <script type="module" src="/index.tsx"></script> in index.html, causing the app to fail to mount despite a successful build.
**Action:** Verify the existence of the entry point script in index.html when setting up or debugging the environment.
