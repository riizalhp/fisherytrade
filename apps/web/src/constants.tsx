import { NavLink, Service, Testimonial, FaqItem, BlogPost, Product, JobOpening, CaseStudy, TeamMember } from './types.ts';

export const NAV_LINKS: NavLink[] = [
  { name: 'Beranda', href: '/' },
  { name: 'Produk', href: '/produk' },
  { name: 'Tentang Kami', href: '/tentang-kami' },
];

export const SERVICES: Service[] = [
  {
    category: 'Rantai Dingin -25°C',
    title: 'Pembekuan Cepat IQF & Air Blast',
    description: 'Proses pembekuan higienis langsung dari titik pendaratan nelayan untuk mengunci kesegaran alami, nutrisi, dan tekstur daging ikan.',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80',
    href: '/produk',
  },
  {
    category: 'Multi-Gudang Strategis',
    title: 'Sentra Gudang Distribusi Dekat Anda',
    description: 'Pusat distribusi barang perikanan di Jakarta, Lamongan, dan Bali yang siap melayani kebutuhan stok harian dengan transparansi tonase riil.',
    imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=700&q=80',
    href: '/shop',
  },
  {
    category: 'Logistik Terjadwal',
    title: 'Armada Distribusi Terstandar',
    description: 'Pengiriman aman dengan armada logistik terpercaya mulai dari pemesanan 100 kg hingga kapasitas muatan penuh (FTL).',
    imageUrl: 'https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=700&q=80',
    href: '/kontak',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Kualitas Yellowfin Tuna Loin dari FisheryTrade sangat stabil. Dagingnya padat, warna merah cerah alami, dan susut air saat thawing sangat minim. Standar yang sangat memuaskan untuk menu sashimi dan grill di restoran kami.',
    name: 'Chef Hendra Wijaya',
    role: 'Executive Chef, Restoran Seafood Jakarta',
    imageUrl: 'https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=300&q=80',
  },
  {
    quote: 'Sebagai hotel resor dengan tingkat kunjungan tinggi di Bali, ketepatan jadwal pasokan bahan baku perikanan adalah nomor satu. FisheryTrade selalu mengirimkan armada distribusi tepat waktu dengan mutu produk yang sangat konsisten.',
    name: 'Ni Made Candrawati',
    role: 'Purchasing Manager, Resor & Beach Club Bali',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  },
  {
    quote: 'Kami mengambil pasokan Kakap Merah dan Cumi Tube secara rutin dari gudang Brondong Lamongan. Harganya bersaing untuk kelas grosir, kualitas barang seragam per karton, dan ketersediaan stok mingguan sangat bisa diandalkan.',
    name: 'Bambang Suryono',
    role: 'Pemilik Usaha Grosir Ikan Beku, Jawa Timur',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
  },
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    name: 'Rian Pratama',
    role: 'Head of Supply Chain & Operations',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    href: '#'
  },
  {
    name: 'Dewi Kartika',
    role: 'Quality Assurance & Seafood Safety',
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    href: '#'
  },
  {
    name: 'Agus Setiawan',
    role: 'Logistics & Fleet Coordinator',
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    href: '#'
  },
  {
    name: 'Hendra Saputra',
    role: 'Commercial & B2B Partnership Lead',
    imageUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    href: '#'
  },
];

