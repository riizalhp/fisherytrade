import React from 'react';

const VisionMissionSection: React.FC = () => {
  return (
    <section className="bg-aruna-900 text-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-aruna-800">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          
          {/* Vision */}
          <div className="bg-aruna-950/60 p-8 rounded-3xl border border-aruna-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-aruna-600 flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Visi Kami</h2>
            </div>
            <p className="text-base sm:text-lg leading-relaxed text-slate-200">
              "Menjadi platform terdepan dalam ekosistem perdagangan dan rantai dingin komoditas perikanan yang memberdayakan nelayan pesisir serta menjamin pasokan hasil laut berkualitas bagi industri kuliner Indonesia."
            </p>
          </div>

          {/* Mission */}
          <div className="bg-aruna-950/60 p-8 rounded-3xl border border-aruna-800">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-aruna-600 flex items-center justify-center text-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">Misi Kami</h2>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-aruna-700 text-white flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5">1</span>
                <p className="text-sm sm:text-base text-slate-200">Membangun jaringan cold storage terpadu dari titik pendaratan hingga ke dapur pelanggan dengan suhu terkunci -25°C.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-aruna-700 text-white flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5">2</span>
                <p className="text-sm sm:text-base text-slate-200">Menjaga transparansi mutu, bobot bersih tanpa penipuan kadar es, dan stabilitas harga bahan baku olahan laut bagi pelaku usaha lokal.</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-lg bg-aruna-700 text-white flex items-center justify-center text-xs font-bold font-mono flex-shrink-0 mt-0.5">3</span>
                <p className="text-sm sm:text-base text-slate-200">Mendukung keberlanjutan sumber daya laut dan kesejahteraan ekonomi komunitas nelayan nusantara.</p>
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
