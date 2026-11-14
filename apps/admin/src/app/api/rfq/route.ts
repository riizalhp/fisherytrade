import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      buyerName,
      buyerCompany,
      buyerPhone,
      buyerEmail,
      coldStorageSourceId,
      coldStorageName,
      destinationCity,
      commodityName,
      processingCut,
      grade,
      freezingMethod,
      requestedVolumeTons,
    } = body;

    if (!buyerName || !buyerPhone || !requestedVolumeTons) {
      return NextResponse.json(
        { success: false, error: 'Data buyerName, buyerPhone, dan requestedVolumeTons wajib diisi' },
        { status: 400 }
      );
    }

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const rfqNumber = `RFQ-2611-${randomNum}`;

    // Generate formatted WhatsApp message for auto-routing sales
    const waText = encodeURIComponent(
      `*PENGAJUAN PENAWARAN BARU (RFQ WEBSITE)*\n` +
      `No: *${rfqNumber}*\n` +
      `────────────────────────\n` +
      `👤 *Pembeli*: ${buyerName}\n` +
      `🏢 *Perusahaan*: ${buyerCompany || '-'}\n` +
      `📞 *Kontak*: ${buyerPhone}\n` +
      `📍 *Gudang Asal*: ${coldStorageName || coldStorageSourceId}\n` +
      `🏁 *Kota Tujuan*: ${destinationCity || '-'}\n` +
      `────────────────────────\n` +
      `🐟 *Komoditas*: ${commodityName}\n` +
      `✂️ *Olahan*: ${processingCut || '-'}\n` +
      `⭐ *Grade*: ${grade || 'Grade A'}\n` +
      `❄️ *Metode Beku*: ${freezingMethod || 'IQF'}\n` +
      `⚖️ *Volume*: *${requestedVolumeTons} Ton*\n` +
      `────────────────────────\n` +
      `Mohon segera ditindaklanjuti untuk kalkulasi ongkir armada Shipper & proforma invoice.`
    );

    const waLink = `https://wa.me/6281234567890?text=${waText}`;

    return NextResponse.json(
      {
        success: true,
        rfqNumber,
        waLink,
        message: 'RFQ berhasil dibuat dan siap diarahkan ke WhatsApp Sales',
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
      { success: false, error: err.message || 'Internal server error' },
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
