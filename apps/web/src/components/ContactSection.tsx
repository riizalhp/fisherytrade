import React from 'react';

const ContactSection: React.FC = () => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Terima kasih! Pesan Anda telah terkirim. Tim kami akan segera menghubungi Anda.");
  };

  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          <div className="lg:w-1/2 w-full">
            <div className="mb-10">
              <span className="inline-block py-2 px-4 border border-[#1f6306] rounded-full text-sm font-semibold text-[#1f6306] mb-4">
                Kontak Kami
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2207] tracking-tighter">
                Siap Bekerja Sama
              </h2>
            </div>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="sr-only">Nama Anda</label>
                  <input type="text" id="name" placeholder="Nama Anda" required className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f6306] focus:border-transparent transition" />
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
                  <label htmlFor="service" className="sr-only">Layanan</label>
                  <input type="text" id="service" placeholder="Layanan" required className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f6306] focus:border-transparent transition" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Tulis Pesan</label>
                <textarea id="message" placeholder="Tulis Pesan" rows={5} required className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1f6306] focus:border-transparent transition resize-none"></textarea>
              </div>
              <div className="flex items-center">
                <input id="save-info" type="checkbox" className="h-5 w-5 rounded border-gray-300 text-[#1f6306] focus:ring-[#1f6306]/50" />
                <label htmlFor="save-info" className="ml-3 block text-base text-gray-700">Simpan info saya untuk nanti</label>
              </div>
              <div>
                <button type="submit" className="bg-[#1f6306] text-white font-bold py-4 px-8 rounded-full hover:bg-[#0e2207] transition-colors">
                  Kirim Pesan
                </button>
              </div>
            </form>
          </div>
          <div className="lg:w-1/2 w-full flex items-center justify-center">
            <div className="aspect-[0.9] w-full max-w-lg">
                <img src="https://framerusercontent.com/images/jaHF2tVYr7Dms1MfEAs72vunpU.png" alt="Ilustrasi Kontak" className="w-full h-full object-fill rounded-2xl" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;