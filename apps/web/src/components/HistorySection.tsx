import React from 'react';

const CounterCard: React.FC<{ value: string; suffix?: string; title: string; description: string }> = ({
  value,
  suffix = '+',
  title,
  description,
}) => (
  <div className="bg-aruna-50/60 border border-aruna-100/90 p-6 sm:p-7 rounded-2xl hover:border-aruna-300 transition-all duration-300 shadow-xs">
    <div className="text-4xl sm:text-5xl font-extrabold text-aruna-900 font-mono tracking-tight mb-2">
      {value}
      <span className="text-coral-600 font-sans">{suffix}</span>
    </div>
    <h4 className="text-lg font-bold text-aruna-900 mb-2">{title}</h4>
    <p className="text-slate-600 text-sm leading-relaxed">{description}</p>
  </div>
);

const HistorySection: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
          <div className="lg:w-1/2">
            <span className="inline-block py-1.5 px-3.5 border border-aruna-200 bg-aruna-50 rounded-full text-xs font-bold text-aruna-700 uppercase tracking-wide mb-4">
              Jejak Langkah & Dedikasi
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-aruna-950 tracking-tight leading-tight mb-6">
              Membangun Ekosistem Marketplace Barang Perikanan Indonesia
            </h2>
            <div className="space-y-4 text-sm sm:text-base text-slate-600 leading-relaxed">
              <p>
                FisheryTrade lahir dari pemahaman mendalam atas tantangan yang dihadapi industri kuliner lokal: tingginya tingkat susut bobot, ketiadaan transparansi spesifikasi produk, dan ketidakpastian kontinuitas pasokan saat musim ombak laut.
              </p>
              <p>
                Kami mengambil langkah nyata dengan mengintegrasikan rantai pasok secara langsung dari sentra pendaratan nelayan pesisir dan tambak budidaya terakreditasi menuju sentra gudang distribusi modern dengan standar penanganan mutu profesional.
              </p>
              <p>
                Kini, FisheryTrade mengoperasikan hub strategis di Pelabuhan Muara Baru Jakarta, Pelabuhan Brondong Lamongan, dan Pelabuhan Benoa Bali, didukung armada logistik terpercaya untuk memastikan mutu komoditas perikanan tetap prima sampai di lokasi usaha Anda.
              </p>
            </div>
          </div>

          <div className="lg:w-1/2 grid sm:grid-cols-2 gap-5 w-full">
            <div className="sm:col-span-2">
              <CounterCard
                value="3"
                suffix=" Hub"
                title="Sentra Gudang Distribusi Strategis"
                description="Tersebar di titik pendaratan & distribusi utama: Pelabuhan Muara Baru (Jakarta), Brondong (Lamongan), dan Benoa (Bali)."
              />
            </div>
            <CounterCard
              value="100"
              suffix="%"
              title="Kualitas Mutu Terstandar"
              description="Standar pengolahan higienis terakreditasi guna mengunci keutuhan serat daging dan kesegaran rasa alami."
            />
            <CounterCard
              value="100"
              suffix="+"
              title="Mitra Bisnis Horeka"
              description="Dipercaya oleh jaringan hotel berbintang, restoran seafood terkemuka, supermarket modern, dan distributor daerah."
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
