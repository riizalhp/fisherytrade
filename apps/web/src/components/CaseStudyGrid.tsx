import React from 'react';
import { CASE_STUDIES } from '../constants.tsx';
import { CaseStudy } from '../types.ts';

const ArrowRightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
)

const CaseStudyCard: React.FC<{ caseStudy: CaseStudy }> = ({ caseStudy }) => {
    return (
        <div className="block group flex flex-col bg-white border border-gray-200/50 rounded-2xl overflow-hidden transition-shadow hover:shadow-lg">
            <a href={`/studi-kasus/${caseStudy.id}`} className="relative w-full h-64 overflow-hidden cursor-pointer">
                <img src={caseStudy.imageUrl} alt={caseStudy.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
            </a>
            <div className="p-6 flex flex-col flex-grow">
                <span className="inline-block py-1 px-3 bg-[#1f6306]/10 text-[#1f6306] rounded-full text-xs font-semibold mb-3 self-start">{caseStudy.category}</span>
                <a href={`/studi-kasus/${caseStudy.id}`} className="text-xl font-bold text-[#0E2207] mb-3 cursor-pointer hover:text-[#1f6306] transition-colors block">
                    {caseStudy.title}
                </a>
                <p className="text-gray-600 mb-6 flex-grow">{caseStudy.problem.substring(0, 120)}...</p>
                <a
                    href={`/studi-kasus/${caseStudy.id}`}
                    className="mt-auto self-start text-[#1f6306] font-bold flex items-center cursor-pointer"
                >
                    Baca Selengkapnya
                    <ArrowRightIcon />
                </a>
            </div>
        </div>
    );
};

const CaseStudyGrid: React.FC = () => {
    return (
        <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {CASE_STUDIES.map((cs) => (
                        <CaseStudyCard key={cs.id} caseStudy={cs} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CaseStudyGrid;