export const FAQS: FaqItem[] = [
  {
    question: 'Berapa jumlah minimum pemesanan (MOQ) untuk pasar lokal?',
    answer: 'Minimum order untuk pengiriman lokal via armada ekspedisi adalah 100 kg (bisa kombinasi produk dalam satu pengiriman). Untuk pengambilan mandiri di gudang distribusi kami, minimum order adalah 1 master box (10 hingga 20 kg tergantung jenis komoditas).'
  },
  {
    question: 'Bagaimana FisheryTrade memastikan kualitas barang perikanan tetap prima?',
    answer: 'Seluruh barang perikanan dan produk olahan kami dikemas dengan standar higienis industri dan disimpan di fasilitas gudang distribusi terakreditasi dengan monitoring mutu ketat sebelum dikirim ke lokasi Anda.'
  },
  {
    question: 'Apakah pelaku usaha restoran atau hotel bisa meminta sampel uji coba?',
    answer: 'Ya, kami menyediakan paket sampel untuk uji dapur (kitchen trial) bagi hotel, restoran, dan katering di wilayah Jakarta, Surabaya, dan Denpasar. Silakan hubungi tim sales kami melalui WhatsApp.'
  },
  {
    question: 'Di mana saja lokasi gudang distribusi FisheryTrade yang dapat dikunjungi?',
    answer: 'Sentra gudang distribusi aktif kami berada di Pelabuhan Muara Baru (Jakarta Utara), Pelabuhan Brondong (Lamongan, Jawa Timur), dan Pelabuhan Benoa (Denpasar, Bali).'
  },
  {
    question: 'Bagaimana skema pembayaran untuk pasokan rutin mingguan atau bulanan?',
    answer: 'Untuk pelanggan baru berlaku skema Cash on Delivery atau Cash Before Delivery. Setelah kemitraan berjalan minimal 1 bulan dengan evaluasi volume rutin, kami membuka fasilitas term of payment (TOP) 7 hingga 14 hari.'
  },
  {
    question: 'Apakah seluruh produk memiliki sertifikasi keamanan pangan?',
    answer: 'Seluruh komoditas kami diproses di Unit Pengolahan Ikan (UPI) bersertifikat HACCP, Sertifikat Kelayakan Pengolahan (SKP) dari KKP, serta bersertifikasi Halal.'
  },
];

