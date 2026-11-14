import React, { useState } from 'react';
import { PRODUCTS } from '../constants.tsx';

const WarehouseCatalogSection: React.FC = () => {
  const [selectedWarehouse, setSelectedWarehouse] = useState<'all' | 'jakarta' | 'lamongan' | 'bali'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = PRODUCTS.filter((product) => {
    if (selectedCategory !== 'all' && product.category !== selectedCategory) {
      return false;
    }
    if (selectedWarehouse === 'jakarta' && product.stockJakarta?.includes('Habis')) {
      return false;
    }
    if (selectedWarehouse === 'lamongan' && product.stockLamongan?.includes('Habis')) {
      return false;
    }
    if (selectedWarehouse === 'bali' && product.stockBali?.includes('Habis')) {
      return false;
    }
    return true;
  });

  return (
    <section id="cold-storage" className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Title & Cold Chain Control */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 py-1 px-3 bg-aruna-50 border border-aruna-200 text-aruna-700 rounded-md text-xs font-semibold mb-3">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Transparansi Stok Multi-Gudang Real-Time</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-aruna-900 tracking-tight">
              Katalog Komoditas & Ketersediaan Stok Fisik
            </h2>
            <p className="text-slate-600 text-sm mt-2 max-w-2xl">
              Cek tonase ikan beku bersertifikat mutu resmi langsung per titik fasilitas cold storage kami untuk estimasi jarak dan kecepatan kirim.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 p-1 rounded-xl text-xs font-medium">
            <span className="text-slate-500 px-2">Mode Harga:</span>
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2.5 py-1 rounded-lg font-mono font-bold">
              Harga Terbuka (Rp / kg)
            </span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          
          {/* Warehouse Location Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Pilih Fasilitas Cold Storage
            </label>
            <select
              value={selectedWarehouse}
              onChange={(e) => setSelectedWarehouse(e.target.value as any)}
              className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-aruna-500"
            >
              <option value="all">Semua Fasilitas (Lintas Gudang)</option>
              <option value="jakarta">📍 CS Muara Baru (Jakarta Utara)</option>
              <option value="lamongan">📍 CS Brondong (Lamongan, Jatim)</option>
              <option value="bali">📍 CS Benoa (Denpasar, Bali)</option>
            </select>
          </div>

          {/* Category Filter */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Kategori Komoditas
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full text-xs font-medium bg-white border border-slate-200 rounded-xl px-3 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-aruna-500"
            >
              <option value="all">Semua Kategori Ikan & Seafood</option>
              <option value="Ikan Pelagis">Ikan Pelagis (Tuna Loin, Cakalang)</option>
              <option value="Ikan Demersal">Ikan Demersal (Kakap Merah)</option>
              <option value="Chepalopoda">Chepalopoda (Cumi Tube)</option>
              <option value="Crustacea">Crustacea (Udang Vaname)</option>
            </select>
          </div>

          {/* Direct WhatsApp Callout */}
          <div className="flex flex-col justify-end">
            <a
              href="https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20cek%20stok%20harian%20ikan%20beku%20terbaru."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full bg-aruna-50 hover:bg-aruna-100 text-aruna-700 border border-aruna-200 text-xs font-bold py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors"
            >
              <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              <span>1-Click Daily Stock WhatsApp</span>
            </a>
          </div>

        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-lg hover:border-aruna-300 transition-all flex flex-col"
            >
              {/* Product Photo Header */}
              <div className="relative h-48 bg-slate-100 overflow-hidden group">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges Top Left */}
                <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start">
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-aruna-600 text-white shadow-xs">
                    {product.freezeMethod || 'IQF -25°C'}
                  </span>
                  <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white shadow-xs">
                    {product.grade || 'Grade A'}
                  </span>
                </div>

                {/* Price Tag Bottom Right */}
                <div className="absolute bottom-2.5 right-2.5">
                  <span className="px-2.5 py-1 rounded-lg bg-white/95 text-aruna-900 text-xs font-mono font-extrabold shadow-sm border border-slate-100">
                    {product.pricePerKg}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[11px] font-mono text-slate-400 italic">
                    {product.scientificName}
                  </div>
                  <h3 className="text-base font-bold text-aruna-900 mt-0.5 leading-snug">
                    <a href={`/produk/${product.slug}`} className="hover:text-aruna-600 transition-colors">
                      {product.name}
                    </a>
                  </h3>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <div className="text-[11px] text-slate-500 mt-2 font-mono flex items-center justify-between">
                    <span>Min. Order (MOQ):</span>
                    <span className="font-bold text-slate-700">{product.moq}</span>
                  </div>

                  {/* Multi-Warehouse Stock Breakdown */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="text-[11px] font-bold text-slate-700 flex justify-between items-center">
                      <span>Stok di Gudang:</span>
                      <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-mono text-[10px] font-bold">
                        {product.totalStock}
                      </span>
                    </div>

                    <div className="space-y-1 text-xs">
                      {/* Jakarta */}
                      <div className="flex justify-between items-center px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-700 text-[11px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-aruna-500"></span>
                          <span>Muara Baru (JKT)</span>
                        </span>
                        <span className="font-mono font-bold text-[11px] text-emerald-600">
                          {product.stockJakarta}
                        </span>
                      </div>

                      {/* Lamongan */}
                      <div className="flex justify-between items-center px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-700 text-[11px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-aruna-500"></span>
                          <span>Brondong (Jatim)</span>
                        </span>
                        <span className="font-mono font-bold text-[11px] text-emerald-600">
                          {product.stockLamongan}
                        </span>
                      </div>

                      {/* Bali */}
                      <div className="flex justify-between items-center px-2 py-1.5 rounded-lg bg-slate-50 border border-slate-100">
                        <span className="text-slate-700 text-[11px] flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-aruna-500"></span>
                          <span>Benoa (Bali)</span>
                        </span>
                        <span className={`font-mono text-[11px] ${product.stockBali?.includes('Habis') ? 'text-rose-500 font-normal italic' : 'text-emerald-600 font-bold'}`}>
                          {product.stockBali}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="mt-5 pt-3 border-t border-slate-100 flex flex-col gap-2">
                  <a
                    href={product.whatsappUrl || `https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20memesan%20${encodeURIComponent(product.name)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-coral-600 hover:bg-coral-700 text-white text-xs font-bold py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 shadow-sm transition-colors text-center"
                  >
                    <span>Pesan dari Gudang Terdekat</span>
                  </a>
                  <a
                    href={`/produk/${product.slug}`}
                    className="w-full bg-white hover:bg-aruna-50 text-aruna-700 border border-aruna-200 text-xs font-semibold py-2 px-3 rounded-xl transition-colors text-center"
                  >
                    Detail Spesifikasi Dapur
                  </a>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WarehouseCatalogSection;
