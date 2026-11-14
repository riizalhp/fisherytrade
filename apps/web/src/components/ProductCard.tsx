import React from 'react';
import { Product } from '../types.ts';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="group flex flex-col bg-white border border-slate-200 rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:border-aruna-300">
      <a href={`/produk/${product.slug}`} className="relative block w-full h-64 overflow-hidden bg-slate-100">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute top-3 left-3 flex flex-col gap-1 items-start">
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-aruna-600 text-white shadow-xs">
            {product.freezeMethod || 'IQF -25°C'}
          </span>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-white shadow-xs">
            {product.grade || 'Grade A'}
          </span>
        </div>
        <div className="absolute bottom-3 right-3">
          <span className="px-2.5 py-1 rounded-lg bg-white/95 text-aruna-900 text-xs font-mono font-bold shadow-sm border border-slate-100">
            {product.pricePerKg}
          </span>
        </div>
      </a>
      
      <div className="p-5 flex flex-col flex-grow justify-between">
        <div>
          <span className="text-[11px] font-mono text-slate-400 italic block">
            {product.scientificName}
          </span>
          <a
            href={`/produk/${product.slug}`}
            className="text-lg font-bold text-aruna-900 mt-1 block hover:text-aruna-600 transition-colors leading-snug"
          >
            {product.name}
          </a>
          <p className="text-xs text-slate-500 mt-1 line-clamp-2">
            {product.description}
          </p>
          <div className="text-xs font-mono text-slate-600 mt-3 pt-3 border-t border-slate-100 flex justify-between">
            <span>Kemasan:</span>
            <span className="font-semibold text-slate-800">{product.volume}</span>
          </div>
        </div>

        <div className="mt-5 flex gap-2">
          <a
            href={`/produk/${product.slug}`}
            className="w-full bg-aruna-600 hover:bg-aruna-700 text-white text-xs font-bold py-2.5 px-4 rounded-xl transition-colors text-center shadow-xs"
          >
            Spesifikasi & Stok
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
