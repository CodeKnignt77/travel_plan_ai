
import React, { useState, useEffect, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip as RechartsTooltip } from 'recharts';
import { Expense } from '../types';
import { getExchangeRate } from '../services/geminiService';

const CURRENCIES = [
  { code: 'USD', symbol: '$' },
  { code: 'EUR', symbol: '€' },
  { code: 'JPY', symbol: '¥' },
  { code: 'GBP', symbol: '£' },
  { code: 'CAD', symbol: 'C$' },
  { code: 'AUD', symbol: 'A$' },
];

const AIRLINE_MAP: Record<string, string> = {
  'JL': 'Japan Airlines',
  'NH': 'All Nippon Airways',
  'AA': 'American Airlines',
  'DL': 'Delta Air Lines',
  'UA': 'United Airlines',
  'BA': 'British Airways',
  'AF': 'Air France',
  'LH': 'Lufthansa',
  'EK': 'Emirates',
  'QR': 'Qatar Airways',
  'CX': 'Cathay Pacific',
  'SQ': 'Singapore Airlines',
  'KL': 'KLM Royal Dutch Airlines',
};

const AIRPORT_MAP: Record<string, string> = {
  'SFO': 'San Francisco International Airport',
  'HND': 'Tokyo Haneda Airport',
  'NRT': 'Tokyo Narita Airport',
  'LAX': 'Los Angeles International Airport',
  'JFK': 'John F. Kennedy International Airport',
  'LHR': 'London Heathrow Airport',
  'CDG': 'Paris Charles de Gaulle Airport',
  'DXB': 'Dubai International Airport',
  'SIN': 'Singapore Changi Airport',
  'ICN': 'Incheon International Airport',
  'AMS': 'Amsterdam Schiphol Airport',
  'FRA': 'Frankfurt Airport',
  'HKG': 'Hong Kong International Airport',
  'SYD': 'Sydney Airport',
};

const REVERSE_AIRLINE_MAP = Object.fromEntries(Object.entries(AIRLINE_MAP).map(([k, v]) => [v.toLowerCase(), k]));
const REVERSE_AIRPORT_MAP = Object.fromEntries(Object.entries(AIRPORT_MAP).map(([k, v]) => [v.toLowerCase(), k]));

const getAlternateInfo = (value: string | undefined, map: Record<string, string>, reverseMap: Record<string, string>) => {
  if (!value) return null;
  const upperVal = value.toUpperCase();
  const lowerVal = value.toLowerCase();
  
  if (map[upperVal]) return map[upperVal];
  if (reverseMap[lowerVal]) return reverseMap[lowerVal].toUpperCase();
  
  return null;
};

interface TooltipProps {
  content: string | null;
  children: React.ReactNode;
}

const InfoTooltip: React.FC<TooltipProps> = ({ content, children }) => {
  if (!content) return <>{children}</>;
  return (
    <div className="group/tooltip relative inline-block">
      {children}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/tooltip:block z-50">
        <div className="bg-slate-900 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl border border-white/10">
          {content}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
        </div>
      </div>
    </div>
  );
};

