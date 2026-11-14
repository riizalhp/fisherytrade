import React, { useState } from 'react';
import { FAQS } from '../constants.tsx';
import { FaqItem } from '../types.ts';

const PlusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 4V16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const MinusIcon = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 10H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const AccordionItem: React.FC<{ item: FaqItem; isOpen: boolean; onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className={`border rounded-xl transition-all ${isOpen ? 'border-aruna-400 bg-aruna-50/30 shadow-xs' : 'border-slate-200 bg-white hover:border-slate-300'}`}>
      <button
        onClick={onClick}
        type="button"
        className="w-full p-5 sm:p-6 flex justify-between items-center text-left gap-4"
      >
        <h4 className="text-base sm:text-lg font-bold text-aruna-900 leading-snug">{item.question}</h4>
        <div className={`w-8 h-8 flex-shrink-0 flex items-center justify-center rounded-lg transition-colors ${isOpen ? 'bg-aruna-600 text-white' : 'bg-slate-100 text-slate-700'}`}>
          {isOpen ? <MinusIcon /> : <PlusIcon />}
        </div>
      </button>
      {isOpen && (
        <div className="px-5 sm:px-6 pb-6 pt-1 text-slate-600 text-sm leading-relaxed border-t border-aruna-100">
          <p>{item.answer}</p>
        </div>
      )}
    </div>
  );
};

const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-slate-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        
        {/* Left Visual Callout Box */}
        <div className="lg:w-2/5 w-full">
          <div className="relative aspect-[4/3] sm:aspect-[0.95] rounded-3xl overflow-hidden shadow-lg border border-slate-200">
            <img
              src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80"
              alt="Fasilitas cold storage dan tim operasional FisheryTrade"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-aruna-950/80 via-transparent to-transparent"></div>
            
            {/* WhatsApp Direct Action Floating Box */}
            <div className="absolute bottom-4 left-4 right-4 sm:bottom-6 sm:left-6 sm:right-6 bg-white/95 backdrop-blur-md p-4 sm:p-5 rounded-2xl text-aruna-900 shadow-xl border border-slate-100">
              <a
                href="https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20konsultasi%20pengadaan%20ikan%20beku%20dan%20meminta%20sampel."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3.5 group"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex-shrink-0 flex items-center justify-center text-white shadow-md group-hover:bg-emerald-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
                  </svg>
                </div>
                <div>
                  <div className="text-[11px] font-mono font-bold text-aruna-600 uppercase">Layanan Pelanggan Cepat</div>
                  <h4 className="font-extrabold text-base text-slate-900 leading-tight">0822-4111-4959</h4>
                  <p className="text-xs text-slate-500 mt-0.5">Konsultasi Pasokan & Cek Sampel Dapur</p>
                </div>
              </a>
            </div>
          </div>
        </div>

        {/* Right Accordion Questions */}
        <div className="lg:w-3/5 w-full">
          <div className="mb-8">
            <span className="inline-block py-1.5 px-3.5 bg-aruna-100 text-aruna-800 rounded-full text-xs font-bold tracking-wide uppercase mb-3">
              Pertanyaan Umum (FAQ)
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-aruna-900 tracking-tight">
              Tanya Jawab Seputar Pengadaan & Pengiriman
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Informasi transparan mengenai kapasitas minimum pemesanan, pemantauan rantai dingin, hingga skema termin pembayaran.
            </p>
          </div>

          <div className="space-y-3.5">
            {FAQS.map((faq, index) => (
              <AccordionItem
                key={index}
                item={faq}
                isOpen={openIndex === index}
                onClick={() => handleToggle(index)}
              />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default FaqSection;
