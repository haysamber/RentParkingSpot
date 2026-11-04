export type PricingStatus = 'normal' | 'sale';

export type Spot = {
  id: string;
  address: string;
  neighborhood: string;
  type: 'driveway' | 'garage';
  pricePerHour: number;
  pricingStatus: PricingStatus;
  description: string;
  available: boolean;
  freeAt?: string; // ISO date string — set when a booking is made
  lat: number;
  lng: number;
};

export type Booking = {
  id: string;
  spotId: string;
  renterName: string;
  renterEmail: string;
  date: string;
  hours: number;
};

// AI demand-based pricing by neighborhood
const NEIGHBORHOOD_BASE: Record<string, number> = {
  'Marina':     18,
  'SoMa':       16,
  'Castro':     13,
  'Nob Hill':   15,
  'NOPA':       12,
  'Mission':     9,
  'Haight':      9,
  'Richmond':    8,
  'Sunset':      7,
  'Tenderloin':  6,
};

export function aiPrice(neighborhood: string): number {
  const base = NEIGHBORHOOD_BASE[neighborhood] ?? 10;
  const variance = Math.round(base * 0.2);
  return base + Math.floor(Math.random() * (variance * 2 + 1)) - variance;
}

export const spots: Spot[] = [
  {
    id: '1',
    address: '2415 Mission St',
    neighborhood: 'Mission',
    type: 'driveway',
    pricePerHour: 8,
    pricingStatus: 'sale',
    description: 'Secure concrete driveway with easy street access.',
    available: true,
    lat: 37.7529,
    lng: -122.4183,
  },
  {
    id: '2',
    address: '340 Brannan St',
    neighborhood: 'SoMa',
    type: 'garage',
    pricePerHour: 16,
    pricingStatus: 'normal',
    description: 'Private single-car garage steps from Caltrain.',
    available: true,
    lat: 37.7795,
    lng: -122.3946,
  },
  {
    id: '3',
    address: '4022 18th St',
    neighborhood: 'Castro',
    type: 'driveway',
    pricePerHour: 13,
    pricingStatus: 'normal',
    description: 'Flat driveway in a quiet residential block.',
    available: true,
    lat: 37.7601,
    lng: -122.4352,
  },
  {
    id: '4',
    address: '3250 Scott St',
    neighborhood: 'Marina',
    type: 'garage',
    pricePerHour: 18,
    pricingStatus: 'normal',
    description: 'Covered garage near Chestnut Street shops and restaurants.',
    available: true,
    lat: 37.7986,
    lng: -122.4402,
  },
  {
    id: '5',
    address: '1847 Irving St',
    neighborhood: 'Sunset',
    type: 'driveway',
    pricePerHour: 6,
    pricingStatus: 'normal',
    description: 'Spacious driveway with room for a full-size SUV.',
    available: true,
    lat: 37.7634,
    lng: -122.4762,
  },
  {
    id: '6',
    address: '560 Divisadero St',
    neighborhood: 'NOPA',
    type: 'garage',
    pricePerHour: 12,
    pricingStatus: 'normal',
    description: 'Attached garage on a tree-lined street near Alamo Square.',
    available: true,
    lat: 37.7751,
    lng: -122.4374,
  },
];

export const bookings: Booking[] = [];

export function getSpots(): Spot[] {
  // Auto-mark the cheapest available spot as 'sale'
  const available = spots.filter(s => s.available);
  if (available.length > 0) {
    const cheapest = available.reduce((a, b) => a.pricePerHour < b.pricePerHour ? a : b);
    spots.forEach(s => { s.pricingStatus = s.id === cheapest.id ? 'sale' : 'normal'; });
  }
  return spots;
}

export function getSpot(id: string): Spot | undefined {
  return spots.find((s) => s.id === id);
}

export function addSpot(spot: Omit<Spot, 'id' | 'pricePerHour' | 'pricingStatus' | 'freeAt'>): Spot {
  const pricePerHour = aiPrice(spot.neighborhood);
  const newSpot: Spot = {
    id: String(spots.length + 1),
    ...spot,
    pricePerHour,
    pricingStatus: 'normal',
  };
  spots.push(newSpot);
  return newSpot;
}

export function addBooking(booking: Omit<Booking, 'id'>): Booking {
  const newBooking: Booking = { id: String(bookings.length + 1), ...booking };
  bookings.push(newBooking);
  // Compute freeAt: date + hours
  const spot = spots.find((s) => s.id === booking.spotId);
  if (spot) {
    const end = new Date(booking.date);
    end.setHours(end.getHours() + booking.hours);
    spot.available = false;
    spot.freeAt = end.toISOString();
  }
  return newBooking;
}
