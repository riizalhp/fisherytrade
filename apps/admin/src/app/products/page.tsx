'use client';

import { useCallback, useEffect, useMemo, useState, type FormEvent } from 'react';
import { Header } from '@/components/layout/Header';
import { AlertCircle, CheckCircle2, Edit3, Loader2, Plus, RefreshCw, Search, Trash2, X } from 'lucide-react';

type CatalogProduct = {
  id: string;
  sku: string;
  slug: string;
  name: string;
  englishName: string;
  scientificName: string;
  category: string;
  imageUrl: string;
  images: string[];
  description: string;
  productFunction: string;
  problemTitle: string;
  problemDescription: string;
  volume: string;
  cutType: string;
  freezeMethod: string;
  grade: string;
  moqKg: number;
  pricePerKg: number;
  stockJakartaKg: number;
  stockLamonganKg: number;
  stockBaliKg: number;
  glazing: string;
  isActive: boolean;
  updatedAt: string;
};

type FormProduct = Omit<CatalogProduct, 'id' | 'sku' | 'updatedAt'>;
const blankProduct: FormProduct = {
  slug: '', name: '', englishName: '', scientificName: '', category: 'Ikan Pelagis', imageUrl: '', images: [],
  description: '', productFunction: '', problemTitle: '', problemDescription: '', volume: 'Master Box 10 kg',
  cutType: 'Whole Round', freezeMethod: 'IQF -25°C', grade: 'Grade A', moqKg: 100, pricePerKg: 0,
  stockJakartaKg: 0, stockLamonganKg: 0, stockBaliKg: 0, glazing: '', isActive: true,
};

const money = (amount: number) => `Rp ${Number(amount || 0).toLocaleString('id-ID')}`;
const stock = (amount: number) => `${Number(amount || 0).toLocaleString('id-ID')} kg`;

