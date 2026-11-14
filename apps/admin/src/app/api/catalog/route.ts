import { NextResponse } from 'next/server';
import {
  INITIAL_COMMODITIES,
  INITIAL_PRODUCT_SPECS,
  INITIAL_COLD_STORAGES,
  INITIAL_BATCHES
} from '@/lib/mock-data';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const format = searchParams.get('format');

  // Aggregate available tonnage per commodity & warehouse
  const catalog = INITIAL_COMMODITIES.map((commodity, index) => {
    const specs = INITIAL_PRODUCT_SPECS.filter((s) => s.commodityId === commodity.id);
    const relatedBatches = INITIAL_BATCHES.filter(
      (b) => b.commodityName === commodity.name || b.productSpecId?.startsWith(`spec-${commodity.id.replace('com-', '')}`)
    );

    const totalWeightKg = relatedBatches.reduce((acc, b) => acc + b.availableWeightKg, 0);
    const totalAvailableTons = (totalWeightKg / 1000).toFixed(2);

    const warehouseStocks: Record<string, number> = {};
    const availableWarehouses = INITIAL_COLD_STORAGES.map((cs) => {
      const csBatches = relatedBatches.filter((b) => b.coldStorageId === cs.id);
      const csKg = csBatches.reduce((acc, b) => acc + b.availableWeightKg, 0);
      const csTons = (csKg / 1000).toFixed(2);
      warehouseStocks[cs.code] = csKg;
      return {
        id: cs.id,
        code: cs.code,
        name: cs.name,
        city: cs.city,
        availableKg: csKg,
        availableTons: Number(csTons),
      };
    }).filter((w) => w.availableTons > 0);

    const primarySpec = specs[0];
    const priceNumeric = primarySpec?.pricePerKg || 0;

    const jktKg = warehouseStocks['JKT-01'] || 0;
    const lmgKg = warehouseStocks['LMG-01'] || 0;
    const dpsKg = warehouseStocks['DPS-01'] || 0;

    const formatStock = (kg: number) => {
      if (kg <= 0) return 'Stok Habis';
      if (kg < 500) return `${kg.toLocaleString('id-ID')} kg (Menipis)`;
      return `${kg.toLocaleString('id-ID')} kg`;
    };

    return {
      // Base WMS Entity
      id: commodity.id,
      numericId: index + 1,
      slug: commodity.slug,
      name: commodity.name,
      englishName: commodity.englishName,
      scientificName: commodity.scientificName,
      category: commodity.category,
      imageUrl: commodity.imageUrl,
      description: commodity.description,
      specs,
      totalAvailableTons: Number(totalAvailableTons),
      availableWarehouses,

      // Marketplace Compatibility Fields
      cutType: primarySpec?.processingCut || 'Whole Round',
      freezeMethod: primarySpec ? `${primarySpec.freezingMethod} -25°C` : 'IQF -25°C',
      grade: primarySpec?.grade || 'Grade A',
      moq: primarySpec ? `${primarySpec.moqKg} kg` : '100 kg',
      pricePerKg: `Rp ${priceNumeric.toLocaleString('id-ID')} / kg`,
      priceNumeric,
      volume: primarySpec?.sizeSpecs || 'Master Box 10-20 kg',
      stockJakarta: formatStock(jktKg),
      stockLamongan: formatStock(lmgKg),
      stockBali: formatStock(dpsKg),
      totalStock: `${totalWeightKg.toLocaleString('id-ID')} kg`,
      whatsappUrl: `https://wa.me/6282241114959?text=${encodeURIComponent(
        `Halo FisheryTrade, saya ingin memesan pasokan ${commodity.name}.`
      )}`,
    };
  });

  // If format=marketplace, return directly mapped array compatible with Product[]
  if (format === 'marketplace') {
    const marketplaceData = catalog.map((c) => ({
      id: c.numericId,
      slug: c.slug,
      name: c.name,
      volume: c.volume,
      imageUrl: c.imageUrl,
      images: [c.imageUrl],
      description: c.description,
      category: c.category === 'Cephalopoda' ? 'Chepalopoda' : `Ikan ${c.category}`,
      productFunction: `Pasokan standar komersial untuk kebutuhan dapur hotel, restoran, dan katering horeka.`,
      scientificName: c.scientificName,
      freezeMethod: c.freezeMethod,
      grade: c.grade,
      moq: c.moq,
      pricePerKg: c.pricePerKg,
      priceNumeric: c.priceNumeric,
      stockJakarta: c.stockJakarta,
      stockLamongan: c.stockLamongan,
      stockBali: c.stockBali,
      totalStock: c.totalStock,
      whatsappUrl: c.whatsappUrl,
      cutType: c.cutType,
    }));

    return NextResponse.json(
      {
        success: true,
        data: marketplaceData,
        count: marketplaceData.length,
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

  return NextResponse.json(
    {
      success: true,
      data: catalog,
      count: catalog.length,
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
