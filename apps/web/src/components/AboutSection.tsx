import React from 'react';

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AboutSection: React.FC = () => {
  return (
    <section className="bg-aruna-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Soft Maritime Accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-aruna-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          
          {/* Visual Showcase with Badge */}
          <div className="lg:w-1/2 w-full">
            <div className="relative aspect-[4/3] sm:aspect-[0.85] rounded-3xl overflow-hidden shadow-2xl border border-aruna-700/60">
              <img
                src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1000&q=80"
                alt="Sentra Gudang Distribusi Barang Perikanan FisheryTrade"
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 bg-white/95 backdrop-blur-sm p-4 sm:p-5 rounded-2xl text-aruna-900 shadow-xl border border-slate-100 max-w-xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span className="text-[11px] font-mono font-bold text-aruna-600 uppercase">Standar Mutu Nasional</span>
                </div>
                <h4 className="font-extrabold text-sm sm:text-base leading-snug">
                  Standar Mutu Terjamin dari Sumber ke Dapur Anda
                </h4>
              </div>
            </div>
          </div>

          {/* Text Content */}
          <div className="lg:w-1/2 w-full">
            <span className="inline-block py-1.5 px-3.5 bg-aruna-800 text-aruna-200 border border-aruna-700 rounded-full text-xs font-bold tracking-wide uppercase mb-4">
              Tentang FisheryTrade
            </span>
            
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold mb-6 tracking-tight leading-tight">
              Marketplace Barang Perikanan Berkualitas Standar Industri
            </h2>
            
            <p className="text-slate-200 text-sm sm:text-base mb-8 leading-relaxed">
              Kami percaya kelezatan dan efisiensi bisnis kuliner dimulai dari keandalan pasokan barang perikanan. FisheryTrade bekerja sama langsung dengan sentra nelayan dan pembudidaya pesisir Indonesia untuk menghadirkan komoditas barang perikanan higienis dan terstandar bagi pelaku usaha kuliner dan grosir lokal.
            </p>

            <div className="space-y-5 mb-8">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-aruna-600 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md">
                  <CheckIcon />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Sertifikasi Mutu & Kelayakan Resmi</h4>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    Seluruh produk diproses di Unit Pengolahan Ikan berstandar HACCP dan SKP Kementerian Kelautan dan Perikanan (KKP).
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-aruna-600 rounded-xl flex-shrink-0 flex items-center justify-center shadow-md">
                  <CheckIcon />
                </div>
                <div>
                  <h4 className="text-base font-bold text-white">Jaminan Bobot Bersih Tanpa Glazing Tipuan</h4>
                  <p className="text-slate-300 text-xs sm:text-sm mt-1">
                    Kadar es pelindung (glazing) terkontrol proporsional 10% terverifikasi timbangan presisi, menjaga food cost dapur Anda tetap efisien.
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="/tentang-kami"
                className="bg-aruna-600 hover:bg-aruna-500 text-white font-bold py-3.5 px-6 rounded-xl transition-colors cursor-pointer inline-flex items-center justify-center gap-2 text-xs sm:text-sm shadow-md"
              >
                <span>Profil Fasilitas & Standar Mutu</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutSection;
