
import React, { useState } from 'react';
import { Navigation } from './components/Navigation';
import { PlanCreator } from './components/PlanCreator';
import { ItineraryDisplay } from './components/ItineraryDisplay';
import { ExpenseTracker } from './components/ExpenseTracker';
import { View, TravelPlan } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [activePlan, setActivePlan] = useState<TravelPlan | null>(null);

  const handlePlanGenerated = (plan: TravelPlan) => {
    setActivePlan(plan);
    setCurrentView('itinerary');
  };

  return (
    <div className="min-h-screen">
      <Navigation 
        currentView={currentView} 
        onNavigate={setCurrentView} 
      />

      <main className="pt-20 pb-12">
        {currentView === 'home' && (
          <div className="max-w-7xl mx-auto px-4 py-20 text-center">
            <h1 className="text-7xl font-extrabold tracking-tighter text-slate-900 mb-6">
              Travel smarter with <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-emerald-500">
                GenAI Intelligence.
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Vagabond AI uses Gemini's multi-modal power to curate perfectly tailored travel experiences. 
              From Kyoto's hidden temples to Paris's secret bistros.
            </p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={() => setCurrentView('create')}
                className="px-8 py-4 bg-indigo-600 text-white rounded-2xl font-bold text-lg hover:bg-indigo-700 shadow-xl transition-all"
              >
                Start Planning
              </button>
              <button 
                onClick={() => setCurrentView('dashboard')}
                className="px-8 py-4 bg-white text-slate-700 border border-slate-200 rounded-2xl font-bold text-lg hover:bg-slate-50 transition-all"
              >
                Browse Popular
              </button>
            </div>
            
            <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'AI-Powered', desc: 'Smarter routes and authentic local gems.', icon: '⚡' },
                { title: 'Multi-Modal', desc: 'Visualizes destinations with AI generation.', icon: '🖼️' },
                { title: 'Real-Time', desc: 'Grounding in current weather and events.', icon: '🌐' }
              ].map((feature, i) => (
                <div key={i} className="glass-effect p-8 rounded-3xl text-left border border-white/50 shadow-sm">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {currentView === 'create' && (
          <PlanCreator onPlanGenerated={handlePlanGenerated} />
        )}

        {currentView === 'itinerary' && activePlan && (
          <ItineraryDisplay plan={activePlan} />
        )}

        {currentView === 'dashboard' && (
          <div className="max-w-7xl mx-auto px-4 py-12">
             <h2 className="text-3xl font-bold mb-8">My Past Explorations</h2>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
               {activePlan ? (
                 <div 
                   onClick={() => setCurrentView('itinerary')}
                   className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer shadow-lg hover:shadow-2xl transition-all"
                 >
                   <img src={activePlan.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" alt={activePlan.destination} />
                   <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
                     <h3 className="text-white text-2xl font-bold">{activePlan.destination}</h3>
                     <p className="text-white/70">{activePlan.duration} Days • ${activePlan.totalEstimatedCost}</p>
                   </div>
                 </div>
               ) : (
                 <div className="col-span-full py-20 text-center glass-effect rounded-3xl">
                   <p className="text-slate-500 text-lg">You haven't planned any trips yet. Adventure awaits!</p>
                   <button 
                     onClick={() => setCurrentView('create')}
                     className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl font-medium"
                   >
                     Plan First Trip
                   </button>
                 </div>
               )}
             </div>
          </div>
        )}

        {currentView === 'expenses' && (
          <ExpenseTracker />
        )}
      </main>

      <footer className="border-t border-slate-200 bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-indigo-600 p-1.5 rounded-md">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945" />
              </svg>
            </div>
            <span className="font-bold text-slate-800">Vagabond AI</span>
          </div>
          <div className="flex gap-8 text-sm font-medium text-slate-500">
            <a href="#" className="hover:text-indigo-600">Privacy</a>
            <a href="#" className="hover:text-indigo-600">Terms</a>
            <a href="#" className="hover:text-indigo-600">Support</a>
          </div>
          <div className="text-sm text-slate-400">
            © 2025 Vagabond AI. Powered by Gemini.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
