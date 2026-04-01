
import React, { useState } from 'react';
import { generateItinerary, generateDestinationImage } from '../services/geminiService';
import { TravelPlan } from '../types';

interface PlanCreatorProps {
  onPlanGenerated: (plan: TravelPlan) => void;
}

export const PlanCreator: React.FC<PlanCreatorProps> = ({ onPlanGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    origin: '',
    destination: '',
    startDate: new Date().toISOString().split('T')[0],
    duration: 3,
    budget: 'moderate',
    preferences: [] as string[]
  });

  const preferenceOptions = ['Adventure', 'Relaxation', 'Foodie', 'History', 'Family Friendly', 'Nightlife', 'Hidden Gems'];

  const togglePreference = (pref: string) => {
    setFormData(prev => ({
      ...prev,
      preferences: prev.preferences.includes(pref)
        ? prev.preferences.filter(p => p !== pref)
        : [...prev.preferences, pref]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // BOLT OPTIMIZATION: Parallelize independent AI calls to reduce total latency.
      const [plan, imageUrl] = await Promise.all([
        generateItinerary(
          formData.origin,
          formData.destination,
          formData.duration,
          formData.budget,
          formData.preferences
        ),
        generateDestinationImage(formData.destination)
      ]);

      onPlanGenerated({ 
        ...plan, 
        imageUrl, 
        origin: formData.origin,
        startDate: formData.startDate 
      });
    } catch (err) {
      alert("Failed to generate itinerary. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8 glass-effect rounded-3xl shadow-xl mt-8">
      <h2 className="text-3xl font-bold mb-6">Plan Your Next Escape</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Traveling from</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. New York, USA"
              value={formData.origin}
              onChange={e => setFormData({ ...formData, origin: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Going to</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-all"
              placeholder="e.g. Kyoto, Japan"
              value={formData.destination}
              onChange={e => setFormData({ ...formData, destination: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Start Date</label>
            <input
              type="date"
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              value={formData.startDate}
              onChange={e => setFormData({ ...formData, startDate: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Duration (Days)</label>
            <input
              type="number"
              min="1"
              max="14"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
              value={formData.duration}
              onChange={e => setFormData({ ...formData, duration: parseInt(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">Budget</label>
            <select
              className="w-full px-4 py-3 rounded-xl border border-slate-200 outline-none"
              value={formData.budget}
              onChange={e => setFormData({ ...formData, budget: e.target.value })}
            >
              <option value="budget">Budget-Friendly</option>
              <option value="moderate">Moderate</option>
              <option value="luxury">Luxury</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-slate-700 mb-2">Interests</label>
          <div className="flex flex-wrap gap-2">
            {preferenceOptions.map(pref => (
              <button
                key={pref}
                type="button"
                onClick={() => togglePreference(pref)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  formData.preferences.includes(pref)
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-400'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 disabled:opacity-50 transition-all flex items-center justify-center gap-2 shadow-lg"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Gemini is crafting your journey...
            </>
          ) : 'Generate Itinerary'}
        </button>
      </form>
    </div>
  );
};
