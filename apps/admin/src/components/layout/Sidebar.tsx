'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Warehouse,
  ArrowDownToLine,
  ArrowUpFromLine,
  ClipboardCheck,
  AlertTriangle,
  FileSpreadsheet,
  ExternalLink,
  Package,
  LogOut
} from 'lucide-react';

const NAV_ITEMS = [
  {
    label: 'Ringkasan Eksekutif',
    href: '/',
    icon: LayoutDashboard,
  },
  {
    label: 'Gudang & Stok Batch',
    href: '/inventory',
    icon: Warehouse,
  },
  {
    label: 'Penerimaan (Inbound)',
    href: '/inbound',
    icon: ArrowDownToLine,
  },
  {
    label: 'Pengeluaran (Outbound)',
    href: '/outbound',
    icon: ArrowUpFromLine,
  },
  {
    label: 'Stock Opname',
    href: '/opname',
    icon: ClipboardCheck,
  },
  {
    label: 'Alert Penuaan (FIFO)',
    href: '/alerts',
    icon: AlertTriangle,
    badge: '2 Kritis',
  },
  {
    label: 'Inquiry RFQ Masuk',
    href: '/rfq',
    icon: FileSpreadsheet,
  },
  {
    label: 'Katalog Produk',
    href: '/products',
    icon: Package,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  if (pathname === '/login') return null;
  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' }).catch(() => {});
    window.location.assign('/login');
  };

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col h-screen sticky top-0 text-slate-300">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center p-1 shadow-md shadow-blue-500/10">
          <img src="/logo.png" alt="FisheryTrade Logo" className="w-full h-full object-contain" />
        </div>
        <div>
          <h1 className="font-bold text-white text-base tracking-tight leading-none">FisheryTrade</h1>
          <p className="text-[11px] text-blue-400 font-medium mt-1">WMS & SAP-Lite v1.0</p>
        </div>
      </div>

      {/* Nav Menu */}
      <div className="flex-1 py-4 px-3 overflow-y-auto space-y-1">
        <div className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
          Manajemen Gudang Dingin
        </div>
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href || (item.href === '/products' && pathname.startsWith('/products/'));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* External Catalog Link & User Footer */}
      <div className="p-4 border-t border-slate-800 space-y-3">
        <a
          href={process.env.NEXT_PUBLIC_WEB_URL ? `${process.env.NEXT_PUBLIC_WEB_URL}/produk` : '/produk'}
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-md bg-slate-800/80 hover:bg-slate-800 text-xs text-slate-300 border border-slate-700 transition-colors"
        >
          <span className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5 text-blue-400" />
            Buka Katalog Publik
          </span>
          <span className="text-[10px] bg-slate-700 px-1.5 py-0.5 rounded text-slate-300">Web</span>
        </a>

        <div className="flex items-center gap-3 pt-1">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center font-bold text-xs text-slate-200">
            OP
          </div>
          <div className="text-xs">
            <p className="font-medium text-slate-200">Admin Pusat Operasional</p>
            <p className="text-[11px] text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              Live WMS Hub
            </p>
          </div>
        </div>
        <button onClick={handleLogout} className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-800 rounded-md transition-colors">
          <LogOut className="w-3.5 h-3.5" /> Keluar dari Admin
        </button>
      </div>
    </aside>
  );
}
