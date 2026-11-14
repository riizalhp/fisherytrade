import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex flex-col justify-center items-center text-white pt-40 pb-24 lg:pt-52 lg:pb-36 px-4 sm:px-6 lg:px-8 min-h-[85vh] lg:min-h-screen overflow-hidden">
      {/* Background Image & Marine Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=1920&q=80"
          alt="Hasil laut segar dan industri cold chain FisheryTrade"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-aruna-950/95 via-aruna-900/85 to-aruna-900/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        <div className="max-w-3xl text-left">
          
          {/* Badge Cold Chain & Location Indicator */}
          <div className="inline-flex items-center gap-2 py-1.5 px-3.5 bg-aruna-800/80 border border-aruna-400/40 rounded-full text-xs font-semibold text-aruna-100 mb-6 backdrop-blur-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Jaringan Cold Storage: Jakarta • Lamongan • Bali</span>
          </div>

          {/* Main H1 Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-6">
            Pasokan Ikan & Hasil Laut Beku Berkualitas untuk Pasar Lokal
          </h1>

          {/* Sub-headline */}
          <p className="max-w-2xl text-base sm:text-lg text-slate-200 mb-8 leading-relaxed">
            Menyuplai kebutuhan hotel, restoran, supermarket, catering, dan distributor daerah langsung dari fasilitas cold storage terdekat dengan jaminan rantai dingin -25°C.
          </p>

          {/* CTA Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-10">
            <a
              href="/produk"
              className="bg-coral-600 hover:bg-coral-700 text-white font-bold py-3.5 px-7 rounded-xl shadow-md transition-all text-center cursor-pointer text-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <span>Lihat Katalog & Stok Ikan</span>
            </a>
            
            <a
              href="https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20konsultasi%20pasokan%20ikan%20beku%20rutin%20untuk%20usaha%20saya."
              target="_blank"
              rel="noopener noreferrer"
              className="border border-aruna-300/60 bg-aruna-900/60 hover:bg-white hover:text-aruna-900 text-aruna-100 font-bold py-3.5 px-7 rounded-xl transition-all text-center cursor-pointer text-sm flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4 text-emerald-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
              <span>Konsultasi Pasokan Rutin</span>
            </a>
          </div>

          {/* Trust & Cold Chain Proof Grid */}
          <div className="pt-6 border-t border-aruna-700/60 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-medium">
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-aruna-800 flex items-center justify-center text-aruna-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </span>
              <div>
                <div className="text-white font-bold font-mono">IQF -25°C</div>
                <div className="text-slate-300 text-[11px]">Tekstur & Nutrisi Utuh</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-aruna-800 flex items-center justify-center text-aruna-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
              </span>
              <div>
                <div className="text-white font-bold">3 Cold Storage</div>
                <div className="text-slate-300 text-[11px]">Jakarta, Jatim, Bali</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-aruna-800 flex items-center justify-center text-aruna-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
              </span>
              <div>
                <div className="text-white font-bold">HACCP & KKP</div>
                <div className="text-slate-300 text-[11px]">Sertifikasi Mutu Resmi</div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="w-7 h-7 rounded-lg bg-aruna-800 flex items-center justify-center text-aruna-300">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </span>
              <div>
                <div className="text-white font-bold">Jadwal Rutin</div>
                <div className="text-slate-300 text-[11px]">Armada Truk Thermo</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