export const PRODUCTS: Product[] = [
  {
    id: 1,
    slug: 'yellowfin-tuna-loin-beku',
    name: 'Yellowfin Tuna Loin Beku',
    scientificName: 'Thunnus albacares',
    cutType: 'Fillet & Loin',
    volume: 'Kemasan Vakum 2 kg / Master Box 20 kg',
    imageUrl: '/images/products/08-yellowfin-tuna-loin-beku.webp',
    images: [
      '/images/products/08-yellowfin-tuna-loin-beku.webp'
    ],
    category: 'Ikan Pelagis',
    freezeMethod: 'IQF -25°C',
    grade: 'Grade A (Sashimi Ready)',
    moq: '100 kg',
    pricePerKg: 'Rp 95.000 / kg',
    priceNumeric: 95000,
    glazing: 'Glazing 5%',
    stockJakarta: '4.500 kg',
    stockLamongan: '2.200 kg',
    stockBali: 'Stok Habis',
    totalStock: '6.700 kg',
    description: 'Potongan Yellowfin Tuna Loin tanpa kulit, tanpa tulang, dan tanpa garis darah (bloodline). Dikemas vakum per piece 2 kg dengan metode Individual Quick Frozen (IQF) suhu -25°C untuk menjaga warna merah alami dan kekenyalan daging.',
    productFunction: 'Sangat cocok untuk menu sashimi, steak tuna hotel, poke bowl, dan hidangan grill restoran bertaraf internasional.',
    problemTitle: 'Warna Daging Menghitam dan Bau Amis Saat Thawing',
    problemDescription: 'Tuna beku konvensional sering mengalami oksidasi dan pencairan lambat yang merusak serat protein. Dengan IQF -25°C, tuna FisheryTrade mempertahankan warna segar dan tidak berair saat dicairkan.',
    whatsappUrl: 'https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20memesan%20Yellowfin%20Tuna%20Loin%20Beku.'
  },
  {
    id: 2,
    slug: 'kakap-merah-utuh-beku',
    name: 'Kakap Merah Utuh Beku',
    scientificName: 'Lutjanus campechanus',
    cutType: 'Ikan Utuh (WR / G&G)',
    volume: 'Size 1-2 kg / ekor (Master Box 15 kg)',
    imageUrl: '/images/products/05-kakap-merah-utuh-beku.webp',
    images: [
      '/images/products/05-kakap-merah-utuh-beku.webp'
    ],
    category: 'Ikan Demersal',
    freezeMethod: 'Air Blast -30°C',
    grade: 'Grade A (Gilled & Gutted)',
    moq: '200 kg',
    pricePerKg: 'Rp 78.000 / kg',
    priceNumeric: 78000,
    glazing: 'Glazing 10%',
    stockJakarta: '3.000 kg',
    stockLamongan: '300 kg (Menipis)',
    stockBali: '1.500 kg',
    totalStock: '4.800 kg',
    description: 'Ikan Kakap Merah segar hasil tangkapan pancing nelayan pesisir. Sudah dibersihkan insang dan isi perutnya (Gilled & Gutted), lalu dibekukan dengan Air Blast Freezer suhu -30°C.',
    productFunction: 'Menu utama restoran seafood Nusantara, gulai kepala kakap, tim ikan ala Kanton, dan katering resepsi hotel.',
    problemTitle: 'Bau Amis dari Isi Perut yang Rusak di Perjalanan',
    problemDescription: 'Kakap merah yang tidak dibersihkan saat masih segar mudah membusuk dari bagian dalam. Proses Gilled & Gutted kami memastikan rongga perut higienis dan daging tetap manis.',
    whatsappUrl: 'https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20memesan%20Kakap%20Merah%20Utuh%20Beku.'
  },
  {
    id: 3,
    slug: 'cumi-tube-kupas-bersih',
    name: 'Cumi Tube Kupas Bersih',
    scientificName: 'Loligo edulis',
    cutType: 'Cumi & Gurita',
    volume: 'Kemasan 1 kg (Glazing 10%) / Box 10 kg',
    imageUrl: '/images/products/03-cumi-tube-kupas-bersih.webp',
    images: [
      '/images/products/03-cumi-tube-kupas-bersih.webp'
    ],
    category: 'Chepalopoda',
    freezeMethod: 'IQF -25°C',
    grade: 'Skinless & Cleaned',
    moq: '150 kg',
    pricePerKg: 'Rp 85.000 / kg',
    priceNumeric: 85000,
    glazing: 'Glazing 10%',
    stockJakarta: '1.800 kg',
    stockLamongan: '3.400 kg',
    stockBali: 'Stok Habis',
    totalStock: '5.200 kg',
    description: 'Cumi tabung bersih tanpa kulit, tanpa sayap, dan tanpa tulang lunak. Diproses higienis dengan glazing es terkontrol 10% agar berat bersih daging tetap maksimal saat dimasak.',
    productFunction: 'Kebutuhan utama cumi goreng tepung (calamari), tumis cabai garam, sambal cumi kemasan, dan menu restoran oriental.',
    problemTitle: 'Kadar Susut Es Berlebihan (Glazing Tipuan)',
    problemDescription: 'Banyak cumi di pasaran memiliki kadar air es hingga 40% sehingga bobot menyusut drastis saat dicairkan. FisheryTrade menjamin glazing proporsional 10% terverifikasi timbangan.',
    whatsappUrl: 'https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20memesan%20Cumi%20Tube%20Kupas%20Bersih.'
  },
  {
    id: 4,
    slug: 'udang-vaname-beku-hoso',
    name: 'Udang Vaname Beku Fresh',
    scientificName: 'Litopenaeus vannamei',
    cutType: 'Udang & Crustacea',
    volume: 'Size 30-40 ekor/kg / Block Box 10 kg',
    imageUrl: '/images/products/06-udang-vaname-beku-fresh.webp',
    images: [
      '/images/products/06-udang-vaname-beku-fresh.webp'
    ],
    category: 'Crustacea',
    freezeMethod: 'Semi-IQF -25°C',
    grade: 'Fresh Frozen (HOSO / Kepala Utuh)',
    moq: '100 kg',
    pricePerKg: 'Rp 88.000 / kg',
    priceNumeric: 88000,
    glazing: 'Glazing 5%',
    stockJakarta: '2.500 kg',
    stockLamongan: '4.100 kg',
    stockBali: '1.200 kg',
    totalStock: '7.800 kg',
    description: 'Udang Vaname hasil tambak budidaya terakreditasi Cara Budidaya Ikan yang Baik (CBIB). Tubuh padat, transparan berkilau, dan bebas residu antibiotik terlarang.',
    productFunction: 'Menu udang bakar madu, tempura, tom yum, dan pasokan fresh market supermarket modern.',
    problemTitle: 'Kepala Udang Mudah Merah dan Lembek',
    problemDescription: 'Keterlambatan pembekuan pasca panen menyebabkan kepala udang melunak. Udang kami langsung masuk ke ruang beku dalam waktu kurang dari 2 jam setelah panen tambak.',
    whatsappUrl: 'https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20memesan%20Udang%20Vaname%20Beku.'
  },
  {
    id: 5,
    slug: 'dori-pangasius-fillet-beku',
    name: 'Dori / Pangasius Fillet Beku',
    scientificName: 'Pangasius hypophthalmus',
    cutType: 'Fillet & Loin',
    volume: 'Kemasan 1 kg (Master Box 10 kg)',
    imageUrl: '/images/products/04-dori-pangasius-fillet-beku.webp',
    images: [
      '/images/products/04-dori-pangasius-fillet-beku.webp'
    ],
    category: 'Ikan Air Tawar & Payau',
    freezeMethod: 'IQF -25°C',
    grade: 'Grade A (Well Trimmed, White Meat)',
    moq: '100 kg',
    pricePerKg: 'Rp 38.000 / kg',
    priceNumeric: 38000,
    glazing: 'Glazing 20%',
    stockJakarta: '5.200 kg',
    stockLamongan: '8.000 kg',
    stockBali: '2.500 kg',
    totalStock: '15.700 kg',
    description: 'Fillet daging dori tanpa kulit, tanpa tulang, daging putih bersih tanpa bercak merah. Pilihan utama restoran cepat saji, hotel, katering perjamuan, dan menu fish and chips.',
    productFunction: 'Bahan baku utama menu fish and chips, dori krispi asam manis, dori dabu-dabu, dan katering pesta.',
    problemTitle: 'Kadar Air Terlalu Banyak dan Daging Hancur Saat Digoreng',
    problemDescription: 'Dori berkualitas rendah sering memiliki kadar air glazing berlebih dan serat mudah hancur. Dori FisheryTrade diproses IQF cepat dengan glazing presisi 20% agar daging padat saat dimasak.',
    whatsappUrl: 'https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20memesan%20Dori%20Pangasius%20Fillet%20Beku.'
  },
  {
    id: 6,
    slug: 'cakalang-utuh-beku-wr',
    name: 'Cakalang Utuh Beku (Skipjack Tuna)',
    scientificName: 'Katsuwonus pelamis',
    cutType: 'Ikan Utuh (WR / G&G)',
    volume: 'Size 1.5 - 2.5 kg/ekor (Curah Karung 25 kg)',
    imageUrl: '/images/products/02-cakalang-utuh-beku.webp',
    images: [
      '/images/products/02-cakalang-utuh-beku.webp'
    ],
    category: 'Ikan Pelagis',
    freezeMethod: 'Air Blast -30°C',
    grade: 'Grade A (Whole Round)',
    moq: '200 kg',
    pricePerKg: 'Rp 32.000 / kg',
    priceNumeric: 32000,
    glazing: 'Glazing 5%',
    stockJakarta: '8.500 kg',
    stockLamongan: '12.000 kg',
    stockBali: '4.000 kg',
    totalStock: '24.500 kg',
    description: 'Ikan Cakalang utuh beku tangkapan kapal purse seine dan pancing pole & line. Pembekuan cepat langsung di palka kapal menjaga mata tetap bening dan daging padat kenyal.',
    productFunction: 'Industri pengasapan cakalang fufu, abon ikan, pakan olahan, serta restoran khas Manado dan masakan Nusantara.',
    problemTitle: 'Daging Cakalang Lembek dan Berwarna Gelap',
    problemDescription: 'Penyimpanan es balok tradisional membuat suhu ikan berfluktuasi. Cakalang kami dibekukan cepat dengan Air Blast -30°C sehingga struktur otot tetap kencang dan segar.',
    whatsappUrl: 'https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20memesan%20Cakalang%20Utuh%20Beku.'
  },
  {
    id: 7,
    slug: 'salmon-portion-fillet-beku',
    name: 'Atlantic Salmon Portion Beku',
    scientificName: 'Salmo salar',
    cutType: 'Fillet & Loin',
    volume: 'Vakum Individual 200g (Master Box 10 kg)',
    imageUrl: '/images/products/01-atlantic-salmon-portion-beku.webp',
    images: [
      '/images/products/01-atlantic-salmon-portion-beku.webp'
    ],
    category: 'Ikan Pelagis Impor',
    freezeMethod: 'IQF -40°C',
    grade: 'Premium Sashimi Grade (Skin-On, Scaled)',
    moq: '50 kg',
    pricePerKg: 'Rp 245.000 / kg',
    priceNumeric: 245000,
    glazing: 'Glazing 0% (Vakum)',
    stockJakarta: '1.800 kg',
    stockLamongan: '600 kg',
    stockBali: '2.200 kg',
    totalStock: '4.600 kg',
    description: 'Potongan porsi Atlantic Salmon dengan kulit bersih tanpa sisik (boneless, pin bone out). Warna jingga kemerahan alami kaya Omega-3, tekstur marbling lembut prima untuk menu pan-seared steak hotel dan Japanese dining.',
    productFunction: 'Sajian salmon steak hotel berbintang, salmon mentai bowl, teriyaki, dan hidangan fusion fine dining.',
    problemTitle: 'Susut Berat dan Kerusakan Lemak Ikan Akibat Freezer Burn',
    problemDescription: 'Salmon tanpa kemasan vakum cepat mengalami ketengikan lemak. Kemasan skin-pack vakum kedap udara FisheryTrade mengunci kelembapan dan cita rasa alami.',
    whatsappUrl: 'https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20memesan%20Atlantic%20Salmon%20Portion.'
  },
  {
    id: 8,
    slug: 'udang-vaname-pdto-kupas-masak',
    name: 'Udang Vaname PDTO Kupas Bersih',
    scientificName: 'Litopenaeus vannamei',
    cutType: 'Udang & Crustacea',
    volume: 'Size 31/40 (Master Box 10 kg / Kemasan 1 kg)',
    imageUrl: '/images/products/07-udang-vaname-pdto-kupas-bersih.webp',
    images: [
      '/images/products/07-udang-vaname-pdto-kupas-bersih.webp'
    ],
    category: 'Crustacea',
    freezeMethod: 'IQF -25°C',
    grade: 'Peeled Deveined Tail On (PDTO)',
    moq: '100 kg',
    pricePerKg: 'Rp 115.000 / kg',
    priceNumeric: 115000,
    glazing: 'Glazing 10%',
    stockJakarta: '3.200 kg',
    stockLamongan: '5.500 kg',
    stockBali: '1.800 kg',
    totalStock: '10.500 kg',
    description: 'Udang Vaname kupas bersih dengan ekor tersisa (PDTO) dan punggung sudah dibelah dibuang kotorannya. Siap masak tanpa repot, menghemat waktu persiapan dapur hingga 70%.',
    productFunction: 'Menu udang goreng tepung (ebi furai), tempura, udang telur asin, tom yum, dan tumisan seafood restoran modern.',
    problemTitle: 'Biaya Tenaga Kerja Dapur yang Boros untuk Kupas Udang',
    problemDescription: 'Proses pembersihan udang manual memakan waktu chef dan menimbulkan bau amis di area prep. Udang PDTO siap masak kami langsung dari freezer ke penggorengan.',
    whatsappUrl: 'https://wa.me/6282241114959?text=Halo%20FisheryTrade,%20saya%20ingin%20memesan%20Udang%20Vaname%20PDTO.'
  }
];

