import React from 'react';
import { TESTIMONIALS } from '../constants.tsx';
import { Testimonial } from '../types.ts';

const QuotationMarkIcon = () => (
  <svg width="16" height="16" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3.75 14.25H0.75V8.25C0.75 5.0625 3.3125 2.5 6.5 2.5V5C4.84375 5 3.75 6.09375 3.75 7.75V14.25ZM14.25 14.25H11.25V8.25C11.25 5.0625 13.8125 2.5 17 2.5V5C15.3437 5 14.25 6.09375 14.25 7.75V14.25Z" fill="white"/>
  </svg>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
  <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-xs hover:shadow-md transition-shadow">
    <p className="text-slate-700 text-sm sm:text-base leading-relaxed mb-6 italic">
      "{testimonial.quote}"
    </p>
    <div className="flex items-center gap-4 pt-4 border-t border-slate-100">
      <div className="relative flex-shrink-0">
        <div className="w-13 h-13 rounded-full overflow-hidden bg-slate-100 border border-aruna-300">
          <img src={testimonial.imageUrl} alt={testimonial.name} className="w-full h-full object-cover" />
        </div>
        <div className="absolute -top-1 -right-1 w-5 h-5 bg-aruna-600 rounded-full flex items-center justify-center shadow-xs">
          <QuotationMarkIcon />
        </div>
      </div>
      <div>
        <h4 className="font-bold text-sm sm:text-base text-aruna-900">{testimonial.name}</h4>
        <p className="text-xs text-slate-500 font-medium">{testimonial.role}</p>
      </div>
    </div>
  </div>
);

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const displayTestimonials = testimonials || TESTIMONIALS;
  
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12">
          <div>
            <span className="inline-block py-1.5 px-3.5 bg-aruna-100 text-aruna-800 rounded-full text-xs font-bold tracking-wide uppercase mb-3">
              Suara Mitra Pelanggan
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-aruna-900 tracking-tight">
              Dipercaya oleh Pengelola Restoran & Pelaku Usaha Horeka
            </h2>
          </div>
          <div className="bg-aruna-50 border border-aruna-200 rounded-xl px-4 py-2.5 text-xs text-aruna-800 font-medium">
            <span className="font-bold">Standar Kepuasan:</span> Konsistensi Mutu Daging & Akurasi Suhu Tiba
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayTestimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
