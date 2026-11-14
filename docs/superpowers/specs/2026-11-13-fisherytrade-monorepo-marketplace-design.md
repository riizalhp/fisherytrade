# Design Document: FisheryTrade Monorepo Architecture (Astro Marketplace Barang Perikanan + Next.js Admin WMS)

**Date**: 2026-11-13 (Updated: 2026-11-14)  
**Status**: Approved / In Execution  
**Author**: Fullstack Tech Partner  
**Target Delivery**: Fishery Trade — B2B Marketplace Barang Perikanan & Multi-Warehouse WMS (Phase 1)

---

## 1. Intent and The Why

Fishery Trade adalah **Marketplace Barang Perikanan B2B** terpadu dan sistem manajemen gudang logistik perikanan (WMS "SAP-Lite"). 
Model bisnis ini melayani pembeli komersial (horeka, jaringan supermarket, distributor daerah, pedagang besar, dan eksportir) yang membutuhkan transparansi stok barang perikanan di sentra gudang distribusi (Jakarta, Lamongan, Bali, Bitung), grade mutu barang perikanan, serta alur pemesanan terstruktur melalui Request-for-Quotation (RFQ) dengan kalkulasi armada logistik Shipper.id.

Untuk memaksimalkan visibilitas pencarian organik (SEO) pada kata kunci barang dan komoditas perikanan sekaligus menjaga operasional back-office tetap aman, cepat, dan mudah dirawat oleh satu tim pengembang dalam tenggat 3 minggu, sistem mengadopsi arsitektur monorepo TypeScript terpadu:
- **Public & Marketplace Catalog**: High-performance Static Site Generation (SSG) berbasis **Astro 5** di bawah domain `fisherytrade.com` dan `fisherytrade.com/shop`.
- **Admin Control & Backend API**: Fullstack **Next.js (App Router)** di bawah domain `admin.fisherytrade.com` untuk manajemen inventaris gudang distribusi (WMS), pelacakan batch barang perikanan, integrasi API Shipper.id, dan penanganan RFQ masuk.

---

## 2. Goals, Non-Goals, and Anti-Goals

### 2.1 Goals
1. **Unified TypeScript Monorepo**: Membangun monorepo pnpm + Turborepo yang berbagi skema database dan interface TypeScript antara frontend marketplace dan admin WMS.
2. **SEO-Dominant Marketplace URL**: Menampilkan katalog barang perikanan di `fisherytrade.com/shop` dalam aplikasi Astro untuk memenangkan peringkat SEO.
3. **Multi-Warehouse Stock Transparency**: Memungkinkan pembeli melihat ketersediaan tonase riil barang perikanan berdasarkan lokasi hub gudang distribusi dan grade spesifikasi.
4. **Structured RFQ & Logistics**: Mengumpulkan formulir RFQ pembeli, simulasi kapasitas armada logistik (CDD, Fuso, Kontainer 20ft), estimasi tarif via API Shipper.id, dan routing pesanan langsung ke tim penjualan via WhatsApp.
5. **Back-Office WMS ("SAP-Lite")**: Menyediakan panel admin gudang untuk manajemen batch barang perikanan, Penerimaan Barang (Inbound), Pengeluaran Barang (Outbound), Stock Opname, peringatan aging FIFO (>45/90 hari), dan ekspor laporan stok harian.

### 2.2 Non-Goals (Phase 1)
- **Direct Online B2C Payment**: Tidak ada instant payment gateway / kartu kredit di Fase 1 (transaksi B2B berjalan melalui RFQ, proforma invoice, dan transfer bank).
- **Automated IoT Hardware Integration**: Pencatatan fisik barang perikanan dilakukan secara manual di modul Goods Receipt oleh operator gudang pada Fase 1.
- **Complex Escrow / Bank L/C**: Otomatisasi Letter of Credit dan kepabeanan maritim internasional disiapkan untuk Fase 2/3 (ekspansi ekspor).

### 2.3 Anti-Goals
- **Splitting into Isolated Unshared Repositories**: Hindari duplikasi tipe data barang perikanan, spesifikasi grade, dan gudang distribusi di repo terpisah.
- **Subdomain for Marketplace (`shop.fisherytrade.com`)**: Dihindari agar tidak memecah reputasi SEO domain utama.
- **Heavy Headless Browser / Puppeteer on Server**: Semua ekspor laporan (Daily Stock / Surat Jalan) menggunakan generator ringan client-side atau stream-based.

---

## 3. Constraints

