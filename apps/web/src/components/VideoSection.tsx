
import React, { useState } from 'react';

const PlayIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 3L19 12L5 21V3Z" stroke="#0E2207" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const CloseIcon = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 6L6 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M6 6L18 18" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);


const VideoSection: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-cover bg-center" style={{ backgroundImage: "url('https://framerusercontent.com/images/TfVsdEorI3M6CtwPPcnMUstJ5Q.png')" }}>
                <div className="max-w-7xl mx-auto">
                    <div className="w-full h-64 sm:h-96 lg:h-[500px] rounded-2xl overflow-hidden relative group cursor-pointer" onClick={() => setIsModalOpen(true)}>
                        <img src="https://framerusercontent.com/images/8oxMLPshpp29p0ct5o4EsY6q0.jpg" alt="Video thumbnail" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                            <div className="relative w-20 h-20 lg:w-28 lg:h-28 flex items-center justify-center">
                                <div className="absolute inset-0 bg-white rounded-full transition-transform duration-300 group-hover:scale-110"></div>
                                <div className="absolute inset-0 border-2 border-dashed border-[#1f6306] rounded-full animate-spin [animation-duration:10s]"></div>
                                <div className="relative z-10 w-16 h-16 lg:w-20 lg:h-20 bg-[#fbc91a] rounded-full flex items-center justify-center">
                                    <PlayIcon />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center" onClick={() => setIsModalOpen(false)}>
                    <button className="absolute top-4 right-4 text-white z-50" onClick={() => setIsModalOpen(false)}>
                        <CloseIcon />
                    </button>
                    <div className="w-full max-w-4xl p-4" onClick={(e) => e.stopPropagation()}>
                        <div className="relative w-full h-0 rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                            <iframe
                                id="js_video_iframe"
                                src="https://jumpshare.com/embed/fnwr6qZ0AupCt4Ber9YX"
                                frameBorder="0"
                                allowFullScreen
                                className="absolute top-0 left-0 w-full h-full"
                                title="Profil Perusahaan PT. Triagro Hijrah Jaya"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoSection;