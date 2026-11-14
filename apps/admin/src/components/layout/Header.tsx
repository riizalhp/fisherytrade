'use client';

import React from 'react';
import { Share2, Bell, RefreshCw, Warehouse } from 'lucide-react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const handleDailyBlast = () => {
    const text = encodeURIComponent(
      `*UPDATE STOK HARIAN FISHERY TRADE (WMS)*\n` +
      `Tanggal: ${new Date().toLocaleDateString('id-ID')}\n\n` +
      `📍 *Muara Baru (JKT)*: 342.5 Ton (Tuna Loin, Kakap G&G)\n` +
      `📍 *Brondong (LMG)*: 285.0 Ton (Udang Vaname HOSO/HLSO)\n` +
      `📍 *Benoa (DPS)*: 198.4 Ton (Tuna Export Grade Whole Round)\n` +
      `📍 *Bitung (BTG)*: 620.0 Ton (Cakalang Olahan Terstandar)\n\n` +
      `Info & Penawaran Resmi: Hubungi Sales Tim Fishery Trade.`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  return (
    <header className="h-16 bg-white border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-20">
      <div>
        <h2 className="text-lg font-bold text-slate-900 leading-tight">{title}</h2>
        {subtitle && <p className="text-xs text-slate-500">{subtitle}</p>}
      </div>

      <div className="flex items-center gap-4">
        {/* Warehouse Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200 text-xs text-slate-600">
          <Warehouse className="w-3.5 h-3.5 text-blue-500" />
          <span>4 Gudang Terpantau: <b>1,445.9 Ton</b> (70.5% Kapasitas)</span>
        </div>

        {/* 1-Click WA Daily Stock Blast */}
        <button
          onClick={handleDailyBlast}
          className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-sm transition-colors"
          title="Sebar ringkasan stok harian ke WhatsApp pembeli"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>1-Click Daily Stock WA</span>
        </button>

        {/* Refresh button */}
        <button
          onClick={() => window.location.reload()}
          className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
          title="Refresh Data"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
