import React, { useState } from 'react';
import { Check, ChevronDown, ChevronUp, Router, PenTool as Tool, Wifi, Shield } from 'lucide-react';
import { Package, Provider } from '../types';
import { Button } from './ui/Button';

interface PricingGridProps {
  providers: Provider[];
  packages: Package[];
  onSelectPackage: (pkg: Package) => void;
  filteredProviders?: string[];
}

export const PricingGrid: React.FC<PricingGridProps> = ({ 
  providers, 
  packages, 
  onSelectPackage, 
  filteredProviders 
}) => {
  const [expandedPkgId, setExpandedPkgId] = useState<string | null>(null);

  // Filter packages based on availability if provided
  const displayPackages = filteredProviders && filteredProviders.length > 0
    ? packages.filter(p => filteredProviders.includes(p.providerId))
    : packages;

  // Sort by price for easy comparison
  const sortedPackages = [...displayPackages].sort((a, b) => a.price - b.price);

  const toggleExpand = (id: string) => {
    setExpandedPkgId(expandedPkgId === id ? null : id);
  };

  return (
    <section id="pricing" className="py-24 bg-white scroll-mt-20 relative overflow-hidden">
      
      {/* --- DECORATIVE: The Urban Slash --- */}
      <div className="absolute top-0 right-0 w-full h-full pointer-events-none z-0">
        <svg className="absolute right-[-20%] top-[-10%] w-[80%] h-[120%] opacity-[0.02]" viewBox="0 0 100 100" preserveAspectRatio="none">
           <path d="M40,0 L60,0 L40,100 L20,100 Z" fill="#000" />
           <path d="M65,0 L70,0 L50,100 L45,100 Z" fill="#e60000" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Choose Your Package</h2>
          <p className="text-slate-500 font-medium">Simple, transparent month-to-month fibre plans.</p>
        </div>

        {/* Desktop Grid Headers */}
        <div className="hidden md:grid grid-cols-12 gap-4 px-6 py-4 bg-slate-50 text-xs font-bold text-slate-400 uppercase tracking-widest rounded-t-2xl border border-slate-100">
          <div className="col-span-3">Plan</div>
          <div className="col-span-3">Speed</div>
          <div className="col-span-2 text-right">Price</div>
          <div className="col-span-4 text-center">Action</div>
        </div>

        <div className="space-y-4">
          {sortedPackages.map((pkg) => {
            const isExpanded = expandedPkgId === pkg.id;

            return (
              <div 
                key={pkg.id} 
                className={`relative group border transition-all duration-300 rounded-2xl ${
                  isExpanded 
                    ? 'border-blue-900 shadow-2xl scale-[1.01] z-10' 
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-lg'
                } bg-white overflow-hidden`}
              >
                {/* Decorative Edge Highlight for Active State */}
                {isExpanded && (
                  <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 via-blue-500 to-green-500"></div>
                )}

                {/* Main Row */}
                <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
                  
                  {/* Plan Info (Renamed from Provider) */}
                  <div className="col-span-1 md:col-span-3 flex items-center gap-5">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors ${
                      isExpanded ? 'bg-blue-900 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-blue-50 group-hover:text-blue-600'
                    }`}>
                       <Wifi size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-xl tracking-tight">{pkg.name}</h3>
                      <div className="flex items-center text-[10px] font-bold uppercase tracking-wider text-green-600 mt-1">
                        <Check size={12} className="mr-1" /> Month-to-Month
                      </div>
                    </div>
                  </div>

                  {/* Speed Info */}
                  <div className="col-span-1 md:col-span-3">
                    <div className="flex flex-col">
                      <span className="text-3xl font-black text-slate-900">{pkg.speedDown}<span className="text-sm font-semibold text-slate-400 ml-1">Mbps</span></span>
                      <div className="flex items-center mt-1">
                        <span className="text-xs text-slate-500 font-medium bg-slate-100 px-2 py-0.5 rounded mr-2">DL</span>
                        <span className="text-xs text-slate-400">/ {pkg.speedUp} Mbps Upload</span>
                      </div>
                    </div>
                  </div>

                  {/* Price Info */}
                  <div className="col-span-1 md:col-span-2 md:text-right">
                    <div className="flex flex-col md:items-end">
                      <span className="text-3xl font-black text-blue-900">R{pkg.price}</span>
                      <span className="text-xs text-slate-400 font-medium uppercase tracking-wide">per month</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="col-span-1 md:col-span-4 flex flex-col sm:flex-row gap-3 justify-end items-center">
                     <button 
                        onClick={() => toggleExpand(pkg.id)}
                        className="text-sm font-bold text-slate-400 hover:text-blue-900 flex items-center transition-colors uppercase tracking-wide"
                     >
                       {isExpanded ? 'Hide' : 'Details'}
                       {isExpanded ? <ChevronUp size={16} className="ml-1" /> : <ChevronDown size={16} className="ml-1" />}
                     </button>
                     <Button 
                       onClick={() => onSelectPackage(pkg)}
                       className={`w-full sm:w-auto shadow-lg transition-all ${
                         isExpanded ? 'bg-blue-900 hover:bg-blue-800' : 'bg-slate-900 hover:bg-slate-800'
                       }`}
                     >
                       Select Plan
                     </Button>
                  </div>
                </div>

                {/* Expanded Details Accordion */}
                <div 
                  className={`border-t border-slate-100 bg-slate-50/50 transition-all duration-300 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-[600px] opacity-100 p-8' : 'max-h-0 opacity-0 p-0 border-none'
                  }`}
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                    
                    {/* Key Features */}
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center">
                        <span className="w-8 h-[2px] bg-red-500 mr-2"></span>
                        Plan Features
                      </h4>
                      <ul className="space-y-4">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start text-sm text-slate-700 font-bold">
                            <div className="mt-0.5 mr-3 bg-white border border-green-200 text-green-600 rounded-full p-0.5 shadow-sm">
                              <Check size={10} strokeWidth={4} />
                            </div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Hardware & Installation */}
                    <div>
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center">
                        <span className="w-8 h-[2px] bg-blue-500 mr-2"></span>
                        Hardware
                      </h4>
                      <div className="space-y-5">
                         <div className="flex items-start bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                           <div className="mt-1 mr-3 text-blue-500 bg-blue-50 p-2 rounded-lg">
                             <Router size={18} />
                           </div>
                           <div>
                             <span className="block text-sm font-bold text-slate-900">WiFi Router</span>
                             <span className="text-xs text-slate-500 font-medium">{pkg.hasRouter ? 'Included (Free-to-Use)' : 'Not Included'}</span>
                           </div>
                         </div>
                         <div className="flex items-start bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                           <div className="mt-1 mr-3 text-blue-500 bg-blue-50 p-2 rounded-lg">
                             <Tool size={18} />
                           </div>
                           <div>
                             <span className="block text-sm font-bold text-slate-900">Installation</span>
                             <span className="text-xs text-slate-500 font-medium">{pkg.hasInstallation ? 'Free Installation (Worth R1725)' : 'Standard Rates Apply'}</span>
                           </div>
                         </div>
                      </div>
                    </div>

                    {/* Terms */}
                    <div>
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-5 flex items-center">
                        <span className="w-8 h-[2px] bg-green-500 mr-2"></span>
                        The Fine Print
                       </h4>
                       <div className="flex items-start mb-4">
                          <div className="mt-0.5 mr-3 text-slate-400">
                             <Shield size={18} />
                          </div>
                          <div>
                             <span className="block text-sm font-bold text-slate-900">Contract Term</span>
                             <span className="text-xs text-slate-500 block font-medium">{pkg.contractTerm}</span>
                          </div>
                       </div>
                       <p className="text-[11px] text-slate-500 leading-relaxed bg-blue-50/50 p-4 rounded-xl border border-blue-100/50">
                         <strong>Note:</strong> Cancellation requires 1 calendar month notice. Router remains property of ISP. 
                         {pkg.uncapped && " No Fair Usage Policy applies."}
                       </p>
                    </div>

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {displayPackages.length === 0 && (
          <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <h3 className="text-xl font-bold text-slate-400">No packages found.</h3>
          </div>
        )}
      </div>
    </section>
  );
};
