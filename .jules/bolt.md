# Bolt's Journal - Vagabond AI ⚡

## 2025-05-15 - Parallel AI Generation
**Learning:** Sequential AI service calls in `handleSubmit` (generating itinerary then image) add unnecessary latency, as the image generation doesn't depend on the itinerary content, only the destination name.
**Action:** Use `Promise.all` to parallelize independent AI service calls to reduce total generation time.
