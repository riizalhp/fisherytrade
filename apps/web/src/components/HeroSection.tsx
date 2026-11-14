import React from 'react';

const HeroSection: React.FC = () => {
  return (
    <section className="relative flex flex-col justify-center items-center text-white pt-40 pb-24 lg:pt-52 lg:pb-36 px-4 sm:px-6 lg:px-8 min-h-[85vh] lg:min-h-screen overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/videos/hero-poster.jpg"
          className="w-full h-full object-cover object-center"
        >
          <source src="/videos/hero-video.webm" type="video/webm" />
          <source src="/videos/Perahu_bergoyang_di_air_beriak_6537da2a(1).webm" type="video/webm" />
          <img
            src="/videos/hero-poster.jpg"
            alt="Perahu nelayan bergoyang di air beriak"
            className="w-full h-full object-cover object-center"
          />
        </video>
      </div>

      <div className="relative z-10 w-full max-w-7xl">
        <div className="max-w-2xl text-left">
          
          {/* Main H1 Headline - Ukuran lebih proporsional, teks spesifik pasar grosir */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold leading-tight tracking-tight mb-8 drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            Pusat Jual Beli Ikan Laut Beku Skala Grosir
          </h1>

          {/* Single Primary CTA tanpa icon */}
          <div>
            <a
              href="/produk"
              className="inline-flex items-center justify-center bg-coral-600 hover:bg-coral-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all text-center cursor-pointer text-base"
            >
              Katalog
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
