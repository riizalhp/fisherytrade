import React from 'react';

const DiscoverSection: React.FC = () => {
  return (
    <section className="relative py-24 sm:py-36 px-4 sm:px-6 lg:px-8 overflow-hidden bg-aruna-950">
      {/* Background Image with Deep Maritime Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80"
          alt="Integritas Pasokan Hasil Laut FisheryTrade"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-aruna-950 via-aruna-950/85 to-aruna-900/60"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-center lg:items-end justify-center min-h-[380px]">
        <div className="bg-white/95 backdrop-blur-md p-8 sm:p-10 rounded-3xl text-aruna-950 shadow-2xl border border-slate-100 w-full max-w-xl">
          <span className="inline-block px-3 py-1 bg-aruna-50 border border-aruna-200 rounded-full text-xs font-bold text-aruna-700 uppercase tracking-wide mb-4">
            Kemitraan Pasokan Rantai Dingin
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-aruna-950 leading-tight mb-4">
            Siap Mengamankan Pasokan Hasil Laut Terstandar untuk Bisnis Anda?
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-8">
            Konsultasikan kebutuhan tonase, spesifikasi potongan fillet/loin/utuh, atau jadwalkan uji dapur (kitchen trial) langsung bersama tim kami.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <a
              href="https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20tertarik%20untuk%20konsultasi%20pasokan%20ikan%20beku%20B2B."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-coral-600 hover:bg-coral-500 text-white font-bold py-3.5 px-6 rounded-xl shadow-md transition-colors inline-flex items-center justify-center gap-2 text-sm"
            >
              <span>Konsultasi via WhatsApp</span>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z" />
              </svg>
            </a>
            <a
              href="/produk"
              className="bg-aruna-50 hover:bg-aruna-100 text-aruna-900 border border-aruna-200 font-bold py-3.5 px-6 rounded-xl transition-colors inline-flex items-center justify-center gap-2 text-sm"
            >
              <span>Lihat Katalog Produk</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;
