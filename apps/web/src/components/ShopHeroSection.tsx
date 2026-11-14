import React from 'react';

const ShopHeroSection: React.FC = () => {
  return (
    <section className="relative flex items-center bg-aruna-950 text-white pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-52 lg:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80"
          alt="Latar Belakang Katalog Ikan Beku"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-aruna-950/95 via-aruna-900/85 to-aruna-900/50"></div>
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-3xl text-left">
          <div className="inline-flex items-center gap-2 py-1 px-3.5 bg-aruna-800/80 border border-aruna-500/40 rounded-full text-xs font-semibold text-aruna-100 mb-4 backdrop-blur-xs">
            <span>Standar Industri: IQF -25°C • HACCP • SKP KKP</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-4">
            Katalog Komoditas Ikan & Hasil Laut
          </h1>
          <p className="max-w-xl text-sm sm:text-base text-slate-200 leading-relaxed">
            Pilihan komoditas ikan laut beku segar dengan jaminan rantai dingin dan ketersediaan tonase langsung dari cold storage Muara Baru, Brondong, dan Benoa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShopHeroSection;
