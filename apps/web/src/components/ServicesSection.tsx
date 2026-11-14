import React from 'react';
import { SERVICES } from '../constants.tsx';
import { Service } from '../types.ts';

const ServiceCard: React.FC<{ service: Service }> = ({ service }) => (
  <a
    href={service.href}
    className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-md hover:border-aruna-300 transition-all flex flex-col w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.25rem)] flex-shrink-0"
  >
    <div className="relative w-full h-52 bg-slate-100 overflow-hidden">
      <img
        src={service.imageUrl}
        alt={service.title}
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute top-3 left-3">
        <span className="inline-block py-1 px-3 bg-aruna-600 text-white rounded-lg text-xs font-semibold shadow-xs">
          {service.category}
        </span>
      </div>
    </div>
    
    <div className="p-6 flex-1 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-aruna-900 group-hover:text-aruna-600 transition-colors mb-2.5">
          {service.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-aruna-600 group-hover:text-aruna-700">
        <span>Pelajari Standar Mutu</span>
        <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
    </div>
  </a>
);

const ServicesSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="inline-block py-1.5 px-3.5 bg-aruna-100 text-aruna-800 rounded-full text-xs font-bold tracking-wide uppercase mb-3">
            Pilar Rantai Dingin
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-aruna-900 tracking-tight mb-4">
            Solusi Pasokan Hasil Laut Terintegrasi
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Menghubungkan hasil tangkapan nelayan pesisir nusantara dengan kebutuhan dapur komersial melalui sistem rantai dingin terstandarisasi.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {SERVICES.map((service, index) => (
            <ServiceCard key={index} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
