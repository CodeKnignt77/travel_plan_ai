
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { TravelPlan, DayPlan } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

/**
 * Attempts to repair common JSON truncation issues caused by token limits.
 * Handles unterminated strings and missing closing braces/brackets.
 */
function attemptJsonRepair(json: string): string {
  let repaired = json.trim();
  
  // 1. Handle unterminated strings
  const quoteCount = (repaired.match(/"/g) || []).length;
  if (quoteCount % 2 !== 0) {
    repaired += '"';
  }

  // 2. Add missing closing braces and brackets
  const stack: string[] = [];
  for (const char of repaired) {
    if (char === '{' || char === '[') {
      stack.push(char === '{' ? '}' : ']');
    } else if (char === '}' || char === ']') {
      if (stack.length > 0 && stack[stack.length - 1] === char) {
        stack.pop();
      }
    }
  }
  
  while (stack.length > 0) {
    repaired += stack.pop();
  }
  
  return repaired;
}

export const generateItinerary = async (
  origin: string,
  destination: string,
  duration: number,
  budget: string,
  preferences: string[]
): Promise<TravelPlan> => {
  const prompt = `Create a concise ${duration}-day travel itinerary for a trip from ${origin} to ${destination}. 
    Budget level: ${budget}. 
    Interests: ${preferences.join(", ")}. 
    
    Guidelines:
    - Keep activity descriptions strictly between 1-2 sentences.
    - Limit to 3-4 distinct activities per day.
    - Ensure cultural insights are brief (under 50 words).
    - Provide a structured timeline.
    - If the destination is far from the origin, consider the first day as arrival/check-in.
    
    Return the response as a valid JSON object matching the provided schema. No conversational preamble.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        maxOutputTokens: 15000,
        thinkingConfig: { thinkingBudget: 2000 },
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            id: { type: Type.STRING },
            destination: { type: Type.STRING },
            culturalInsights: { type: Type.STRING },
            totalEstimatedCost: { type: Type.NUMBER },
            itinerary: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  day: { type: Type.NUMBER },
                  title: { type: Type.STRING },
                  activities: {
                    type: Type.ARRAY,
                    items: {
                      type: Type.OBJECT,
                      properties: {
                        time: { type: Type.STRING },
                        location: { type: Type.STRING },
                        description: { type: Type.STRING },
                        cost: { type: Type.NUMBER },
                        category: { type: Type.STRING }
                      }
                    }
                  },
                  mealSuggestions: {
                    type: Type.OBJECT,
                    properties: {
                      breakfast: { type: Type.STRING },
                      lunch: { type: Type.STRING },
                      dinner: { type: Type.STRING }
                    }
                  }
                }
              }
            }
          },
          required: ["destination", "itinerary", "totalEstimatedCost", "culturalInsights"]
        }
      }
    });

    let text = response.text || "{}";
    
    if (text.includes("```json")) {
      text = text.split("```json")[1].split("```")[0];
    } else if (text.includes("```")) {
      text = text.split("```")[1].split("```")[0];
    }

    try {
      const rawData = JSON.parse(text);
      return {
        origin,
        destination: rawData.destination || destination,
        culturalInsights: rawData.culturalInsights || "",
        totalEstimatedCost: rawData.totalEstimatedCost || 0,
        itinerary: Array.isArray(rawData.itinerary) ? rawData.itinerary : [],
        startDate: new Date().toISOString(), // This will be overwritten by PlanCreator's result
        duration,
        budget: budget as any,
        preferences,
        id: rawData.id || Math.random().toString(36).substr(2, 9)
      };
    } catch (parseError) {
      console.warn("JSON parsing failed, attempting repair for potential truncation...", parseError);
      try {
        const repairedText = attemptJsonRepair(text);
        const rawData = JSON.parse(repairedText);
        return {
          origin,
          destination: rawData.destination || destination,
          culturalInsights: rawData.culturalInsights || "Note: Some details may be truncated.",
          totalEstimatedCost: rawData.totalEstimatedCost || 0,
          itinerary: Array.isArray(rawData.itinerary) ? rawData.itinerary : [],
          startDate: new Date().toISOString(),
          duration,
          budget: budget as any,
          preferences,
          id: rawData.id || Math.random().toString(36).substr(2, 9)
        };
      } catch (repairError) {
        throw new Error("JSON is irrecoverably malformed.");
      }
    }
  } catch (e) {
    console.error("Critical error in generateItinerary", e);
    return {
      id: Math.random().toString(36).substr(2, 9),
      origin,
      destination,
      startDate: new Date().toISOString(),
      duration,
      budget: budget as any,
      preferences,
      itinerary: [],
      culturalInsights: "We encountered an issue generating your full itinerary. This usually happens with very long trips or complex requests. Try reducing the duration or number of interests.",
      totalEstimatedCost: 0
    };
  }
};

export const generateDestinationImage = async (destination: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [{ text: `A professional, high-quality landscape photography shot of ${destination} showing its most iconic landmark at golden hour.` }]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9"
        }
      }
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }
  } catch (err) {
    console.error("Image generation failed", err);
  }
  return `https://picsum.photos/seed/${destination}/1200/600`;
};

export const getRealTimeInfo = async (destination: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `What is the current weather and any upcoming major events in ${destination} for the next week?`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    return response.text || "No real-time info available at this moment.";
  } catch (e) {
    return "Error fetching real-time info.";
  }
};

export const getExchangeRate = async (toCurrency: string): Promise<number> => {
  if (toCurrency === 'USD') return 1.0;
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `What is the current exchange rate from 1 USD to ${toCurrency}? Return only the numeric value.`,
      config: {
        tools: [{ googleSearch: {} }]
      }
    });
    
    const rateText = response.text?.replace(/[^0-9.]/g, '') || "1";
    const rate = parseFloat(rateText);
    return isNaN(rate) ? 1.0 : rate;
  } catch (err) {
    console.error("Failed to fetch exchange rate", err);
    return 1.0;
  }
};
