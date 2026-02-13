export interface Address {
  street: string;
  suburb: string;
  city: string;
}

export interface Provider {
  id: string;
  name: string;
  logo: string;
  rating: number; // 1-5
  sla: string;
}

export interface Package {
  id: string;
  providerId: string;
  name: string;
  speedDown: number; // Mbps
  speedUp: number; // Mbps
  price: number;
  features: string[];
  contractTerm: string; // e.g., "Month-to-Month"
  hasRouter: boolean;
  hasInstallation: boolean;
  uncapped: boolean;
}

export interface Lead {
  packageId: string;
  name: string;
  email: string;
  phone: string;
  address: Address;
}

export interface AvailabilityResult {
  available: boolean;
  exchange?: string;
  providers: string[]; // Provider IDs
}
