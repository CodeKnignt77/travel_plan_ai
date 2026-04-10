# Bolt's Performance Journal

## 2025-05-14 - Caching AI-Derived Utility Data
**Learning:** Utilities that rely on AI-driven search (like exchange rates) introduce significant latency (2-3s) and cost. Since this data is relatively stable within a session, fetching it every time a user toggles a UI element is a major bottleneck.
**Action:** Always implement a simple in-memory cache for slow, idempotent AI utility calls to ensure near-instant UI feedback after the first fetch.
