import React from 'react';

interface DiscoverSectionProps { }

const DiscoverSection: React.FC<DiscoverSectionProps> = () => {
    return (
        <section className="relative py-32 sm:py-48 px-4 sm:px-6 lg:px-8 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <video
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover"
                    poster="https://framerusercontent.com/images/hxHy6ErzZkhu2farMIba124N8p0.jpg"
                >
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0e2207]/80 to-[#0e2207]/40"></div>
            </div>
            <div className="max-w-7xl mx-auto relative z-10 flex flex-col items-end justify-end min-h-[400px] lg:min-h-[500px]">
                <div className="bg-[#fbc91a] p-8 md:p-10 rounded-2xl text-[#0e2207] w-full max-w-lg">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-6">Temukan Kesuksesan Pertanian Anda dan Belajar dari yang Terbaik!</h2>
                    <a href="/kontak" className="bg-[#1f6306] text-white font-bold py-3 px-6 rounded-full hover:bg-white hover:text-[#0E2207] transition-colors inline-block">
                        Hubungi Sekarang
                    </a>
                </div>
            </div>
        </section>
    );
};

export default DiscoverSection;