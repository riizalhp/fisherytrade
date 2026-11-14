# Monorepo Workspace & Next.js Admin WMS Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform the project into a Turborepo monorepo by migrating `triagro-landingpage` into `apps/web` (Astro 5 on port 4321 as B2B Marketplace Barang Perikanan) and creating `apps/admin` (Next.js 15 App Router on port 4000) with a full "SAP-Lite" Multi-Warehouse WMS for fishery goods and backend APIs.

**Architecture:** Turborepo + pnpm workspace containing `apps/web` (public marketing & `/shop` marketplace barang perikanan in Astro), `apps/admin` (authenticated warehouse management & REST APIs in Next.js on port 4000), and `packages/types` & `packages/database` (Prisma + PostgreSQL) for unified TypeScript type safety.

**Tech Stack:** Next.js 15 (App Router), TypeScript 5, Astro 5, Tailwind CSS, shadcn/ui, Lucide Icons, Prisma ORM, Turborepo, pnpm.

**Spec:** `docs/superpowers/specs/2026-11-13-fisherytrade-monorepo-marketplace-design.md`

## Global Constraints

- Monorepo package manager: `pnpm` workspaces with `turbo.json`.
- Port allocations: `apps/web` on `4321` (Astro), `apps/admin` on `4000` (Next.js).
- Shared language: 100% TypeScript throughout apps and packages.
- Admin UI aesthetics: Clean maritime industrial / SAP-Lite theme using shadcn/ui and Lucide icons.
- No heavy server-side headless browsers: All exports/prints must be client-side or stream-based.

## Review Focus

- Cross-app port collision: Astro dev server running on 4321 while Next.js dev server runs on 4000 simultaneously without port overlap.
- Package dependency resolution: `apps/admin` and `apps/web` can import from internal packages (`@fisherytrade/types`) without transpilation errors.
- Warehouse batch numbering: Batch codes must generate deterministically per warehouse prefix (e.g. `JKT-2611-XXXX`).
- Non-negative inventory guard: Inbound adds tonnage; Outbound cannot deduct beyond current available batch tonnage.
- Aging stock FIFO calculation: Batches with inbound date older than 45 days and 90 days trigger high-visibility alerts.

---

### Task 1: Monorepo Workspace Structure & Web Migration

**Files:**
- Create: `pnpm-workspace.yaml`
- Create: `package.json` (root)
- Create: `turbo.json`
- Modify: `apps/web/package.json` (relocated from `triagro-landingpage`)
- Test: `pnpm build` or package workspace check

**Interfaces:**
- Consumes: Existing Astro files in `triagro-landingpage/`
- Produces: `apps/web` running on port 4321 with name `@fisherytrade/web`

- [x] **Step 1: Write root workspace configuration files**
  Create `pnpm-workspace.yaml` declaring packages in `apps/*` and `packages/*`. Create root `package.json` with scripts: `"dev": "turbo dev"`, `"build": "turbo build"`.
- [x] **Step 2: Move and rename `triagro-landingpage` to `apps/web`**
  Move folder contents into `apps/web`, update `apps/web/package.json` name to `@fisherytrade/web`, and ensure `astro dev --port 4321` is explicitly configured.
- [x] **Step 3: Create `turbo.json` with pipeline definitions**
  Define `build`, `dev` (with `cache: false`, `persistent: true`), and `lint` pipeline tasks.
- [x] **Step 4: Verify root workspace resolution**
  Run: `pnpm install --no-frozen-lockfile`
  Expected: Successful resolution across root and `apps/web`.

---

### Task 2: Shared Types Package (`packages/types`)

**Files:**
- Create: `packages/types/package.json`
- Create: `packages/types/tsconfig.json`
- Create: `packages/types/src/index.ts`
- Create: `packages/types/src/commodity.ts`
- Create: `packages/types/src/warehouse.ts`
- Create: `packages/types/src/inventory.ts`
- Create: `packages/types/src/rfq.ts`

**Interfaces:**
- Consumes: None
- Produces: Exported TypeScript interfaces (`Warehouse`, `Commodity`, `ProductSpec`, `BatchInventory`, `StockMovement`, `RFQInquiry`)

