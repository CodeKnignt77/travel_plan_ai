
export interface TravelPlan {
  id: string;
  origin: string;
  destination: string;
  startDate: string;
  duration: number;
  budget: 'budget' | 'moderate' | 'luxury';
  preferences: string[];
  itinerary: DayPlan[];
  culturalInsights: string;
  weatherForecast?: string;
  totalEstimatedCost: number;
  imageUrl?: string;
}

export interface DayPlan {
  day: number;
  title: string;
  activities: Activity[];
  mealSuggestions: {
    breakfast: string;
    lunch: string;
    dinner: string;
  };
}

export interface Activity {
  time: string;
  location: string;
  description: string;
  cost: number;
  category: 'sightseeing' | 'adventure' | 'relaxation' | 'food';
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
  airline?: string;
  flightNumber?: string;
  departureAirport?: string;
  arrivalAirport?: string;
}

export type View = 'home' | 'create' | 'dashboard' | 'itinerary' | 'expenses';
