
import React from 'react';

const CounterCard: React.FC<{ value: string; title: string; description: string }> = ({ value, title, description }) => (
    <div className="bg-green-50/50 p-6 rounded-2xl">
        <div className="text-6xl font-bold text-[#1f6306] mb-2">{value}<span className="text-[#fbc91a]">+</span></div>
        <h4 className="text-xl font-bold text-[#0e2207] mb-2">{title}</h4>
        <p className="text-gray-600">{description}</p>
    </div>
);


const HistorySection: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <div className="lg:w-1/2">
            <span className="inline-block py-2 px-4 border border-[#1f6306] rounded-full text-sm font-semibold text-[#1f6306] mb-4">
              Tentang Triagro
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2207] tracking-tighter mb-6">
              Mengenal Sejarah Kami
            </h2>
            <div className="space-y-4 text-lg text-[#757873]">
                <p>
                    PT. Triagro Hijrah Jaya resmi berdiri pada tahun 2022. Kami adalah perusahaan yang legal dan terdaftar resmi dengan Nomor AHU-0013238.AH.01.11 tahun 2022 serta memiliki Nomor Induk Berusaha (NIB) 2501220058744.
                </p>
                <p>
                    Kisah kami lahir dari dedikasi dan hasrat mendalam untuk pertanian berkelanjutan di Indonesia. Meskipun tergolong baru, kami berkomitmen penuh untuk menjadi mitra terpercaya bagi para pelaku usaha tani.
                </p>
                <p>
                    Bergabunglah bersama kami dalam merayakan pertumbuhan, inovasi, dan keberlanjutan untuk masa depan pertanian Indonesia yang lebih baik.
                </p>
            </div>
          </div>
          <div className="lg:w-1/2 grid sm:grid-cols-2 gap-6">
            <div className="sm:col-span-2">
                <CounterCard 
                    value="2022" 
                    title="Tahun Berdiri" 
                    description="Resmi didirikan dan beroperasi secara legal untuk melayani kebutuhan pertanian nasional." 
                />
            </div>
             <CounterCard 
                value="Legal" 
                title="Terdaftar Resmi" 
                description="AHU-0013238.AH.01.11 (2022) & NIB 2501220058744." 
            />
             <CounterCard 
                value="100" 
                title="Klien Bahagia" 
                description="Dipercaya oleh ratusan petani dan mitra distributor yang puas." 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