export const JOB_OPENINGS: JobOpening[] = [
  {
    id: 'b2b-sales-horeka-jakarta',
    title: 'Account Executive B2B Horeka (Jakarta)',
    location: 'Muara Baru, Jakarta Utara',
    type: 'Penuh Waktu',
    description: {
      summary: 'Mengembangkan kemitraan pasokan ikan beku untuk jaringan restoran, hotel berbintang, dan supermarket di wilayah Jabodetabek.',
      qualifications: [
        'Pengalaman minimal 2 tahun di bidang penjualan B2B bahan makanan (F&B / Horeka)',
        'Memiliki jejaring aktif dengan purchasing manager atau executive chef di Jabodetabek',
        'Mampu bernegosiasi kontrak pasokan rutin dan menjaga hubungan jangka panjang',
        'Memahami dasar penanganan bahan makanan beku dan rantai dingin',
        'Memiliki kendaraan pribadi dan bersedia mobile',
      ],
    },
    applicationMethod: 'email',
    applicationEmail: 'karir@fisherytrade.id',
  },
];

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'efisiensi-susut-resto-seafood',
    title: 'Efisiensi Biaya Bahan Baku Restoran Seafood Jakarta',
    category: 'Horeka & Restoran',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80',
    problem: 'Sebuah jaringan restoran seafood ternama di Jakarta Selatan mengalami kerugian susut bobot hingga 25% dari es batu cair saat menggunakan ikan beku curah tanpa standar glazing yang jelas.',
    solution: 'FisheryTrade menyediakan pasokan teratur Yellowfin Tuna Loin dan Kakap Merah dengan metode pembekuan IQF bersertifikat glazing tepat 10% dan pengiriman armada reefer terjadwal dua kali seminggu.',
    results: [
      { title: 'Penurunan Susut Thawing', value: '15%', description: 'Tingkat susut air ditekan dari 25% menjadi hanya 10%.' },
      { title: 'Penghematan Biaya Dapur', value: '18%', description: 'Efisiensi biaya pembelian bahan baku bulanan.' },
      { title: 'Ketepatan Suhu Kirim', value: '100%', description: 'Suhu tiba di dapur konsisten pada -20°C.' }
    ],
    testimonial: {
      quote: 'Kualitas Yellowfin Tuna Loin dari FisheryTrade sangat stabil. Dagingnya padat, warna merah cerah alami, dan susut air saat thawing sangat minim. Standar yang sangat memuaskan untuk menu kami.',
      name: 'Chef Hendra Wijaya',
      role: 'Executive Chef Restoran Seafood Jakarta'
    },
    content: `<h3>Analisis Kondisi Awal Dapur Restoran</h3><p>Dapur restoran seafood menghadapi tantangan fluktuasi harga pasar basah dan ketidakteraturan kualitas pasokan. Selain susut bobot yang tinggi, kesegaran bahan baku sering kali tidak seragam sebelum dikirim.</p><h3>Implementasi Solusi Pasokan Terpadu</h3><p>FisheryTrade mengimplementasikan sistem pasokan terjadwal dari Gudang Distribusi Muara Baru ke dapur pusat restoran:</p><ul><li><b>Kemasan Master Box & Vakum:</b> Setiap potongan dikemas higienis kedap udara sehingga mutu terlindungi sempurna.</li><li><b>Pengiriman Armada Terstandar:</b> Menggunakan armada kargo terstandar dengan jadwal pengiriman tepat waktu.</li><li><b>SOP Penanganan Bahan Baku:</b> Tim FisheryTrade memberikan panduan penyimpanan dan penanganan agar tekstur serat daging tetap prima.</li></ul><h3>Hasil Nyata bagi Bisnis</h3><p>Restoran berhasil menghemat biaya operasional hingga 18% dalam kurun waktu 3 bulan pertama, serta mempertahankan cita rasa menu olahan laut yang segar dan seragam bagi setiap tamu.</p>`
  },
  {
    id: 'pasokan-hotel-resor-bali',
    title: 'Jaminan Kontinuitas Pasokan Resor Bintang 5 di Bali',
    category: 'Perhotelan & Katering',
    imageUrl: 'https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?auto=format&fit=crop&w=700&q=80',
    problem: 'Musim ombak besar dan angin kencang sering membuat nelayan lokal tidak melaut, mengakibatkan kelangkaan pasokan udang dan kakap segar untuk banquet hotel berbintang di kawasan Benoa.',
    solution: 'FisheryTrade menjamin alokasi cadangan stok di Gudang Distribusi Benoa sebanyak 5 ton cadangan penyangga, memastikan operasional dapur hotel tidak pernah terhenti saat cuaca buruk.',
    results: [
      { title: 'Kepastian Pasokan', value: '100%', description: 'Nol hari kehabisan stok bahan baku olahan laut.' },
      { title: 'Kestabilan Harga Kontrak', value: '6 Bulan', description: 'Harga kontrak terkunci tanpa terpengaruh fluktuasi harian.' }
    ],
    testimonial: {
      quote: 'FisheryTrade selalu mengirimkan armada distribusi tepat waktu dengan mutu bahan baku yang terjaga konsisten.',
      name: 'Ni Made Candrawati',
      role: 'Purchasing Manager Resor & Beach Club Bali'
    },
    content: `<h3>Tantangan Pasokan di Industri Pariwisata</h3><p>Hotel dengan standar internasional membutuhkan kepastian volume dan spesifikasi ukuran yang seragam untuk setiap sajian banquet. Ketidakpastian pasokan nelayan saat musim barat sering memaksa hotel membeli dengan harga spekulatif di pasar lokal.</p><h3>Penyangga Stok Multi-Gudang</h3><p>Dengan integrasi stok lintas gudang antara Lamongan dan Benoa, FisheryTrade mampu menjaga buffer stock tanpa jeda, memastikan kebutuhan ratusan porsi perjamuan selalu terpenuhi dengan mutu terstandar.</p>`
  }
];

