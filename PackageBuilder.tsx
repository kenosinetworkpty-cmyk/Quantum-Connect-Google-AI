import React, { useState, useEffect } from 'react';
import { Check, ChevronDown, Zap, Wifi, Calendar, CreditCard } from 'lucide-react';
import { Button } from './ui/Button';

// --- Data Definitions ---

type ContractType = 'month-to-month' | 'prepaid';
type Frequency = 'daily' | 'weekly' | 'monthly';

interface PackageOption {
  id: string;
  name: string;
  speed: string; // e.g. "20/10 Mbps"
  price: number;
  durationLabel: string; // e.g. "3 Days"
  frequency: Frequency;
  contractType: ContractType;
}

const PACKAGE_DATA: PackageOption[] = [
  // Prepaid - Daily (3 Days)
  { id: 'pd1', contractType: 'prepaid', frequency: 'daily', name: 'Budget User', speed: '20/10 Mbps', price: 51, durationLabel: '3 Days' },
  { id: 'pd2', contractType: 'prepaid', frequency: 'daily', name: 'Budget User', speed: '50/25 Mbps', price: 93, durationLabel: '3 Days' },
  { id: 'pd3', contractType: 'prepaid', frequency: 'daily', name: 'Budget User', speed: '10/5 Mbps', price: 48, durationLabel: '3 Days' },

  // Prepaid - Weekly (7 Days)
  { id: 'pw1', contractType: 'prepaid', frequency: 'weekly', name: 'Light User', speed: '20/10 Mbps', price: 88, durationLabel: '7 Days' },
  { id: 'pw2', contractType: 'prepaid', frequency: 'weekly', name: 'Light User', speed: '50/25 Mbps', price: 185, durationLabel: '7 Days' },
  { id: 'pw3', contractType: 'prepaid', frequency: 'weekly', name: 'Light User', speed: '10/5 Mbps', price: 83, durationLabel: '7 Days' },

  // Prepaid - Monthly (30 Days)
  { id: 'pm1', contractType: 'prepaid', frequency: 'monthly', name: 'Family Plan', speed: '20/10 Mbps', price: 305, durationLabel: '30 Days' },
  { id: 'pm2', contractType: 'prepaid', frequency: 'monthly', name: 'Family Plan', speed: '50/25 Mbps', price: 622, durationLabel: '30 Days' },
  { id: 'pm3', contractType: 'prepaid', frequency: 'monthly', name: 'Family Plan', speed: '10/5 Mbps', price: 289, durationLabel: '30 Days' },

  // Month-to-Month - Monthly
  { id: 'mm1', contractType: 'month-to-month', frequency: 'monthly', name: 'Family Plan', speed: '20/10 Mbps', price: 305, durationLabel: 'Month-to-Month' },
  { id: 'mm2', contractType: 'month-to-month', frequency: 'monthly', name: 'Family Plan', speed: '50/25 Mbps', price: 622, durationLabel: 'Month-to-Month' },
  { id: 'mm3', contractType: 'month-to-month', frequency: 'monthly', name: 'Family Plan', speed: '10/5 Mbps', price: 289, durationLabel: 'Month-to-Month' },
];

