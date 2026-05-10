## 2025-05-15 - [Missing Entry Point in index.html]
**Learning:** The React application was failing to render because the `<script type="module" src="/index.tsx"></script>` tag was missing from `index.html`, despite the `vite.config.ts` being correctly configured. This caused the root element to remain empty during frontend verification.
**Action:** Always verify the presence of the entry point script tag in `index.html` when debugging blank page issues in Vite-based React projects.

## 2025-05-15 - [Sequential AI Service Calls]
**Learning:** Independent asynchronous operations like generating an itinerary and fetching a destination image were being awaited sequentially, leading to an additive delay in the total generation time.
**Action:** Use `Promise.all` to parallelize independent AI service calls to reduce the critical path latency to the duration of the longest request.
