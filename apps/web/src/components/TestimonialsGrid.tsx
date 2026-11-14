
import React from 'react';
import { TESTIMONIALS } from '../constants.tsx';
import { Testimonial } from '../types.ts';

const QuotationMarkIcon = () => (
     <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M3.75 14.25H0.75V8.25C0.75 5.0625 3.3125 2.5 6.5 2.5V5C4.84375 5 3.75 6.09375 3.75 7.75V14.25ZM14.25 14.25H11.25V8.25C11.25 5.0625 13.8125 2.5 17 2.5V5C15.3437 5 14.25 6.09375 14.25 7.75V14.25Z" fill="white"/>
    </svg>
);

const TestimonialCard: React.FC<{ testimonial: Testimonial }> = ({ testimonial }) => (
    <div className="border-2 border-green-800/20 bg-white/5 rounded-2xl p-6 lg:p-10 flex flex-col justify-between min-h-[350px]">
        <p className="text-[#0E2207] text-lg mb-6 flex-grow">{testimonial.quote}</p>
        <div className="flex items-center gap-4">
            <div className="relative">
                <div className="w-16 h-16 rounded-full">
                    <img src={testimonial.imageUrl} alt={testimonial.name} className="w-full h-full object-cover rounded-full border border-[#1f6306]" />
                </div>
                <div className="absolute top-0 right-[-4px] w-6 h-6 bg-[#1f6306] rounded-full flex items-center justify-center">
                    <QuotationMarkIcon />
                </div>
            </div>
            <div>
                <h4 className="font-bold text-xl text-[#0E2207]">{testimonial.name}</h4>
                <p className="text-gray-500">{testimonial.role}</p>
            </div>
        </div>
    </div>
);

interface TestimonialsGridProps {
    testimonials?: Testimonial[];
}

const TestimonialsGrid: React.FC<TestimonialsGridProps> = ({ testimonials }) => {
    const displayTestimonials = testimonials || TESTIMONIALS;
    return (
        <section className="bg-white py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayTestimonials.map((testimonial, index) => (
                        <TestimonialCard key={index} testimonial={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TestimonialsGrid;
