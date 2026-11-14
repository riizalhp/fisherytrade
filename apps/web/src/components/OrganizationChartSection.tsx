
import React from 'react';

const OrgNode: React.FC<{ name: string; role: string; color?: string }> = ({ name, role, color = "bg-white" }) => (
    <div className={`flex flex-col items-center p-4 rounded-xl border border-gray-200 shadow-sm w-full ${color}`}>
        <h4 className="font-bold text-[#0E2207] text-center">{role}</h4>
        {name && <p className="text-sm text-gray-600 mt-1 text-center font-medium">{name}</p>}
    </div>
);

const OrganizationChartSection: React.FC = () => {
    return (
        <section className="bg-gray-50 py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <span className="inline-block py-2 px-4 border border-[#1f6306] rounded-full text-sm font-semibold text-[#1f6306] mb-4">
                        Struktur Organisasi
                    </span>
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2207] tracking-tighter">
                        Tim Manajemen Kami
                    </h2>
                </div>

                <div className="flex flex-col items-center gap-8 max-w-5xl mx-auto">
                    {/* Level 1: Director */}
                    <div className="w-64">
                         <OrgNode role="Direktur" name="" color="bg-[#1f6306]/10 border-[#1f6306]" />
                    </div>

                    {/* Connector Line */}
                    <div className="w-px h-8 bg-gray-300"></div>
                    <div className="w-full h-px bg-gray-300 relative max-w-4xl">
                         <div className="absolute left-1/2 -translate-x-1/2 top-0 h-4 w-px bg-gray-300"></div>
                    </div>

                    {/* Level 2: Departments */}
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 w-full">
                        {/* Rnd Fertilizer */}
                        <div className="flex flex-col items-center gap-4">
                             <div className="w-px h-4 bg-gray-300"></div>
                             <OrgNode role="RnD Fertilizer" name="" color="bg-orange-50 border-orange-200" />
                             <div className="w-px h-4 bg-gray-300"></div>
                             <div className="flex flex-col gap-2 w-full">
                                <OrgNode role="Staff" name="Eko Damono" />
                                <OrgNode role="Staff" name="Ngadino Lintang S" />
                             </div>
                        </div>

                         {/* Rnd Seeds */}
                         <div className="flex flex-col items-center gap-4">
                             <div className="w-px h-4 bg-gray-300"></div>
                             <OrgNode role="RnD Seeds" name="" color="bg-orange-50 border-orange-200" />
                             <div className="w-px h-4 bg-gray-300"></div>
                             <OrgNode role="Staff" name="Sriyono" />
                        </div>

                        {/* Sales */}
                        <div className="flex flex-col items-center gap-4">
                             <div className="w-px h-4 bg-gray-300"></div>
                             <OrgNode role="Sales And Distribution" name="" color="bg-orange-50 border-orange-200" />
                             <div className="w-px h-4 bg-gray-300"></div>
                             <OrgNode role="Staff" name="Doddy Darmawan" />
                        </div>

                        {/* Marketing */}
                        <div className="flex flex-col items-center gap-4">
                             <div className="w-px h-4 bg-gray-300"></div>
                             <OrgNode role="Marketing" name="" color="bg-orange-50 border-orange-200" />
                             <div className="w-px h-4 bg-gray-300"></div>
                             <div className="flex flex-col gap-2 w-full">
                                <OrgNode role="Jateng Jabar" name="Imam Muchyidin" />
                                <OrgNode role="Jatim" name="M Sultan Aulia" />
                                <OrgNode role="Lampung" name="Supomo" />
                             </div>
                        </div>

                        {/* Accounting */}
                        <div className="flex flex-col items-center gap-4">
                             <div className="w-px h-4 bg-gray-300"></div>
                             <OrgNode role="Accounting" name="" color="bg-orange-50 border-orange-200" />
                             <div className="w-px h-4 bg-gray-300"></div>
                             <OrgNode role="Staff" name="Wildan Yasir 'Adn" />
                        </div>

                        {/* Administration */}
                        <div className="flex flex-col items-center gap-4">
                             <div className="w-px h-4 bg-gray-300"></div>
                             <OrgNode role="Administration" name="" color="bg-orange-50 border-orange-200" />
                             <div className="w-px h-4 bg-gray-300"></div>
                             <OrgNode role="Staff" name="Salsabila Nur Fitriah" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OrganizationChartSection;
