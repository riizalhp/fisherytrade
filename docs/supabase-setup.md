# Supabase Project Setup & Credentials - FisheryTrade

Dokumen ini mencatat konfigurasi dan identitas akun Supabase untuk monorepo FisheryTrade.

---

## 1. Identitas Akun & Kepemilikan

> **PENTING / TANDA AKUN**:  
> Akun Supabase ini terdaftar & dikelola melalui akun **ChatGPT Gmail**:  
> **`jbbarkassmg@gmail.com`**

---

## 2. Kredensial & Detail Koneksi

| Parameter | Nilai | Keterangan |
|---|---|---|
| **Project Ref** | `nrumbfvfdolguzmczbsk` | ID unik project Supabase |
| **Project URL** | `https://nrumbfvfdolguzmczbsk.supabase.co` | Endpoint REST / Auth / Storage |
| **Publishable / Anon Key** | `sb_publishable_g8Sd-h_u6P3Qj_Uj_JvIoQ_tfUem7vV` | Client-side public key |
| **Database Password** | `Sembarang-123` | Password user `postgres` |
| **Direct PostgreSQL URI** | `postgresql://postgres:Sembarang-123@db.nrumbfvfdolguzmczbsk.supabase.co:5432/postgres` | Direct connection (IPv6) |
| **Owner Email** | `jbbarkassmg@gmail.com` | Login via Google/ChatGPT |

---

## 3. Status Supabase CLI di Workspace

1. **Supabase CLI**:
   - Telah ditambahkan sebagai root devDependency (`pnpm supabase` / `npx supabase`).
   - Script shortcut `pnpm supabase` sudah terdaftar di root `package.json`.

2. **Inisialisasi (`supabase init`)**:
   - Telah selesai dijalankan (`supabase/config.toml` sudah terbuat).

3. **Project Link Local (`supabase link`)**:
   - Project ref `nrumbfvfdolguzmczbsk` sudah diset di `supabase/.temp/project-ref`.
   - `pnpm supabase status` sudah mengenali project ref ini.

---

## 4. Langkah Login CLI (Interactive Personal Access Token)

Supabase CLI memerlukan **Personal Access Token (PAT)** untuk berinteraksi dengan Supabase Management API (seperti untuk `supabase link`, `supabase db pull`, `supabase db push`, dan `supabase gen types`):

### Cara 1: Login via Browser (Otomatis)
Buka terminal interaktif Anda di folder project dan jalankan:
```bash
pnpm supabase login
```
Perintah ini akan membuka browser. Pastikan Anda login dengan akun Google/ChatGPT: **`jbbarkassmg@gmail.com`**, lalu konfirmasi otorisasi CLI.

### Cara 2: Login via Personal Access Token
1. Buka dashboard token Supabase: [https://supabase.com/dashboard/account/tokens](https://supabase.com/dashboard/account/tokens) (login dengan `jbbarkassmg@gmail.com`).
2. Klik **Generate new token**, beri nama misalnya `fisherytrade-cli`.
3. Salin token (dimulai dengan `sbp_...`).
4. Jalankan perintah di terminal:
   ```bash
   pnpm supabase login --token sbp_xxxxxxxxxxxxxxxxxxxxxxxx
   ```
5. Setelah login, jalankan link remote:
   ```bash
   pnpm supabase link --project-ref nrumbfvfdolguzmczbsk
   ```
   *(Masukkan database password `Sembarang-123` jika diminta)*

---

## 5. Lokasi Konfigurasi Environment di Monorepo

- **Template Global**: [`.env.example`](file:///d:/CODING/fisherytrade/.env.example)
- **Admin App (Next.js)**: [`apps/admin/.env.local`](file:///d:/CODING/fisherytrade/apps/admin/.env.local)
- **Web / Marketplace (Astro)**: [`apps/web/.env.local`](file:///d:/CODING/fisherytrade/apps/web/.env.local)
