import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { PricingGrid } from './components/PricingGrid';
import { PackageBuilder } from './components/PackageBuilder';
import { TrustSection } from './components/TrustSection';
import { Footer } from './components/Footer';
import { Modal } from './components/ui/Modal';
import { Button } from './components/ui/Button';
import { Address, AvailabilityResult, Package, Lead, Provider } from './types';
import { getPackages, submitLead, PROVIDERS } from './services/mockApi';
import { Check, User, Mail, Phone, Lock } from 'lucide-react';

const App: React.FC = () => {
  // State
  const [packages, setPackages] = useState<Package[]>([]);
  const [providers] = useState<Provider[]>(PROVIDERS); // Static in this demo
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [userAddress, setUserAddress] = useState<Address | null>(null);
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  
  // Form State
  const [leadForm, setLeadForm] = useState({ name: '', email: '', phone: '', consent: false });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Load packages on mount
  useEffect(() => {
    getPackages().then(setPackages);
  }, []);

  const handleAvailabilityCheck = (result: AvailabilityResult, address: Address) => {
    setAvailability(result);
    setUserAddress(address);
    // Smooth scroll to pricing if available
    if (result.available) {
      setTimeout(() => {
        document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handlePackageSelect = (pkg: Package) => {
    setSelectedPackage(pkg);
    setSubmitSuccess(false); // Reset success state
    setLeadForm({ name: '', email: '', phone: '', consent: false });
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedPackage || !userAddress) return;

    setIsSubmitting(true);
    
    const lead: Lead = {
      packageId: selectedPackage.id,
      address: userAddress,
      ...leadForm
    };

    try {
      await submitLead(lead);
      setSubmitSuccess(true);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Header />
      <Hero onAvailabilityCheck={handleAvailabilityCheck} />
      
      <Benefits />

      <PackageBuilder />

      {/* Conditionally render pricing or 'Not Available' message based on search */}
      {availability ? (
        availability.available ? (
          <div className="animate-in fade-in duration-700">
             <div className="bg-green-50 border-y border-green-100 py-4">
                <div className="container mx-auto px-4 text-center text-green-800 font-medium flex items-center justify-center">
                  <Check size={20} className="mr-2" />
                  Great news! Fibre is available at {userAddress?.street}, {userAddress?.suburb}.
                </div>
             </div>
             <PricingGrid 
               providers={providers} 
               packages={packages} 
               onSelectPackage={handlePackageSelect}
               filteredProviders={availability.providers}
             />
          </div>
        ) : (
          <div className="py-20 bg-white text-center">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">Not yet available</h2>
              <p className="text-slate-600 mb-8">
                Sorry, we don't have coverage at <strong>{userAddress?.street}</strong> yet. <br />
                We'll notify you when we reach your area.
              </p>
              <Button variant="outline">Register Interest</Button>
            </div>
          </div>
        )
      ) : (
        // Show all packages as a preview before search
        <PricingGrid 
          providers={providers} 
          packages={packages} 
          onSelectPackage={(pkg) => {
            // If no address entered, scroll to top or prompt
            window.scrollTo({ top: 0, behavior: 'smooth' });
            alert("Please check availability for your address first.");
          }} 
        />
      )}

      <TrustSection />
      <Footer />

      {/* Lead Capture Modal */}
      <Modal 
        isOpen={!!selectedPackage} 
        onClose={() => setSelectedPackage(null)} 
        title={submitSuccess ? 'Order Received!' : `Get ${selectedPackage?.name}`}
      >
        {submitSuccess ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600">
              <Check size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Thanks, {leadForm.name}!</h3>
            <p className="text-slate-600 mb-6">
              We've received your order for the <strong>{selectedPackage?.name}</strong> package. 
              One of our agents will contact you at <strong>{leadForm.phone}</strong> shortly to finalize installation details.
            </p>
            <Button onClick={() => setSelectedPackage(null)} className="w-full">Close</Button>
          </div>
        ) : (
          <form onSubmit={handleLeadSubmit} className="space-y-4">
            <div className="bg-slate-50 p-4 rounded-lg mb-6 border border-slate-100">
              <div className="flex justify-between items-center mb-1">
                <span className="font-semibold text-slate-900">{selectedPackage?.name}</span>
                <span className="font-bold text-blue-900 text-lg">R{selectedPackage?.price}</span>
              </div>
              <div className="text-xs text-slate-500">
                {selectedPackage?.speedDown}Mbps Download / {selectedPackage?.speedUp}Mbps Upload
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  required
                  type="text" 
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                  placeholder="John Doe"
                  value={leadForm.name}
                  onChange={e => setLeadForm({...leadForm, name: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  required
                  type="email" 
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                  placeholder="john@example.com"
                  value={leadForm.email}
                  onChange={e => setLeadForm({...leadForm, email: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input 
                  required
                  type="tel" 
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-900 outline-none"
                  placeholder="082 123 4567"
                  value={leadForm.phone}
                  onChange={e => setLeadForm({...leadForm, phone: e.target.value})}
                />
              </div>
            </div>

            <div className="flex items-start pt-2">
              <input 
                required
                id="consent" 
                type="checkbox" 
                className="mt-1 mr-3 h-4 w-4 text-blue-900 focus:ring-blue-900 border-gray-300 rounded"
                checked={leadForm.consent}
                onChange={e => setLeadForm({...leadForm, consent: e.target.checked})}
              />
              <label htmlFor="consent" className="text-xs text-slate-500">
                I agree to be contacted by FibreConnect regarding this order. I understand my personal data will be processed in accordance with the Privacy Policy.
              </label>
            </div>

            <div className="flex items-center justify-center text-xs text-slate-400 py-2">
              <Lock size={12} className="mr-1" /> SSL Secure Checkout
            </div>

            <Button type="submit" className="w-full" isLoading={isSubmitting}>
              Complete Order
            </Button>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default App;