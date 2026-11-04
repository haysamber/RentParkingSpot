import { NextRequest, NextResponse } from 'next/server';
import { getSpots, addSpot } from '@/lib/data';

export async function GET() {
  const spots = getSpots();
  return NextResponse.json(spots);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { address, neighborhood, type, pricePerHour, description } = body;

  if (!address || !neighborhood || !type || !pricePerHour || !description) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const spot = addSpot({ ...body, available: true });
  return NextResponse.json(spot, { status: 201 });
}
