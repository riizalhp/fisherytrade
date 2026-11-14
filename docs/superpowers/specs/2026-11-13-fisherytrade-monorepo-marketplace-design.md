# Design Document: FisheryTrade Monorepo Architecture (Astro Web/Shop + Next.js Admin WMS)

**Date**: 2026-11-13  
**Status**: Pending Review / Builder Check  
**Author**: Fullstack Tech Partner  
**Target Delivery**: Fishery Trade — B2B Marketplace & Multi-Cold Storage WMS (Phase 1)

---

## 1. Intent and The Why

Fishery Trade requires a B2B seafood marketplace and cold storage warehouse management system (WMS "SAP-Lite"). 
The business model serves commercial buyers (horeca, distributors, exporters) requiring transparency into cold storage stock locations (Jakarta, Lamongan, Bali, Bitung), freezing methods (IQF/Air Blast), fish grades, and structured Request-for-Quotation (RFQ) order flows with Shipper.id logistics calculation.

To maximize organic search engine visibility (SEO) for commodity seafood terms while keeping back-office operations secure, fast, and maintainable by a single engineering team within a 3-week delivery window, the system adopts a unified TypeScript monorepo architecture:
- **Public & Marketplace Catalog**: High-performance Static Site Generation (SSG) in **Astro 5** under `fisherytrade.com` and `fisherytrade.com/shop`.
- **Admin Control & Backend API**: Robust fullstack **Next.js (App Router)** under `admin.fisherytrade.com` for WMS inventory management, batch tracking, Shipper.id API integration, and RFQ intake.

---

## 2. Goals, Non-Goals, and Anti-Goals

### 2.1 Goals
1. **Unified TypeScript Monorepo**: Establish a pnpm + Turborepo monorepo sharing database schemas and TypeScript interfaces across frontend and backend.
2. **SEO-Dominant Marketplace URL**: Serve the public seafood catalog under `fisherytrade.com/shop` within the Astro app to capture domain equity.
3. **Multi-Cold Storage Stock Transparency**: Enable buyers to view real-time available tonnage by warehouse location and grade.
4. **Structured RFQ & Logistics**: Collect buyer RFQs, compute truck capacity / container simulation, estimate shipping rates via Shipper.id API, and route inquiries to sales via WhatsApp.
5. **Back-Office WMS ("SAP-Lite")**: Provide warehouse admins with batch management, Goods Receipt (Inbound), Goods Issue (Outbound), Stock Opname, FIFO aging alerts (>45/90 days), and daily stock report exports.

### 2.2 Non-Goals (Phase 1)
- **Direct Online B2C Payment**: No instant payment gateway / credit card checkout in Phase 1 (B2B transactions proceed via RFQ, proforma invoices, and bank transfer).
- **Automated IoT Hardware Integration**: Cold storage temperature sensors are recorded manually at Goods Receipt, not via live IoT hardware in Phase 1.
- **Complex Escrow / Bank L/C**: Letter of Credit automation and maritime customs integration are reserved for Phase 2/3 (Export expansion).

### 2.3 Anti-Goals
- **Splitting into Isolated Unshared Repositories**: Avoid duplicate TypeScript types for fish species, cuts, and warehouses across separate codebases.
- **Subdomain for Marketplace (`shop.fisherytrade.com`)**: Discarded to prevent diluting main domain search engine rankings.
- **Heavy Headless Browser / Puppeteer on Server**: All PDF reports (Daily Stock / Surat Jalan) must use lightweight client-side or stream-based generators.

---

## 3. Constraints

- **Project Timeline**: 3 Weeks (15 Working Days) across 3 milestone payment stages.
- **Fixed Budget**: IDR 15,000,000 all-in development fee.
- **Infrastructure Overhead**: Minimal server OPEX so monthly retainer (IDR 1,500,000/mo) remains ~90% profit. Astro runs on zero-cost edge CDN (Cloudflare Pages); Next.js runs on a single low-spec VPS (2GB RAM).
- **Existing Asset**: Existing landing page codebase in `triagro-landingpage/` (Astro 5, React, Tailwind CSS 3.4) to be migrated into `apps/web/`.

---

## 4. Approaches Considered & Selected

### Option A: Unified Monorepo (Astro for Web/Shop + Next.js for Admin & API) — **SELECTED**
- **Architecture**: Turborepo workspace. `apps/web` (Astro) consumes REST/JSON from `apps/admin` (Next.js). Shared types and Prisma database client live in `packages/`.
- **Trade-offs**: Requires building custom WMS UI components in Next.js using shadcn/ui and TanStack Table, but maintains 100% TypeScript consistency, zero context-switching, and seamless type-sharing.
- **Selection Rationale**: Best balance between long-term maintainability, developer familiarity, clean separation of public CDN traffic from authenticated admin compute, and single-language ecosystem.

### Option B: Laravel Filament + Astro Frontend — *Considered & Deferred*
- **Trade-offs**: Filament provides fastest out-of-the-box WMS CRUD tables, but introduces PHP/Composer runtime alongside Node.js, complicating local tooling and preventing shared TypeScript models.

### Option C: Single Next.js Monolith for Everything — *Considered & Deferred*
- **Trade-offs**: Eliminates Astro entirely, but sacrifices Astro’s zero-JS default HTML rendering speed, increases VPS resource consumption for public traffic, and requires rewriting existing Astro landing page work.

---

## 5. Architectural Specifications

