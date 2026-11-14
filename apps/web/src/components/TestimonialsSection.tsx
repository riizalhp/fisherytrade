import React from 'react';
import { TestimonialSection } from './ui/testimonials';
import { TESTIMONIALS } from '../constants.tsx';
import { Testimonial } from '../types.ts';

interface TestimonialsSectionProps {
  testimonials?: Testimonial[];
}

const TestimonialsSectionWrapper: React.FC<TestimonialsSectionProps> = ({ testimonials }) => {
  const displayTestimonials = (testimonials || TESTIMONIALS).map((item, idx) => ({
    id: idx + 1,
    quote: item.quote,
    name: item.name,
    role: item.role,
    imageSrc: item.imageUrl,
  }));

  return (
    <TestimonialSection
      title="Dipercaya oleh Pengelola Restoran & Pelaku Usaha Horeka"
      subtitle="Konsistensi mutu daging ikan beku dan kepuasan mitra rantai dingin dari berbagai daerah di Indonesia"
      testimonials={displayTestimonials}
    />
  );
};

export default TestimonialsSectionWrapper;
