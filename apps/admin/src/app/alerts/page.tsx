'use client';

import React from 'react';
import { Header } from '../../components/layout/Header';
import { INITIAL_BATCHES } from '../../lib/mock-data';
import { AlertTriangle, Clock, Share2, Printer, Tag, CheckCircle2 } from 'lucide-react';

export default function AlertsPage() {
  const criticalBatches = INITIAL_BATCHES.filter((b) => b.agingStatus === 'CRITICAL_90_DAYS');
  const warningBatches = INITIAL_BATCHES.filter((b) => b.agingStatus === 'WARNING_45_DAYS');
  const normalBatches = INITIAL_BATCHES.filter((b) => b.agingStatus === 'NORMAL');

  const handleBlastSpecialOffer = (batchCode: string, commodity: string, tons: number) => {
    const text = encodeURIComponent(
      `*PENAWARAN KHUSUS CUCI GUDANG (PRIORITAS B2B)*\n` +
      `Komoditas: ${commodity}\n` +
      `Batch: ${batchCode}\n` +
      `Volume Tersedia: ${tons.toFixed(1)} Ton\n` +
      `Kondisi: Mutu Terstandar Prima, Siap Angkut Truk/Kontainer.\n` +
      `Harga Spesial: Hubungi tim sales untuk penawaran nego hari ini!`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Alert Penuaan Stok (FIFO Aging Monitoring)"
        subtitle="Sistem deteksi dini stok barang perikanan mendekati batas simpan (>45 & >90 hari) untuk mencegah kerugian mutu"
      />

      <main className="p-6 space-y-6 max-w-7xl">
        {/* Banner Alert Ringkasan */}
        <div className="p-5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-amber-500 text-white shadow-sm">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900">Perhatian: Ditemukan {criticalBatches.length + warningBatches.length} Batch Perlu Tindakan Penjualan</h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Stok yang disimpan melebihi 45 hari direkomendasikan masuk prioritas promosi atau diskon volume ke distributor.
              </p>
            </div>
          </div>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-3.5 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 text-xs font-semibold hover:bg-slate-50 shadow-sm"
          >
            <Printer className="w-4 h-4 text-slate-500" />
            <span>Cetak Rekap Aging PDF</span>
          </button>
        </div>

        {/* Section 1: Kritis >90 Hari */}
        <div className="bg-white rounded-xl border border-rose-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-rose-50/70 border-b border-rose-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-600 animate-pulse"></span>
              <h4 className="text-sm font-bold text-rose-900">Kritis (&gt; 90 Hari) — Prioritas Cuci Gudang Segera</h4>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-100 px-2 py-0.5 rounded-full">
              {criticalBatches.length} Batch Terdeteksi
            </span>
          </div>

          <div className="p-4 divide-y divide-slate-100">
            {criticalBatches.map((b) => (
              <div key={b.id} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-slate-900">{b.batchCode}</span>
                    <span className="text-xs font-semibold text-slate-700">— {b.commodityName} ({b.processingCut})</span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{b.grade}</span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-3">
                    <span>Gudang: <b>{b.coldStorageId.replace('cs-', 'GD-').toUpperCase()}</b> (Rak {b.storageLocationBin})</span>
                    <span>•</span>
                    <span>Masuk: <b>{b.inboundDate}</b> (<span className="text-rose-600 font-bold">{b.daysInStorage} Hari</span>)</span>
                    <span>•</span>
                    <span>Supplier: {b.supplierName}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-black text-rose-600">
                      {(b.availableWeightKg / 1000).toFixed(2)} Ton
                    </div>
                    <div className="text-[10px] text-slate-400">Sisa dari {(b.initialWeightKg / 1000).toFixed(2)} Ton</div>
                  </div>
                  <button
                    onClick={() => handleBlastSpecialOffer(b.batchCode, b.commodityName, b.availableWeightKg / 1000)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Blast WA Obral</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Peringatan >45 Hari */}
        <div className="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden">
          <div className="p-4 bg-amber-50/70 border-b border-amber-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
              <h4 className="text-sm font-bold text-amber-900">Peringatan (&gt; 45 Hari) — Prioritas Penawaran Sales</h4>
            </div>
            <span className="text-xs font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
              {warningBatches.length} Batch Terdeteksi
            </span>
          </div>

          <div className="p-4 divide-y divide-slate-100">
            {warningBatches.map((b) => (
              <div key={b.id} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-sm text-slate-900">{b.batchCode}</span>
                    <span className="text-xs font-semibold text-slate-700">— {b.commodityName} ({b.processingCut})</span>
                    <span className="text-[10px] font-bold bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">{b.grade}</span>
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-3">
                    <span>Gudang: <b>{b.coldStorageId.replace('cs-', 'GD-').toUpperCase()}</b> (Rak {b.storageLocationBin})</span>
                    <span>•</span>
                    <span>Masuk: <b>{b.inboundDate}</b> (<span className="text-amber-600 font-bold">{b.daysInStorage} Hari</span>)</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="text-sm font-black text-amber-700">
                      {(b.availableWeightKg / 1000).toFixed(2)} Ton
                    </div>
                  </div>
                  <button
                    onClick={() => handleBlastSpecialOffer(b.batchCode, b.commodityName, b.availableWeightKg / 1000)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                  >
                    <Share2 className="w-3.5 h-3.5" />
                    <span>Tawarkan ke Sales</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