### 5.0 Core Decisions from Builder Review
- **RFQ Flow Model**: Strictly direct per-product/per-warehouse inline modal (`[slug].astro`). No multi-warehouse cart required. Form collects volume (ton/kg), cold storage source, delivery destination, and buyer contact, formatting an auto-routed WhatsApp inquiry and recording lead into `RFQInquiry`.
- **Public Catalog Rendering**: Astro Static Site Generation (SSG) for all commodity SEO pages on Cloudflare Pages. Real-time available tonnage numbers and the RFQ modal are hydrated client-side via React Islands calling `admin.fisherytrade.com/api/catalog/stock`.
- **Stock Allocation Lifecycle**: RFQs are non-binding commercial inquiries. Stock is NOT auto-locked on RFQ submission; physical deduction occurs strictly when warehouse staff record an `OUTBOUND_SALE` Goods Issue in Next.js WMS.
- **Logistics Engine**: Cold-chain truck capacity heuristics (CDD Reefer ~4 Ton, Fuso Reefer ~8 Ton, 20ft Reefer ~14 Ton) combined with Shipper.id regional tariff estimation.

### 5.1 Monorepo Workspace Structure
```text
fisherytrade/
├── apps/
│   ├── web/                    # Astro 5 (Static Site / Hybrid)
│   │   ├── src/
│   │   │   ├── pages/
│   │   │   │   ├── index.astro         # Main Landing Page
│   │   │   │   ├── shop/               # B2B Marketplace Catalog
│   │   │   │   │   ├── index.astro     # Catalog list + Cold Storage filter
│   │   │   │   │   └── [slug].astro    # Fish product detail + RFQ Form
│   │   │   │   └── ...
│   │   │   └── components/react/       # Interactive Islands (RFQ modal, filters)
│   │   ├── package.json
│   │   └── astro.config.mjs
│   │
│   └── admin/                  # Next.js 15 (App Router + shadcn/ui)
│       ├── src/
│       │   ├── app/
│       │   │   ├── api/                # Public & Internal API endpoints
│       │   │   │   ├── catalog/        # Products & available stock
│       │   │   │   ├── rfq/            # Inbound RFQ submissions
│       │   │   │   └── shipper/        # Shipping rate estimator
│       │   │   ├── (auth)/login/       # Warehouse admin login
│       │   │   └── (dashboard)/        # WMS Dashboard screens
│       │   │       ├── overview/       # Executive summary & tonnage
│       │   │       ├── inventory/      # Stock by cold storage & batch
│       │   │       ├── inbound/        # Goods Receipt (Nelayan)
│       │   │       ├── outbound/       # Goods Issue & Resi
│       │   │       ├── opname/         # Stock Opname sheets
│       │   │       └── alerts/         # Aging Stock FIFO warnings
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
│   │       ├── commodity.ts    # Fish specs, cuts, grades, freezing types
│   │       ├── warehouse.ts    # Cold storage locations & capacities
│   │       ├── inventory.ts    # Batches, FIFO dates, stock movements
│   │       └── rfq.ts          # Order requests & Shipper calculation
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
| **Local Dev** | Astro Web & Shop | `http://localhost:4321` | Local Node.js |
| **Local Dev** | Next.js Admin & API | `http://localhost:3000` | Local Node.js |
| **Production** | Public Web (`/`, `/shop`) | `https://fisherytrade.com` | Cloudflare Pages (SSG / Edge) |
| **Production** | Admin WMS & API | `https://admin.fisherytrade.com` | VPS (Node.js runtime via PM2 / Docker) |

### 5.3 Core Database Entities (Prisma)
1. **ColdStorage**: ID, name, code (`JKT-01`, `LMG-01`, `DPS-01`, `BTG-01`), address, province, coordinates, max_capacity_ton, pic_contact.
2. **Commodity**: ID, common_name_id, scientific_name, slug, category (Pelagis, Demersal, Crustacea), image_url, description.
3. **ProductSpec**: ID, commodity_id, processing_type (Whole Round, Gutted, Fillet, Loin), freezing_method (IQF, Air Blast), grade (A, B, Export), size_specification, moq_kg, base_price_per_kg, price_visibility (VISIBLE / REQUEST_ONLY).
4. **BatchInventory**: ID, batch_code (unique auto-generated), cold_storage_id, product_spec_id, initial_tonnage, available_tonnage, inbound_date, expiry_date, status (ACTIVE, DEPLETED, AGING_ALERT).
5. **StockMovement**: ID, batch_id, type (INBOUND_PURCHASE, OUTBOUND_SALE, OPNAME_ADJUSTMENT, GLAZING_LOSS), quantity_kg, reason_code, created_at, created_by.
6. **RFQInquiry**: ID, rfq_number, buyer_name, buyer_company, buyer_phone, cold_storage_source_id, items (JSON), estimated_weight_kg, shipper_destination_city, estimated_shipping_cost, status (PENDING, QUOTED, DEAL, CANCELLED).

---

## 6. What's Left to the Builder (Implementation Details)

The following tactical choices are left to the builder during step-by-step task execution:
1. **Admin Authentication Strategy**: Session-based auth using Auth.js (NextAuth) or lightweight JWT iron-session with Bcrypt for warehouse admin roles.
2. **UI Component Library Integration**: Setting up shadcn/ui primitives (`Button`, `Table`, `Dialog`, `Badge`, `Card`) in `apps/admin`.
3. **WhatsApp Deep Link Format**: Exact template string for formatting RFQ payloads into auto-routed WhatsApp sales messages.
4. **Shipper.id Client Wrapper**: Concrete HTTP client implementation adhering to Shipper v3 rate estimation API with fallback estimates if API credentials are in sandbox mode.
5. **Migration of `triagro-landingpage`**: Relocating existing Astro files into `apps/web` while updating asset imports and domain references (`site: 'https://fisherytrade.com'`).
