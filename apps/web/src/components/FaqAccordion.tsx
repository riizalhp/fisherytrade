import React, { useState } from 'react';
import { FAQS } from '../constants.tsx';
import { FaqItem } from '../types.ts';

const PlusIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 4.16669V15.8334" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M4.16699 10H15.8337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const MinusIcon = () => (
     <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4.16699 10H15.8337" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
);

const AccordionItem: React.FC<{ item: FaqItem, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border border-[#1f6306]/40 rounded-lg p-6 bg-white transition-all duration-300">
      <button onClick={onClick} className="w-full flex justify-between items-center text-left gap-4">
        <h4 className="text-xl font-bold text-[#0E2207]">{item.question}</h4>
        <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center border border-[#1f6306] rounded-full text-[#0E2207]">
            {isOpen ? <MinusIcon /> : <PlusIcon />}
        </div>
      </button>
      <div className={`grid transition-all duration-500 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
          <div className="overflow-hidden">
            <p className="pt-4 text-gray-600 text-lg">
              {item.answer}
            </p>
          </div>
      </div>
    </div>
  );
};

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="space-y-6">
            {FAQS.map((faq, index) => (
                <AccordionItem 
                    key={index} 
                    item={faq} 
                    isOpen={openIndex === index}
                    onClick={() => handleToggle(index)}
                />
            ))}
        </div>
      </div>
    </section>
  );
};

export default FaqAccordion;