export const BLOG_POSTS: BlogPost[] = [
  {
    category: 'Edukasi Mutu Perikanan',
    date: '10 November 2026',
    title: 'Mengapa Standar Mutu dan Kemasan Sangat Krusial untuk Barang Perikanan',
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=700&q=80',
    href: 'mengapa-metode-iqf-sangat-krusial',
    size: 'large',
    author: 'Tim Teknis FisheryTrade',
    content: `<h3>Pentingnya Standarisasi Pengolahan Barang Perikanan</h3><p>Pengolahan perikanan profesional menjaga kesegaran dan cita rasa alami dari laut. Melalui pemrosesan higienis di Unit Pengolahan Ikan (UPI) bersertifikat HACCP, keutuhan tekstur daging dan nilai nutrisi dapat terjaga 100%.</p><p>Hasilnya, saat dimasak, produk perikanan memiliki tekstur kenyal dan rasa manis alami seperti baru dipanen dari laut lepas.</p>`
  },
  {
    category: 'Manajemen Dapur',
    date: '28 Oktober 2026',
    title: 'Panduan Praktis Penanganan Bahan Baku Perikanan untuk Standar Restoran dan Katering',
    imageUrl: 'https://images.unsplash.com/photo-1534939561126-855b8675edd7?auto=format&fit=crop&w=700&q=80',
    href: 'panduan-praktis-thawing-ikan-beku',
    size: 'small',
    author: 'Tim QA FisheryTrade',
    content: `<h3>Cara Tepat Menangani Barang Perikanan Tanpa Merusak Kualitas</h3><p>Banyak staf dapur melakukan kesalahan fatal dengan merendam produk beku langsung di dalam air panas atau membiarkannya di suhu ruang terbuka selama berjam-jam. Hal ini memicu penurunan mutu cepat pada lapisan luar.</p><p>Metode terbaik adalah <b>Slow Thawing di Chiller</b> (suhu 2°C hingga 4°C) selama 8 hingga 12 jam sebelum diolah, atau menggunakan air mengalir bersirkulasi tertutup dengan kemasan yang masih tertutup rapat kedap udara.</p>`
  },
  {
    category: 'Wawasan Bisnis',
    date: '15 Oktober 2026',
    title: 'Strategi Mengoptimalkan Biaya Pengadaan Bahan Baku Seafood bagi Pelaku Usaha Kuliner',
    imageUrl: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?auto=format&fit=crop&w=700&q=80',
    href: 'strategi-mengoptimalkan-biaya-pengadaan-seafood',
    size: 'small',
    author: 'Rian Pratama',
    content: `<h3>Mengapa Beralih ke Frozen Seafood Terstandar Lebih Menguntungkan</h3><p>Banyak pemilik restoran mengira membeli ikan segar harian di pasar basah selalu lebih hemat. Namun jika memperhitungkan biaya tenaga kerja pembersihan, bagian yang terbuang (kepala, insang, sisik), serta risiko busuk jika tidak habis terjual, biaya riil per porsi justru jauh lebih tinggi.</p><p>Dengan menggunakan produk ikan beku siap olah (Loin, Fillet, Cleaned Tube) bertonase terukur, chef dapat menghitung food cost secara presisi hingga per gram sajian.</p>`
  }
];
