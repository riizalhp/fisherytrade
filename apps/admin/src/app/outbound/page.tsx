'use client';

import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { INITIAL_BATCHES } from '../../lib/mock-data';
import { ArrowUpFromLine, CheckCircle2, Truck, FileText, AlertCircle } from 'lucide-react';

export default function OutboundPage() {
  const [selectedBatchId, setSelectedBatchId] = useState(INITIAL_BATCHES[0].id);
  const [buyerName, setBuyerName] = useState('');
  const [buyerCompany, setBuyerCompany] = useState('');
  const [volumeKg, setVolumeKg] = useState('');
  const [deliveryNote, setDeliveryNote] = useState('');
  const [shipperResi, setShipperResi] = useState('');
  const [truckPlate, setTruckPlate] = useState('');
  const [driverName, setDriverName] = useState('');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const currentBatch = INITIAL_BATCHES.find((b) => b.id === selectedBatchId);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const requestedKg = Number(volumeKg);
    if (!currentBatch) return;

    if (requestedKg > currentBatch.availableWeightKg) {
      setErrorMessage(
        `Error: Volume permintaan (${requestedKg} Kg) melebihi stok tersedia (${currentBatch.availableWeightKg} Kg) pada batch ini!`
      );
      return;
    }

    setSuccessMessage(
      `Sukses! Pengeluaran berhasil diproses. ${requestedKg} Kg dikeluarkan dari Batch ${currentBatch.batchCode}. Surat Jalan: ${deliveryNote || 'SJ-AUTO-01'}. Resi: ${shipperResi || 'SHP-LIVE'}.`
    );

    setVolumeKg('');
    setBuyerName('');
    setBuyerCompany('');
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Pengeluaran Barang (Goods Issue / Outbound)"
        subtitle="Pemotongan stok batch FIFO, pencatatan surat jalan, dan penerbitan resi armada truk pendingin"
      />

      <main className="p-6 space-y-6 max-w-5xl">
        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <p className="text-sm font-semibold">{successMessage}</p>
            </div>
            <button
              onClick={() => setSuccessMessage(null)}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-bold"
            >
              Tutup
            </button>
          </div>
        )}

        {errorMessage && (
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <AlertCircle className="w-5 h-5 text-rose-600" />
              <p className="text-sm font-semibold">{errorMessage}</p>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-xs text-rose-700 hover:text-rose-900 font-bold"
            >
              Tutup
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
                <ArrowUpFromLine className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Formulir Pengeluaran & Surat Jalan</h3>
                <p className="text-xs text-slate-500">Pilih batch stok terlama (FIFO) untuk menjaga kualitas cold storage</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Pilih Batch Sumber (Prioritas FIFO)</label>
                <select
                  value={selectedBatchId}
                  onChange={(e) => setSelectedBatchId(e.target.value)}
                  className="w-full py-2.5 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono font-medium"
                >
                  {INITIAL_BATCHES.map((b) => (
                    <option key={b.id} value={b.id}>
                      [{b.batchCode}] {b.commodityName} ({b.processingCut} - {b.grade}) — Sisa {(b.availableWeightKg / 1000).toFixed(2)} Ton (Umur {b.daysInStorage} hari)
                    </option>
                  ))}
                </select>
                {currentBatch && (
                  <p className="text-[11px] text-slate-500 mt-1">
                    Stok Tersedia di Rak <b>{currentBatch.storageLocationBin}</b>: <b className="text-blue-600">{currentBatch.availableWeightKg.toLocaleString('id-ID')} Kg</b>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Penerima / PIC Pembeli</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: Pak Herman"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Perusahaan / Buyer</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: PT Horeca Seafood Sejahtera"
                    value={buyerCompany}
                    onChange={(e) => setBuyerCompany(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Volume Keluar (Kg)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="Contoh: 5000"
                    value={volumeKg}
                    onChange={(e) => setVolumeKg(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  {volumeKg && (
                    <span className="text-[10px] text-blue-600 font-semibold mt-0.5 block">
                      = {(Number(volumeKg) / 1000).toFixed(2)} Ton
                    </span>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor Surat Jalan (DO)</label>
                  <input
                    type="text"
                    placeholder="Contoh: SJ-JKT-2611-0089"
                    value={deliveryNote}
                    onChange={(e) => setDeliveryNote(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor Resi / Booking Shipper</label>
                  <input
                    type="text"
                    placeholder="SHP-2026-99120"
                    value={shipperResi}
                    onChange={(e) => setShipperResi(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Plat Nomor Truk Pendingin</label>
                  <input
                    type="text"
                    placeholder="B 9871 TXX"
                    value={truckPlate}
                    onChange={(e) => setTruckPlate(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Driver Ekspedisi</label>
                  <input
                    type="text"
                    placeholder="Agus Salim"
                    value={driverName}
                    onChange={(e) => setDriverName(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <Truck className="w-4 h-4" />
                  <span>Keluarkan Stok & Terbitkan Surat Jalan</span>
                </button>
              </div>
            </form>
          </div>

          {/* Verification Protocol Box */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Protokol Muat Cold Chain
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">Pre-Cooling Box Truk</div>
                <p className="text-[11px] text-slate-500">
                  Armada truk reefer harus di-pre-cool minimal 2 jam hingga mencapai suhu di bawah -15°C sebelum palet dimuat.
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">Verifikasi Segel & Resi</div>
                <p className="text-[11px] text-slate-500">
                  Pastikan nomor segel kontainer dan resi Shipper tertera jelas pada cetakan Surat Jalan fisik.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
