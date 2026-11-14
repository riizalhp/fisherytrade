'use client';

import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { INITIAL_BATCHES } from '../../lib/mock-data';
import { ClipboardCheck, CheckCircle2, AlertTriangle, FileSpreadsheet, Save } from 'lucide-react';

export default function StockOpnamePage() {
  const [opnameData, setOpnameData] = useState(() =>
    INITIAL_BATCHES.map((b) => ({
      batchId: b.id,
      batchCode: b.batchCode,
      commodityName: b.commodityName,
      cut: b.processingCut,
      systemKg: b.availableWeightKg,
      physicalKg: b.availableWeightKg, // default match
      reasonCode: 'GLAZING_LOSS',
      notes: '',
    }))
  );

  const [savedMessage, setSavedMessage] = useState<string | null>(null);

  const handlePhysicalChange = (index: number, val: string) => {
    const updated = [...opnameData];
    updated[index].physicalKg = Number(val) || 0;
    setOpnameData(updated);
  };

  const handleReasonChange = (index: number, val: string) => {
    const updated = [...opnameData];
    updated[index].reasonCode = val;
    setOpnameData(updated);
  };

  const handleNotesChange = (index: number, val: string) => {
    const updated = [...opnameData];
    updated[index].notes = val;
    setOpnameData(updated);
  };

  const handleSaveOpname = () => {
    const totalVarianceKg = opnameData.reduce((acc, row) => acc + (row.physicalKg - row.systemKg), 0);
    setSavedMessage(
      `Sukses! Rekonsiliasi Stock Opname berhasil disimpan ke Audit Log. Total Varians Lintas Gudang: ${totalVarianceKg.toFixed(
        1
      )} Kg.`
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Lembar Kerja Stock Opname (Audit Selisih Stok)"
        subtitle="Verifikasi berkala stok fisik gudang vs catatan sistem WMS, pencatatan glazing loss, dan audit log"
      />

      <main className="p-6 space-y-6 max-w-7xl">
        {savedMessage && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <p className="text-sm font-semibold">{savedMessage}</p>
            </div>
            <button
              onClick={() => setSavedMessage(null)}
              className="text-xs text-emerald-700 hover:text-emerald-900 font-bold"
            >
              Tutup
            </button>
          </div>
        )}

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900">Lembar Audit Batch Terjadwal</h3>
              <p className="text-xs text-slate-500">
                Koreksi kuantitas otomatis menghasilkan entri penyesuaian di mutasi stok
              </p>
            </div>
            <button
              onClick={handleSaveOpname}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg text-xs shadow-sm transition-colors"
            >
              <Save className="w-4 h-4" />
              <span>Simpan & Rekonsiliasi Opname</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-3">Batch ID</th>
                  <th className="py-3 px-3">Komoditas & Olahan</th>
                  <th className="py-3 px-3">Stok Sistem (Kg)</th>
                  <th className="py-3 px-3">Fisik Riil (Kg)</th>
                  <th className="py-3 px-3">Selisih (Variance)</th>
                  <th className="py-3 px-3">Reason Code (Penyebab)</th>
                  <th className="py-3 px-3">Catatan Auditor</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {opnameData.map((row, index) => {
                  const variance = row.physicalKg - row.systemKg;
                  const isNegative = variance < 0;
                  const isZero = variance === 0;

                  return (
                    <tr key={row.batchId} className="hover:bg-slate-50/80 transition-colors">
                      <td className="py-3 px-3 font-mono font-bold text-slate-900">
                        {row.batchCode}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-semibold text-slate-800">{row.commodityName}</div>
                        <div className="text-[10px] text-slate-400">{row.cut}</div>
                      </td>
                      <td className="py-3 px-3 font-mono text-slate-600 font-semibold">
                        {row.systemKg.toLocaleString('id-ID')}
                      </td>
                      <td className="py-3 px-3">
                        <input
                          type="number"
                          value={row.physicalKg}
                          onChange={(e) => handlePhysicalChange(index, e.target.value)}
                          className="w-28 px-2.5 py-1.5 rounded border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono font-bold text-slate-900 text-xs"
                        />
                      </td>
                      <td className="py-3 px-3 font-mono font-bold">
                        {isZero ? (
                          <span className="text-slate-400">0 Kg (Match)</span>
                        ) : isNegative ? (
                          <span className="text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                            {variance.toFixed(1)} Kg (Susut)
                          </span>
                        ) : (
                          <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">
                            +{variance.toFixed(1)} Kg (Surplus)
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        <select
                          value={row.reasonCode}
                          onChange={(e) => handleReasonChange(index, e.target.value)}
                          disabled={isZero}
                          className="py-1 px-2 rounded border border-slate-200 bg-white text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:opacity-40"
                        >
                          <option value="GLAZING_LOSS">Glazing Loss (Susut Es Pelindung)</option>
                          <option value="DRIP_LOSS">Drip Loss (Pencairan Mutu)</option>
                          <option value="PACKAGING_DAMAGE">Kemasan Rusak / Sobek</option>
                          <option value="QUALITY_DEGRADATION">Grade Turun / Afkir</option>
                          <option value="COUNT_ERROR">Koreksi Salah Timbang</option>
                        </select>
                      </td>
                      <td className="py-3 px-3">
                        <input
                          type="text"
                          placeholder="Catatan..."
                          value={row.notes}
                          onChange={(e) => handleNotesChange(index, e.target.value)}
                          className="w-full px-2 py-1 rounded border border-slate-200 text-[11px] focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
