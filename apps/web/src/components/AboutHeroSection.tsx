import React from 'react';

const AboutHeroSection: React.FC = () => {
  return (
    <section className="relative flex items-center bg-aruna-950 text-white pt-36 pb-20 sm:pt-44 sm:pb-28 lg:pt-52 lg:pb-36 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1920&q=80"
          alt="Sentra gudang distribusi barang perikanan FisheryTrade"
          className="w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-aruna-950 via-aruna-950/90 to-aruna-900/60"></div>
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-3xl text-left">
          <div className="inline-flex items-center gap-2 py-1.5 px-3.5 bg-aruna-800/80 border border-aruna-500/40 rounded-full text-xs font-semibold text-aruna-100 mb-5 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-coral-500 animate-pulse"></span>
            <span>Marketplace & Distribusi Barang Perikanan Terpadu</span>
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-5 text-white">
            Mengenal Lebih Dekat <span className="text-aruna-300">FisheryTrade</span>
          </h1>
          <p className="max-w-2xl text-base sm:text-lg text-slate-200 leading-relaxed font-normal">
            Menghubungkan kelompok nelayan dan pembudidaya pesisir nusantara dengan industri kuliner dan grosir domestik melalui marketplace barang perikanan terpadu dan jaminan mutu bersertifikat resmi.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutHeroSection;
