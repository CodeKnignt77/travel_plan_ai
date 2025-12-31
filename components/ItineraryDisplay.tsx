
import React, { useState, useEffect } from 'react';
import { TravelPlan } from '../types';
import { getRealTimeInfo } from '../services/geminiService';

interface ItineraryDisplayProps {
  plan: TravelPlan;
}

export const ItineraryDisplay: React.FC<ItineraryDisplayProps> = ({ plan }) => {
  const [activeDay, setActiveDay] = useState(1);
  const [realTimeInfo, setRealTimeInfo] = useState<string | null>(null);

  useEffect(() => {
    const fetchInfo = async () => {
      const info = await getRealTimeInfo(plan.destination);
      setRealTimeInfo(info);
    };
    fetchInfo();
  }, [plan.destination]);

  const itinerary = Array.isArray(plan.itinerary) ? plan.itinerary : [];
  const currentDayPlan = itinerary.find(d => d.day === activeDay);

  const getDayDate = (dayNum: number) => {
    const start = new Date(plan.startDate);
    const day = new Date(start);
    day.setDate(start.getDate() + (dayNum - 1));
    return day.toLocaleDateString(undefined, { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-16">
      <div className="relative h-96 rounded-3xl overflow-hidden mb-12 shadow-2xl">
        <img 
          src={plan.imageUrl || `https://picsum.photos/seed/${plan.destination}/1200/600`} 
          className="w-full h-full object-cover" 
          alt={plan.destination} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-10">
          <div className="flex items-center gap-2 text-white/60 mb-1 font-semibold uppercase tracking-widest text-xs">
            <span>{plan.origin}</span>
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
            <span>{plan.destination}</span>
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-2">{plan.destination}</h1>
          <p className="text-white/80 text-lg flex items-center gap-4">
            <span>{plan.duration} Days</span>
            <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
            <span className="capitalize">{plan.budget} Journey</span>
            <span className="w-1.5 h-1.5 bg-white/50 rounded-full"></span>
            <span>Starts {new Date(plan.startDate).toLocaleDateString()}</span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
            {itinerary.map(day => (
              <button
                key={day.day}
                onClick={() => setActiveDay(day.day)}
                className={`flex-shrink-0 px-5 py-3 rounded-2xl transition-all flex flex-col items-center min-w-[100px] ${
                  activeDay === day.day
                    ? 'bg-indigo-600 text-white shadow-lg scale-105'
                    : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-100'
                }`}
              >
                <span className="text-[10px] uppercase font-bold tracking-wider opacity-70">Day {day.day}</span>
                <span className="text-sm font-black">{getDayDate(day.day)}</span>
              </button>
            ))}
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {currentDayPlan?.title || `Exploring ${plan.destination}`}
            </h2>
            <div className="space-y-10 relative before:absolute before:inset-0 before:left-3 before:w-0.5 before:bg-slate-100 before:z-0">
              {currentDayPlan?.activities?.map((activity, i) => (
                <div key={i} className="relative pl-10 z-10">
                  <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-white border-4 border-indigo-500 shadow-sm"></div>
                  <div className="flex justify-between items-start mb-1">
                    <span className="text-sm font-bold text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg">
                      {activity.time}
                    </span>
                    <span className="text-sm font-semibold text-emerald-600">
                      ${activity.cost}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-slate-800">{activity.location}</h3>
                  <p className="text-slate-600 mt-2 leading-relaxed">{activity.description}</p>
                </div>
              ))}
              {(!currentDayPlan?.activities || currentDayPlan.activities.length === 0) && (
                <p className="text-slate-400 italic pl-10">No activities scheduled for this day.</p>
              )}
            </div>
          </div>

          <div className="bg-amber-50 rounded-3xl p-8 border border-amber-100">
            <h2 className="text-xl font-bold text-amber-900 mb-4 flex items-center gap-2">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Cultural Insights
            </h2>
            <p className="text-amber-800 leading-relaxed italic">
              {plan.culturalInsights || "Enjoy the local culture and traditions of this beautiful destination."}
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-4">Real-Time Travel Feed</h3>
            <div className="text-sm text-slate-600 prose max-w-none">
              {realTimeInfo ? (
                <div dangerouslySetInnerHTML={{ __html: realTimeInfo.replace(/\n/g, '<br/>') }} />
              ) : (
                <div className="animate-pulse space-y-2">
                  <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                  <div className="h-4 bg-slate-200 rounded w-full"></div>
                  <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                </div>
              )}
            </div>
          </div>

          <div className="bg-indigo-900 rounded-3xl p-6 text-white shadow-xl">
            <h3 className="font-bold text-lg mb-4">Meal Recommendations</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">🍳</div>
                <div>
                  <div className="text-xs text-indigo-300 uppercase tracking-wider font-bold">Breakfast</div>
                  <div className="text-sm font-medium">{currentDayPlan?.mealSuggestions?.breakfast || "Local cafe choice"}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">🍜</div>
                <div>
                  <div className="text-xs text-indigo-300 uppercase tracking-wider font-bold">Lunch</div>
                  <div className="text-sm font-medium">{currentDayPlan?.mealSuggestions?.lunch || "Nearby eatery"}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="bg-white/20 p-2 rounded-lg">🍷</div>
                <div>
                  <div className="text-xs text-indigo-300 uppercase tracking-wider font-bold">Dinner</div>
                  <div className="text-sm font-medium">{currentDayPlan?.mealSuggestions?.dinner || "Signature local dining"}</div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100">
            <h3 className="font-bold text-lg mb-2">Budget Overview</h3>
            <div className="text-3xl font-bold text-slate-800">${plan.totalEstimatedCost}</div>
            <p className="text-xs text-slate-500 mt-1 italic font-medium">*Estimated total for activities and meals</p>
            <button className="w-full mt-6 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors">
              Add to Expenses
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
