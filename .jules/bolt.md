## 2026-04-26 - Missing React Entry Point in index.html
**Learning:** The application was failing to mount because the `<script type="module" src="/index.tsx"></script>` tag was missing from `index.html`, despite the presence of `#root`. This caused blank screenshots during frontend verification and made the app non-functional in the browser.
**Action:** Always verify that the entry point script is explicitly included in the HTML when working with Vite projects that use an import map, as Vite might not automatically inject it in all configurations.
