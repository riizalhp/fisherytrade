'use client';

import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { INITIAL_COLD_STORAGES, INITIAL_BATCHES } from '../../lib/mock-data';
import {
  Warehouse,
  Search,
  Filter,
  AlertTriangle,
  Clock,
  Printer,
  ChevronRight,
  ThermometerSnowflake,
  Download
} from 'lucide-react';

export default function InventoryPage() {
  const [selectedStorage, setSelectedStorage] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filterAging, setFilterAging] = useState<string>('all');

  const filteredBatches = INITIAL_BATCHES.filter((b) => {
    const matchStorage = selectedStorage === 'all' || b.coldStorageId === selectedStorage;
    const matchSearch =
      b.batchCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.commodityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.supplierName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchAging =
      filterAging === 'all' ||
      (filterAging === 'warning' && b.agingStatus === 'WARNING_45_DAYS') ||
      (filterAging === 'critical' && b.agingStatus === 'CRITICAL_90_DAYS') ||
      (filterAging === 'normal' && b.agingStatus === 'NORMAL');

    return matchStorage && matchSearch && matchAging;
  });

  const totalFilteredTons = (
    filteredBatches.reduce((acc, b) => acc + b.availableWeightKg, 0) / 1000
  ).toFixed(2);

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Manajemen Gudang & Stok Batch"
        subtitle="Daftar inventaris multi-cold storage dengan penomoran batch unik & monitoring FIFO"
      />

      <main className="p-6 space-y-6 max-w-7xl">
        {/* Cold Storage Tab Filters */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          <button
            onClick={() => setSelectedStorage('all')}
            className={`p-3 rounded-xl border text-left transition-all ${
              selectedStorage === 'all'
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
            }`}
          >
            <div className="text-[11px] font-semibold opacity-80 uppercase tracking-wider">Semua Gudang</div>
            <div className="text-lg font-black mt-1">4 Titik</div>
            <div className="text-xs opacity-90 mt-0.5">1,445.9 Ton Total</div>
          </button>

          {INITIAL_COLD_STORAGES.map((cs) => {
            const isSelected = selectedStorage === cs.id;
            return (
              <button
                key={cs.id}
                onClick={() => setSelectedStorage(cs.id)}
                className={`p-3 rounded-xl border text-left transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                    : 'bg-white text-slate-700 border-slate-200 hover:border-slate-300'
                }`}
              >
                <div className="flex justify-between items-start">
                  <span
                    className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                      isSelected ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {cs.code}
                  </span>
                  <span className="text-[10px] opacity-75 font-mono">{cs.temperatureStandard}</span>
                </div>
                <div className="text-sm font-bold mt-1 truncate">{cs.name}</div>
                <div className="text-xs opacity-90 mt-0.5">{cs.currentOccupancyTons} Ton ({((cs.currentOccupancyTons / cs.capacityTons) * 100).toFixed(0)}%)</div>
              </button>
            );
          })}
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm flex flex-col md:flex-row gap-3 items-center justify-between">
          <div className="flex items-center gap-3 w-full md:w-auto flex-1">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Cari nomor batch, jenis ikan, atau supplier..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <select
              value={filterAging}
              onChange={(e) => setFilterAging(e.target.value)}
              className="text-xs py-2 px-3 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="all">Semua Status FIFO</option>
              <option value="normal">Normal (&lt; 45 Hari)</option>
              <option value="warning">Peringatan (&gt; 45 Hari)</option>
              <option value="critical">Kritis (&gt; 90 Hari)</option>
            </select>
          </div>

          <div className="flex items-center gap-2 self-end md:self-auto text-xs text-slate-500">
            <span>Menampilkan <b>{filteredBatches.length}</b> batch ({totalFilteredTons} Ton)</span>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-slate-200 hover:bg-slate-50 text-slate-700 font-medium"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export PDF</span>
            </button>
          </div>
        </div>

        {/* Inventory Batch Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Batch ID & Gudang</th>
                  <th className="py-3 px-4">Komoditas & Olahan</th>
                  <th className="py-3 px-4">Grade & Pembekuan</th>
                  <th className="py-3 px-4">Tgl Inbound (FIFO)</th>
                  <th className="py-3 px-4">Stok Tersedia</th>
                  <th className="py-3 px-4">Bin Rak</th>
                  <th className="py-3 px-4 text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredBatches.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-slate-400">
                      Tidak ada batch stok yang cocok dengan filter pencarian.
                    </td>
                  </tr>
                ) : (
                  filteredBatches.map((batch) => {
                    const isWarning = batch.agingStatus === 'WARNING_45_DAYS';
                    const isCritical = batch.agingStatus === 'CRITICAL_90_DAYS';

                    return (
                      <tr key={batch.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3.5 px-4 font-mono">
                          <div className="font-bold text-slate-900">{batch.batchCode}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">
                            Asal: {batch.supplierName}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900">{batch.commodityName}</div>
                          <div className="text-[11px] text-slate-500">{batch.processingCut}</div>
                        </td>
                        <td className="py-3.5 px-4">
                          <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700 mr-1.5">
                            {batch.grade}
                          </span>
                          <span className="text-[11px] text-cyan-700 font-medium">
                            {batch.freezingMethod}
                          </span>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-slate-400" />
                            <span>{batch.inboundDate}</span>
                          </div>
                          <div className="mt-1">
                            {isCritical ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 border border-rose-200">
                                <AlertTriangle className="w-3 h-3" />
                                {batch.daysInStorage} Hari (&gt;90 Hari)
                              </span>
                            ) : isWarning ? (
                              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 border border-amber-200">
                                <AlertTriangle className="w-3 h-3" />
                                {batch.daysInStorage} Hari (&gt;45 Hari)
                              </span>
                            ) : (
                              <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                                {batch.daysInStorage} Hari (Segar)
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="font-bold text-slate-900 text-sm">
                            {(batch.availableWeightKg / 1000).toFixed(2)} Ton
                          </div>
                          <div className="text-[10px] text-slate-400">
                            Awal: {(batch.initialWeightKg / 1000).toFixed(2)} Ton
                          </div>
                        </td>
                        <td className="py-3.5 px-4 font-mono font-semibold text-slate-600">
                          {batch.storageLocationBin}
                        </td>
                        <td className="py-3.5 px-4 text-right">
                          <button
                            onClick={() => alert(`Cetak Barcode Label untuk batch: ${batch.batchCode}`)}
                            className="p-1.5 hover:bg-slate-100 text-slate-500 hover:text-slate-800 rounded transition-colors"
                            title="Cetak Label QR/Barcode"
                          >
                            <Printer className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
