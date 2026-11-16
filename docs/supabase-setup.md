# FisheryTrade Supabase dan akses admin

## Katalog produk

Katalog `/produk` membaca data dari tabel `public.product_catalog` melalui server admin. Skema dan delapan produk dummy ada di migration [`supabase/migrations/20261114000000_product_catalog.sql`](../supabase/migrations/20261114000000_product_catalog.sql). Setelah CLI terhubung ke project yang benar, terapkan migration dari root repo:

```bash
pnpm supabase link --project-ref <project-ref>
pnpm supabase db push
```

Migration mengaktifkan Row Level Security dan tidak membuat kebijakan tulis anonim. Server admin terhubung ke PostgreSQL Supabase memakai `DATABASE_URL`; kredensial database tidak dikirim ke browser.

## Environment variables

Buat `apps/admin/.env.local` dari `.env.example`, lalu isi `DATABASE_URL`, `ADMIN_USERNAME`, `ADMIN_PASSWORD`, dan `ADMIN_SESSION_SECRET` dari konfigurasi deployment yang aman. `DATABASE_URL` harus berupa connection string PostgreSQL Supabase dan hanya boleh tersedia di server admin. Jika direct connection Supabase hanya menyediakan IPv6 dan environment pengembangan tidak punya rute IPv6, gunakan connection string Session Pooler yang mendukung IPv4 dari menu Connect di dashboard Supabase. Jangan commit `.env.local`.

Buat `apps/web/.env.local` dan set `PUBLIC_ADMIN_API_URL` ke URL publik admin API. Untuk pengembangan lokal nilainya `http://localhost:4000`; pada deployment, gunakan URL HTTPS aplikasi admin. `NEXT_PUBLIC_WEB_URL` dipakai untuk tautan kembali ke katalog publik dari sidebar admin.

## Login admin

Admin memakai username/password biasa dan cookie sesi bertanda tangan, bukan Supabase Auth. Di mode development saja, jika variabel belum diatur, tersedia akun demo `admin` / `fisherytrade-demo`. Sebelum deployment, wajib atur username, password yang kuat, dan `ADMIN_SESSION_SECRET` acak; tanpa konfigurasi ini login produksi ditolak.

## Catatan keamanan

Jangan masukkan password database, API key rahasia, atau kredensial admin ke file tracked. Nilai database yang sebelumnya pernah tersimpan di file repo sebaiknya dirotasi dan diganti hanya di environment aman, termasuk environment deployment. File `.env.local` sudah diabaikan Git.
