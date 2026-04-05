## 2025-05-15 - Parallelizing Multi-Modal AI Requests
**Learning:** In applications using multi-modal AI models (e.g., Gemini Flash for text and Image models for visuals), these independent service calls are often executed sequentially by default. Parallelizing them using `Promise.all` provides a massive perceived performance win (up to 50% latency reduction) with minimal code complexity.
**Action:** Always identify independent asynchronous service calls (itinerary + image, weather + news, etc.) and parallelize them to optimize the critical path of the user experience.
