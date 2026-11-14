
import React from 'react';

const ContactHeroSection: React.FC = () => {
  return (
    <section className="relative flex items-center bg-[#0E2207] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <img
          src="https://framerusercontent.com/images/qQ7rFB5eVVBjturZ7t2PLrcFLI.jpg"
          alt="Latar Belakang Kontak Kami"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e2207] to-transparent opacity-90"></div>
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-2xl text-left">
          <h1 className="text-5xl sm:text-7xl lg:text-[80px] font-semibold leading-tight tracking-tighter mb-6">
            Hubungi Kami
          </h1>
          <p className="max-w-lg text-lg text-gray-200">
            Mari Bicara! Kami Siap Menjawab Semua Pertanyaan Anda
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactHeroSection;