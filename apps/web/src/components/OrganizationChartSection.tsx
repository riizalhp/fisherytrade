import React from 'react';

interface OrgCardProps {
  dept: string;
  scope: string;
  lead?: string;
  icon?: React.ReactNode;
  badge?: string;
}

const OrgCard: React.FC<OrgCardProps> = ({ dept, scope, lead, badge }) => (
  <div className="bg-white p-5 rounded-2xl border border-slate-200/90 shadow-xs hover:border-aruna-300 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full text-left">
    <div>
      {badge && (
        <span className="inline-block px-2.5 py-0.5 rounded-md bg-aruna-50 border border-aruna-100 text-[11px] font-mono font-bold text-aruna-700 uppercase mb-2.5">
          {badge}
        </span>
      )}
      <h4 className="font-extrabold text-sm sm:text-base text-aruna-900 leading-snug mb-1.5">{dept}</h4>
      <p className="text-xs text-slate-500 leading-relaxed mb-3">{scope}</p>
    </div>
    {lead && (
      <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs">
        <span className="text-slate-400 font-medium">Koordinator:</span>
        <span className="font-bold text-aruna-700">{lead}</span>
      </div>
    )}
  </div>
);

const OrganizationChartSection: React.FC = () => {
  return (
    <section className="bg-slate-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b border-slate-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="inline-block py-1.5 px-3.5 border border-aruna-200 bg-aruna-50 rounded-full text-xs font-bold text-aruna-700 uppercase tracking-wide mb-3">
            Tata Kelola & Struktur Organisasi
          </span>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-aruna-950 tracking-tight leading-tight">
            Struktur Manajemen Operasional
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
            Struktur organisasi terpadu yang memastikan setiap tahapan rantai pasok—dari sentra nelayan, gudang distribusi terstandar, uji mutu resmi, hingga armada pengiriman—berjalan tanpa cela.
          </p>
        </div>

        <div className="flex flex-col items-center max-w-6xl mx-auto">
          {/* Level 1: Leadership */}
          <div className="w-full max-w-md bg-aruna-900 text-white p-6 rounded-2xl border border-aruna-800 shadow-xl text-center relative">
            <span className="inline-block px-3 py-1 bg-aruna-800 border border-aruna-700 rounded-full text-[11px] font-mono font-bold text-aruna-200 uppercase tracking-wider mb-2">
              Pucuk Pimpinan
            </span>
            <h3 className="text-xl sm:text-2xl font-extrabold text-white">Direktur Utama & Dewan Manajemen</h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1">Pengarah Strategis, Kebijakan Mutu & Tata Kelola Perusahaan</p>
          </div>

          {/* Connectors for Desktop */}
          <div className="hidden lg:flex flex-col items-center w-full">
            <div className="w-0.5 h-8 bg-aruna-300"></div>
            <div className="w-[85%] h-0.5 bg-aruna-300 relative">
              <div className="absolute left-0 -bottom-3 w-0.5 h-3 bg-aruna-300"></div>
              <div className="absolute left-[20%] -bottom-3 w-0.5 h-3 bg-aruna-300"></div>
              <div className="absolute left-[40%] -bottom-3 w-0.5 h-3 bg-aruna-300"></div>
              <div className="absolute left-[60%] -bottom-3 w-0.5 h-3 bg-aruna-300"></div>
              <div className="absolute left-[80%] -bottom-3 w-0.5 h-3 bg-aruna-300"></div>
              <div className="absolute right-0 -bottom-3 w-0.5 h-3 bg-aruna-300"></div>
            </div>
            <div className="h-4"></div>
          </div>

          {/* Spacer for Mobile */}
          <div className="lg:hidden h-6"></div>

          {/* Level 2: Departments Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 w-full">
            <OrgCard
              badge="Logistik & Gudang"
              dept="Operasional Gudang & Distribusi"
              scope="Pengelolaan buffer stock dan manajemen inventaris di 3 hub (Muara Baru, Lamongan, Benoa)."
              lead="Rian Pratama"
            />

            <OrgCard
              badge="Quality Control"
              dept="Penjaminan Mutu & QA/QC"
              scope="Audit kelayakan Unit Pengolahan Ikan, sertifikasi HACCP, SKP KKP, dan uji bebas formalin."
              lead="Dewi Kartika"
            />

            <OrgCard
              badge="Sourcing"
              dept="Pengadaan Nelayan & Pesisir"
              scope="Kemitraan langsung sentra pendaratan pancing dan tambak budidaya terakreditasi CBIB."
              lead="Sourcing Team"
            />

            <OrgCard
              badge="Logistics"
              dept="Logistik & Distribusi Pengiriman"
              scope="Pengiriman terjadwal armada kargo terstandar untuk pasokan 100 kg hingga kapasitas penuh (FTL)."
              lead="Agus Setiawan"
            />

            <OrgCard
              badge="Commercial"
              dept="Komersial & Penjualan B2B"
              scope="Kemitraan pasokan rutin untuk hotel berbintang, jaringan restoran, dan supermarket modern."
              lead="Hendra Saputra"
            />

            <OrgCard
              badge="Finance & Legal"
              dept="Keuangan & Kepatuhan Niaga"
              scope="Transparansi kontrak pasokan, penagihan term of payment (TOP), dan legalitas perizinan usaha."
              lead="Finance Team"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrganizationChartSection;
