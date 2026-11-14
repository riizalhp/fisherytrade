export interface NavLink {
  name: string;
  href: string;
  dropdownItems?: {
    name: string;
    href: string;
    isExternal?: boolean;
  }[];
}

export interface Service {
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  href: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  imageUrl: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface BlogPost {
  category: string;
  date: string;
  title: string;
  imageUrl: string;
  href: string;
  size: 'large' | 'small';
  author: string;
  content: string;
}

export interface Product {
  id: number;
  slug: string; // url-friendly name
  name: string;
  volume: string; // Berat / kemasan
  imageUrl: string;
  images?: string[];
  description: string;
  category: string;
  productFunction: string; // Standar Mutu & Penggunaan
  problemTitle?: string;   // Masalah pasokan di dapur / bisnis
  problemDescription?: string; // Solusi dari FisheryTrade
  shopeeUrl?: string;
  tiktokUrl?: string;
  // Fishery Trade B2B fields
  scientificName?: string;
  freezeMethod?: string;
  grade?: string;
  moq?: string;
  pricePerKg?: string;
  priceNumeric?: number;
  stockJakarta?: string;
  stockLamongan?: string;
  stockBali?: string;
  totalStock?: string;
  whatsappUrl?: string;
  cutType?: string;
  glazing?: string;
  shelfLife?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
  href: string;
}

export interface JobOpening {
  id: string;
  title: string;
  location: string;
  type: string;
  description: {
    summary: string;
    qualifications: string[];
  };
  applicationMethod?: 'form' | 'email';
  applicationEmail?: string;
}

export interface CaseStudy {
  id: string;
  title: string;
  category: string;
  imageUrl: string;
  problem: string;
  solution: string;
  results: {
    title: string;
    value: string;
    description: string;
  }[];
  testimonial: {
    quote: string;
    name: string;
    role: string;
  };
  content: string;
}
