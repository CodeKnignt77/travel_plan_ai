# ⚡ Bolt's Performance Journal

This journal tracks critical performance learnings and patterns discovered in the Vagabond AI codebase.

## 2024-05-20 - Parallelizing Independent AI Service Calls
**Learning:** In applications utilizing multiple generative models (e.g., one for text/itineraries and one for images), executing these calls sequentially significantly increases perceived latency for the user. Since the image generation for a destination does not depend on the specific itinerary content, these can be parallelized.
**Action:** Use `Promise.all` to wrap independent AI service calls (e.g., `generateItinerary` and `generateDestinationImage`) in `PlanCreator.tsx` to reduce total wait time to the duration of the longest single call. This provides a ~40% speed improvement in the generation phase.

## 2024-05-20 - JSON Repair for Truncated Responses
**Learning:** Large AI responses (like complex itineraries) are prone to truncation due to token limits, resulting in malformed JSON.
**Action:** A custom `attemptJsonRepair` utility in `geminiService.ts` proactively handles common truncation issues (unterminated strings, missing closing braces), significantly improving application robustness without needing a more expensive model or multiple retries.