- **Project Timeline**: 3 Minggu (15 Hari Kerja) dalam 3 tahapan pembayaran milestone.
- **Fixed Budget**: IDR 15,000,000 all-in development fee.
- **Infrastructure Overhead**: Biaya server minimal sehingga retainer bulanan (IDR 1,500,000/bln) terjaga ~90% margin. Astro berjalan di edge CDN gratis (Cloudflare Pages); Next.js berjalan di VPS spesifikasi efisien (2GB RAM).
- **Existing Asset**: Basis web landing page di `triagro-landingpage/` (Astro 5, React, Tailwind CSS) dimigrasikan ke `apps/web/`.

---

## 4. Approaches Considered & Selected

### Option A: Unified Monorepo (Astro for Web/Shop + Next.js for Admin & API) — **SELECTED**
- **Arsitektur**: Turborepo workspace. `apps/web` (Astro) mengonsumsi REST/JSON dari `apps/admin` (Next.js). Tipe bersama dan Prisma database client berada di `packages/`.
- **Trade-offs**: Membutuhkan pembuatan komponen UI WMS di Next.js menggunakan shadcn/ui dan TanStack Table, namun memberikan 100% konsistensi TypeScript, zero context-switching, dan type-sharing tanpa cela.
- **Alasan Pemilihan**: Keseimbangan terbaik antara pemeliharaan jangka panjang, keakraban pengembang, pemisahan traffic CDN publik dari komputasi admin, dan ekosistem satu bahasa.

### Option B: Laravel Filament + Astro Frontend — *Considered & Deferred*
- **Trade-offs**: Filament menyediakan CRUD cepat, namun mengenalkan runtime PHP/Composer di samping Node.js yang memperumit tooling monorepo.

### Option C: Single Next.js Monolith for Everything — *Considered & Deferred*
- **Trade-offs**: Mengorbankan keunggulan default zero-JS HTML rendering dari Astro, membebani RAM VPS untuk traffic publik, dan memerlukan penulisan ulang landing page.

---

## 5. Architectural Specifications

### 5.0 Core Decisions from Builder Review
- **RFQ Flow Model**: Strictly direct per-product/per-warehouse inline modal (`[slug].astro`). Tanpa keranjang multi-gudang yang rumit. Formulir mencatat volume (ton/kg), gudang distribusi asal, kota tujuan pengiriman, dan kontak pembeli, lalu memformat pesan inquiry WhatsApp dan mencatat lead ke `RFQInquiry`.
- **Public Catalog Rendering**: Astro Static Site Generation (SSG) untuk semua halaman komoditas barang perikanan. Angka tonase tersedia dan modal RFQ dihidrasi client-side via React Islands memanggil `admin.fisherytrade.com/api/catalog/stock`.
- **Stock Allocation Lifecycle**: RFQ bersifat inquiry komersial (non-binding). Stok TIDAK langsung terkunci saat RFQ dikirim; pemotongan fisik terjadi ketika staf gudang menginput Goods Issue `OUTBOUND_SALE` di Next.js WMS.
- **Logistics Engine**: Simulasi kapasitas armada logistik (CDD Truk ~4 Ton, Fuso Truk ~8 Ton, Kontainer 20ft ~14 Ton) dipadukan dengan estimasi tarif wilayah Shipper.id.

