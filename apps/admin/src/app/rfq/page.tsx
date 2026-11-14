'use client';

import React, { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { INITIAL_RFQS } from '../../lib/mock-data';
import { FileText, MessageSquare, Truck, CheckCircle2, Clock } from 'lucide-react';

export default function RFQListPage() {
  const [rfqs, setRfqs] = useState(INITIAL_RFQS);

  const handleUpdateStatus = (id: string, newStatus: any) => {
    setRfqs((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
    );
  };

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Daftar Permintaan Penawaran (Inbound RFQ)"
        subtitle="Leads pemesanan barang perikanan dari katalog marketplace publik (shop), kalkulasi armada Shipper, dan auto-routing WhatsApp"
      />

      <main className="p-6 space-y-6 max-w-7xl">
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Inquiry Masuk dari Pembeli B2B</h3>
              <p className="text-xs text-slate-500">
                Otomatis tersinkronisasi saat calon pembeli mengisi form di halaman katalog
              </p>
            </div>
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-full">
              {rfqs.length} Total Penawaran
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-4">Nomor RFQ & Tanggal</th>
                  <th className="py-3 px-4">Calon Pembeli & Perusahaan</th>
                  <th className="py-3 px-4">Komoditas & Volume</th>
                  <th className="py-3 px-4">Gudang Asal & Tujuan</th>
                  <th className="py-3 px-4">Estimasi Armada Shipper</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Hubungi WA</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {rfqs.map((rfq) => (
                  <tr key={rfq.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3.5 px-4 font-mono">
                      <div className="font-bold text-slate-900">{rfq.rfqNumber}</div>
                      <div className="text-[10px] text-slate-400 mt-0.5">{rfq.createdAt}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{rfq.buyerName}</div>
                      <div className="text-[11px] text-slate-500">{rfq.buyerCompany}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{rfq.buyerPhone}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      {rfq.items.map((it, idx) => (
                        <div key={idx}>
                          <span className="font-bold text-slate-900">{it.commodityName}</span>
                          <span className="text-[11px] text-slate-500"> ({it.processingCut} - {it.grade})</span>
                        </div>
                      ))}
                      <div className="text-sm font-black text-blue-600 mt-0.5">
                        {rfq.totalVolumeTons} Ton
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-semibold text-slate-800">{rfq.coldStorageName}</div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Tujuan: <b className="text-slate-700">{rfq.destinationCity}</b>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-1.5 font-medium text-slate-800">
                        <Truck className="w-3.5 h-3.5 text-blue-500" />
                        <span>{rfq.estimatedTruckFleet}</span>
                      </div>
                      <div className="text-[11px] text-emerald-600 font-semibold mt-0.5">
                        Est: Rp {rfq.estimatedShippingCostIdr.toLocaleString('id-ID')}
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <select
                        value={rfq.status}
                        onChange={(e) => handleUpdateStatus(rfq.id, e.target.value)}
                        className={`text-[11px] font-bold py-1 px-2 rounded-full border focus:outline-none ${
                          rfq.status === 'DEAL'
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                            : rfq.status === 'QUOTED'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-amber-50 text-amber-700 border-amber-200'
                        }`}
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="QUOTED">QUOTED</option>
                        <option value="DEAL">DEAL</option>
                        <option value="CANCELLED">BATAL</option>
                      </select>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <a
                        href={`https://wa.me/${rfq.buyerPhone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                          `Halo ${rfq.buyerName} dari ${rfq.buyerCompany}, kami menindaklanjuti permintaan penawaran nomor ${rfq.rfqNumber} untuk komoditas ${rfq.items[0]?.commodityName} sebesar ${rfq.totalVolumeTons} Ton.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors shadow-sm"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>WA Buyer</span>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