export const ExpenseTracker: React.FC = () => {
  const [expenses, setExpenses] = useState<Expense[]>([
    { 
      id: '1', 
      category: 'Flights', 
      amount: 850, 
      description: 'Flight to Tokyo', 
      date: '2024-05-10',
      airline: 'Japan Airlines',
      flightNumber: 'JL001',
      departureAirport: 'SFO',
      arrivalAirport: 'HND'
    },
    { id: '2', category: 'Accommodation', amount: 420, description: 'Hotel Stay', date: '2024-05-12' },
  ]);

  const [displayCurrency, setDisplayCurrency] = useState('USD');
  const [exchangeRate, setExchangeRate] = useState(1.0);
  const [isSyncing, setIsSyncing] = useState(false);
  const [newExp, setNewExp] = useState({ 
    category: 'Food', 
    amount: 0, 
    description: '',
    date: new Date().toISOString().split('T')[0],
    airline: '',
    flightNumber: '',
    departureAirport: '',
    arrivalAirport: ''
  });

  const categories = ['Flights', 'Accommodation', 'Food', 'Transport', 'Activities', 'Other'];
  const colors = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#64748b'];

  const selectedCurrencySymbol = CURRENCIES.find(c => c.code === displayCurrency)?.symbol || '$';

  useEffect(() => {
    const updateRate = async () => {
      setIsSyncing(true);
      const rate = await getExchangeRate(displayCurrency);
      setExchangeRate(rate);
      setIsSyncing(false);
    };
    updateRate();
  }, [displayCurrency]);

  const convert = (amount: number) => {
    return (amount * exchangeRate).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  // Memoize chart data to prevent expensive re-calculations on every render
  const chartData = useMemo(() => {
    return categories.map(cat => ({
      name: cat,
      value: expenses.filter(e => e.category === cat).reduce((acc, curr) => acc + curr.amount, 0) * exchangeRate
    })).filter(d => d.value > 0);
  }, [expenses, exchangeRate, categories]);

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (newExp.amount <= 0) return;
    const amountInUSD = newExp.amount / (displayCurrency === 'USD' ? 1 : exchangeRate);
    const expense: Expense = {
      id: Math.random().toString(),
      category: newExp.category,
      amount: amountInUSD,
      description: newExp.description,
      date: newExp.date,
      ...(newExp.category === 'Flights' && {
        airline: newExp.airline,
        flightNumber: newExp.flightNumber,
        departureAirport: newExp.departureAirport.toUpperCase(),
        arrivalAirport: newExp.arrivalAirport.toUpperCase()
      })
    };
    setExpenses([expense, ...expenses]);
    setNewExp({ 
      category: 'Food', 
      amount: 0, 
      description: '',
      date: new Date().toISOString().split('T')[0],
      airline: '',
      flightNumber: '',
      departureAirport: '',
      arrivalAirport: ''
    });
  };

  const totalUSD = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 mt-16">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-extrabold text-slate-900">Expense Tracker</h1>
        
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl shadow-sm border border-slate-100">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Display:</span>
          <select 
            value={displayCurrency}
            onChange={(e) => setDisplayCurrency(e.target.value)}
            className="bg-transparent font-bold text-indigo-600 outline-none cursor-pointer"
          >
            {CURRENCIES.map(c => (
              <option key={c.code} value={c.code}>{c.code} ({c.symbol})</option>
            ))}
          </select>
          {isSyncing && (
            <svg className="animate-spin h-4 w-4 text-indigo-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          )}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 text-slate-800">Log Transaction</h2>
            <form onSubmit={addExpense} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Category</label>
                  <select 
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newExp.category}
                    onChange={e => setNewExp({...newExp, category: e.target.value})}
                  >
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Date</label>
                  <input 
                    type="date"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newExp.date}
                    onChange={e => setNewExp({...newExp, date: e.target.value})}
                  />
                </div>
              </div>

              {newExp.category === 'Flights' && (
                <div className="p-5 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-4 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="text-xs font-black text-indigo-600 uppercase tracking-widest">Flight Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Airline (e.g. Delta)"
                      className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-lg outline-none"
                      value={newExp.airline}
                      onChange={e => setNewExp({...newExp, airline: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Flight #"
                      className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-lg outline-none"
                      value={newExp.flightNumber}
                      onChange={e => setNewExp({...newExp, flightNumber: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="Departure (SFO)"
                      className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-lg outline-none"
                      value={newExp.departureAirport}
                      onChange={e => setNewExp({...newExp, departureAirport: e.target.value})}
                    />
                    <input 
                      type="text" 
                      placeholder="Arrival (HND)"
                      className="w-full px-4 py-2 text-sm bg-white border border-slate-200 rounded-lg outline-none"
                      value={newExp.arrivalAirport}
                      onChange={e => setNewExp({...newExp, arrivalAirport: e.target.value})}
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Amount ({selectedCurrencySymbol})</label>
                  <input 
                    type="number" 
                    step="0.01"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newExp.amount || ''}
                    onChange={e => setNewExp({...newExp, amount: parseFloat(e.target.value) || 0})}
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Description</label>
                  <input 
                    type="text" 
                    placeholder="Short description..."
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500"
                    value={newExp.description}
                    onChange={e => setNewExp({...newExp, description: e.target.value})}
                  />
                </div>
              </div>
              <button className="w-full py-4 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-md active:scale-95 transform">
                Save Transaction
              </button>
            </form>
          </div>

          <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
            <h2 className="text-xl font-bold mb-6 text-slate-800">Transaction History</h2>
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2 scrollbar-hide">
              {expenses.map(e => (
                <div key={e.id} className="group flex flex-col gap-3 p-5 hover:bg-slate-50/80 rounded-2xl transition-all border border-slate-50 hover:border-slate-200 shadow-sm">
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4 items-center">
                      <div className={`p-3 rounded-2xl ${
                        e.category === 'Flights' ? 'bg-indigo-100 text-indigo-600' : 
                        e.category === 'Accommodation' ? 'bg-emerald-100 text-emerald-600' : 
                        e.category === 'Food' ? 'bg-amber-100 text-amber-600' :
                        'bg-slate-100 text-slate-600'
                      }`}>
                        {e.category === 'Flights' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                          </svg>
                        ) : e.category === 'Accommodation' ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 leading-tight">{e.description}</div>
                        <div className="text-xs text-slate-400 font-bold uppercase tracking-wide mt-0.5">{e.category} • {e.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-slate-900 text-lg">{selectedCurrencySymbol}{convert(e.amount)}</div>
                      {displayCurrency !== 'USD' && (
                        <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">approx. ${e.amount.toFixed(2)} USD</div>
                      )}
                    </div>
                  </div>
                  
                  {e.category === 'Flights' && (e.airline || e.flightNumber || e.departureAirport || e.arrivalAirport) && (
                    <div className="p-4 bg-slate-50/50 border border-slate-100 rounded-2xl group-hover:bg-white transition-colors">
                      <div className="flex items-center justify-between">
                        <div className="flex flex-col gap-0.5">
                          <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Airline & Flight</span>
                          <div className="flex items-center gap-2">
                            <InfoTooltip content={getAlternateInfo(e.airline, AIRLINE_MAP, REVERSE_AIRLINE_MAP)}>
                              <span className="text-xs font-bold text-slate-800 cursor-help border-b border-dotted border-slate-300">
                                {e.airline || 'Unknown'}
                              </span>
                            </InfoTooltip>
                            {e.flightNumber && <span className="text-[10px] font-black text-indigo-500 bg-indigo-50 px-1.5 py-0.5 rounded uppercase">{e.flightNumber}</span>}
                          </div>
                        </div>
                        <div className="flex items-center gap-5">
                          <div className="flex flex-col items-end gap-0.5">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Dep</span>
                            <InfoTooltip content={getAlternateInfo(e.departureAirport, AIRPORT_MAP, REVERSE_AIRPORT_MAP)}>
                              <span className="text-sm font-black text-slate-900 tracking-tighter cursor-help border-b border-dotted border-slate-300">
                                {e.departureAirport || '???'}
                              </span>
                            </InfoTooltip>
                          </div>
                          <div className="relative flex items-center justify-center">
                            <div className="w-10 h-px bg-slate-200 border-t border-dashed border-slate-300"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <svg className="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                              </svg>
                            </div>
                          </div>
                          <div className="flex flex-col items-start gap-0.5">
                            <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Arr</span>
                            <InfoTooltip content={getAlternateInfo(e.arrivalAirport, AIRPORT_MAP, REVERSE_AIRPORT_MAP)}>
                              <span className="text-sm font-black text-slate-900 tracking-tighter cursor-help border-b border-dotted border-slate-300">
                                {e.arrivalAirport || '???'}
                              </span>
                            </InfoTooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center">
          <h2 className="text-xl font-bold mb-2 text-slate-800">Budget Analytics</h2>
          <div className="text-5xl font-black text-indigo-600 mb-1 tracking-tighter">
            {selectedCurrencySymbol}{convert(totalUSD)}
          </div>
          <div className="text-sm font-bold text-slate-400 mb-6 uppercase tracking-[0.2em]">Total Spend</div>
          
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={90}
                  outerRadius={130}
                  paddingAngle={8}
                  dataKey="value"
                  stroke="none"
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={colors[index % colors.length]}
                      className="hover:opacity-80 transition-opacity cursor-pointer outline-none" 
                    />
                  ))}
                </Pie>
                <RechartsTooltip 
                  contentStyle={{ 
                    borderRadius: '20px', 
                    border: 'none', 
                    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
                    padding: '12px 16px'
                  }}
                  itemStyle={{ fontSize: '14px', fontWeight: 'bold' }}
                  formatter={(value: number) => [`${selectedCurrencySymbol}${value.toFixed(2)}`, 'Allocated']}
                />
                <Legend 
                  iconType="circle" 
                  layout="horizontal" 
                  verticalAlign="bottom" 
                  align="center"
                  wrapperStyle={{ paddingTop: '20px', fontSize: '13px', fontWeight: '600', color: '#64748b' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {displayCurrency !== 'USD' && (
            <div className="mt-8 px-6 py-3 bg-indigo-50/50 rounded-2xl text-[11px] text-indigo-600 font-bold border border-indigo-100 uppercase tracking-widest shadow-inner">
              Exchange Sync: 1 USD = {exchangeRate.toFixed(4)} {displayCurrency}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
