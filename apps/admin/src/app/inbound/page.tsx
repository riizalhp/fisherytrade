'use client';

import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { INITIAL_COLD_STORAGES, INITIAL_COMMODITIES } from '../../lib/mock-data';
import { ArrowDownToLine, CheckCircle2, QrCode, FileText, CheckCheck } from 'lucide-react';

export default function InboundPage() {
  const [csId, setCsId] = useState('cs-jkt');
  const [supplier, setSupplier] = useState('');
  const [commodity, setCommodity] = useState('Tuna Sirip Kuning');
  const [processing, setProcessing] = useState('Loin');
  const [packaging, setPackaging] = useState('Kemasan Master Box');
  const [grade, setGrade] = useState('Grade A');
  const [weightKg, setWeightKg] = useState('');
  const [qualityScore, setQualityScore] = useState('98/100 (Prima)');
  const [binLocation, setBinLocation] = useState('R-01-A1');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cs = INITIAL_COLD_STORAGES.find((c) => c.id === csId);
    const prefix = cs?.code.split('-')[0] || 'GD';
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const generatedBatchCode = `${prefix}-2611-${randomDigits}`;

    setSuccessMessage(
      `Sukses! Penerimaan berhasil dicatat. Nomor Batch Unik: ${generatedBatchCode} sebesar ${(
        Number(weightKg) / 1000
      ).toFixed(2)} Ton di ${cs?.name}.`
    );

    // Reset form fields
    setWeightKg('');
    setSupplier('');
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Penerimaan Barang (Goods Receipt / Inbound Nelayan)"
        subtitle="Pencatatan barang perikanan dari kapal & supplier, verifikasi mutu standar, dan penerbitan nomor batch unik"
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Input Form */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-6 space-y-4">
            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
                <ArrowDownToLine className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Formulir Penerimaan Barang Perikanan Baru</h3>
                <p className="text-xs text-slate-500">Otomatis terhubung ke inventaris WMS dan penghitungan FIFO</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Gudang Distribusi Tujuan</label>
                  <select
                    value={csId}
                    onChange={(e) => setCsId(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    {INITIAL_COLD_STORAGES.map((cs) => (
                      <option key={cs.id} value={cs.id}>
                        {cs.code} — {cs.name} ({cs.city})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nama Kapal / Nelayan / Supplier</label>
                  <input
                    type="text"
                    required
                    placeholder="Contoh: KM. Samudera 08 / Koperasi Mina Bahari"
                    value={supplier}
                    onChange={(e) => setSupplier(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Komoditas Barang Perikanan</label>
                  <select
                    value={commodity}
                    onChange={(e) => setCommodity(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    {INITIAL_COMMODITIES.map((c) => (
                      <option key={c.id} value={c.name}>
                        {c.name} ({c.englishName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bentuk Olahan</label>
                  <select
                    value={processing}
                    onChange={(e) => setProcessing(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="Whole Round">Whole Round (Utuh)</option>
                    <option value="Whole G&G">G&G (Insang & Isi Perut Bersih)</option>
                    <option value="Loin">Loin (Daging Bebas Tulang)</option>
                    <option value="Fillet">Fillet</option>
                    <option value="HOSO">HOSO (Head-on Shrimp)</option>
                    <option value="HLSO">HLSO (Headless Shrimp)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kemasan & Mutu</label>
                  <select
                    value={packaging}
                    onChange={(e) => setPackaging(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="Kemasan Master Box">Kemasan Master Box Standar</option>
                    <option value="Kemasan Vakum Kedap Udara">Kemasan Vakum Kedap Udara</option>
                    <option value="Curah Segar Terstandar">Curah Segar Terstandar</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Klasifikasi Mutu (Grade)</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  >
                    <option value="Grade A">Grade A (Restoran & Hotel)</option>
                    <option value="Grade Export">Grade Export (Standar HACCP Global)</option>
                    <option value="Grade B">Grade B (Lokal & Pengolahan)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Berat Total Masuk (Kg)</label>
                  <input
                    type="number"
                    required
                    min="1"
                    placeholder="Contoh: 15000"
                    value={weightKg}
                    onChange={(e) => setWeightKg(e.target.value)}
                    className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                  />
                  {weightKg && (
                    <span className="text-[10px] text-blue-600 font-semibold mt-0.5 block">
                      = {(Number(weightKg) / 1000).toFixed(2)} Ton
                    </span>
                  )}
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Hasil Uji Mutu / Standar KKP</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="98/100 (Prima)"
                      value={qualityScore}
                      onChange={(e) => setQualityScore(e.target.value)}
                      className="w-full py-2 pl-8 pr-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                    />
                    <CheckCheck className="w-3.5 h-3.5 text-emerald-600 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  </div>
                  <span className="text-[10px] text-slate-400 mt-0.5 block">Parameter standar uji mutu penerimaan</span>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Rekomendasi Bin / Rak Penyimpanan</label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: R-01-A2"
                  value={binLocation}
                  onChange={(e) => setBinLocation(e.target.value)}
                  className="w-full py-2 px-3 rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-colors flex items-center justify-center gap-2 shadow-sm"
                >
                  <QrCode className="w-4 h-4" />
                  <span>Simpan Inbound & Terbitkan Batch Unik</span>
                </button>
              </div>
            </form>
          </div>

          {/* SOP Quality Check Sidebar */}
          <div className="bg-slate-50 rounded-xl border border-slate-200 p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              SOP Penerimaan Barang Perikanan
            </h4>
            <div className="space-y-3 text-xs text-slate-600">
              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">1. Pemeriksaan Fisik & Kesegaran</div>
                <p className="text-[11px] text-slate-500">
                  Pemeriksaan fisik saat pembongkaran muatan kapal sesuai spesifikasi standar mutu.
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">2. Uji Histamin & Organoleptik</div>
                <p className="text-[11px] text-slate-500">
                  Mata jernih, insang segar, tekstur kenyal, dan aroma khas laut segar.
                </p>
              </div>

              <div className="p-3 bg-white rounded-lg border border-slate-200 space-y-1">
                <div className="font-bold text-slate-800">3. Pelabelan Batch FIFO</div>
                <p className="text-[11px] text-slate-500">
                  Setiap palet langsung ditempel label barcode berformat <code>GD-YYMM-XXXX</code>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
