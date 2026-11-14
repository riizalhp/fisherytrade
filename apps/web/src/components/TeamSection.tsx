import React from 'react';
import { TEAM_MEMBERS } from '../constants.tsx';
import { TeamMember } from '../types.ts';

const TeamMemberCard: React.FC<{ member: TeamMember }> = ({ member }) => (
  <a href={member.href} className="block group bg-[#1f6306] rounded-lg p-2.5 transition-shadow hover:shadow-xl">
    <div className="relative aspect-[1.1] rounded-lg overflow-hidden mb-4">
      <img src={member.imageUrl} alt={member.name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
    </div>
    <div className="p-2 text-center">
      <h3 className="text-xl font-bold text-white">{member.name}</h3>
      <p className="text-white/80">{member.role}</p>
    </div>
  </a>
);

const TeamSection: React.FC = () => {
  return (
    <section className="bg-[#0e2207] py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block py-2 px-4 border border-[#fbc91a] rounded-full text-sm font-semibold text-[#fbc91a] mb-4">
            Tim Ahli Kami
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tighter">
            Tim Profesional Berpengalaman
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {TEAM_MEMBERS.map((member, index) => (
            <TeamMemberCard key={index} member={member} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;