import React from 'react';
import type { Product } from '../types.ts';

interface ProductCardProps {
  product: Product;
  variant?: 'desktop' | 'mobile';
}

const ProductCard: React.FC<ProductCardProps> = ({ product, variant = 'desktop' }) => {
  const detailUrl = `/produk/${encodeURIComponent(product.slug)}/`;
  const orderUrl =
    product.whatsappUrl ||
    `https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20memesan%20${encodeURIComponent(product.name)}`;

  // Mobile View: compact marketplace card echoing MarketplaceView mobile layout
  if (variant === 'mobile') {
    return (
      <a
        href={detailUrl}
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
          <h3 className="mt-1 line-clamp-2 min-h-[2.25rem] text-xs font-bold leading-snug text-aruna-900 sm:min-h-[2.5rem] sm:text-sm">
            {product.name}
          </h3>
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
    );
  }

  // Desktop View: full marketplace card echoing MarketplaceView desktop layout
  return (
    <article className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all hover:-translate-y-0.5 hover:border-aruna-300 hover:shadow-md">
      <a href={detailUrl} className="relative aspect-square w-full overflow-hidden bg-slate-100 block">
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
        <h3 className="mt-1 line-clamp-2 min-h-10 text-sm font-bold leading-snug">
          <a href={detailUrl} className="text-left text-aruna-900 transition-colors hover:text-aruna-700">
            {product.name}
          </a>
        </h3>
        <p className="mt-0.5 truncate text-[11px] italic text-slate-400">
          {product.scientificName || 'Komoditas perikanan'}
        </p>

        <div className="mt-3 border-t border-slate-100 pt-2.5">
          <span className="block text-[10px] text-slate-500">Harga terbuka / kg</span>
          <span className="mt-0.5 block truncate text-base font-extrabold tabular-nums text-coral-700">
            {product.pricePerKg || 'Harga melalui RFQ'}
          </span>
          <div className="mt-1 flex items-center justify-between gap-2 text-[10px] text-slate-600">
            <span className="truncate">
              MOQ <strong className="text-slate-800">{product.moq || 'Hubungi sales'}</strong>
            </span>
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
              <span
                className={`truncate text-right tabular-nums ${
                  stock?.includes('Habis') ? 'font-normal text-slate-400' : 'font-semibold text-slate-700'
                }`}
              >
                {stock || 'Cek stok'}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-3 flex gap-2 border-t border-slate-100 pt-3">
          <a
            href={detailUrl}
            className="min-h-9 flex-1 rounded-lg border border-aruna-200 bg-aruna-50 px-2 text-[11px] font-bold text-aruna-700 transition-colors hover:bg-aruna-100 inline-flex items-center justify-center text-center"
          >
            Detail
          </a>
          <a
            href={orderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-9 flex-1 items-center justify-center rounded-lg bg-coral-500 px-2 text-[11px] font-bold text-white shadow-xs transition-colors hover:bg-coral-600 text-center"
          >
            Pesan
          </a>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
