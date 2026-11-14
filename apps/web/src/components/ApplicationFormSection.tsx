import React from 'react';
import { JOB_OPENINGS } from '../constants.tsx';
import { JobOpening } from '../types.ts';

interface ApplicationFormSectionProps {
  job?: JobOpening;
}

const ApplicationFormSection: React.FC<ApplicationFormSectionProps> = ({ job }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Lamaran Anda telah terkirim! Tim HRD kami akan meninjau berkas Anda dan menghubungi Anda segera.");
  };

  return (
    <section id="application-form" className="bg-[#fef4d1] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/2 w-full">
            <div className="mb-10">
              <span className="inline-block py-2 px-4 border border-[#1f6306] rounded-full text-sm font-semibold text-[#1f6306] mb-4">
                Lamar Sekarang
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2207] tracking-tighter">
                Jadilah Bagian dari Triagro
              </h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="sr-only">Nama Lengkap</label>
                  <input type="text" id="name" placeholder="Nama Lengkap" required className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f6306] focus:border-transparent transition" />
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Alamat Email</label>
                  <input type="email" id="email" placeholder="Alamat Email" required className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f6306] focus:border-transparent transition" />
                </div>
                <div>
                  <label htmlFor="phone" className="sr-only">Nomor Telepon</label>
                  <input type="tel" id="phone" placeholder="Nomor Telepon" required className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f6306] focus:border-transparent transition" />
                </div>
                <div>
                    <label htmlFor="position" className="sr-only">Posisi yang Dilamar</label>
                    <select id="position" required defaultValue={job?.title || ""} className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f6306] focus:border-transparent transition appearance-none bg-white pr-8 bg-no-repeat" style={{backgroundImage: `url('data:image/svg+xml;utf8,<svg fill="black" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l5 5 5-5z"/></svg>')`, backgroundPosition: 'right 1rem center', backgroundSize: '1.5em'}}>
                        <option value="" disabled>Posisi yang Dilamar</option>
                        {JOB_OPENINGS.map(j => <option key={j.title} value={j.title}>{j.title}</option>)}
                    </select>
                </div>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-2">Unggah Resume/CV</label>
                <input type="file" id="resume" required className="w-full p-3 border border-gray-300 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#1f6306]/10 file:text-[#1f6306] hover:file:bg-[#1f6306]/20 focus:outline-none focus:ring-2 focus:ring-[#1f6306] focus:border-transparent transition" accept=".pdf,.doc,.docx" />
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Surat Lamaran</label>
                <textarea id="message" placeholder="Surat Lamaran (Opsional)" rows={5} className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f6306] focus:border-transparent transition resize-none"></textarea>
              </div>
              <div>
                <button type="submit" className="bg-[#1f6306] text-white font-bold py-4 px-8 rounded-full hover:bg-[#0e2207] transition-colors">
                  Kirim Lamaran
                </button>
              </div>
            </form>
          </div>
          <div className="lg:w-1/2 w-full flex items-center justify-center">
             <div className="aspect-[0.9] w-full max-w-lg rounded-2xl overflow-hidden">
                <img src="https://framerusercontent.com/images/JpLyzL3r2QYJzC8jFqgJqJg4E.jpg" alt="Pekerja di perkebunan" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationFormSection;