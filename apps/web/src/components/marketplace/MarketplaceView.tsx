import React, { useState, useMemo, useEffect, useRef } from 'react';
import type { Product } from '../../types.ts';
import { ADMIN_API_BASE_URL } from '../../lib/catalog-service.ts';

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
  const [catalogSource, setCatalogSource] = useState<'live' | 'reference'>(
    products.every((product) => product.catalogSource === 'live') ? 'live' : 'reference'
  );

  // Sync state if products prop changes
  useEffect(() => {
    setItems(products);
    setCatalogSource(products.every((product) => product.catalogSource === 'live') ? 'live' : 'reference');
  }, [products]);

  // Refresh the live product catalog so admin changes appear without rebuilding the static site.
  useEffect(() => {
    const fetchLiveCatalog = async () => {
      try {
        const res = await fetch(`${ADMIN_API_BASE_URL}/api/catalog?format=marketplace`, {
          headers: { Accept: 'application/json' },
        });
        if (res.ok) {
          const json = await res.json();
          if (json.success && Array.isArray(json.data)) {
            const liveProducts: Product[] = json.data.map((live: Product) => {
              const fallback = products.find((item) => item.slug === live.slug);
              return {
                ...fallback,
                ...live,
                images: live.images?.length ? live.images : fallback?.images || [live.imageUrl],
                productFunction: live.productFunction ?? fallback?.productFunction ?? '',
                problemTitle: live.problemTitle ?? fallback?.problemTitle,
                problemDescription: live.problemDescription ?? fallback?.problemDescription,
                catalogSource: 'live',
                catalogFetchedAt: new Date().toISOString(),
              };
            });
            setItems(liveProducts);
            setCatalogSource('live');
          }
        }
      } catch {
        // Keep the build-time catalog if the API is temporarily offline.
      }
    };
    void fetchLiveCatalog();
  }, [products]);

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

  const openProduct = (product?: Product) => {
    if (!product) return;
    if (window.matchMedia('(max-width: 767px)').matches) {
      window.location.assign(`/produk/${encodeURIComponent(product.slug)}/`);
      return;
    }
    setSelectedProduct(product);
  };

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
      <section className="bg-white text-slate-900 pt-20 pb-3 px-3 border-b border-slate-200 relative sm:bg-aruna-950 sm:text-white sm:pt-24 sm:pb-10 sm:px-6 lg:px-8 sm:border-aruna-900">
        <div className="relative z-10 max-w-7xl mx-auto">
          
          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center text-aruna-200 mb-3 text-xs">
            <a href="/" className="hover:text-white transition-colors">Beranda</a>
            <span className="mx-2 text-aruna-400">/</span>
            <span className="text-white font-semibold">Marketplace Komoditas</span>
          </div>

          {/* Clean B2B Title & Quick Value Promise */}
          <div className="max-w-3xl mb-0 sm:mb-6">
            <h1 className="sr-only sm:not-sr-only sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Marketplace Komoditas Ikan & Hasil Laut B2B
            </h1>
            <p className="hidden sm:block mt-2 text-sm sm:text-base text-aruna-100/90 leading-relaxed">
              Cek harga terbuka per kg, ketersediaan tonase fisik per titik cold storage, dan spesifikasi potongan siap olah langsung dari nelayan untuk kebutuhan restoran, hotel, katering, dan grosir.
            </p>
          </div>

          {/* Single-Row Fast Command Deck */}
          <div className="rounded-none border-0 bg-transparent p-0 text-slate-800 shadow-none sm:rounded-xl sm:border sm:border-slate-200 sm:bg-white sm:p-4 sm:shadow-md">
            <div className="flex flex-row items-stretch gap-2 sm:gap-3 md:items-center">
              
              {/* Search input with live clear button */}
              <div className="relative min-w-0 flex-grow">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Cari produk..."
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
              <div ref={warehouseRef} className="relative w-[42%] flex-shrink-0 md:w-64">
                <button
                  type="button"
                  onClick={() => setIsWarehouseOpen(!isWarehouseOpen)}
                  className={`w-full min-h-[44px] px-2.5 py-2 sm:px-3.5 rounded-lg border text-left transition-all flex items-center justify-between gap-2 ${
                    isWarehouseOpen
                      ? 'border-aruna-700 bg-white ring-2 ring-aruna-700/20 shadow-xs'
                      : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                  }`}
                  aria-haspopup="listbox"
                  aria-expanded={isWarehouseOpen}
                  aria-label="Pilih lokasi cold storage"
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="hidden sm:flex w-7 h-7 rounded-md bg-white border border-slate-200 items-center justify-center text-slate-500 flex-shrink-0 shadow-2xs">
                      <svg className="w-3.5 h-3.5 text-aruna-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div className="truncate">
                      <span className="hidden sm:block text-[10px] uppercase font-bold tracking-wider text-slate-600 leading-tight">
                        Lokasi Hub
                      </span>
                      <span className="block text-[10px] sm:text-xs font-bold text-slate-900 truncate">
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
                onClick={() => openProduct(items[0])}
                className="hidden md:inline-flex w-full md:w-auto flex-shrink-0 items-center justify-center gap-2 min-h-[44px] py-2.5 px-4 rounded-lg bg-coral-500 hover:bg-coral-600 text-white text-xs sm:text-sm font-bold transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="md:hidden">Lihat Detail Produk</span>
                <span className="hidden md:inline">Simulasi Muatan Truk</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Trading Terminal Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 sm:pt-10 pb-10">

        {catalogSource === 'reference' && (
          <div role="status" className="mb-3 flex items-start gap-2.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-2.5 text-amber-950 sm:mb-4 sm:rounded-xl sm:px-4 sm:py-3">
            <span aria-hidden="true" className="mt-0.5 inline-flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-amber-200 text-xs font-extrabold">!</span>
            <div>
              <p className="text-xs font-extrabold sm:text-sm">Mode preview — data contoh</p>
              <p className="mt-0.5 text-[11px] leading-relaxed sm:text-xs">
                Harga, stok, dan foto yang ditampilkan belum berasal dari katalog live dan bukan informasi operasional.
              </p>
            </div>
          </div>
        )}

        {/* Results Toolbar & Active Filter Status */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-3 mb-3 pb-2 sm:mb-4 sm:pb-3 border-b border-slate-200">
          <div className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-sm text-slate-600 font-medium">
            <span className="font-bold text-aruna-900">
              <span className="sm:hidden">Katalog</span>
              <span className="hidden sm:inline">Katalog Pasokan Terbuka</span>
            </span>
            <span className="hidden text-slate-300 sm:inline">•</span>
            <span className="hidden sm:inline">Menampilkan</span>
            <span className="font-sans font-bold text-aruna-800 bg-aruna-100 px-2 py-0.5 rounded-md tabular-nums">
              {filteredProducts.length}
            </span>
            <span>
              <span className="sm:hidden">dari {items.length} produk</span>
              <span className="hidden sm:inline">
                dari {items.length} {catalogSource === 'reference' ? 'produk contoh' : 'komoditas ready stock'}
              </span>
            </span>
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

        {/* Desktop View: responsive product-card grid */}
        {filteredProducts.length > 0 && (
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-stretch gap-4">
            {filteredProducts.map((product) => (
              <article
                key={product.id}
                className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-aruna-300 hover:shadow-md"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  {product.grade && (
                    <span className="absolute left-2.5 top-2.5 max-w-[calc(100%-1.25rem)] truncate rounded-md bg-white/95 px-2 py-1 text-[10px] font-bold text-aruna-900 shadow-sm">
                      {product.grade}
                    </span>
                  )}
                  {product.catalogSource === 'live' && product.totalStock && (
                    <span className="absolute right-2.5 top-2.5 rounded-md bg-emerald-700/95 px-2 py-1 text-[10px] font-bold text-white shadow-sm">
                      Stok aktif
                    </span>
                  )}
                </div>

                <div className="flex flex-1 flex-col p-3">
                  <span className="block truncate text-[10px] font-semibold uppercase tracking-wide text-aruna-700">
                    {product.cutType || product.category}
                  </span>
                  <h2 className="mt-1 line-clamp-2 min-h-10 text-sm font-bold leading-snug">
                    <button type="button" onClick={() => setSelectedProduct(product)} className="text-left text-aruna-900 transition-colors hover:text-aruna-700">
                      {product.name}
                    </button>
                  </h2>
                  <p className="mt-0.5 truncate text-[11px] italic text-slate-400">
                    {product.scientificName || 'Komoditas perikanan'}
                  </p>

                  <div className="mt-3 border-t border-slate-100 pt-2.5">
                    <span className="block text-[10px] text-slate-500">Harga terbuka / kg</span>
                    <span className="mt-0.5 block truncate text-base font-extrabold tabular-nums text-coral-700">
                      {product.pricePerKg || 'Harga melalui RFQ'}
                    </span>
                    <div className="mt-1 flex items-center justify-between gap-2 text-[10px] text-slate-600">
                      <span className="truncate">MOQ <strong className="text-slate-800">{product.moq || 'Hubungi sales'}</strong></span>
                      <span className="truncate text-right">{product.freezeMethod || product.grade || 'Mutu terstandar'}</span>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-1 gap-1.5 border-t border-slate-100 pt-2.5 text-[10px]">
                    {[
                      ['Muara Baru', product.stockJakarta],
                      ['Brondong', product.stockLamongan],
                      ['Benoa', product.stockBali],
                    ].map(([warehouse, stock]) => (
                      <div key={warehouse} className="flex items-center justify-between gap-2">
                        <span className="truncate text-slate-500">{warehouse}</span>
                        <span className={`truncate text-right tabular-nums ${stock?.includes('Habis') ? 'font-normal text-slate-400' : 'font-semibold text-slate-700'}`}>
                          {stock || 'Cek stok'}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
                    <button
                      type="button"
                      onClick={() => setSelectedProduct(product)}
                      className="min-h-9 flex-1 rounded-lg border border-aruna-200 bg-aruna-50 px-2 text-[11px] font-bold text-aruna-700 transition-colors hover:bg-aruna-100"
                    >
                      Detail
                    </button>
                    <a
                      href={product.whatsappUrl || `https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20memesan%20${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-9 flex-1 items-center justify-center rounded-lg bg-coral-500 px-2 text-[11px] font-bold text-white shadow-xs transition-colors hover:bg-coral-600"
                    >
                      Pesan
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* Mobile View: compact marketplace cards echo the reference while keeping B2B facts accurate. */}
        {filteredProducts.length > 0 && (
          <div className="grid grid-cols-2 items-stretch gap-2 md:hidden sm:gap-3">
            {filteredProducts.map((product) => (
              <a
                key={product.id}
                href={`/produk/${encodeURIComponent(product.slug)}/`}
                aria-label={`Lihat detail ${product.name}`}
                className="group flex h-full min-w-0 flex-col overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md active:bg-slate-50 sm:rounded-xl"
              >
                <div className="relative aspect-square w-full overflow-hidden bg-slate-100">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  {product.grade && (
                    <span className="absolute left-2 top-2 max-w-[calc(100%-1rem)] truncate rounded-md bg-white/95 px-2 py-1 text-[9px] font-bold text-aruna-900 shadow-sm sm:text-[10px]">
                      {product.grade}
                    </span>
                  )}
                  {product.catalogSource === 'live' && product.totalStock && (
                    <span className="absolute right-2 top-2 rounded-md bg-emerald-700/95 px-2 py-1 text-[9px] font-bold text-white shadow-sm">
                      Stok aktif
                    </span>
                  )}
                </div>
                <div className="flex min-h-[132px] flex-1 flex-col p-2 sm:min-h-[142px] sm:p-3">
                  <span className="block truncate text-[9px] font-semibold uppercase tracking-wide text-aruna-700 sm:text-[10px]">
                    {product.cutType || product.category}
                  </span>
                  <h2 className="mt-1 line-clamp-2 min-h-[2.25rem] text-xs font-bold leading-snug text-aruna-900 sm:min-h-[2.5rem] sm:text-sm">
                    {product.name}
                  </h2>
                  <div className="mt-auto border-t border-slate-100 pt-1.5 sm:pt-2">
                    <span className="block text-[9px] text-slate-500 sm:text-[10px]">Harga / kg</span>
                    <span className="mt-0.5 block truncate text-xs font-extrabold tabular-nums text-coral-700 sm:text-sm">
                      {product.pricePerKg || 'Harga melalui RFQ'}
                    </span>
                    <div className="mt-1.5 flex items-center justify-between gap-1 text-[9px] font-medium text-slate-600 sm:text-[10px]">
                      <span className="truncate">MOQ {product.moq || 'Hubungi sales'}</span>
                      <span className="truncate text-right">{product.totalStock ? `Stok ${product.totalStock}` : 'Cek stok'}</span>
                    </div>
                    {product.freezeMethod && (
                      <span className="mt-1 block truncate text-[9px] text-slate-500 sm:text-[10px]">
                        {product.freezeMethod}
                      </span>
                    )}
                  </div>
                </div>
              </a>
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
                onClick={() => openProduct(items[0])}
                className="min-h-[44px] py-2.5 px-5 rounded-lg bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold text-center inline-flex items-center justify-center transition-colors shadow-xs"
              >
                <span className="md:hidden">Lihat Detail Produk</span>
                <span className="hidden md:inline">Simulasi Muatan Truk</span>
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

                <button
                  type="button"
                  onClick={() => setSelectedProduct(null)}
                  className="min-h-[44px] py-2.5 px-4 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs text-center inline-flex items-center justify-center transition-colors"
                >
                  Kembali ke Daftar Produk
                </button>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default MarketplaceView;
