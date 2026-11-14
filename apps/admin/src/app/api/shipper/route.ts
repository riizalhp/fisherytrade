import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { weightTons = 1, originCode = 'JKT-01', destinationCity = 'Surabaya' } = body;

    const tons = Number(weightTons) || 1;

    // Truck capacity heuristic
    let recommendedFleet = '1x CDD Reefer Box (Maks 4 Ton)';
    let trips = 1;
    let baseRate = 6500000; // default JKT -> Surabaya CDD

    if (tons <= 4) {
      recommendedFleet = '1x CDD Reefer Box (Maks 4 Ton)';
      trips = 1;
      baseRate = 6500000;
    } else if (tons <= 8) {
      recommendedFleet = '1x Fuso Reefer Box (Maks 8 Ton)';
      trips = 1;
      baseRate = 11500000;
    } else if (tons <= 14) {
      recommendedFleet = '1x Kontainer Reefer 20ft (Maks 14 Ton)';
      trips = 1;
      baseRate = 18000000;
    } else {
      const containerCount = Math.ceil(tons / 14);
      recommendedFleet = `${containerCount}x Kontainer Reefer 20ft`;
      trips = containerCount;
      baseRate = 18000000 * containerCount;
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          weightTons: tons,
          originCode,
          destinationCity,
          recommendedFleet,
          totalTrips: trips,
          estimatedShippingCostIdr: baseRate,
          notes: 'Tarif armada rantai dingin (-20°C) via jaringan logistik terintegrasi Shipper.id',
        },
      },
      {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      }
    );
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err.message || 'Gagal menghitung estimasi logistik' },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
