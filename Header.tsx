import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, ShoppingBag, Wifi } from 'lucide-react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Fibre', icon: Wifi },
    { name: 'Webhosting', icon: Globe },
    { name: 'Voip', icon: Phone },
    { name: 'Store', icon: ShoppingBag },
  ];

  // Brand Colors
  const brandBlue = "#0a254e";
  const brandGreen = "#00b87c";
  const brandRed = "#e60000";

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out border-b border-transparent ${
        isScrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-lg border-white/20' 
          : 'bg-transparent'
      }`}
    >
      {/* Liquid Glass Highlight Overlay for premium feel */}
      {isScrolled && (
        <div className="absolute inset-0 bg-gradient-to-b from-white/40 to-transparent pointer-events-none"></div>
      )}

      <div className="container mx-auto px-4 relative z-10">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-20' : 'h-24'}`}>
          
          {/* Logo - Centered Absolutely */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center group cursor-pointer">
            <QuantumLogo isScrolled={isScrolled} />
          </div>

          {/* Left Spacer (Desktop only) */}
          <div className="hidden md:block w-1/3"></div>

          {/* Right: Desktop Nav */}
          <nav className="hidden md:flex items-center justify-end w-1/3 gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={`#${link.name.toLowerCase()}`} 
                className={`group relative flex items-center gap-2 text-sm font-bold transition-colors py-2 tracking-wide ${
                  isScrolled ? 'text-slate-700 hover:text-blue-900' : 'text-slate-200 hover:text-white'
                }`}
              >
                <span>{link.name}</span>
                {/* Hover Underline Animation - Brand Gradient */}
                <span className="absolute bottom-0 left-0 w-0 h-[3px] rounded-full bg-gradient-to-r from-red-500 to-green-500 transition-all duration-300 group-hover:w-full shadow-sm"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Header Layout: Toggle on Right */}
          <div className="flex md:hidden w-full justify-end">
            <button 
              className={`p-2 transition-colors rounded-lg backdrop-blur-sm border ${
                isScrolled 
                  ? 'text-slate-800 hover:bg-slate-100 border-slate-200' 
                  : 'text-white hover:bg-white/10 border-white/10'
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-gray-100 transition-all duration-300 ease-in-out overflow-hidden shadow-2xl ${
          isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="container mx-auto px-4 py-6 flex flex-col gap-3">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href="#" 
              className="flex items-center gap-4 text-slate-800 p-4 rounded-xl hover:bg-slate-50 border border-transparent transition-all active:scale-[0.98]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <div className="p-2.5 bg-blue-50 rounded-lg text-blue-900">
                <link.icon size={20} />
              </div>
              <span className="font-bold text-lg tracking-wide">{link.name}</span>
            </a>
          ))}
        </div>
      </div>
    </header>
  );
};

// Responsive Logo Component
const QuantumLogo = ({ isScrolled }: { isScrolled: boolean }) => {
  // Brand Colors
  const darkBlue = "#0a254e";
  const white = "#ffffff";
  const green = "#00b87c";
  const red = "#e60000";

  // Determine text color based on scroll state
  // If scrolled (light bg), text is darkBlue. If top (dark bg), text is white.
  const mainColor = isScrolled ? darkBlue : white;

  return (
    <>
      {/* Desktop Version */}
      <svg 
        className="hidden md:block h-14 w-auto transition-all duration-500"
        viewBox="0 0 300 70" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="underlineGrad" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor={red} />
            <stop offset="100%" stopColor={green} />
          </linearGradient>
           <linearGradient id={`mGrad-${isScrolled ? 'dark' : 'light'}`} x1="0" y1="0" x2="100%" y2="0">
             <stop offset="65%" stopColor={mainColor} />
             <stop offset="65%" stopColor={green} />
           </linearGradient>
        </defs>

        {/* QUANTUM */}
        {/* Q with Red Accent */}
        <text x="10" y="42" fontFamily="sans-serif" fontWeight="900" fontSize="38" fill={mainColor}>Q</text>
        <path d="M28 36 Q 32 38 40 46" stroke={red} strokeWidth="4" strokeLinecap="round" />

        <text x="45" y="42" fontFamily="sans-serif" fontWeight="800" fontSize="36" fill={mainColor} letterSpacing="1">
          UANTU
        </text>
        
        {/* M with Green Accent Leg */}
        <text x="180" y="42" fontFamily="sans-serif" fontWeight="800" fontSize="36" fill={`url(#mGrad-${isScrolled ? 'dark' : 'light'})`} letterSpacing="1">
          M
        </text>

        {/* CONNECT */}
        <text x="12" y="62" fontFamily="sans-serif" fontWeight="600" fontSize="13" fill={mainColor} letterSpacing="6.5">
          CONNECT
        </text>

        {/* Gradient Underline */}
        <path d="M10 68 Q 150 72 290 66" stroke="url(#underlineGrad)" strokeWidth="3" strokeLinecap="round" />
      </svg>

      {/* Mobile Version (Simplified) */}
      <svg 
        className="block md:hidden h-10 w-auto"
        viewBox="0 0 60 50" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
         <defs>
          <linearGradient id="underlineGradMobile" x1="0" y1="0" x2="100%" y2="0">
            <stop offset="0%" stopColor={red} />
            <stop offset="100%" stopColor={green} />
          </linearGradient>
        </defs>
        
        {/* Q Symbol */}
        <text x="5" y="35" fontFamily="sans-serif" fontWeight="900" fontSize="40" fill={mainColor}>Q</text>
        <path d="M22 28 Q 26 30 32 38" stroke={red} strokeWidth="4" strokeLinecap="round" />
        
        {/* Small Connect Line */}
        <path d="M5 45 Q 30 48 55 45" stroke="url(#underlineGradMobile)" strokeWidth="3" strokeLinecap="round" />
      </svg>
    </>
  );
};
