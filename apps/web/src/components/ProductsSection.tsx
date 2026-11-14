import React from 'react';
import { PRODUCTS } from '../constants.tsx';
import ProductCard from './ProductCard.tsx';
import { Product } from '../types.ts';

interface ProductsSectionProps {
  products?: Product[];
}

const ProductsSection: React.FC<ProductsSectionProps> = ({ products }) => {
  const productsToDisplay = products || PRODUCTS;

  return (
    <section className="bg-slate-50 py-16 md:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-mono font-bold text-aruna-700 uppercase tracking-wider block">
              Daftar Komoditas Ready Stock
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-aruna-900 mt-1">
              Pilihan Komoditas untuk Pasar Domestik
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            Total {productsToDisplay.length} Komoditas Utama Tersedia
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {productsToDisplay.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductsSection;