export const PackageBuilder: React.FC = () => {
  // --- State ---
  const [contractType, setContractType] = useState<ContractType>('prepaid');
  const [frequency, setFrequency] = useState<Frequency>('daily');
  const [selectedPkgId, setSelectedPkgId] = useState<string>('');

  // --- Logic & Effects ---

  // 1. Filter Available Frequencies based on Contract Type
  const availableFrequencies: Frequency[] = contractType === 'prepaid' 
    ? ['daily', 'weekly', 'monthly'] 
    : ['monthly'];

  // Effect: Reset Frequency if current selection is not valid for new Contract Type
  useEffect(() => {
    if (!availableFrequencies.includes(frequency)) {
      setFrequency(availableFrequencies[0]);
    }
  }, [contractType, availableFrequencies, frequency]);

  // 2. Filter Available Packages based on Contract Type AND Frequency
  const availablePackages = PACKAGE_DATA.filter(
    (pkg) => pkg.contractType === contractType && pkg.frequency === frequency
  );

  // Effect: Auto-select the first package when the available list changes (optional, but good UX)
  // Or clear selection if the current selected ID is no longer in the list
  useEffect(() => {
    const currentExists = availablePackages.find(p => p.id === selectedPkgId);
    if (!currentExists && availablePackages.length > 0) {
      setSelectedPkgId(availablePackages[0].id);
    }
  }, [availablePackages, selectedPkgId]);

  const selectedPackage = availablePackages.find(p => p.id === selectedPkgId);

  // --- Helpers ---
  const formatFrequency = (f: Frequency) => f.charAt(0).toUpperCase() + f.slice(1);

  return (
    <section className="py-24 bg-white relative overflow-hidden border-b border-slate-100">
      
      {/* --- DECORATIVE: Circuit Pattern --- */}
      <svg className="absolute right-0 top-0 h-full w-1/3 opacity-[0.03] text-blue-900 pointer-events-none" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path d="M0,0 L10,0 L10,10 L20,10 L20,20 L30,20 L30,100 L0,100 Z" />
        <rect x="40" y="20" width="2" height="40" />
        <rect x="50" y="10" width="2" height="60" />
      </svg>
      
      <div className="container mx-auto px-4 relative z-10">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Build Your Plan</h2>
            {/* Custom "Graffiti Tag" Underline */}
            <svg className="absolute -bottom-2 right-0 w-32 md:w-48 h-4" viewBox="0 0 200 15" fill="none">
              <path d="M5 10 Q 50 15, 100 5 T 195 10" stroke="url(#builderGrad)" strokeWidth="4" strokeLinecap="round" />
              <defs>
                 <linearGradient id="builderGrad" x1="0" y1="0" x2="100%" y2="0">
                    <stop offset="0%" stopColor="#E60000"/>
                    <stop offset="100%" stopColor="#00B87C"/>
                 </linearGradient>
              </defs>
            </svg>
          </div>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto mt-6">
            Afraid of long term commitments, No worries. We got you! No Credit checks. Just choose your a Prepaid or month to month package that suits your pocket!
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8 max-w-6xl mx-auto">
          
          {/* Builder Form Area */}
          <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Step 1: Contract Type */}
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 shadow-sm relative group hover:border-blue-200 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                <CreditCard size={40} className="text-blue-900" />
              </div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                1. Contract Type
              </label>
              <div className="relative">
                <select
                  value={contractType}
                  onChange={(e) => setContractType(e.target.value as ContractType)}
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-900 font-bold text-lg rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-4 pr-10 shadow-sm cursor-pointer outline-none transition-shadow"
                >
                  <option value="prepaid">Prepaid</option>
                  <option value="month-to-month">Month-to-Month</option>
                </select>
                <ChevronDown className="absolute right-4 top-5 text-slate-400 pointer-events-none" size={20} />
              </div>
              <p className="text-xs text-slate-500 mt-4 leading-relaxed font-medium">
                {contractType === 'prepaid' 
                  ? "Flexible, pay-as-you-go access. No credit checks required." 
                  : "Recurring monthly billing. Cancel anytime with notice."}
              </p>
            </div>

            {/* Step 2: Frequency */}
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 shadow-sm relative group hover:border-blue-200 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                <Calendar size={40} className="text-green-600" />
              </div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                2. Billing Cycle
              </label>
              <div className="relative">
                <select
                  value={frequency}
                  onChange={(e) => setFrequency(e.target.value as Frequency)}
                  disabled={availableFrequencies.length === 1}
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-900 font-bold text-lg rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-4 pr-10 shadow-sm disabled:bg-slate-100 disabled:text-slate-400 cursor-pointer outline-none transition-shadow"
                >
                  {availableFrequencies.map(freq => (
                    <option key={freq} value={freq}>{formatFrequency(freq)}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-5 text-slate-400 pointer-events-none" size={20} />
              </div>
              <p className="text-xs text-slate-500 mt-4 leading-relaxed font-medium">
                {contractType === 'month-to-month'
                  ? "Standard monthly cycle."
                  : "Choose how long you want to stay connected."}
              </p>
            </div>

            {/* Step 3: Package Options */}
            <div className="bg-slate-50 p-6 rounded-2xl border-2 border-slate-100 shadow-sm relative group hover:border-blue-200 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity duration-300 transform group-hover:scale-110">
                <Wifi size={40} className="text-red-500" />
              </div>
              <label className="block text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">
                3. Speed & Price
              </label>
              <div className="relative">
                <select
                  value={selectedPkgId}
                  onChange={(e) => setSelectedPkgId(e.target.value)}
                  className="w-full appearance-none bg-white border border-slate-200 text-slate-900 font-bold text-lg rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 block p-4 pr-10 shadow-sm cursor-pointer outline-none transition-shadow"
                >
                  {availablePackages.map(pkg => (
                    <option key={pkg.id} value={pkg.id}>
                      {pkg.name} ({pkg.speed}) — R{pkg.price}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-4 top-5 text-slate-400 pointer-events-none" size={20} />
              </div>
               <p className="text-xs text-slate-500 mt-4 leading-relaxed font-medium">
                Select your preferred speed profile. All packages are uncapped.
              </p>
            </div>

          </div>

          {/* Result / Summary Card */}
          <div className="w-full lg:w-96 flex-shrink-0">
             <div className="h-full bg-slate-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between border-4 border-slate-900 group">
                
                {/* Decorative Glowing Wires */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-500 via-blue-500 to-green-500"></div>
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[80px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-red-600 rounded-full blur-[60px] opacity-10 translate-y-1/2 -translate-x-1/2"></div>

                {selectedPackage ? (
                  <div className="relative z-10 animate-in fade-in slide-in-from-right-4 duration-500 key={selectedPkgId}">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-md bg-white/10 text-white text-[10px] font-black uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-sm">
                        {contractType.replace('-', ' ')}
                      </span>
                      <h3 className="text-3xl font-black mb-2 tracking-tight">{selectedPackage.name}</h3>
                      <div className="flex items-baseline mb-1">
                         <span className="text-lg font-medium text-slate-400 mr-1">R</span>
                         <span className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">
                           {selectedPackage.price}
                         </span>
                      </div>
                      <div className="text-slate-400 text-sm mb-8 font-medium pl-1">
                        for {selectedPackage.durationLabel}
                      </div>
                    </div>

                    <div className="space-y-5 mb-10">
                       <div className="flex items-center text-slate-300 group/item">
                         <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mr-4 text-green-400 group-hover/item:border-green-500/50 transition-colors">
                           <Zap size={20} />
                         </div>
                         <div>
                           <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Speed</div>
                           <div className="font-bold text-white">{selectedPackage.speed}</div>
                         </div>
                       </div>
                       
                       <div className="flex items-center text-slate-300 group/item">
                         <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mr-4 text-blue-400 group-hover/item:border-blue-500/50 transition-colors">
                           <Calendar size={20} />
                         </div>
                         <div>
                           <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Duration</div>
                           <div className="font-bold text-white">{selectedPackage.durationLabel}</div>
                         </div>
                       </div>

                       <div className="flex items-center text-slate-300 group/item">
                         <div className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center mr-4 text-red-400 group-hover/item:border-red-500/50 transition-colors">
                           <Check size={20} />
                         </div>
                         <div>
                           <div className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Data</div>
                           <div className="font-bold text-white">Uncapped</div>
                         </div>
                       </div>
                    </div>

                    <Button className="w-full py-4 text-lg font-bold rounded-full tracking-wide shadow-lg shadow-blue-500/20 hover:shadow-green-500/40 transform active:scale-95 transition-all duration-200 bg-gradient-to-r from-blue-900 to-slate-900 border border-white/10 text-white">
                      Select Plan
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-64 text-slate-500">
                    Select options to view price
                  </div>
                )}
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};