### 5.1 Monorepo Workspace Structure
```text
fisherytrade/
├── apps/
│   ├── web/                    # Astro 5 (Marketplace Barang Perikanan & Web Publik)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── index.astro         # Main Landing Page Marketplace Barang Perikanan
│   │   │   │   ├── shop/               # Katalog B2B Marketplace Barang Perikanan
│   │   │   │   │   ├── index.astro     # Daftar Barang Perikanan + Filter Gudang Distribusi
│   │   │   │   │   └── [slug].astro    # Detail Produk Perikanan + Form RFQ
│   │   │   │   └── ...
│   │   │   └── components/react/       # Interactive Islands (RFQ modal, filters)
│   │   ├── package.json
│   │   └── astro.config.mjs
│   │
│   └── admin/                  # Next.js 15 (WMS Gudang Distribusi & API)
│       ├── src/
│       │   ├── app/
│       │   │   ├── api/                # Public & Internal API endpoints
│       │   │   │   ├── catalog/        # Katalog barang perikanan & ketersediaan stok
│       │   │   │   ├── rfq/            # Penanganan RFQ masuk
│       │   │   │   └── shipper/        # Estimasi ongkos kirim armada logistik
│       │   │   ├── (auth)/login/       # Login admin gudang
│       │   │   └── (dashboard)/        # Panel WMS Gudang Distribusi
│       │   │       ├── overview/       # Ringkasan eksekutif & total tonase
│       │   │       ├── inventory/      # Stok per gudang distribusi & batch
│       │   │       ├── inbound/        # Penerimaan Barang (Nelayan/Supplier)
│       │   │       ├── outbound/       # Pengeluaran Barang & Surat Jalan/Resi
│       │   │       ├── opname/         # Stock Opname & penyesuaian susut
│       │   │       └── alerts/         # Peringatan Aging Stock FIFO
│       │   └── lib/
│       └── package.json
│
├── packages/
│   ├── database/               # Prisma Schema & Client generator
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   └── src/index.ts
│   │
│   ├── types/                  # Shared TypeScript Interfaces
│   │   └── src/
│   │       ├── commodity.ts    # Spesifikasi barang perikanan, olahan, grade
│   │       ├── warehouse.ts    # Lokasi & kapasitas gudang distribusi perikanan
│   │       ├── inventory.ts    # Batch barang, tanggal FIFO, mutasi stok
│   │       └── rfq.ts          # Permintaan penawaran & kalkulasi logistik
│   │
│   └── tsconfig/               # Shared TypeScript configurations
│
├── package.json                # Root package.json (pnpm workspaces)
├── pnpm-workspace.yaml
└── turbo.json                  # Pipeline config (build, dev, lint)
```

### 5.2 Port & Networking Layout

| Environment | Application | URL / Port | Hosting Target |
|---|---|---|---|
| **Local Dev** | Astro Web & Marketplace | `http://localhost:4321` | Local Node.js |
| **Local Dev** | Next.js Admin & API | `http://localhost:4000` | Local Node.js |
| **Production** | Public Web (`/`, `/shop`) | `https://fisherytrade.com` | Cloudflare Pages (SSG / Edge) |
| **Production** | Admin WMS & API | `https://admin.fisherytrade.com` | VPS (Node.js runtime via PM2 / Docker) |

### 5.3 Core Database Entities (Prisma)
1. **Warehouse / DistributionHub**: ID, name, code (`JKT-01`, `LMG-01`, `DPS-01`, `BTG-01`), address, province, coordinates, max_capacity_ton, pic_contact.
2. **Commodity**: ID, common_name_id, scientific_name, slug, category (Pelagis, Demersal, Crustacea, Olahan Perikanan), image_url, description.
3. **ProductSpec**: ID, commodity_id, processing_type (Whole Round, Gutted, Fillet, Loin, Daging Olahan), packaging_type (Master Box, Kemasan Vakum, Karung Curah), grade (A, B, Export), size_specification, moq_kg, base_price_per_kg, price_visibility (VISIBLE / REQUEST_ONLY).
4. **BatchInventory**: ID, batch_code (unique auto-generated), warehouse_id, product_spec_id, initial_tonnage, available_tonnage, inbound_date, expiry_date, status (ACTIVE, DEPLETED, AGING_ALERT).
5. **StockMovement**: ID, batch_id, type (INBOUND_PURCHASE, OUTBOUND_SALE, OPNAME_ADJUSTMENT, SHRINKAGE_LOSS), quantity_kg, reason_code, created_at, created_by.
6. **RFQInquiry**: ID, rfq_number, buyer_name, buyer_company, buyer_phone, warehouse_source_id, items (JSON), estimated_weight_kg, shipper_destination_city, estimated_shipping_cost, status (PENDING, QUOTED, DEAL, CANCELLED).

---

## 6. What's Left to the Builder (Implementation Details)

1. **Admin Authentication Strategy**: Session-based auth menggunakan cookie atau JWT lightweight dengan Bcrypt untuk peran admin gudang.
2. **UI Component Library Integration**: Penggunaan shadcn/ui primitives (`Button`, `Table`, `Dialog`, `Badge`, `Card`) di `apps/admin`.
3. **WhatsApp Deep Link Format**: Template string pesan WhatsApp terformat otomatis untuk permintaan penawaran barang perikanan dari calon pembeli ke tim sales.
4. **Shipper.id Client Wrapper**: HTTP client estimasi tarif pengiriman armada logistik berdasarkan kota tujuan pembeli.
5. **Konsistensi Brand**: Menjaga identitas FisheryTrade sebagai Marketplace Barang Perikanan B2B nomor satu di Indonesia.
