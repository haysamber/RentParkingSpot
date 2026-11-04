import { NextRequest, NextResponse } from 'next/server';
import { getSpots, addSpot } from '@/lib/data';

export async function GET() {
  const spots = getSpots();
  return NextResponse.json(spots);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { address, neighborhood, type, description } = body;

  if (!address || !neighborhood || !type || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  // pricePerHour and pricingStatus are set by AI — not accepted from client
  const spot = addSpot({ address, neighborhood, type, description, available: true, lat: body.lat ?? 0, lng: body.lng ?? 0 });
  return NextResponse.json(spot, { status: 201 });
}
