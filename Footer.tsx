import React from 'react';
import { Facebook, Twitter, Instagram, Linkedin, CreditCard } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 py-16 border-t border-slate-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div>
            <h3 className="text-white text-xl font-bold mb-6">FibreConnect</h3>
            <p className="text-sm leading-relaxed mb-6">
              Simplifying internet connectivity for modern homes and businesses. Compare, connect, and get online in minutes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-white transition-colors"><Linkedin size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Check Coverage</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Compare Packages</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Business Fibre</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support Centre</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Acceptable Use Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">PAIA Manual</a></li>
            </ul>
          </div>

          <div>
             <h4 className="text-white font-bold mb-6 uppercase text-sm tracking-wider">Contact Us</h4>
             <ul className="space-y-3 text-sm">
               <li>support@fibreconnect.co.za</li>
               <li>0800 123 456</li>
               <li>
                 123 Tech Boulevard,<br />
                 Sandton, 2196
               </li>
             </ul>
             <div className="mt-6">
                <span className="text-xs text-slate-500 block mb-2">Secure Payments via</span>
                <div className="flex items-center space-x-2 text-slate-400">
                   <CreditCard size={24} />
                   <span className="text-xs">Visa / Mastercard / EFT</span>
                </div>
             </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} FibreConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
