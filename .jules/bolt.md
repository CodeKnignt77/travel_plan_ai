## 2025-05-16 - Parallel AI Execution & Mounting Fix
**Learning:** Independent asynchronous AI service calls (itinerary generation and image fetching) in `PlanCreator.tsx` were being awaited sequentially, doubling the total latency for the user. Additionally, the application failed to mount because the entry point script tag was missing from `index.html`.
**Action:** Use `Promise.all` to parallelize independent AI requests and ensure the entry point `<script type="module" src="/index.tsx"></script>` is present in the `index.html` root.
