import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Product } from '../../types.ts';

const WAREHOUSE_OPTIONS = [
  { id: 'all', label: 'Semua Cold Storage', hub: 'Seluruh Titik Distribusi' },
  { id: 'jakarta', label: 'Muara Baru', hub: 'Jakarta Utara (Hub Barat)' },
  { id: 'lamongan', label: 'Brondong', hub: 'Lamongan (Hub Jawa Timur)' },
  { id: 'bali', label: 'Benoa', hub: 'Denpasar (Hub Bali & NTB)' },
] as const;

type WarehouseId = typeof WAREHOUSE_OPTIONS[number]['id'];

interface MarketplaceViewProps {
  products: Product[];
}

export const MarketplaceView: React.FC<MarketplaceViewProps> = ({ products }) => {
  const [items, setItems] = useState<Product[]>(products);

  // Sync state if products prop changes
  useEffect(() => {
    setItems(products);
  }, [products]);

  // Client-side real-time stock refresh from Admin WMS API
  useEffect(() => {
    const fetchLiveStock = async () => {
      try {
        const apiUrl = 'http://localhost:4000';
        const res = await fetch(`${apiUrl}/api/catalog?format=marketplace`, {
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data) && json.data.length > 0) {
            setItems((prev) =>
              prev.map((item) => {
                const live = json.data.find(
                  (l: Product) => l.slug === item.slug || l.name === item.name
                );
                if (!live) return item;
                return {
                  ...item,
                  pricePerKg: live.pricePerKg || item.pricePerKg,
                  priceNumeric: live.priceNumeric || item.priceNumeric,
                  stockJakarta: live.stockJakarta || item.stockJakarta,
                  stockLamongan: live.stockLamongan || item.stockLamongan,
                  stockBali: live.stockBali || item.stockBali,
                  totalStock: live.totalStock || item.totalStock,
                };
              })
            );
          }
        }
      } catch {
        // Fallback silently if admin server is offline
      }
    };
    fetchLiveStock();
  }, []);

  // Search and warehouse filter states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState<WarehouseId>('all');
  const [isWarehouseOpen, setIsWarehouseOpen] = useState(false);
  const warehouseRef = useRef<HTMLDivElement>(null);

  // Close warehouse dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (warehouseRef.current && !warehouseRef.current.contains(event.target as Node)) {
        setIsWarehouseOpen(false);
      }
    };
    if (isWarehouseOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isWarehouseOpen]);

  // Close warehouse dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isWarehouseOpen) {
        setIsWarehouseOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isWarehouseOpen]);

  const currentWarehouse = useMemo(() => {
    return WAREHOUSE_OPTIONS.find((opt) => opt.id === selectedWarehouse) || WAREHOUSE_OPTIONS[0];
  }, [selectedWarehouse]);

  // Slide-over Inspector Drawer State
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // In-Drawer RFQ & Truckload Calculator State
  const [calcVolumeKg, setCalcVolumeKg] = useState<number>(250);
  const [calcDestination, setCalcDestination] = useState<string>('Jabodetabek');
  const [calcDeliverySchedule, setCalcDeliverySchedule] = useState<string>('Pengiriman Rutin Mingguan');

  // Update volume when a new product is inspected
  useEffect(() => {
    if (selectedProduct) {
      const parsedMoq = parseInt(selectedProduct.moq?.replace(/[^0-9]/g, '') || '100', 10);
      setCalcVolumeKg(Math.max(parsedMoq || 100, 100));
    }
  }, [selectedProduct]);

  // Close drawer on Escape key (R-32 accessibility)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedProduct) {
        setSelectedProduct(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedProduct]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [selectedProduct]);

  // Filter products
  const filteredProducts = useMemo(() => {
    let result = items.filter((product) => {
      // Search matching: name, scientificName, cutType, category, description
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase().trim();
        const matchName = product.name.toLowerCase().includes(query);
        const matchScientific = product.scientificName?.toLowerCase().includes(query);
        const matchCut = product.cutType?.toLowerCase().includes(query);
        const matchCategory = product.category.toLowerCase().includes(query);
        const matchDescription = product.description.toLowerCase().includes(query);
        if (!matchName && !matchScientific && !matchCut && !matchCategory && !matchDescription) {
          return false;
        }
      }

      // Warehouse filter
      if (selectedWarehouse === 'jakarta') {
        if (!product.stockJakarta || product.stockJakarta.includes('Habis')) return false;
      } else if (selectedWarehouse === 'lamongan') {
        if (!product.stockLamongan || product.stockLamongan.includes('Habis')) return false;
      } else if (selectedWarehouse === 'bali') {
        if (!product.stockBali || product.stockBali.includes('Habis')) return false;
      }

      return true;
    });

    return result.sort((a, b) => a.id - b.id);
  }, [items, searchQuery, selectedWarehouse]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedWarehouse('all');
  };

  const isFiltered = searchQuery !== '' || selectedWarehouse !== 'all';

  // Calculator cost and fleet recommendations
  const estimatedTotalCost = useMemo(() => {
    if (!selectedProduct || !selectedProduct.priceNumeric) return 0;
    return selectedProduct.priceNumeric * calcVolumeKg;
  }, [selectedProduct, calcVolumeKg]);

  const recommendedFleet = useMemo(() => {
    if (calcVolumeKg <= 300) {
      return {
        fleet: 'Thermo Van Pendingin (-20°C)',
        capacity: 'Kapasitas s/d 500 kg',
        note: 'Ideal untuk pengiriman harian dapur restoran atau hotel lokal.'
      };
    }
    if (calcVolumeKg <= 1500) {
      return {
        fleet: 'Truk CDE Box Reefer (Engkel 4 Roda)',
        capacity: 'Kapasitas 1.500 s/d 2.000 kg',
        note: 'Ideal untuk pasokan mingguan katering industri atau distributor menengah.'
      };
    }
    return {
      fleet: 'Truk CDD Box Reefer (Double 6 Roda)',
      capacity: 'Kapasitas 4.000 s/d 5.000 kg',
      note: 'Ideal untuk transfer tonase antar-kota atau restock gudang daerah.'
    };
  }, [calcVolumeKg]);

  const generateWhatsAppCalcUrl = () => {
    if (!selectedProduct) return '';
    const text = `Halo FisheryTrade,%0A%0ASaya ingin mengajukan Request for Quotation (RFQ) untuk komoditas:%0A*Produk:* ${encodeURIComponent(selectedProduct.name)}%0A*Estimasi Kebutuhan:* ${calcVolumeKg} kg%0A*Kota Tujuan:* ${encodeURIComponent(calcDestination)}%0A*Jadwal Pasokan:* ${encodeURIComponent(calcDeliverySchedule)}%0A*Rekomendasi Armada:* ${encodeURIComponent(recommendedFleet.fleet)}%0A*Estimasi Subtotal:* Rp ${estimatedTotalCost.toLocaleString('id-ID')}%0A%0AMohon informasi ketersediaan slot armada dan konfirmasi harga final. Terima kasih.`;
    return `https://wa.me/6282241114959?text=${text}`;
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      
      {/* Top Marketplace Command Bar (Utilitarian & Transparent) */}
      <section className="bg-aruna-950 text-white pt-20 sm:pt-24 pb-8 sm:pb-10 px-4 sm:px-6 lg:px-8 border-b border-aruna-900 relative">
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Breadcrumb */}
          <div className="flex items-center text-aruna-200 mb-3 text-xs">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span className="mx-2 text-aruna-400">/</span>
            <span className="text-white font-semibold">Marketplace Komoditas</span>
          </div>

          {/* Clean B2B Title & Quick Value Promise */}
          <div className="max-w-3xl mb-6">
            <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Marketplace Komoditas Ikan & Hasil Laut B2B
            </h1>
            <p className="mt-2 text-sm sm:text-base text-aruna-100/90 leading-relaxed">
              Cek harga terbuka per kg, ketersediaan tonase fisik per titik cold storage, dan spesifikasi potongan siap olah langsung dari nelayan untuk kebutuhan restoran, hotel, katering, dan grosir.
            </p>
          </div>

          {/* Single-Row Fast Command Deck */}
          <div className="bg-white rounded-xl p-3.5 sm:p-4 shadow-md border border-slate-200 text-slate-800">
            <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
              
              {/* Search input with live clear button */}
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari nama komoditas, jenis potongan (fillet, loin, utuh), atau nama latin..."
                  className="w-full text-xs sm:text-sm pl-10 pr-10 min-h-[44px] py-2.5 rounded-lg border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-aruna-700 focus:border-transparent transition-all"
                  aria-label="Pencarian komoditas"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-800 focus:outline-none"
                    aria-label="Hapus kata kunci pencarian"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>

              {/* Custom Warehouse Selector Popover */}
              <div ref={warehouseRef} className="relative w-full md:w-64 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setIsWarehouseOpen(!isWarehouseOpen)}
                  className={`w-full min-h-[44px] px-3.5 py-2 rounded-lg border text-left transition-all flex items-center justify-between gap-2.5 ${
                    isWarehouseOpen
                      ? 'border-aruna-700 bg-white ring-2 ring-aruna-700/20 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isWarehouseOpen}
                  aria-label="Pilih lokasi cold storage"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-7 h-7 rounded-md bg-white border border-slate-200 flex items-center justify-center text-slate-500 flex-shrink-0 shadow-2xs">
                      <svg className="w-3.5 h-3.5 text-aruna-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="truncate">
                      <span className="block text-[10px] uppercase font-bold tracking-wider text-slate-600 leading-tight">
                        Lokasi Hub
                      </span>
                      <span className="block text-xs font-bold text-slate-900 truncate">
                        {currentWarehouse.label}
                      </span>
                    </div>
                  </div>
                  <svg
                    className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                      isWarehouseOpen ? 'rotate-180 text-aruna-700' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Popover Listbox */}
                {isWarehouseOpen && (
                  <div
                    role="listbox"
                    aria-label="Daftar Cold Storage"
                    className="absolute left-0 right-0 top-full mt-1.5 bg-white rounded-xl border border-slate-200 shadow-xl py-1.5 z-40 animate-in fade-in zoom-in-95 duration-100"
                  >
                    <div className="px-3 py-1.5 border-b border-slate-100 mb-1">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                        Pilih Titik Distribusi
                      </p>
                    </div>
                    {WAREHOUSE_OPTIONS.map((option) => {
                      const isSelected = selectedWarehouse === option.id;
                      return (
                        <button
                          key={option.id}
                          role="option"
                          aria-selected={isSelected}
                          type="button"
                          onClick={() => {
                            setSelectedWarehouse(option.id);
                            setIsWarehouseOpen(false);
                          }}
                          className={`w-full px-3 py-2 text-left flex items-center justify-between gap-3 transition-colors ${
                            isSelected
                              ? 'bg-aruna-50/80 text-aruna-900'
                              : 'hover:bg-slate-50 text-slate-700'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className={`text-xs font-bold ${isSelected ? 'text-aruna-800' : 'text-slate-800'}`}>
                                {option.label}
                              </span>
                              {option.id !== 'all' && (
                                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold bg-slate-100 text-slate-600">
                                  Cold Storage
                                </span>
                              )}
                            </div>
                            <p className="text-[11px] text-slate-600 truncate mt-0.5">
                              {option.hub}
                            </p>
                          </div>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-aruna-700 text-white flex items-center justify-center flex-shrink-0 shadow-2xs">
                              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                              </svg>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Quick Simulator CTA */}
              <button
                onClick={() => setSelectedProduct(products[0])}
                className="w-full md:w-auto flex-shrink-0 inline-flex items-center justify-center gap-2 min-h-[44px] py-2.5 px-4 rounded-lg bg-coral-500 hover:bg-coral-600 text-white text-xs sm:text-sm font-bold transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span>Simulasi Muatan Truk</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Trading Terminal Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        
        {/* Results Toolbar & Active Filter Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-slate-200">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-600 font-medium">
            <span className="font-bold text-aruna-900">Katalog Pasokan Terbuka</span>
            <span className="text-slate-300">•</span>
            <span>Menampilkan</span>
            <span className="font-sans font-bold text-aruna-800 bg-aruna-100 px-2 py-0.5 rounded-md tabular-nums">
              {filteredProducts.length}
            </span>
            <span>dari {products.length} komoditas ready stock</span>
          </div>

          {/* Active filter badges */}
          {isFiltered && (
            <div className="flex items-center gap-2 flex-wrap text-xs">
              {searchQuery && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                  Cari: "{searchQuery}"
                  <button onClick={() => setSearchQuery('')} className="hover:text-slate-900 focus:outline-none" aria-label="Hapus filter pencarian">✕</button>
                </span>
              )}
              {selectedWarehouse !== 'all' && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700">
                  Gudang: {currentWarehouse.label}
                  <button onClick={() => setSelectedWarehouse('all')} className="hover:text-slate-900 focus:outline-none" aria-label="Hapus filter gudang">✕</button>
                </span>
              )}
              <button
                onClick={handleResetFilters}
                className="text-xs font-semibold text-coral-600 hover:text-coral-700 underline focus:outline-none"
              >
                Reset Filter
              </button>
            </div>
          )}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="bg-white rounded-xl border border-slate-200 p-8 sm:p-14 text-center max-w-xl mx-auto shadow-xs my-8">
            <div className="w-14 h-14 mx-auto rounded-xl bg-aruna-50 border border-aruna-200 flex items-center justify-center text-aruna-600 mb-4">
              <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-bold text-aruna-900 mb-2">
              Tidak Ada Komoditas yang Cocok
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mb-6">
              Kami tidak menemukan komoditas dengan kriteria pencarian Anda. Silakan coba kata kunci lain atau hubungi tim sales kami untuk kebutuhan pengadaan jenis ikan atau spesifikasi khusus lainnya.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={handleResetFilters}
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-aruna-700 hover:bg-aruna-800 text-white text-xs font-bold transition-colors"
              >
                Reset Pencarian
              </button>
              <a
                href="https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20mencari%20komoditas%20ikan%20khusus%20yang%20belum%20ada%20di%20katalog."
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-5 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-colors"
              >
                Tanya Spesifikasi Khusus via WhatsApp
              </a>
            </div>
          </div>
        )}

        {/* Desktop View: Commodity Trading Table (Direction 1) */}
        {filteredProducts.length > 0 && (
          <div className="hidden md:block bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-slate-100/80 border-b border-slate-200 text-[11px] font-semibold uppercase text-slate-600 tracking-wider">
                <tr>
                  <th scope="col" className="py-3.5 px-4 w-[28%]">Komoditas & Spesifikasi</th>
                  <th scope="col" className="py-3.5 px-4 w-[20%]">Mutu & Metode Pembekuan</th>
                  <th scope="col" className="py-3.5 px-4 w-[22%]">Stok Fisik Cold Storage</th>
                  <th scope="col" className="py-3.5 px-4 w-[16%]">Harga Terbuka / Kg</th>
                  <th scope="col" className="py-3.5 px-4 w-[14%] text-center">Aksi Cepat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredProducts.map((product) => (
                  <tr
                    key={product.id}
                    onClick={() => setSelectedProduct(product)}
                    className="hover:bg-aruna-50/50 transition-colors cursor-pointer group"
                  >
                    {/* Column 1: Image, Commodity Name, Scientific Name, Cut Tag */}
                    <td className="py-3.5 px-4 align-middle">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-14 h-14 rounded-lg object-cover border border-slate-200 flex-shrink-0 group-hover:scale-105 transition-transform"
                          loading="lazy"
                        />
                        <div className="min-w-0">
                          <span className="font-bold text-sm text-aruna-900 group-hover:text-aruna-600 transition-colors block truncate">
                            {product.name}
                          </span>
                          <span className="text-[11px] font-mono text-slate-400 italic block truncate">
                            {product.scientificName}
                          </span>
                          <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                            <span className="inline-block px-2 py-0.5 bg-slate-100 text-slate-700 rounded-md text-[10px] font-semibold border border-slate-200/60">
                              {product.cutType || product.category}
                            </span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Column 2: Quality & Freezing Method */}
                    <td className="py-3.5 px-4 align-middle">
                      <div className="space-y-0.5">
                        <span className="font-bold text-slate-800 block text-xs">
                          {product.grade || 'Grade A'}
                        </span>
                        <span className="inline-block px-1.5 py-0.2 rounded bg-aruna-50 text-aruna-800 font-mono text-[10px] font-semibold border border-aruna-200/60">
                          {product.freezeMethod || 'IQF -25°C'}
                        </span>
                        {product.glazing && (
                          <span className="text-[11px] font-medium text-emerald-700 block">
                            Glazing: {product.glazing}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* Column 3: Cold Storage Stock Breakdown */}
                    <td className="py-3.5 px-4 align-middle">
                      <div className="space-y-1">
                        <div className="flex items-center gap-3 text-[11px]">
                          <span className="text-slate-400 w-16">Muara Baru:</span>
                          <span className={product.stockJakarta?.includes('Habis') ? 'text-slate-400 font-normal' : 'text-slate-800 font-bold tabular-nums'}>
                            {product.stockJakarta || '-'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px]">
                          <span className="text-slate-400 w-16">Brondong:</span>
                          <span className={product.stockLamongan?.includes('Habis') ? 'text-slate-400 font-normal' : 'text-slate-800 font-bold tabular-nums'}>
                            {product.stockLamongan || '-'}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[11px]">
                          <span className="text-slate-400 w-16">Benoa:</span>
                          <span className={product.stockBali?.includes('Habis') ? 'text-slate-400 font-normal' : 'text-slate-800 font-bold tabular-nums'}>
                            {product.stockBali || '-'}
                          </span>
                        </div>
                      </div>
                    </td>

                    {/* Column 4: Price / Kg & MOQ */}
                    <td className="py-3.5 px-4 align-middle">
                      <div>
                        <span className="text-sm font-extrabold text-aruna-900 block tabular-nums">
                          {product.pricePerKg}
                        </span>
                        <span className="text-[11px] text-slate-500 block">
                          MOQ: <strong className="text-slate-700">{product.moq || '100 kg'}</strong>
                        </span>
                      </div>
                    </td>

                    {/* Column 5: Actions */}
                    <td className="py-3.5 px-4 align-middle text-center" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-center gap-2">
                        <button
                          onClick={() => setSelectedProduct(product)}
                          className="py-1.5 px-3 rounded-lg bg-aruna-50 hover:bg-aruna-100 text-aruna-700 font-bold text-xs transition-colors border border-aruna-200"
                          title="Inspeksi Detail & Mutu"
                        >
                          Inspeksi
                        </button>
                        <a
                          href={product.whatsappUrl || `https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20memesan%20${encodeURIComponent(product.name)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="py-1.5 px-3 rounded-lg bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs transition-colors shadow-xs"
                          title="Pesan Langsung via WhatsApp"
                        >
                          Pesan
                        </a>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Mobile View: High-Density Trading Strips (< md) */}
        {filteredProducts.length > 0 && (
          <div className="md:hidden space-y-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => setSelectedProduct(product)}
                className="bg-white rounded-xl border border-slate-200 p-3.5 shadow-xs flex items-center justify-between gap-3 active:bg-slate-50 cursor-pointer"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-14 h-14 rounded-lg object-cover border border-slate-200 flex-shrink-0"
                    loading="lazy"
                  />
                  <div className="min-w-0">
                    <span className="font-bold text-xs text-aruna-900 block truncate">
                      {product.name}
                    </span>
                    <span className="text-[10px] text-slate-400 italic block truncate font-mono">
                      {product.scientificName}
                    </span>
                    <div className="mt-1 flex items-center gap-1.5 text-[10px]">
                      <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-700 font-semibold">
                        {product.cutType || product.category}
                      </span>
                      <span className="text-slate-400">•</span>
                      <span className="font-bold text-aruna-800 tabular-nums">
                        {product.pricePerKg}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex-shrink-0">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProduct(product);
                    }}
                    className="py-1.5 px-3 rounded-lg bg-aruna-50 text-aruna-700 font-bold text-xs border border-aruna-200"
                  >
                    Detail
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cold Storage Pickup and Supply Assurance Card */}
        <section className="mt-12 bg-white rounded-xl border border-slate-200 p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <span className="text-xs font-semibold text-aruna-700 uppercase tracking-wider block mb-1">
                Protokol Pengadaan Pasokan Langsung
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-aruna-900 tracking-tight">
                Ambil Mandiri di Cold Storage atau Kirim Armada Truk Reefer?
              </h2>
              <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                Anda dapat mengambil muatan langsung di gudang pendingin Muara Baru (Jakarta Utara), Brondong (Lamongan), atau Benoa (Bali) mulai dari 1 master box, atau menggunakan armada truk pendingin thermo terkontrol -20°C kami dengan minimal order 100 kg.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 flex-shrink-0">
              <a
                href="https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20jadwalkan%20pengambilan%20mandiri%20di%20cold%20storage."
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[44px] py-2.5 px-5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold text-center inline-flex items-center justify-center transition-colors"
              >
                Jadwal Ambil Mandiri
              </a>
              <button
                onClick={() => setSelectedProduct(products[0])}
                className="min-h-[44px] py-2.5 px-5 rounded-lg bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold text-center inline-flex items-center justify-center transition-colors shadow-xs"
              >
                Simulasi Muatan Truk
              </button>
            </div>
          </div>
        </section>

      </main>

      {/* Slide-over Inspector Drawer (Direction 1) */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setSelectedProduct(null)}
            aria-hidden="true"
          />

          {/* Slide-over Container */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <div
              className="w-screen max-w-xl md:max-w-2xl bg-white shadow-2xl border-l border-slate-200 flex flex-col h-full animate-in slide-in-from-right duration-250 relative z-50"
              role="dialog"
              aria-modal="true"
              aria-labelledby="drawer-product-title"
            >
              
              {/* Drawer Header (Fixed) */}
              <div className="px-5 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/90 flex-shrink-0">
                <div className="min-w-0 pr-4">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-aruna-100 text-aruna-800">
                      {selectedProduct.cutType || selectedProduct.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-amber-100 text-amber-900">
                      {selectedProduct.grade || 'Grade A'}
                    </span>
                  </div>
                  <h2 id="drawer-product-title" className="text-lg sm:text-xl font-extrabold text-aruna-900 truncate">
                    {selectedProduct.name}
                  </h2>
                  <span className="text-xs font-mono text-slate-400 italic block">
                    {selectedProduct.scientificName}
                  </span>
                </div>

                <button
                  onClick={() => setSelectedProduct(null)}
                  className="p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors focus:outline-none"
                  aria-label="Tutup inspeksi"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Drawer Scrollable Content */}
              <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-6 text-xs">
                
                {/* Hero Product Photo (Clean 16:9, No Stacking Clutter) */}
                <div className="rounded-xl overflow-hidden border border-slate-200 bg-slate-100 relative h-64 sm:h-72">
                  <img
                    src={selectedProduct.imageUrl}
                    alt={selectedProduct.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-3 left-3 bg-aruna-950/90 text-white px-3 py-1.5 rounded-lg text-xs font-semibold backdrop-blur-xs border border-aruna-800">
                    Metode Pembekuan: {selectedProduct.freezeMethod || 'IQF -25°C'}
                  </div>
                </div>

                {/* Core Commercial Pricing Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                  <div>
                    <span className="text-[11px] text-slate-400 block">Harga Terbuka</span>
                    <span className="text-base font-extrabold text-aruna-900 tabular-nums">
                      {selectedProduct.pricePerKg}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Minimal Order</span>
                    <span className="text-xs font-bold text-slate-800">
                      {selectedProduct.moq || '100 kg'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Kadar Glazing</span>
                    <span className="text-xs font-bold text-emerald-700">
                      {selectedProduct.glazing || '0%'}
                    </span>
                  </div>
                  <div>
                    <span className="text-[11px] text-slate-400 block">Kemasan Fisik</span>
                    <span className="text-xs font-bold text-slate-800 truncate block" title={selectedProduct.volume}>
                      {selectedProduct.volume}
                    </span>
                  </div>
                </div>

                {/* Physical Cold Storage Distribution */}
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Ketersediaan Stok Fisik per Gudang
                  </h3>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <span className="text-[10px] text-slate-400 block">Muara Baru (JKT)</span>
                      <span className="font-bold text-xs text-aruna-900 block mt-0.5 tabular-nums">
                        {selectedProduct.stockJakarta || '-'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <span className="text-[10px] text-slate-400 block">Brondong (LMG)</span>
                      <span className="font-bold text-xs text-aruna-900 block mt-0.5 tabular-nums">
                        {selectedProduct.stockLamongan || '-'}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-lg border border-slate-200 bg-white">
                      <span className="text-[10px] text-slate-400 block">Benoa (Bali)</span>
                      <span className="font-bold text-xs text-aruna-900 block mt-0.5 tabular-nums">
                        {selectedProduct.stockBali || '-'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Culinary Description & Quality Assurance */}
                <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
                  <h3 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
                    Deskripsi Potongan & Karakteristik Olahan
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-xs">
                    {selectedProduct.description}
                  </p>
                  {selectedProduct.productFunction && (
                    <div className="pt-2 border-t border-slate-100">
                      <span className="font-semibold text-slate-700 block mb-0.5">Aplikasi Dapur yang Cocok:</span>
                      <p className="text-slate-500 leading-relaxed text-xs">
                        {selectedProduct.productFunction}
                      </p>
                    </div>
                  )}
                </div>

                {/* Integrated Truckload & RFQ Simulator */}
                <div className="bg-aruna-50/70 border border-aruna-200/80 rounded-xl p-4 sm:p-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-aruna-900 text-xs sm:text-sm">
                      Kalkulator Tonase & Muatan Truk Reefer
                    </h3>
                    <span className="text-xs font-mono font-bold text-aruna-800 tabular-nums">
                      {calcVolumeKg.toLocaleString('id-ID')} kg
                    </span>
                  </div>

                  {/* Volume Slider */}
                  <div>
                    <input
                      type="range"
                      min="50"
                      max="5000"
                      step="50"
                      value={calcVolumeKg}
                      onChange={(e) => setCalcVolumeKg(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-coral-500"
                    />
                    <div className="grid grid-cols-5 gap-1.5 mt-2">
                      {[100, 250, 500, 1000, 2500].map((preset) => (
                        <button
                          key={preset}
                          type="button"
                          onClick={() => setCalcVolumeKg(preset)}
                          className={`min-h-[32px] py-1 rounded-md text-[11px] font-sans font-semibold tabular-nums transition-colors ${
                            calcVolumeKg === preset
                              ? 'bg-aruna-700 text-white font-bold'
                              : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                          }`}
                        >
                          {preset} kg
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Destination & Schedule */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="block font-bold text-slate-700 text-[11px] mb-1.5 uppercase tracking-wider">
                        Kota Tujuan Pengiriman
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </div>
                        <select
                          value={calcDestination}
                          onChange={(e) => setCalcDestination(e.target.value)}
                          className="w-full appearance-none pl-9 pr-9 py-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 focus:bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-aruna-700/20 focus:border-aruna-700 transition-all cursor-pointer shadow-2xs"
                        >
                          <option value="Jabodetabek">Jabodetabek (Hub Muara Baru)</option>
                          <option value="Surabaya & Jawa Timur">Surabaya & Jatim (Hub Brondong)</option>
                          <option value="Denpasar & Bali">Denpasar & Bali (Hub Benoa)</option>
                          <option value="Semarang & Solo">Semarang & Jawa Tengah</option>
                          <option value="Bandung Raya">Bandung Raya (Jawa Barat)</option>
                          <option value="Kota Luar Pulau Lainnya">Kota Luar Pulau Lainnya</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 text-[11px] mb-1.5 uppercase tracking-wider">
                        Jadwal Pasokan
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <select
                          value={calcDeliverySchedule}
                          onChange={(e) => setCalcDeliverySchedule(e.target.value)}
                          className="w-full appearance-none pl-9 pr-9 py-2.5 rounded-lg border border-slate-200 bg-white hover:border-slate-300 focus:bg-white text-xs font-semibold text-slate-800 focus:outline-none focus:ring-2 focus:ring-aruna-700/20 focus:border-aruna-700 transition-all cursor-pointer shadow-2xs"
                        >
                          <option value="Pengiriman Besok Pagi">Pengiriman Besok Pagi (Fast Reefer)</option>
                          <option value="Pengiriman Rutin Mingguan">Pengiriman Rutin Mingguan (Scheduled)</option>
                          <option value="Kontrak Pasokan Bulanan">Kontrak Pasokan Bulanan (B2B Contract)</option>
                          <option value="Pengambilan Mandiri di Gudang">Pengambilan Mandiri di Gudang (Self Pick-up)</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Calculation Result */}
                  <div className="bg-white rounded-lg p-3.5 border border-aruna-200 space-y-1.5">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500">Estimasi Subtotal:</span>
                      <span className="font-extrabold text-sm text-aruna-900 tabular-nums">
                        Rp {estimatedTotalCost.toLocaleString('id-ID')}
                      </span>
                    </div>
                    <div className="flex justify-between items-start text-[11px] pt-1.5 border-t border-slate-100">
                      <span className="text-slate-500">Rekomendasi Armada:</span>
                      <span className="font-bold text-slate-800 text-right">
                        {recommendedFleet.fleet}
                      </span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Drawer Sticky Footer Actions */}
              <div className="p-4 sm:p-5 border-t border-slate-200 bg-white flex flex-col sm:flex-row gap-3 flex-shrink-0">
                <a
                  href={generateWhatsAppCalcUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    if (selectedProduct) {
                      try {
                        const apiUrl = 'http://localhost:4000';
                        fetch(`${apiUrl}/api/rfq`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({
                            buyerName: 'Calon Pembeli (Katalog Web)',
                            buyerPhone: '08xxxxxxxx',
                            coldStorageName: selectedWarehouse !== 'all' ? `CS ${selectedWarehouse}` : 'Semua Gudang',
                            destinationCity: calcDestination,
                            commodityName: selectedProduct.name,
                            requestedVolumeTons: calcVolumeKg / 1000,
                          }),
                        }).catch(() => {});
                      } catch {}
                    }
                  }}
                  className="flex-grow min-h-[44px] py-2.5 px-4 rounded-lg bg-coral-500 hover:bg-coral-600 text-white font-bold text-xs text-center transition-colors flex items-center justify-center gap-2 shadow-xs"
                >
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                  <span>Ajukan RFQ Komoditas ke WhatsApp Sales</span>
                </a>

                <a
                  href={`/produk/${selectedProduct.slug}`}
                  className="min-h-[44px] py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center inline-flex items-center justify-center transition-colors"
                >
                  Lembar Spesifikasi Penuh →
                </a>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MarketplaceView;
