import React from 'react';

const VisionMissionSection: React.FC = () => {
  return (
    <section className="bg-aruna-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden border-b border-aruna-800">
      {/* Background Soft Glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-aruna-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block py-1.5 px-3.5 bg-aruna-800 text-aruna-200 border border-aruna-700 rounded-full text-xs font-bold tracking-wide uppercase mb-3">
            Arah & Prinsip Perusahaan
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Visi, Misi & Komitmen Mutu
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 mb-12">
          {/* Vision */}
          <div className="bg-aruna-950/70 p-8 sm:p-10 rounded-3xl border border-aruna-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-aruna-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-aruna-300 uppercase tracking-wider block">Pandangan Masa Depan</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Visi Kami</h3>
                </div>
              </div>
              <p className="text-base sm:text-lg leading-relaxed text-slate-200 font-normal">
                &ldquo;Menjadi platform terdepan dalam ekosistem marketplace barang dan komoditas perikanan terpadu yang memberdayakan nelayan pesisir serta menjamin kepastian pasokan bermutu tinggi bagi industri kuliner dan grosir nusantara.&rdquo;
              </p>
            </div>
            <div className="mt-8 pt-6 border-t border-aruna-800/80 flex items-center gap-3 text-xs font-semibold text-aruna-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span>Mendukung Ketahanan Pangan Laut Berkelanjutan</span>
            </div>
          </div>

          {/* Mission */}
          <div className="bg-aruna-950/70 p-8 sm:p-10 rounded-3xl border border-aruna-800 shadow-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 rounded-2xl bg-aruna-600 flex items-center justify-center text-white shadow-md flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <span className="text-xs font-mono font-bold text-aruna-300 uppercase tracking-wider block">Langkah Strategis</span>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Misi Kami</h3>
                </div>
              </div>
              <ul className="space-y-4">
                <li className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-lg bg-aruna-700 text-white flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5">1</span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    Membangun jaringan marketplace dan gudang distribusi perikanan modern yang terintegrasi dari sentra pendaratan hingga ke tangan pelanggan.
                  </p>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-lg bg-aruna-700 text-white flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5">2</span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    Menjaga transparansi spesifikasi produk, bobot bersih riil, dan stabilitas harga pasokan bagi pelaku usaha kuliner dan pedagang besar.
                  </p>
                </li>
                <li className="flex items-start gap-3.5">
                  <span className="w-6 h-6 rounded-lg bg-aruna-700 text-white flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5">3</span>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    Memberikan kepastian pasar dan harga adil bagi kelompok nelayan dan petambak lokal guna mendukung kelestarian sumber daya bahari.
                  </p>
                </li>
              </ul>
            </div>
            <div className="mt-8 pt-6 border-t border-aruna-800/80 flex items-center gap-3 text-xs font-semibold text-aruna-300">
              <span className="w-2 h-2 rounded-full bg-coral-500"></span>
              <span>Kepatuhan Standar HACCP & SKP KKP</span>
            </div>
          </div>
        </div>

        {/* 3 Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-aruna-800/40 border border-aruna-700/60 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-aruna-700 flex items-center justify-center text-aruna-200 mb-4 font-mono font-bold text-sm">
              01
            </div>
            <h4 className="text-base font-bold text-white mb-2">Integritas Mutu & Pasokan</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Standar pengolahan higienis terakreditasi dan pengawasan mutu ketat di setiap sentra gudang distribusi.
            </p>
          </div>

          <div className="bg-aruna-800/40 border border-aruna-700/60 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-aruna-700 flex items-center justify-center text-aruna-200 mb-4 font-mono font-bold text-sm">
              02
            </div>
            <h4 className="text-base font-bold text-white mb-2">Transparansi Timbangan & Grade</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Jaminan bobot bersih riil dengan standarisasi grade mutu teruji untuk efisiensi kalkulasi food cost usaha Anda.
            </p>
          </div>

          <div className="bg-aruna-800/40 border border-aruna-700/60 p-6 rounded-2xl">
            <div className="w-10 h-10 rounded-xl bg-aruna-700 flex items-center justify-center text-aruna-200 mb-4 font-mono font-bold text-sm">
              03
            </div>
            <h4 className="text-base font-bold text-white mb-2">Kemitraan Pesisir Berkelanjutan</h4>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Mengutamakan tangkapan ramah lingkungan serta budidaya bersertifikat demi kelestarian ekosistem laut.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default VisionMissionSection;