- [x] **Step 1: Define `commodity.ts` and `warehouse.ts`**
  Define interfaces for fishery goods species, grades (A, B, Export), processing cuts (Whole, Gutted, Fillet, Loin), and Warehouse facilities (Jakarta, Lamongan, Bali, Bitung).
- [x] **Step 2: Define `inventory.ts` and `rfq.ts`**
  Define `BatchInventory` with aging alert states, `StockMovement` reason codes (Inbound, Outbound, Shrinkage Loss, Opname Adjustment), and `RFQInquiry` structure.
- [x] **Step 3: Export all types from `packages/types/src/index.ts`**
- [x] **Step 4: Verify TypeScript compilation in `packages/types`**
  Run: `pnpm --filter @fisherytrade/types build` or `tsc --noEmit`
  Expected: PASS with zero type errors.

---

### Task 3: Next.js Admin App Scaffolding (`apps/admin`)

**Files:**
- Create: `apps/admin/package.json`
- Create: `apps/admin/tsconfig.json`
- Create: `apps/admin/next.config.mjs`
- Create: `apps/admin/src/app/layout.tsx`
- Create: `apps/admin/src/app/page.tsx`
- Create: `apps/admin/src/styles/globals.css`

**Interfaces:**
- Consumes: `@fisherytrade/types`
- Produces: Next.js 15 App Router running on port 4000

- [x] **Step 1: Create `apps/admin/package.json`**
  Configure dependencies: Next.js 15, React 19, Tailwind CSS, Lucide React, clsx, tailwind-merge, and `@fisherytrade/types: workspace:*`. Port set to 4000 in scripts (`next dev -p 4000`).
- [x] **Step 2: Configure `apps/admin/next.config.mjs` and Tailwind**
  Setup standard Next.js config with transpilePackages: `['@fisherytrade/types']`.
- [x] **Step 3: Setup Root Layout with maritime sidebar navigation**
  Create shared dashboard layout with links to Overview, Gudang & Stok, Penerimaan (Inbound), Pengeluaran (Outbound), Stock Opname, and Alert Penuaan (FIFO).
- [x] **Step 4: Verify Next.js dev server starts on port 4000**
  Run: `pnpm --filter @fisherytrade/admin build`
  Expected: PASS

---

### Task 4: WMS Inventory & Multi-Warehouse Management

**Files:**
- Create: `apps/admin/src/lib/mock-data.ts`
- Create: `apps/admin/src/app/(dashboard)/inventory/page.tsx`
- Create: `apps/admin/src/components/inventory/WarehouseSelector.tsx`
- Create: `apps/admin/src/components/inventory/BatchTable.tsx`

**Interfaces:**
- Consumes: `@fisherytrade/types` (`Warehouse`, `BatchInventory`)
- Produces: Filterable inventory table by warehouse and batch status

- [x] **Step 1: Create mock WMS dataset in `apps/admin/src/lib/mock-data.ts`**
  Populate realistic data for 4 distribution warehouses (Jakarta Muara Baru, Lamongan, Bali Benoa, Bitung) and fishery goods commodities (Tuna Yellowfin, Cakalang, Udang Vaname, Kakap Merah) with batch codes and FIFO inbound dates.
- [x] **Step 2: Implement Warehouse Selector component**
  Tabbed / dropdown switcher showing total tonnage capacity and occupancy percentage per warehouse.
- [x] **Step 3: Implement Batch Table with FIFO badges**
  Table displaying Batch Code, Commodity, Grade, Packaging/Processing Type, Inbound Date, Available Tonnage, and Aging Status (Normal, >45 Hari Kuning, >90 Hari Merah).
- [x] **Step 4: Verify type checks and page rendering**
  Run: `pnpm --filter @fisherytrade/admin build`
  Expected: PASS

---

### Task 5: Inbound (Goods Receipt) & Outbound (Goods Issue) Modules

**Files:**
- Create: `apps/admin/src/app/(dashboard)/inbound/page.tsx`
- Create: `apps/admin/src/app/(dashboard)/outbound/page.tsx`
- Create: `apps/admin/src/components/forms/GoodsReceiptForm.tsx`
- Create: `apps/admin/src/components/forms/GoodsIssueForm.tsx`

