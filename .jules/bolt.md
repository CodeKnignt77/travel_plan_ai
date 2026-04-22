## 2025-05-22 - Parallelized AI Service Calls
**Learning:** Sequential await calls for independent AI services (itinerary generation and image generation) significantly increased perceived latency. Combining them into `Promise.all` reduced the critical path.
**Action:** Always check for independent async operations that can be parallelized.

## 2025-05-22 - Missing Entry Point in index.html
**Learning:** In some Vite setups, the entry point script tag might be missing from the base `index.html`, causing the app to fail to mount despite successful builds.
**Action:** Ensure `<script type="module" src="/index.tsx"></script>` is present in `index.html` for local development and verification.
