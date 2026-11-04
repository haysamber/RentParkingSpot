export type Spot = {
  id: string;
  address: string;
  neighborhood: string;
  type: 'driveway' | 'garage';
  pricePerHour: number;
  description: string;
  available: boolean;
};

export type Booking = {
  id: string;
  spotId: string;
  renterName: string;
  renterEmail: string;
  date: string;
  hours: number;
};

export const spots: Spot[] = [
  {
    id: '1',
    address: '2415 Mission St',
    neighborhood: 'Mission',
    type: 'driveway',
    pricePerHour: 8,
    description: 'Secure concrete driveway with easy street access.',
    available: true,
  },
  {
    id: '2',
    address: '340 Brannan St',
    neighborhood: 'SoMa',
    type: 'garage',
    pricePerHour: 15,
    description: 'Private single-car garage steps from Caltrain.',
    available: true,
  },
  {
    id: '3',
    address: '4022 18th St',
    neighborhood: 'Castro',
    type: 'driveway',
    pricePerHour: 10,
    description: 'Flat driveway in a quiet residential block.',
    available: true,
  },
  {
    id: '4',
    address: '3250 Scott St',
    neighborhood: 'Marina',
    type: 'garage',
    pricePerHour: 18,
    description: 'Covered garage near Chestnut Street shops and restaurants.',
    available: true,
  },
  {
    id: '5',
    address: '1847 Irving St',
    neighborhood: 'Sunset',
    type: 'driveway',
    pricePerHour: 6,
    description: 'Spacious driveway with room for a full-size SUV.',
    available: true,
  },
  {
    id: '6',
    address: '560 Divisadero St',
    neighborhood: 'NOPA',
    type: 'garage',
    pricePerHour: 12,
    description: 'Attached garage on a tree-lined street near Alamo Square.',
    available: true,
  },
];

export const bookings: Booking[] = [];

export function getSpots(): Spot[] {
  return spots;
}

export function getSpot(id: string): Spot | undefined {
  return spots.find((s) => s.id === id);
}

export function addSpot(spot: Omit<Spot, 'id'>): Spot {
  const newSpot: Spot = { id: String(spots.length + 1), ...spot };
  spots.push(newSpot);
  return newSpot;
}

export function addBooking(booking: Omit<Booking, 'id'>): Booking {
  const newBooking: Booking = { id: String(bookings.length + 1), ...booking };
  bookings.push(newBooking);
  return newBooking;
}
