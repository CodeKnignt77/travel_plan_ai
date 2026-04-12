# ⚡ Bolt's Performance Journal

## 2025-05-14 - Parallelizing AI Service Calls
**Learning:** Sequential await calls for independent AI generations (itinerary and images) create unnecessary latency. Since `generateDestinationImage` only requires the destination name, it can be triggered alongside `generateItinerary`.
**Action:** Use `Promise.all` to parallelize independent asynchronous operations to reduce the critical path of the generation process.

## 2025-05-14 - Memoizing Expensive Data Transformations
**Learning:** React components that perform filter/reduce operations on data arrays during render (like chart data calculations) can cause UI stutter as the data grows.
**Action:** Use `useMemo` to cache expensive calculations, ensuring they only re-run when the source data changes.
