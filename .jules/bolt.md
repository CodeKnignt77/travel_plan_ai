## 2025-05-14 - Sequential AI Service Calls
**Learning:** In 'PlanCreator.tsx', 'generateItinerary' and 'generateDestinationImage' were being called sequentially, which doubled the user's waiting time unnecessarily. AI service calls are high-latency operations and should be parallelized whenever they are independent.
**Action:** Use 'Promise.all' for independent asynchronous operations to reduce total critical path latency.
