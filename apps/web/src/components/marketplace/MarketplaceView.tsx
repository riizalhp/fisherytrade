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
              <a
                href={items[0] ? `/produk/${encodeURIComponent(items[0].slug)}/` : '/produk/'}
                className="hidden md:inline-flex w-full md:w-auto flex-shrink-0 items-center justify-center gap-2 min-h-[44px] py-2.5 px-4 rounded-lg bg-coral-500 hover:bg-coral-600 text-white text-xs sm:text-sm font-bold transition-colors shadow-xs"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
                <span className="md:hidden">Lihat Detail Produk</span>
                <span className="hidden md:inline">Simulasi Muatan Truk</span>
              </a>
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
            {filteredProducts.map((product) => {
              const productUrl = `/produk/${encodeURIComponent(product.slug)}/`;
              return (
                <article
                  key={product.id}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-aruna-300 hover:shadow-md"
                >
                  <a href={productUrl} className="relative aspect-square w-full overflow-hidden bg-slate-100 block">
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
                  </a>

                  <div className="flex flex-1 flex-col p-3">
                    <span className="block truncate text-[10px] font-semibold uppercase tracking-wide text-aruna-700">
                      {product.cutType || product.category}
                    </span>
                    <h2 className="mt-1 line-clamp-2 min-h-10 text-sm font-bold leading-snug">
                      <a href={productUrl} className="text-left text-aruna-900 transition-colors hover:text-aruna-700">
                        {product.name}
                      </a>
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
                      <a
                        href={productUrl}
                        className="min-h-9 flex-1 rounded-lg border border-aruna-200 bg-aruna-50 px-2 text-[11px] font-bold text-aruna-700 transition-colors hover:bg-aruna-100 inline-flex items-center justify-center text-center"
                      >
                        Detail
                      </a>
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
              );
            })}
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
              <a
                href={items[0] ? `/produk/${encodeURIComponent(items[0].slug)}/` : '/produk/'}
                className="min-h-[44px] py-2.5 px-5 rounded-lg bg-coral-500 hover:bg-coral-600 text-white text-xs font-bold text-center inline-flex items-center justify-center transition-colors shadow-xs"
              >
                <span className="md:hidden">Lihat Detail Produk</span>
                <span className="hidden md:inline">Simulasi Muatan Truk</span>
              </a>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
};

export default MarketplaceView;
