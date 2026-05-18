## 2025-05-22 - Missing Entry Point Script Tag
**Learning:** The React application was not mounting because the `index.html` file lacked an explicit `<script type="module" src="/index.tsx"></script>` tag, despite the Vite configuration being correct. This resulted in a blank page during frontend verification.
**Action:** Always verify that the entry point script is explicitly included in `index.html` when working with this repository's structure.

## 2025-05-22 - Sequential AI Latency
**Learning:** Independent AI service calls (`generateItinerary` and `generateDestinationImage`) were being awaited sequentially, doubling the user's perceived latency.
**Action:** Use `Promise.all` for independent asynchronous operations to minimize the critical path.
