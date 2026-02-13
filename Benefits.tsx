import React from 'react';
import { Wifi, Zap, Lock, Tv } from 'lucide-react';

export const Benefits: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      
      {/* --- DECORATIVE BACKGROUND: The Quantum Bow --- */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-0">
         {/* Large swooping bow curve opacity-5 */}
         <svg className="absolute w-[120%] h-full -left-[10%] top-0 opacity-[0.03]" viewBox="0 0 1200 600" preserveAspectRatio="none">
            <path d="M0,100 C400,0 800,0 1200,300 L1200,600 L0,600 Z" fill="#0A254E" />
            <path d="M0,150 C400,50 800,50 1200,350" stroke="#E60000" strokeWidth="5" fill="none" />
            <path d="M0,200 C400,100 800,100 1200,400" stroke="#00B87C" strokeWidth="5" fill="none" />
         </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">
            Why upgrade to <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-900 to-blue-600">Fibre?</span>
          </h2>
          <p className="text-lg text-slate-600 leading-relaxed font-light">
            Fibre offers the fastest, most reliable internet connection available today. 
            Say goodbye to buffering and hello to seamless streaming, gaming, and working from home.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-14 h-14 bg-red-50 rounded-xl flex items-center justify-center text-red-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Zap size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Blazing Speeds</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              Speeds up to 1Gbps mean you can download 4K movies in seconds, not hours.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center text-green-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Wifi size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Reliable Connection</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              Fibre optic cables are resistant to weather interference, ensuring stable uptime.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Tv size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Buffer-Free Streaming</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              Stream multiple 4K devices simultaneously without lag or quality drops.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-14 h-14 bg-slate-100 rounded-xl flex items-center justify-center text-slate-700 mb-6 group-hover:scale-110 transition-transform duration-300">
              <Lock size={28} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Secure & Future Proof</h3>
            <p className="text-slate-500 leading-relaxed text-sm">
              A secure infrastructure that increases your property value and future-proofs your home.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
