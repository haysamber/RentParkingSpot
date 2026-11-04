import { NextRequest, NextResponse } from 'next/server';
import { addBooking, getSpot } from '@/lib/data';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { spotId, renterName, renterEmail, date, hours } = body;

  if (!spotId || !renterName || !renterEmail || !date || !hours) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const booking = addBooking(body);

  const spot = getSpot(spotId);
  if (spot) {
    spot.available = false;
  }

  return NextResponse.json(booking, { status: 201 });
}
