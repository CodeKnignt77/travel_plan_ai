# ⚡ Bolt's Journal - Vagabond AI Performance Tracker

## 2026-04-04 - [Initial Discovery]
**Learning:** Found that `generateItinerary` and `generateDestinationImage` were being called sequentially in `PlanCreator.tsx`, causing unnecessary latency for the user. Although memories suggested this was already parallelized, the current codebase state was not.
**Action:** Refactor `PlanCreator.tsx` to use `Promise.all` to parallelize independent AI service calls, aiming for a ~30-40% reduction in total generation time.
