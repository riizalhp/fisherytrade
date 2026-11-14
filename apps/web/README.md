# Triagro - Solusi Pertanian Modern

Landing page PT. Triagro Hijrah Jaya, dibangun dengan [Astro](https://astro.build) dan Tailwind CSS.

## Run Locally

**Prerequisites:** Node.js 20.3+ atau 22+

1. Install dependencies:
   `npm install`
2. Run the dev server:
   `npm run dev`

## Build

`npm run build` menghasilkan situs statis di folder `dist/`. Pratinjau hasil build dengan `npm run preview`.

## Struktur Proyek

- `src/pages/` — halaman statis (route file-based). Detail produk, studi kasus, blog, dan karir memakai `getStaticPaths` dari data di `src/constants.tsx`.
- `src/layouts/Layout.astro` — shell HTML: meta/SEO, Google Tag Manager, font, header, CTA, dan footer.
- `src/components/` — komponen section. Komponen presentasional dirender sebagai HTML statis; komponen interaktif (header, accordion FAQ, form, galeri produk, footer) di-hydrate dengan directive `client:*`.
- `src/styles/global.css` — Tailwind entry, scrollbar, dan gaya konten artikel.
- `public/` — asset statis (favicon, robots, sitemap).

Konten (produk, blog, testimoni, lowongan, studi kasus, FAQ) diubah di `src/constants.tsx`.
