import React, { useState, useMemo, useEffect } from 'react';
import type { Product } from '../types.ts';
import { ADMIN_API_BASE_URL, getAdminApiUrl } from '../lib/catalog-service.ts';

interface TruckloadCalculatorProps {
  product: Product;
}

export const TruckloadCalculator: React.FC<TruckloadCalculatorProps> = ({ product }) => {
  const parsedMoq = useMemo(() => {
    const val = parseInt(product.moq?.replace(/[^0-9]/g, '') || '100', 10);
    return Math.max(val || 100, 50);
  }, [product.moq]);

  const [calcVolumeKg, setCalcVolumeKg] = useState<number>(() => Math.max(parsedMoq, 250));
  const [calcDestination, setCalcDestination] = useState<string>('Jabodetabek');
  const [calcDeliverySchedule, setCalcDeliverySchedule] = useState<string>('Pengiriman Rutin Mingguan');

  useEffect(() => {
    setCalcVolumeKg(Math.max(parsedMoq, 250));
  }, [parsedMoq]);

  const estimatedTotalCost = useMemo(() => {
    if (!product || !product.priceNumeric) return 0;
    return product.priceNumeric * calcVolumeKg;
  }, [product, calcVolumeKg]);

  const recommendedFleet = useMemo(() => {
    if (calcVolumeKg <= 300) {
      return {
        fleet: 'Thermo Van Pendingin (-20°C)',
        capacity: 'Kapasitas s/d 500 kg',
        note: 'Ideal untuk pengiriman harian dapur restoran atau hotel lokal.'
      };
    }
    if (calcVolumeKg <= 1500) {
      return {
        fleet: 'Truk CDE Box Reefer (Engkel 4 Roda)',
        capacity: 'Kapasitas 1.500 s/d 2.000 kg',
        note: 'Ideal untuk pasokan mingguan katering industri atau distributor menengah.'
      };
    }
    if (calcVolumeKg <= 4000) {
      return {
        fleet: 'Truk CDD Box Reefer (Double 6 Roda)',
        capacity: 'Kapasitas 4.000 s/d 5.000 kg',
        note: 'Ideal untuk restock cabang grosir atau pabrik pengolahan lanjutan.'
      };
    }
    return {
      fleet: 'Truk Fuso Box Reefer / FTL Intercity',
      capacity: 'Kapasitas 8.000 s/d 15.000 kg',
      note: 'Ideal untuk transfer tonase antar-kota atau restock gudang daerah.'
    };
  }, [calcVolumeKg]);

  const generateWhatsAppCalcUrl = () => {
    const subtotalText = estimatedTotalCost > 0 ? `Rp ${estimatedTotalCost.toLocaleString('id-ID')}` : 'Konfirmasi Sales';
    const text = `Halo FisheryTrade,%0A%0ASaya ingin mengajukan Request for Quotation (RFQ) untuk komoditas:%0A*Produk:* ${encodeURIComponent(product.name)}%0A*Estimasi Kebutuhan:* ${calcVolumeKg} kg%0A*Kota Tujuan:* ${encodeURIComponent(calcDestination)}%0A*Jadwal Pasokan:* ${encodeURIComponent(calcDeliverySchedule)}%0A*Rekomendasi Armada:* ${encodeURIComponent(recommendedFleet.fleet)}%0A*Estimasi Subtotal:* ${encodeURIComponent(subtotalText)}%0A%0AMohon informasi ketersediaan slot armada dan konfirmasi harga final. Terima kasih.`;
    return `https://wa.me/6282241114959?text=${text}`;
  };

  const handleRfqClick = () => {
    try {
      fetch(getAdminApiUrl('api/rfq'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          buyerName: 'Calon Pembeli (Halaman Detail Produk)',
          buyerPhone: '08xxxxxxxx',
          coldStorageName: 'Semua Gudang',
          destinationCity: calcDestination,
          commodityName: product.name,
          requestedVolumeTons: calcVolumeKg / 1000,
        }),
      }).catch(() => {});
    } catch {
      // Non-blocking
    }
  };

  return (
    <section aria-labelledby="calculator-heading" className="rounded-xl border border-aruna-200 bg-aruna-50/70 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <h2 id="calculator-heading" className="text-sm font-bold text-aruna-900 sm:text-base">
          Kalkulator Tonase & Muatan Truk Reefer
        </h2>
        <span className="font-mono text-xs font-bold text-aruna-800 tabular-nums sm:text-sm">
          {calcVolumeKg.toLocaleString('id-ID')} kg
        </span>
      </div>
      <p className="mt-1 text-xs text-slate-600">
        Simulasikan volume pasokan untuk estimasi biaya dan jenis armada berpendingin yang sesuai.
      </p>

      {/* Volume Slider & Presets */}
      <div className="mt-4">
        <label htmlFor="volume-range" className="sr-only">Volume kebutuhan dalam kg</label>
        <input
          id="volume-range"
          type="range"
          min="50"
          max="5000"
          step="50"
          value={calcVolumeKg}
          onChange={(e) => setCalcVolumeKg(Number(e.target.value))}
          className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-slate-200 accent-coral-600"
        />
        <div className="mt-2.5 grid grid-cols-5 gap-1.5">
          {[100, 250, 500, 1000, 2500].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setCalcVolumeKg(preset)}
              className={`min-h-8 rounded-md text-[11px] font-semibold tabular-nums transition-colors ${
                calcVolumeKg === preset
                  ? 'bg-aruna-700 text-white font-bold'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {preset} kg
            </button>
          ))}
        </div>
      </div>

      {/* Destination & Schedule */}
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor="dest-city" className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
            Kota Tujuan Pengiriman
          </label>
          <select
            id="dest-city"
            value={calcDestination}
            onChange={(e) => setCalcDestination(e.target.value)}
            className="w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition-colors focus:border-aruna-700 focus:outline-none focus:ring-2 focus:ring-aruna-700/20"
          >
            <option value="Jabodetabek">Jabodetabek (Hub Muara Baru)</option>
            <option value="Surabaya & Jawa Timur">Surabaya & Jatim (Hub Brondong)</option>
            <option value="Denpasar & Bali">Denpasar & Bali (Hub Benoa)</option>
            <option value="Semarang & Solo">Semarang & Jawa Tengah</option>
            <option value="Bandung Raya">Bandung Raya (Jawa Barat)</option>
            <option value="Kota Luar Pulau Lainnya">Kota Luar Pulau Lainnya</option>
          </select>
        </div>

        <div>
          <label htmlFor="sched-select" className="mb-1 block text-[11px] font-bold uppercase tracking-wider text-slate-700">
            Jadwal Pasokan
          </label>
          <select
            id="sched-select"
            value={calcDeliverySchedule}
            onChange={(e) => setCalcDeliverySchedule(e.target.value)}
            className="w-full cursor-pointer rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-800 transition-colors focus:border-aruna-700 focus:outline-none focus:ring-2 focus:ring-aruna-700/20"
          >
            <option value="Pengiriman Besok Pagi">Pengiriman Besok Pagi (Fast Reefer)</option>
            <option value="Pengiriman Rutin Mingguan">Pengiriman Rutin Mingguan (Scheduled)</option>
            <option value="Kontrak Pasokan Bulanan">Kontrak Pasokan Bulanan (B2B Contract)</option>
            <option value="Pengambilan Mandiri di Gudang">Pengambilan Mandiri di Gudang (Self Pick-up)</option>
          </select>
        </div>
      </div>

      {/* Calculation Result */}
      <div className="mt-4 space-y-2 rounded-lg border border-aruna-200 bg-white p-3.5 text-xs">
        <div className="flex items-center justify-between">
          <span className="text-slate-500">Estimasi Nilai Muatan:</span>
          <span className="text-sm font-extrabold tabular-nums text-aruna-900 sm:text-base">
            {estimatedTotalCost > 0 ? `Rp ${estimatedTotalCost.toLocaleString('id-ID')}` : 'Hubungi Sales'}
          </span>
        </div>
        <div className="flex items-start justify-between border-t border-slate-100 pt-2 text-[11px]">
          <span className="text-slate-500">Rekomendasi Armada:</span>
          <span className="text-right font-bold text-slate-800">
            {recommendedFleet.fleet}
          </span>
        </div>
        <p className="text-[10px] text-slate-500 text-right">
          {recommendedFleet.note}
        </p>
      </div>

      {/* Action Button */}
      <div className="mt-4">
        <a
          href={generateWhatsAppCalcUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={handleRfqClick}
          className="flex min-h-11 w-full items-center justify-center gap-2 rounded-lg bg-coral-600 px-4 py-2.5 text-center text-xs font-bold text-white shadow-xs transition-colors hover:bg-coral-700 sm:text-sm"
        >
          <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
          </svg>
          Ajukan RFQ Simulasi ini via WhatsApp
        </a>
      </div>
    </section>
  );
};

export default TruckloadCalculator;
