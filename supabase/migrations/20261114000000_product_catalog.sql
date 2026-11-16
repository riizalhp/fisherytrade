create extension if not exists pgcrypto;

create table if not exists public.product_catalog (
  id uuid primary key default gen_random_uuid(),
  sku text not null unique,
  slug text not null unique,
  name text not null,
  english_name text not null default '',
  scientific_name text not null default '',
  category text not null default 'Ikan Pelagis',
  image_url text not null default '',
  images text[] not null default '{}',
  description text not null default '',
  product_function text not null default '',
  problem_title text,
  problem_description text,
  volume text not null default 'Master Box 10 kg',
  cut_type text not null default 'Whole Round',
  freeze_method text not null default 'IQF -25°C',
  grade text not null default 'Grade A',
  moq_kg integer not null default 100 check (moq_kg > 0),
  price_per_kg integer not null default 0 check (price_per_kg >= 0),
  stock_jakarta_kg numeric(12,2) not null default 0 check (stock_jakarta_kg >= 0),
  stock_lamongan_kg numeric(12,2) not null default 0 check (stock_lamongan_kg >= 0),
  stock_bali_kg numeric(12,2) not null default 0 check (stock_bali_kg >= 0),
  glazing text not null default '',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists product_catalog_active_name_idx
  on public.product_catalog (is_active, name);

alter table public.product_catalog enable row level security;

-- Server-side routes use the Supabase service-role key. No anonymous write policy is created.
-- Public catalog reads are proxied through the admin API, which exposes active products only.

drop trigger if exists product_catalog_set_updated_at on public.product_catalog;
create or replace function public.set_product_catalog_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;
create trigger product_catalog_set_updated_at
before update on public.product_catalog
for each row execute function public.set_product_catalog_updated_at();

insert into public.product_catalog (
  sku, slug, name, english_name, scientific_name, category, image_url, images,
  description, product_function, problem_title, problem_description, volume,
  cut_type, freeze_method, grade, moq_kg, price_per_kg,
  stock_jakarta_kg, stock_lamongan_kg, stock_bali_kg, glazing, is_active
) values
(
  'FT-TUNA-001', 'yellowfin-tuna-loin-beku', 'Yellowfin Tuna Loin Beku', 'Yellowfin Tuna Loin',
  'Thunnus albacares', 'Ikan Pelagis',
  'https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?auto=format&fit=crop&w=700&q=80',
  array['https://images.unsplash.com/photo-1501595091296-3aa970afb3ff?auto=format&fit=crop&w=700&q=80'],
  'Potongan Yellowfin Tuna Loin tanpa kulit, tanpa tulang, dan tanpa garis darah. Dikemas vakum dan dibekukan cepat untuk menjaga warna serta tekstur.',
  'Cocok untuk sashimi, steak tuna, poke bowl, dan hidangan grill.',
  'Warna daging berubah saat thawing',
  'Pembekuan cepat dan kemasan vakum membantu menjaga warna serta tekstur selama penyimpanan.',
  'Kemasan Vakum 2 kg / Master Box 20 kg', 'Loin', 'IQF -25°C', 'Grade A', 100, 95000,
  4500, 2200, 0, 'Glazing 5%', true
),
(
  'FT-SNAP-002', 'kakap-merah-utuh-beku', 'Kakap Merah Utuh Beku', 'Red Snapper',
  'Lutjanus campechanus', 'Ikan Demersal',
  'https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=700&q=80',
  array['https://images.unsplash.com/photo-1524704654690-b56c05c78a00?auto=format&fit=crop&w=700&q=80'],
  'Kakap merah hasil tangkapan nelayan, dibersihkan (G&G), lalu dibekukan dengan air blast.',
  'Pilihan untuk bakar, steam, dan menu seafood restoran.',
  'Mutu hasil tangkapan tidak seragam',
  'Pemeriksaan mutu dan pembekuan terstandar dilakukan sebelum produk masuk gudang.',
  'Size 1-2 kg / ekor (Master Box 15 kg)', 'Whole G&G', 'Air Blast -25°C', 'Grade A', 200, 78000,
  3000, 300, 1500, 'Glazing 5%', true
),
(
  'FT-SQUID-003', 'cumi-tube-kupas-bersih', 'Cumi Tube Kupas Bersih', 'Cleaned Squid Tube',
  'Loligo edulis', 'Cephalopoda',
  'https://images.unsplash.com/photo-1545601445-4d6a0a0565f0?auto=format&fit=crop&w=700&q=80',
  array['https://images.unsplash.com/photo-1545601445-4d6a0a0565f0?auto=format&fit=crop&w=700&q=80'],
  'Cumi tabung bersih tanpa kulit, sayap, dan tulang lunak; diproses higienis dengan glazing terkontrol.',
  'Siap untuk tumisan, calamari, dan olahan seafood.',
  'Persiapan bahan baku menyita waktu dapur',
  'Cumi telah dibersihkan agar siap diolah dengan lebih praktis.',
  'Kemasan 1 kg (Glazing 10%) / Box 10 kg', 'Fillet', 'IQF -25°C', 'Grade A', 150, 85000,
  1800, 3400, 0, 'Glazing 10%', true
),
(
  'FT-SHRIMP-004', 'udang-vaname-beku-hoso', 'Udang Vaname Beku Fresh', 'Whiteleg Shrimp HOSO',
  'Litopenaeus vannamei', 'Crustacea',
  'https://images.unsplash.com/photo-1566575167524-1b8b9c66c30d?auto=format&fit=crop&w=700&q=80',
  array['https://images.unsplash.com/photo-1566575167524-1b8b9c66c30d?auto=format&fit=crop&w=700&q=80'],
  'Udang vaname hasil budidaya dengan penanganan dan pembekuan terstandar.',
  'Cocok untuk menu grill, tumisan, dan hidangan seafood.',
  'Pasokan udang berukuran seragam',
  'Spesifikasi ukuran dan grade dicatat per batch untuk menjaga konsistensi pasokan.',
  'Size 30-40 ekor/kg / Block Box 10 kg', 'HOSO', 'IQF -25°C', 'Grade A', 100, 88000,
  2500, 4100, 1200, 'Glazing 10%', true
),
(
  'FT-DORI-005', 'dori-pangasius-fillet-beku', 'Dori / Pangasius Fillet Beku', 'Pangasius Fillet',
  'Pangasius hypophthalmus', 'Ikan Demersal',
  'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80',
  array['https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=700&q=80'],
  'Fillet dori tanpa kulit dan tulang, berdaging putih bersih.',
  'Pilihan untuk fish and chips, katering, hotel, dan restoran.',
  'Kebutuhan fillet siap olah',
  'Produk tanpa tulang membantu mempercepat proses persiapan dapur.',
  'Kemasan 1 kg (Master Box 10 kg)', 'Fillet', 'IQF -25°C', 'Grade A', 100, 38000,
  5200, 8000, 2500, 'Glazing 10%', true
),
(
  'FT-SKIPJACK-006', 'cakalang-utuh-beku-wr', 'Cakalang Utuh Beku (Skipjack Tuna)', 'Skipjack Tuna',
  'Katsuwonus pelamis', 'Ikan Pelagis',
  'https://images.unsplash.com/photo-1510130387422-82ebd3301c0e?auto=format&fit=crop&w=700&q=80',
  array['https://images.unsplash.com/photo-1510130387422-82ebd3301c0e?auto=format&fit=crop&w=700&q=80'],
  'Cakalang utuh beku dari tangkapan kapal purse seine dan pole & line.',
  'Sesuai untuk olahan tradisional, restoran, dan pengolahan lanjutan.',
  'Penurunan kesegaran sebelum distribusi',
  'Pembekuan cepat membantu mempertahankan tekstur dan mutu hasil tangkapan.',
  'Size 1.5-2.5 kg/ekor (Curah Karung 25 kg)', 'Whole Round', 'Air Blast -25°C', 'Grade A', 200, 32000,
  8500, 12000, 4000, 'Glazing 5%', true
),
(
  'FT-SALMON-007', 'salmon-portion-fillet-beku', 'Atlantic Salmon Portion Beku', 'Atlantic Salmon Portion',
  'Salmo salar', 'Ikan Pelagis',
  'https://images.unsplash.com/photo-1499125562588-29fb8a56b5d0?auto=format&fit=crop&w=700&q=80',
  array['https://images.unsplash.com/photo-1499125562588-29fb8a56b5d0?auto=format&fit=crop&w=700&q=80'],
  'Potongan porsi salmon tanpa tulang kecil dengan warna dan tekstur khas salmon.',
  'Cocok untuk salmon steak, mentai bowl, dan menu hotel.',
  'Freezer burn pada ikan berlemak',
  'Kemasan vakum membantu menjaga kelembapan dan cita rasa selama penyimpanan.',
  'Vakum Individual 200g (Master Box 10 kg)', 'Fillet', 'IQF -40°C', 'Grade Export', 50, 245000,
  1800, 600, 2200, 'Glazing 0% (Vakum)', true
),
(
  'FT-SHRIMP-008', 'udang-vaname-pdto-kupas-masak', 'Udang Vaname PDTO Kupas Bersih', 'Whiteleg Shrimp PDTO',
  'Litopenaeus vannamei', 'Crustacea',
  'https://images.unsplash.com/photo-1559742811-82286364344a?auto=format&fit=crop&w=700&q=80',
  array['https://images.unsplash.com/photo-1559742811-82286364344a?auto=format&fit=crop&w=700&q=80'],
  'Udang vaname kupas dengan ekor tersisa dan punggung dibersihkan, siap masak.',
  'Sesuai untuk tempura, ebi furai, tumisan, dan hidangan seafood.',
  'Biaya persiapan kupas udang',
  'Produk PDTO siap olah mengurangi waktu persiapan bahan di dapur.',
  'Size 31/40 (Master Box 10 kg / Kemasan 1 kg)', 'HLSO', 'IQF -25°C', 'Grade A', 100, 115000,
  3200, 5500, 1800, 'Glazing 10%', true
)
on conflict (slug) do nothing;
