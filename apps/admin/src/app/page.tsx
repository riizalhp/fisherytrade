'use client';

import React from 'react';
import Link from 'next/link';
import { Header } from '../components/layout/Header';
import {
  INITIAL_COLD_STORAGES,
  INITIAL_BATCHES,
  INITIAL_MOVEMENTS,
  INITIAL_RFQS
} from '../lib/mock-data';
import {
  Warehouse,
  TrendingUp,
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpFromLine,
  FileText,
  Clock,
  CheckCircle2,
  ExternalLink,
  ShieldAlert,
  ThermometerSnowflake
} from 'lucide-react';

export default function OverviewPage() {
  const totalCapacity = INITIAL_COLD_STORAGES.reduce((acc, cs) => acc + cs.capacityTons, 0);
  const totalOccupancy = INITIAL_COLD_STORAGES.reduce((acc, cs) => acc + cs.currentOccupancyTons, 0);
  const occupancyPercentage = ((totalOccupancy / totalCapacity) * 100).toFixed(1);

  const warningBatches = INITIAL_BATCHES.filter((b) => b.agingStatus !== 'NORMAL');

  return (
    <div className="flex-1 flex flex-col">
      <Header
        title="Ringkasan Eksekutif & Kontrol WMS"
        subtitle="Monitoring real-time gudang distribusi barang perikanan di 4 pelabuhan strategis"
      />

      <main className="p-6 space-y-6 max-w-7xl">
        {/* KPI Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Total Tonase Stok</span>
              <Warehouse className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {totalOccupancy.toLocaleString('id-ID')} <span className="text-sm font-semibold text-slate-500">Ton</span>
            </div>
            <p className="text-xs text-emerald-600 mt-2 font-medium flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4 Ton masuk 7 hari terakhir</span>
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Kapasitas Terisi</span>
              <ThermometerSnowflake className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              {occupancyPercentage}%
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-3 overflow-hidden">
              <div
                className="bg-blue-600 h-1.5 rounded-full"
                style={{ width: `${occupancyPercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Alert Penuaan (FIFO)</span>
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-black text-amber-600">
              {warningBatches.length} <span className="text-sm font-semibold text-slate-500">Batch</span>
            </div>
            <p className="text-xs text-amber-700 mt-2 font-medium">
              1 Batch kritis &gt;90 hari di Lamongan
            </p>
          </div>

          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between text-slate-500 mb-2">
              <span className="text-xs font-semibold uppercase tracking-wider">Inquiry RFQ Masuk</span>
              <FileText className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl font-black text-slate-900">
              18 <span className="text-sm font-semibold text-slate-500">Permintaan</span>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              3 RFQ baru menunggu penawaran sales
            </p>
          </div>
        </div>

        {/* Warehouse Grid Status */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">Status 4 Gudang Distribusi Terpadu</h3>
              <p className="text-xs text-slate-500">Kapasitas, standar mutu operasional, dan PIC di lokasi</p>
            </div>
            <Link
              href="/inventory"
              className="text-xs text-blue-600 hover:text-blue-700 font-semibold flex items-center gap-1"
            >
              Lihat Detail Batch &rarr;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {INITIAL_COLD_STORAGES.map((cs) => {
              const perc = ((cs.currentOccupancyTons / cs.capacityTons) * 100).toFixed(0);
              return (
                <div key={cs.id} className="p-4 rounded-lg bg-slate-50 border border-slate-200/80 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        {cs.code}
                      </span>
                      <h4 className="text-sm font-bold text-slate-800 mt-1">{cs.name}</h4>
                      <p className="text-xs text-slate-500">{cs.city}, {cs.province}</p>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="text-slate-500">Terisi:</span>
                      <span className="font-bold text-slate-800">{cs.currentOccupancyTons} / {cs.capacityTons} Ton ({perc}%)</span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-1.5 rounded-full ${
                          Number(perc) > 75 ? 'bg-amber-500' : 'bg-blue-600'
                        }`}
                        style={{ width: `${perc}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-slate-200 text-[11px] text-slate-600 space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Standar Mutu:</span>
                      <span className="font-mono font-medium text-emerald-700">{cs.temperatureStandard}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">PIC Gudang:</span>
                      <span className="font-medium text-slate-700">{cs.picName}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Two Columns: Recent Movements & Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Movements (2 cols) */}
          <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900">Pergerakan Stok Terkini (Inbound & Outbound)</h3>
                <p className="text-xs text-slate-500">Log audit real-time penerimaan kapal & pengiriman ke pembeli</p>
              </div>
              <Link href="/inbound" className="text-xs text-blue-600 hover:text-blue-700 font-semibold">
                Buka Log Lengkap &rarr;
              </Link>
            </div>

            <div className="divide-y divide-slate-100">
              {INITIAL_MOVEMENTS.map((mov) => {
                const isInbound = mov.type === 'INBOUND_PURCHASE';
                const isOutbound = mov.type === 'OUTBOUND_SALE';
                return (
                  <div key={mov.id} className="py-3 flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg mt-0.5 ${
                          isInbound
                            ? 'bg-emerald-50 text-emerald-600'
                            : isOutbound
                            ? 'bg-blue-50 text-blue-600'
                            : 'bg-amber-50 text-amber-600'
                        }`}
                      >
                        {isInbound ? (
                          <ArrowDownToLine className="w-4 h-4" />
                        ) : isOutbound ? (
                          <ArrowUpFromLine className="w-4 h-4" />
                        ) : (
                          <AlertTriangle className="w-4 h-4" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-800">
                            {isInbound
                              ? 'Penerimaan Kapal (Inbound)'
                              : isOutbound
                              ? 'Pengiriman Penjualan (Outbound)'
                              : 'Penyesuaian Glazing Loss'}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {mov.referenceNumber}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 mt-0.5">{mov.notes}</p>
                        <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-2">
                          <span>{mov.createdAt}</span>
                          <span>•</span>
                          <span>Oleh: {mov.createdBy}</span>
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div
                        className={`text-sm font-black ${
                          isInbound ? 'text-emerald-600' : 'text-slate-800'
                        }`}
                      >
                        {isInbound ? '+' : '-'}
                        {(mov.quantityKg / 1000).toFixed(2)} Ton
                      </div>
                      <span className="text-[10px] text-slate-400">{mov.quantityKg.toLocaleString('id-ID')} Kg</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Actions & Shortcut */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 space-y-4">
            <h3 className="text-base font-bold text-slate-900">Aksi Cepat Petugas Gudang</h3>
            <div className="space-y-2">
              <Link
                href="/inbound"
                className="w-full flex items-center justify-between p-3 rounded-lg bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 text-emerald-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ArrowDownToLine className="w-4 h-4 text-emerald-600" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Catat Inbound Nelayan</p>
                    <p className="text-[11px] text-emerald-700">Generate Batch unik & suhu penerimaan</p>
                  </div>
                </div>
                <span className="text-xs">&rarr;</span>
              </Link>

              <Link
                href="/outbound"
                className="w-full flex items-center justify-between p-3 rounded-lg bg-blue-50 hover:bg-blue-100/80 border border-blue-200 text-blue-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ArrowUpFromLine className="w-4 h-4 text-blue-600" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Buat Surat Jalan Outbound</p>
                    <p className="text-[11px] text-blue-700">Potong stok batch & input resi Shipper</p>
                  </div>
                </div>
                <span className="text-xs">&rarr;</span>
              </Link>

              <Link
                href="/opname"
                className="w-full flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-4 h-4 text-slate-600" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Lembar Stock Opname</p>
                    <p className="text-[11px] text-slate-500">Hitung selisih fisik vs sistem & glazing loss</p>
                  </div>
                </div>
                <span className="text-xs">&rarr;</span>
              </Link>

              <Link
                href="/alerts"
                className="w-full flex items-center justify-between p-3 rounded-lg bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600" />
                  <div className="text-left">
                    <p className="text-xs font-bold">Cek Batch Aging (FIFO)</p>
                    <p className="text-[11px] text-amber-700">Prioritas jual ikan &gt;45 dan &gt;90 hari</p>
                  </div>
                </div>
                <span className="text-xs">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
