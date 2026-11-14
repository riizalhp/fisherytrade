import { NextResponse } from 'next/server';
import {
  INITIAL_COMMODITIES,
  INITIAL_PRODUCT_SPECS,
  INITIAL_COLD_STORAGES,
  INITIAL_BATCHES
} from '@/lib/mock-data';

export async function GET() {
  // Aggregate available tonnage per commodity & cold storage
  const catalog = INITIAL_COMMODITIES.map((commodity) => {
    const specs = INITIAL_PRODUCT_SPECS.filter((s) => s.commodityId === commodity.id);
    const relatedBatches = INITIAL_BATCHES.filter((b) => b.commodityName === commodity.name);

    const totalAvailableTons = (
      relatedBatches.reduce((acc, b) => acc + b.availableWeightKg, 0) / 1000
    ).toFixed(2);

    const availableWarehouses = INITIAL_COLD_STORAGES.map((cs) => {
      const csBatches = relatedBatches.filter((b) => b.coldStorageId === cs.id);
      const csTons = (csBatches.reduce((acc, b) => acc + b.availableWeightKg, 0) / 1000).toFixed(2);
      return {
        id: cs.id,
        code: cs.code,
        name: cs.name,
        city: cs.city,
        availableTons: Number(csTons),
      };
    }).filter((w) => w.availableTons > 0);

    return {
      ...commodity,
      specs,
      totalAvailableTons: Number(totalAvailableTons),
      availableWarehouses,
    };
  });

  return NextResponse.json(
    {
      success: true,
      data: catalog,
      timestamp: new Date().toISOString(),
    },
    {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    }
  );
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
