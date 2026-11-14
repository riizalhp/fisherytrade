import React from 'react';
import { BLOG_POSTS } from '../constants.tsx';

const Footer: React.FC = () => {
  const blogHref = BLOG_POSTS[0] ? `/blog/${BLOG_POSTS[0].href}` : '/blog';

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Terima kasih! Rangkuman stok ikan harian akan dikirimkan ke email Anda.");
  };

  return (
    <footer className="bg-aruna-950 text-white pt-16 sm:pt-20 px-4 sm:px-6 lg:px-8 border-t border-aruna-900">
      <div className="max-w-7xl mx-auto">
        <div className="pb-12 border-b border-aruna-800/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            
            {/* Brand Column */}
            <div className="lg:col-span-5">
              <a href="/" className="flex items-center gap-3 mb-4 group">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center p-1 shadow-md border border-slate-100 group-hover:border-aruna-300 transition-all">
                  <img src="/logo.png" alt="FisheryTrade" className="w-full h-full object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-extrabold tracking-tight text-white">
                    FISHERY<span className="text-aruna-400">TRADE</span>
                  </span>
                  <span className="text-[10px] font-mono tracking-wider uppercase text-aruna-300">
                    B2B Seafood & Multi-Cold Storage Platform
                  </span>
                </div>
              </a>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-6 max-w-md">
                Menyediakan pasokan ikan dan hasil laut beku terstandar industri (IQF -25°C & Air Blast) untuk hotel, restoran, supermarket, dan distributor daerah di seluruh Indonesia.
              </p>

              {/* Muara Baru Map Embed */}
              <div className="mb-4 max-w-md">
                <div className="rounded-xl overflow-hidden border border-aruna-800 shadow-md mb-2">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3967.1187498709426!2d106.80164847475147!3d-6.114704393871961!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e6a1df83c9c6145%3A0xe5567b4b3b3a6e9a!2sPelabuhan%20Perikanan%20Samudera%20Nizam%20Zachman!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                    width="100%"
                    height="140"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    title="Peta Cold Storage Muara Baru FisheryTrade"
                  ></iframe>
                </div>
                <span className="text-xs text-slate-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                  <span>Fasilitas Pusat: Pelabuhan Perikanan Nizam Zachman, Muara Baru, Jakarta Utara</span>
                </span>
              </div>
            </div>

            {/* Navigation Columns */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-8">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-aruna-200 mb-4 font-mono">
                  Info Platform
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <li><a href="/produk" className="hover:text-aruna-400 transition-colors">Katalog Ikan Beku</a></li>
                  <li><a href="#cold-storage" className="hover:text-aruna-400 transition-colors">Titik Cold Storage</a></li>
                  <li><a href="/studi-kasus" className="hover:text-aruna-400 transition-colors">Studi Kasus Resto</a></li>
                  <li><a href="/faq" className="hover:text-aruna-400 transition-colors">FAQ & Minimum Order</a></li>
                  <li><a href={blogHref} className="hover:text-aruna-400 transition-colors">Edukasi Rantai Dingin</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-aruna-200 mb-4 font-mono">
                  Komoditas Utama
                </h4>
                <ul className="space-y-2.5 text-xs sm:text-sm text-slate-300">
                  <li><a href="/produk/yellowfin-tuna-loin-beku" className="hover:text-aruna-400 transition-colors">Yellowfin Tuna Loin</a></li>
                  <li><a href="/produk/kakap-merah-utuh-beku" className="hover:text-aruna-400 transition-colors">Kakap Merah Utuh</a></li>
                  <li><a href="/produk/cumi-tube-kupas-bersih" className="hover:text-aruna-400 transition-colors">Cumi Tube IQF</a></li>
                  <li><a href="/produk/udang-vaname-beku-hoso" className="hover:text-aruna-400 transition-colors">Udang Vaname Tambak</a></li>
                </ul>
              </div>

              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-aruna-200 mb-4 font-mono">
                  Update Stok Harian
                </h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-3">
                  Dapatkan lembar rekapitulasi tonase ready stock lintas gudang langsung ke email Anda.
                </p>
                <form onSubmit={handleSubscribe} className="space-y-2">
                  <input
                    type="email"
                    placeholder="nama@restoran.com"
                    required
                    className="w-full bg-aruna-900 border border-aruna-800 rounded-xl py-2.5 px-3.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-aruna-400"
                  />
                  <button
                    type="submit"
                    className="w-full bg-coral-600 hover:bg-coral-700 text-white font-bold py-2.5 px-3.5 rounded-xl text-xs transition-colors shadow-sm cursor-pointer"
                  >
                    Daftar Rekap Stok
                  </button>
                </form>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="py-6 flex flex-col sm:flex-row justify-between items-center text-center sm:text-left text-xs text-slate-400 gap-3">
          <p>© 2026 FisheryTrade Indonesia. Seluruh hak cipta dilindungi undang-undang.</p>
          <div className="flex gap-4">
            <span className="text-aruna-400 font-mono">Standar: HACCP • SKP KKP • Halal</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
