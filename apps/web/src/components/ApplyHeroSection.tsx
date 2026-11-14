import React from 'react';
import { JobOpening } from '../types.ts';

interface ApplyHeroSectionProps {
  job: JobOpening;
}

const ApplyHeroSection: React.FC<ApplyHeroSectionProps> = ({ job }) => {
  return (
    <section className="relative flex items-center bg-[#0E2207] text-white pt-32 pb-16 sm:pt-36 sm:pb-20 lg:pt-48 lg:pb-32 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0">
        <img
          src="https://framerusercontent.com/images/qQ7rFB5eVVBjturZ7t2PLrcFLI.jpg"
          alt="Latar Belakang Karir"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0e2207] to-transparent opacity-90"></div>
      </div>
      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="max-w-4xl text-left">
          <h1 className="text-5xl sm:text-7xl lg:text-[80px] font-semibold leading-tight tracking-tighter mb-6">
            Lamar untuk {job.title}
          </h1>
          <p className="max-w-lg text-lg text-gray-200">
            Lengkapi formulir di bawah untuk mengirimkan lamaran Anda. Kami senang mendengar dari Anda!
          </p>
        </div>
      </div>
    </section>
  );
};

export default ApplyHeroSection;