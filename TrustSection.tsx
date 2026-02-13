import React from 'react';
import { ShieldCheck, Clock, FileText, Headphones } from 'lucide-react';

export const TrustSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
              Support you can count on.
            </h2>
            <p className="text-lg text-slate-600 mb-8 leading-relaxed">
              We partner only with top-tier providers who commit to strict Service Level Agreements (SLAs). 
              Your peace of mind is our priority, from accurate billing to swift dispute resolution.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 mt-1">
                  <ShieldCheck size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-slate-900">Guaranteed SLAs</h3>
                  <p className="text-slate-600 text-sm mt-1">Uptime guarantees and speed promises backed by industry standards.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 mt-1">
                  <FileText size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-slate-900">Transparent Billing</h3>
                  <p className="text-slate-600 text-sm mt-1">No hidden fees. What you see on the checkout is what you pay.</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 mt-1">
                   <Headphones size={20} />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-slate-900">Priority Support</h3>
                  <p className="text-slate-600 text-sm mt-1">Direct escalation channels for dispute resolution and technical issues.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-100 to-teal-100 rounded-2xl transform rotate-2"></div>
            <div className="relative bg-slate-900 rounded-xl p-8 shadow-2xl text-white">
               <div className="flex items-center justify-between mb-8">
                 <div>
                   <div className="text-sm text-slate-400 uppercase tracking-widest font-semibold mb-1">Average Response Time</div>
                   <div className="text-3xl font-bold text-white">15 Minutes</div>
                 </div>
                 <Clock size={32} className="text-teal-400" />
               </div>
               
               <hr className="border-slate-700 my-6" />

               <div className="space-y-4">
                 <div className="flex justify-between items-center text-sm">
                   <span className="text-slate-300">Customer Satisfaction</span>
                   <span className="font-bold text-teal-400">98%</span>
                 </div>
                 <div className="w-full bg-slate-700 rounded-full h-2">
                   <div className="bg-teal-400 h-2 rounded-full" style={{ width: '98%' }}></div>
                 </div>

                 <div className="flex justify-between items-center text-sm pt-2">
                   <span className="text-slate-300">Uptime Average</span>
                   <span className="font-bold text-blue-400">99.95%</span>
                 </div>
                 <div className="w-full bg-slate-700 rounded-full h-2">
                   <div className="bg-blue-400 h-2 rounded-full" style={{ width: '99.95%' }}></div>
                 </div>
               </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
