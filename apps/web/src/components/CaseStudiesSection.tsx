import React from 'react';
import { CASE_STUDIES } from '../constants.tsx';
import { CaseStudy } from '../types.ts';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
}

const CaseStudyCard: React.FC<CaseStudyCardProps> = ({ caseStudy }) => (
  <a
    href={`/studi-kasus/${caseStudy.id}`}
    className="relative block h-72 sm:h-80 lg:h-96 w-full group overflow-hidden rounded-2xl cursor-pointer shadow-sm hover:shadow-xl transition-all border border-slate-200"
  >
    <img
      src={caseStudy.imageUrl}
      alt={caseStudy.title}
      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-aruna-950/90 via-aruna-950/40 to-transparent"></div>
    <div className="absolute top-4 left-4">
      <span className="inline-block py-1 px-2.5 bg-white/90 text-aruna-800 backdrop-blur-xs rounded-md text-[11px] font-bold">
        {caseStudy.category}
      </span>
    </div>
    <div className="absolute bottom-0 left-0 p-5 sm:p-6">
      <h3 className="text-white text-base sm:text-lg font-bold leading-snug group-hover:text-aruna-200 transition-colors">
        {caseStudy.title}
      </h3>
      <span className="inline-flex items-center gap-1.5 text-xs text-aruna-200 mt-2 font-medium">
        <span>Baca Hasil Efisiensi</span>
        <svg className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </span>
    </div>
  </a>
);

const CaseStudiesSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-6">
          <div>
            <span className="inline-block py-1.5 px-3.5 bg-aruna-100 text-aruna-800 rounded-full text-xs font-bold tracking-wide uppercase mb-3">
              Kemitraan Nyata
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-aruna-900 tracking-tight">
              Studi Kasus Efisiensi Pasokan Dapur
            </h2>
          </div>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg leading-relaxed">
            Membantu pengelola hotel, restoran, dan distributor memangkas kerugian susut bobot pencairan es serta menjamin ketersediaan stok mingguan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {CASE_STUDIES.map((cs) => (
            <CaseStudyCard key={cs.id} caseStudy={cs} />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="/studi-kasus"
            className="bg-aruna-600 hover:bg-aruna-700 text-white font-bold py-3.5 px-7 rounded-xl transition-colors inline-flex items-center gap-2 text-xs sm:text-sm shadow-sm"
          >
            <span>Lihat Semua Studi Kasus Pasokan</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
