import React from 'react';
import { TEAM_MEMBERS } from '../constants.tsx';
import type { TeamMember } from '../types.ts';

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <div className="group bg-slate-50 border border-slate-200/90 rounded-2xl overflow-hidden hover:border-aruna-300 hover:shadow-xl transition-all duration-300 flex flex-col h-full">
    <div className="relative aspect-square overflow-hidden bg-aruna-100">
      <img
        src={member.imageUrl}
        alt={member.name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-aruna-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-5 text-center flex-grow flex flex-col justify-center">
      <h3 className="text-base sm:text-lg font-extrabold text-aruna-950 group-hover:text-aruna-600 transition-colors mb-1">
        {member.name}
      </h3>
      <p className="text-xs font-bold text-aruna-600 uppercase tracking-wider font-mono">
        {member.role}
      </p>
    </div>
  </div>
);

const TeamSection: React.FC = () => {
  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block py-1.5 px-3.5 border border-aruna-200 bg-aruna-50 rounded-full text-xs font-bold text-aruna-700 uppercase tracking-wide mb-3">
            Tim Ahli & Spesialis
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-aruna-950 tracking-tight leading-tight">
            Didukung Praktisi Berpengalaman
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Tenaga ahli berdedikasi tinggi di bidang rantai dingin, inspeksi mutu keamanan pangan laut, dan manajemen logistik reefer terpercaya.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
