import { TestimonialSection } from "@/components/ui/testimonials";

// Sample data for the testimonials using verified Unsplash stock photography
const testimonialsData = [
  {
    id: 1,
    quote:
      "Kualitas Yellowfin Tuna Loin dari FisheryTrade sangat stabil. Dagingnya padat, warna merah cerah alami, dan susut air saat thawing sangat minim. Standar yang sangat memuaskan untuk menu sashimi dan grill di restoran kami.",
    name: "Chef Hendra Wijaya",
    role: "Executive Chef, Restoran Seafood Jakarta",
    imageSrc: "https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 2,
    quote:
      "Sebagai hotel resor dengan tingkat kunjungan tinggi di Bali, ketepatan jadwal pasokan ikan segar dan beku adalah nomor satu. FisheryTrade selalu mengirimkan armada reefer tepat waktu dengan suhu konsisten di bawah -20 derajat Celsius.",
    name: "Ni Made Candrawati",
    role: "Purchasing Manager, Resor & Beach Club Bali",
    imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    quote:
      "Kami mengambil pasokan Kakap Merah dan Cumi Tube secara rutin dari gudang Brondong Lamongan. Harganya bersaing untuk kelas grosir, kualitas barang seragam per karton, dan ketersediaan stok mingguan sangat bisa diandalkan.",
    name: "Bambang Suryono",
    role: "Pemilik Usaha Grosir Ikan Beku, Jawa Timur",
    imageSrc: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=800&q=80",
  },
];

export const TestimonialSectionDemo = () => {
  return (
    <TestimonialSection
      title="Dipercaya oleh Pengelola Restoran & Pelaku Usaha Horeka"
      subtitle="Pengalaman langsung mitra kuliner dan distributor seafood dari berbagai daerah di Indonesia"
      testimonials={testimonialsData}
    />
  );
};

export default TestimonialSectionDemo;