**Interfaces:**
- Consumes: `@fisherytrade/types` (`StockMovement`, `BatchInventory`)
- Produces: Inbound nelayan/supplier logging with batch generator, and Outbound delivery note/resi logger

- [x] **Step 1: Implement Goods Receipt (Inbound) Form**
  Form with fields: Gudang Tujuan, Nelayan/Supplier, Komoditas, Olahan, Grade, Berat Masuk (Kg/Ton). Auto-generates unique batch code (`GD-YYMM-XXXX` / `CS-YYMM-XXXX`).
- [x] **Step 2: Implement Goods Issue (Outbound) Form**
  Form with fields: Target Batch selection, Buyer Name, Volume Keluar (Kg/Ton), Nomor Surat Jalan / Resi Shipper, Driver Name & Truck Plate. Validates volume <= available batch tonnage.
- [x] **Step 3: Create Recent Transactions Log on both pages**
  Display recent inbound receipts and outbound dispatches with timestamp, user, and status.
- [x] **Step 4: Verify compile and type checks**
  Run: `pnpm --filter @fisherytrade/admin build`
  Expected: PASS

---

### Task 6: Stock Opname & Aging Stock Alert (FIFO) Module

**Files:**
- Create: `apps/admin/src/app/(dashboard)/opname/page.tsx`
- Create: `apps/admin/src/app/(dashboard)/alerts/page.tsx`
- Create: `apps/admin/src/components/opname/OpnameSheetTable.tsx`
- Create: `apps/admin/src/components/alerts/AgingStockCard.tsx`

**Interfaces:**
- Consumes: `@fisherytrade/types` (`BatchInventory`, `StockMovement`)
- Produces: Stock opname variance calculator (Susut / kemasan rusak) and 1-Click WA/PDF Daily Stock blast generator

- [x] **Step 1: Implement Stock Opname Sheet Table**
  Columns: Batch Code, Sistem (Ton), Fisik (Ton), Selisih (Variance), Reason Code dropdown (`Susut Timbangan`, `Kemasan Rusak`, `Kualitas Menurun`, `Koreksi Input`), Catatan Petugas.
- [x] **Step 2: Implement Aging Stock Alert (FIFO >45 / >90 Hari)**
  Filter cards grouping batches: Green (<45 days), Yellow (45-90 days - Prioritas Jual Segera), Red (>90 days - Kritis Segera Obral/Cuci Gudang).
- [x] **Step 3: Add 1-Click WhatsApp Daily Stock Summary generator**
  Button generating pre-formatted WhatsApp text summarizing stock per warehouse ready to broadcast to B2B buyers.
- [x] **Step 4: Verify build succeeds**
  Run: `pnpm --filter @fisherytrade/admin build`
  Expected: PASS

---

### Task 7: Public REST APIs for Astro Marketplace (`apps/admin/src/app/api/...`)

**Files:**
- Create: `apps/admin/src/app/api/catalog/route.ts`
- Create: `apps/admin/src/app/api/rfq/route.ts`
- Create: `apps/admin/src/app/api/shipper/route.ts`

**Interfaces:**
- Consumes: Inbound HTTP requests with `@fisherytrade/types`
- Produces: JSON response for commodities, stock availability, RFQ submission, and shipping estimate

- [x] **Step 1: Implement `GET /api/catalog`**
  Returns active commodities, grades, processing specs, and available tonnages per warehouse.
- [x] **Step 2: Implement `POST /api/rfq`**
  Receives RFQ payload (buyer name, company, phone, commodity, volume, source warehouse, destination city), validates with types, generates RFQ ID, and returns WhatsApp deep-link string.
- [x] **Step 3: Implement `POST /api/shipper`**
  Returns estimated truck capacity (CDD/Fuso/Container) and rate heuristic based on source warehouse and destination city.
- [x] **Step 4: Verify API route type checks and tests**
  Run: `pnpm --filter @fisherytrade/admin build`
  Expected: PASS
