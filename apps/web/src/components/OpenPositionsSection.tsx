import React from 'react';
import { JOB_OPENINGS } from '../constants.tsx';
import { JobOpening } from '../types.ts';

interface JobCardProps {
  job: JobOpening;
}

const JobCard: React.FC<JobCardProps> = ({ job }) => {
  return (
    <div className="bg-white border border-gray-200/80 rounded-2xl p-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <a
        href={`/karir/${job.id}`}
        className="text-2xl font-bold text-[#0E2207] mb-2 cursor-pointer hover:text-[#1f6306] transition-colors block"
      >
        {job.title}
      </a>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-gray-500 mb-4">
        <span>{job.type}</span>
        <span className="hidden sm:inline">&bull;</span>
        <span>{job.location}</span>
      </div>
      <p className="text-gray-600 mb-6 flex-grow">{job.description.summary}</p>
      <a
        href={`/karir/${job.id}`}
        className="bg-[#1f6306] text-white font-bold py-3 px-6 rounded-full hover:bg-[#0e2207] transition-colors self-start text-center cursor-pointer"
      >
        Lihat Detail & Lamar
      </a>
    </div>
  );
};

interface OpenPositionsSectionProps {
  jobs?: JobOpening[];
}

const OpenPositionsSection: React.FC<OpenPositionsSectionProps> = ({ jobs }) => {
  const displayJobs = jobs || JOB_OPENINGS;

  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block py-2 px-4 border border-[#1f6306] rounded-full text-sm font-semibold text-[#1f6306] mb-4">
            Bergabunglah dengan Tim Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2207] tracking-tighter">
            Lowongan Saat Ini
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {displayJobs.length > 0 ? (
            displayJobs.map((job) => (
              <JobCard key={job.id} job={job} />
            ))
          ) : (
            <p className="md:col-span-2 text-center text-gray-600 text-lg">Saat ini tidak ada lowongan yang tersedia. Silakan periksa kembali nanti.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default OpenPositionsSection;
