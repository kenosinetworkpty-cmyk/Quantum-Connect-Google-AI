import { Address, AvailabilityResult, Package, Provider, Lead } from '../types';

const DELAY_MS = 800;

export const PROVIDERS: Provider[] = [
  {
    id: 'p1',
    name: 'FibreConnect',
    logo: 'https://picsum.photos/id/1/64/64',
    rating: 5.0,
    sla: '99.9% Uptime',
  },
];

export const PACKAGES: Package[] = [
  {
    id: 'm2m-10',
    providerId: 'p1',
    name: '10Mbps Fibre',
    speedDown: 10,
    speedUp: 5,
    price: 399,
    features: ['Uncapped Data', 'Free WiFi Router', 'Free Installation', 'Best for Browsing & Email'],
    contractTerm: 'Month-to-Month',
    hasRouter: true,
    hasInstallation: true,
    uncapped: true,
  },
  {
    id: 'm2m-20',
    providerId: 'p1',
    name: '20Mbps Fibre',
    speedDown: 20,
    speedUp: 10,
    price: 499,
    features: ['Uncapped Data', 'Free WiFi Router', 'Free Installation', 'HD Streaming & Work'],
    contractTerm: 'Month-to-Month',
    hasRouter: true,
    hasInstallation: true,
    uncapped: true,
  },
  {
    id: 'm2m-50',
    providerId: 'p1',
    name: '50Mbps Fibre',
    speedDown: 50,
    speedUp: 25,
    price: 599,
    features: ['Uncapped Data', 'Free WiFi 6 Router', 'Free Installation', '4K Streaming & Gaming'],
    contractTerm: 'Month-to-Month',
    hasRouter: true,
    hasInstallation: true,
    uncapped: true,
  },
];

export const checkAvailability = async (address: Address): Promise<AvailabilityResult> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Simulate random availability
      const isAvailable = Math.random() > 0.1; // 90% available
      resolve({
        available: isAvailable,
        exchange: isAvailable ? `${address.suburb} Central Exchange` : undefined,
        providers: isAvailable ? ['p1'] : [],
      });
    }, DELAY_MS);
  });
};

export const getPackages = async (): Promise<Package[]> => {
  return new Promise((resolve) => {
    setTimeout(() => resolve(PACKAGES), 200);
  });
};

export const submitLead = async (lead: Lead): Promise<boolean> => {
  return new Promise((resolve) => {
    console.log('Lead submitted:', lead);
    setTimeout(() => resolve(true), 1000);
  });
};
