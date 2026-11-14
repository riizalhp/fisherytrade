
import React from 'react';

interface ProjectCardProps {
    title: string;
    imageUrl: string;
    href: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, imageUrl, href }) => (
    <a href={href} className="relative block h-full w-full group overflow-hidden rounded-xl">
        <img src={imageUrl} alt={title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
            <h3 className="text-white text-2xl font-bold">{title}</h3>
        </div>
    </a>
);

const ProjectsSection: React.FC = () => {
    return (
        <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-12 gap-8">
                    <div>
                        <span className="inline-block py-2 px-4 border border-[#1f6306] rounded-full text-sm font-semibold text-[#1f6306] mb-4">
                            Studi Kasus
                        </span>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0E2207] tracking-tighter">
                            Studi Kasus Keberhasilan
                        </h2>
                    </div>
                    <p className="text-[#757873] text-lg max-w-lg">
                        Lihat bagaimana produk kami telah membantu para petani meningkatkan hasil panen, efisiensi, dan keuntungan secara signifikan.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 h-[420px] lg:h-[450px]">
                    <div className="lg:col-span-1">
                        <ProjectCard title="Peningkatan Panen Jagung" imageUrl="https://framerusercontent.com/images/L5ZOf1bSsxnFo4iTDv3bamiEk.jpeg" href="#" />
                    </div>
                     <div className="lg:col-span-1">
                        <ProjectCard title="Pemulihan Tanah Kritis" imageUrl="https://framerusercontent.com/images/TgRCmSQEBuWCS5PT6mj8xdMcHI.jpeg" href="#" />
                    </div>
                     <div className="lg:col-span-1">
                        <ProjectCard title="Perlindungan Cabai dari Layu" imageUrl="https://framerusercontent.com/images/hIiFD3wHpCagiQZtgWVWY7EVU.jpeg" href="#" />
                    </div>
                     <div className="lg:col-span-1">
                        <ProjectCard title="Efisiensi Pemupukan Padi" imageUrl="https://framerusercontent.com/images/axJGVH4VS1vHwtToP5Ej5tFge68.jpeg" href="#" />
                    </div>
                </div>

                <div className="text-center mt-12">
                     <a href="#" className="bg-[#1f6306] text-white font-bold py-4 px-8 rounded-full hover:bg-[#0e2207] transition-colors">
                        Lihat Semua Studi Kasus
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;