export default function ProductsPage() {
  const [products, setProducts] = useState<CatalogProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const [notice, setNotice] = useState('');
  const [query, setQuery] = useState('');
  const [editing, setEditing] = useState<CatalogProduct | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [originalSlug, setOriginalSlug] = useState('');
  const [form, setForm] = useState<FormProduct>(blankProduct);
  const [saving, setSaving] = useState(false);

  const refresh = useCallback(async () => {
    setLoading(true);
    setLoadError('');
    try {
      const response = await fetch('/api/catalog?admin=1', { cache: 'no-store' });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || 'Gagal memuat katalog dari database.');
      setProducts(json.data || []);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : 'Tidak dapat menghubungi Supabase.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { void refresh(); }, [refresh]);

  const filteredProducts = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase('id-ID');
    if (!needle) return products;
    return products.filter((product) => `${product.name} ${product.scientificName} ${product.sku} ${product.slug}`.toLocaleLowerCase('id-ID').includes(needle));
  }, [products, query]);

  const openCreate = () => {
    setEditing(null);
    setOriginalSlug('');
    setForm(blankProduct);
    setNotice('');
    setEditorOpen(true);
  };

  const openEdit = (product: CatalogProduct) => {
    setEditing(product);
    setOriginalSlug(product.slug);
    const { id, sku, updatedAt, ...fields } = product;
    setForm(fields);
    setNotice('');
    setEditorOpen(true);
  };

  const setField = <K extends keyof FormProduct>(key: K, value: FormProduct[K]) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const save = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    setNotice('');
    const endpoint = editing ? `/api/catalog?slug=${encodeURIComponent(originalSlug)}` : '/api/catalog';
    try {
      const response = await fetch(endpoint, {
        method: editing ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, images: form.imageUrl ? [form.imageUrl] : [] }),
      });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || 'Produk gagal disimpan.');
      setEditing(null);
      setEditorOpen(false);
      setNotice(editing ? 'Perubahan produk berhasil disimpan.' : 'Produk baru berhasil ditambahkan.');
      await refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Produk gagal disimpan.');
    } finally {
      setSaving(false);
    }
  };

  const remove = async (product: CatalogProduct) => {
    if (!window.confirm(`Hapus ${product.name} dari katalog? Tindakan ini tidak dapat dibatalkan.`)) return;
    setNotice('');
    try {
      const response = await fetch(`/api/catalog?slug=${encodeURIComponent(product.slug)}`, { method: 'DELETE' });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || 'Produk gagal dihapus.');
      setNotice(`${product.name} berhasil dihapus.`);
      await refresh();
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'Produk gagal dihapus.');
    }
  };

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <Header title="Katalog Produk" subtitle="Kelola produk, harga, dan stok yang tampil di marketplace /produk" />
      <main className="p-6 space-y-5 max-w-7xl w-full">
        <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Total produk di database</p>
            <p className="text-2xl font-black text-slate-900 mt-1">{products.length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
            <p className="text-xs text-slate-500">Produk aktif untuk publik</p>
            <p className="text-2xl font-black text-emerald-700 mt-1">{products.filter((product) => product.isActive).length}</p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm flex items-center justify-between gap-4">
            <div><p className="text-xs text-slate-500">Status sinkronisasi</p><p className="text-sm font-bold text-slate-800 mt-1">Supabase Catalog</p></div>
            <button onClick={() => void refresh()} className="p-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" aria-label="Muat ulang katalog"><RefreshCw className="w-4 h-4" /></button>
          </div>
        </section>

        {notice && <div className="rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-900 flex items-start gap-2"><CheckCircle2 className="w-4 h-4 mt-0.5 shrink-0" />{notice}</div>}
        {loadError && <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950 flex items-start gap-3"><AlertCircle className="w-5 h-5 mt-0.5 shrink-0" /><div><p className="font-bold">Koneksi katalog belum tersedia</p><p className="mt-1">{loadError}</p><p className="mt-2 text-xs text-amber-800">Jalankan migration Supabase dan isi DATABASE_URL pada environment server admin.</p></div></div>}

        <section className="rounded-xl border border-slate-200 bg-white shadow-sm overflow-hidden">
          <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm"><Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nama, SKU, atau slug produk" className="w-full pl-9 pr-3 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" /></div>
            <button onClick={openCreate} className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"><Plus className="w-4 h-4" />Tambah produk</button>
          </div>
          {loading ? <div className="p-12 text-center text-sm text-slate-500"><Loader2 className="w-5 h-5 mx-auto animate-spin mb-2" />Memuat katalog…</div> : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[920px] text-left text-sm">
                <thead className="bg-slate-50 text-[11px] uppercase tracking-wide text-slate-500"><tr><th className="px-4 py-3">Produk</th><th className="px-4 py-3">Harga / MOQ</th><th className="px-4 py-3">Stok per gudang</th><th className="px-4 py-3">Status</th><th className="px-4 py-3 text-right">Aksi</th></tr></thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredProducts.map((product) => <tr key={product.id} className="hover:bg-slate-50/80">
                    <td className="px-4 py-3"><div className="flex items-center gap-3"><img src={product.imageUrl} alt="" className="w-11 h-11 rounded-lg object-cover bg-slate-100" /><div><p className="font-bold text-slate-900">{product.name}</p><p className="text-xs text-slate-500">{product.sku} · {product.slug}</p><p className="text-xs text-slate-400">{product.category} · {product.cutType}</p></div></div></td>
                    <td className="px-4 py-3"><p className="font-bold text-slate-800">{money(product.pricePerKg)} / kg</p><p className="text-xs text-slate-500">MOQ {product.moqKg} kg</p></td>
                    <td className="px-4 py-3 text-xs text-slate-600 space-y-0.5"><p>Muara Baru: {stock(product.stockJakartaKg)}</p><p>Brondong: {stock(product.stockLamonganKg)}</p><p>Benoa: {stock(product.stockBaliKg)}</p></td>
                    <td className="px-4 py-3"><span className={`rounded-full px-2.5 py-1 text-[11px] font-bold ${product.isActive ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>{product.isActive ? 'Aktif' : 'Nonaktif'}</span></td>
                    <td className="px-4 py-3"><div className="flex justify-end gap-2"><button onClick={() => openEdit(product)} className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2.5 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"><Edit3 className="w-3.5 h-3.5" />Ubah</button><button onClick={() => void remove(product)} className="p-2 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50" aria-label={`Hapus ${product.name}`}><Trash2 className="w-4 h-4" /></button></div></td>
                  </tr>)}
                  {!filteredProducts.length && !loadError && <tr><td colSpan={5} className="p-10 text-center text-sm text-slate-500">Belum ada produk di database. Tambahkan produk atau jalankan seed data.</td></tr>}
                  {!filteredProducts.length && loadError && <tr><td colSpan={5} className="p-10 text-center text-sm text-slate-500">Daftar akan tampil setelah koneksi Supabase disiapkan.</td></tr>}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>

      <ProductEditor
        open={editorOpen}
        product={form}
        isEditing={Boolean(editing)}
        saving={saving}
        onClose={() => { setEditing(null); setEditorOpen(false); setNotice(''); }}
        onChange={setField}
        onSubmit={save}
      />
    </div>
  );
}

function ProductEditor({
  open, product, isEditing, saving, onClose, onChange, onSubmit,
}: {
  open: boolean;
  product: FormProduct;
  isEditing: boolean;
  saving: boolean;
  onClose: () => void;
  onChange: <K extends keyof FormProduct>(key: K, value: FormProduct[K]) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}) {
  if (!open) return null;
  const textField = (label: string, key: keyof FormProduct, type = 'text') => (
    <label className="block text-xs font-semibold text-slate-700">{label}<input required={['slug', 'name', 'category', 'volume', 'cutType', 'freezeMethod', 'grade'].includes(String(key))} type={type} value={String(product[key] ?? '')} onChange={(event) => onChange(key, (type === 'number' ? Number(event.target.value) : event.target.value) as never)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20" /></label>
  );
  return (
    <div className="fixed inset-0 z-50 bg-slate-950/45 p-4 flex items-center justify-center" role="dialog" aria-modal="true" aria-labelledby="product-editor-title">
      <form onSubmit={onSubmit} className="w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-2xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-4"><div><h2 id="product-editor-title" className="font-bold text-slate-900">{isEditing ? 'Ubah produk' : 'Tambah produk'}</h2><p className="text-xs text-slate-500 mt-0.5">Data ini langsung dipakai katalog /produk setelah tersimpan.</p></div><button type="button" onClick={onClose} className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg" aria-label="Tutup"><X className="w-4 h-4" /></button></div>
        <div className="p-5 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{textField('Nama produk', 'name')}{textField('Slug URL', 'slug')}{textField('Nama Inggris', 'englishName')}{textField('Nama ilmiah', 'scientificName')}{textField('Kategori', 'category')}{textField('Jenis potongan', 'cutType')}{textField('Metode pembekuan', 'freezeMethod')}{textField('Grade', 'grade')}{textField('Kemasan / volume', 'volume')}{textField('MOQ (kg)', 'moqKg', 'number')}{textField('Harga per kg (Rp)', 'pricePerKg', 'number')}{textField('Glazing', 'glazing')}{textField('URL gambar', 'imageUrl')}</div>
          <label className="block text-xs font-semibold text-slate-700">Deskripsi<textarea required rows={3} value={product.description} onChange={(event) => onChange('description', event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500/20" /></label>
          <label className="block text-xs font-semibold text-slate-700">Fungsi / rekomendasi penggunaan<textarea rows={2} value={product.productFunction} onChange={(event) => onChange('productFunction', event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500/20" /></label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3"><label className="block text-xs font-semibold text-slate-700">Masalah mutu / kebutuhan pelanggan<input value={product.problemTitle} onChange={(event) => onChange('problemTitle', event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500/20" /></label><label className="block text-xs font-semibold text-slate-700">Solusi / keterangan mutu<textarea rows={2} value={product.problemDescription} onChange={(event) => onChange('problemDescription', event.target.value)} className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm font-normal focus:outline-none focus:ring-2 focus:ring-blue-500/20" /></label></div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">{textField('Stok Muara Baru (kg)', 'stockJakartaKg', 'number')}{textField('Stok Brondong (kg)', 'stockLamonganKg', 'number')}{textField('Stok Benoa (kg)', 'stockBaliKg', 'number')}</div>
          <div className="flex items-center gap-2 text-sm text-slate-700"><input id="product-active" type="checkbox" checked={product.isActive} onChange={(event) => onChange('isActive', event.target.checked)} className="rounded border-slate-300" /><label htmlFor="product-active">Tampilkan produk di katalog publik</label></div>
        </div>
        <div className="sticky bottom-0 flex justify-end gap-2 border-t border-slate-200 bg-white px-5 py-4"><button type="button" onClick={onClose} className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700">Batal</button><button disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">{saving && <Loader2 className="w-4 h-4 animate-spin" />}{isEditing ? 'Simpan perubahan' : 'Simpan produk'}</button></div>
      </form>
    </div>
  );
}
