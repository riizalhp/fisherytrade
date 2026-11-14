import React from 'react';

const ContactItem: React.FC<{ icon: React.ReactNode; title: string; content: string; href: string }> = ({
  icon,
  title,
  content,
  href,
}) => (
  <div className="flex items-center gap-4 sm:gap-5">
    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-aruna-600 text-white rounded-2xl flex-shrink-0 flex items-center justify-center shadow-md">
      {icon}
    </div>
    <div>
      <div className="text-xs font-mono font-bold text-aruna-700 uppercase tracking-wider">{title}</div>
      <a
        href={href}
        className="text-base sm:text-lg font-bold text-aruna-900 hover:text-aruna-600 transition-colors block mt-0.5"
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      >
        {content}
      </a>
    </div>
  </div>
);

const CtaSection: React.FC = () => {
  return (
    <section className="bg-aruna-50/70 border-t border-b border-aruna-100 py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 lg:gap-12">
          
          <ContactItem
            icon={
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/>
              </svg>
            }
            title="WhatsApp Sales B2B"
            content="0822-4111-4959"
            href="https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20tertarik%20dengan%20layanan%20pasokan%20ikan%20beku."
          />

          <ContactItem
            icon={
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
            title="Email Resmi"
            content="sales@fisherytrade.id"
            href="mailto:sales@fisherytrade.id"
          />

          <ContactItem
            icon={
              <svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            }
            title="Cold Storage Utama"
            content="Pelabuhan Muara Baru, Jakarta Utara"
            href="https://maps.google.com/?q=Pelabuhan+Muara+Baru+Jakarta"
          />

        </div>
      </div>
    </section>
  );
};

export default CtaSection;
