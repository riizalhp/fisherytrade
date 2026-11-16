import React from 'react';
import { PRODUCTS } from '../constants.tsx';
import ProductCard from './ProductCard.tsx';
import type { Product } from '../types.ts';

const POPULAR_PRODUCT_SLUGS = [
  'yellowfin-tuna-loin-beku',
  'kakap-merah-utuh-beku',
  'cumi-tube-kupas-bersih',
  'udang-vaname-beku-hoso',
];

interface ProductsSectionProps {
  products?: Product[];
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ products }) => {
  const catalogProducts = products?.length ? products : PRODUCTS;
  const productsBySlug = new Map(catalogProducts.map((product) => [product.slug, product]));
  const productsToDisplay = POPULAR_PRODUCT_SLUGS
    .map((slug) => productsBySlug.get(slug))
    .filter((product): product is Product => Boolean(product))
    .concat(catalogProducts.filter((product) => !POPULAR_PRODUCT_SLUGS.includes(product.slug)))
    .slice(0, 4);

  return (
    <section className="bg-slate-50 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-aruna-700 uppercase tracking-wider block">
              Pilihan Populer dari Marketplace
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-aruna-900 tracking-tight mt-1">
              Produk Utama FisheryTrade
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600">
              Jelajahi pilihan utama dari katalog marketplace FisheryTrade, lengkap dengan harga, mutu, dan spesifikasi untuk kebutuhan bisnis Anda.
            </p>
          </div>
          <a
            href="/produk"
            className="inline-flex min-h-11 items-center justify-center gap-2 self-start rounded-xl border border-aruna-200 bg-white px-4 text-sm font-bold text-aruna-700 transition-colors hover:border-aruna-300 hover:bg-aruna-50 sm:self-auto"
          >
            Lihat semua produk
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Desktop View: responsive product-card grid matching Marketplace */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 items-stretch gap-4">
          {productsToDisplay.map((product) => (
            <ProductCard key={product.id} product={product} variant="desktop" />
          ))}
        </div>

        {/* Mobile View: 2-column compact marketplace cards matching Marketplace */}
        <div className="grid grid-cols-2 items-stretch gap-2 md:hidden sm:gap-3">
          {productsToDisplay.map((product) => (
            <ProductCard key={product.id} product={product} variant="mobile" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
