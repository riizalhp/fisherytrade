import { NextResponse } from 'next/server';
import { hasAdminSession } from '@/lib/admin-auth';
import { createProduct, deleteProduct, listProducts, toMarketplaceProduct, updateProduct, type CatalogProductInput } from '@/lib/catalog-db';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

function json(data: unknown, status = 200) {
  return NextResponse.json(data, { status, headers: corsHeaders });
}

function validateInput(value: unknown): CatalogProductInput {
  if (!value || typeof value !== 'object') throw new Error('Data produk tidak valid.');
  const body = value as Record<string, unknown>;
  const requiredStrings = ['slug', 'name', 'category', 'volume', 'cutType', 'freezeMethod', 'grade', 'description'];
  for (const field of requiredStrings) {
    if (typeof body[field] !== 'string' || !String(body[field]).trim()) throw new Error(`Kolom ${field} wajib diisi.`);
  }
  const numberFields = ['moqKg', 'pricePerKg', 'stockJakartaKg', 'stockLamonganKg', 'stockBaliKg'];
  const numbers = Object.fromEntries(numberFields.map((field) => [field, Number(body[field])])) as Record<string, number>;
  for (const field of numberFields) {
    if (!Number.isFinite(numbers[field]) || numbers[field] < 0) throw new Error(`Nilai ${field} harus angka nol atau lebih.`);
  }
  if (numbers.moqKg < 1) throw new Error('MOQ minimum adalah 1 kg.');
  const slug = String(body.slug).trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (!slug) throw new Error('Slug produk tidak valid.');
  const imageUrl = typeof body.imageUrl === 'string' ? body.imageUrl.trim() : '';
  return {
    slug,
    name: String(body.name).trim(),
    englishName: typeof body.englishName === 'string' ? body.englishName.trim() : '',
    scientificName: typeof body.scientificName === 'string' ? body.scientificName.trim() : '',
    category: String(body.category).trim(),
    imageUrl,
    images: Array.isArray(body.images) ? body.images.filter((image): image is string => typeof image === 'string') : imageUrl ? [imageUrl] : [],
    description: String(body.description).trim(),
    productFunction: typeof body.productFunction === 'string' ? body.productFunction.trim() : '',
    problemTitle: typeof body.problemTitle === 'string' ? body.problemTitle.trim() : '',
    problemDescription: typeof body.problemDescription === 'string' ? body.problemDescription.trim() : '',
    volume: String(body.volume).trim(),
    cutType: String(body.cutType).trim(),
    freezeMethod: String(body.freezeMethod).trim(),
    grade: String(body.grade).trim(),
    moqKg: numbers.moqKg,
    pricePerKg: numbers.pricePerKg,
    stockJakartaKg: numbers.stockJakartaKg,
    stockLamonganKg: numbers.stockLamonganKg,
    stockBaliKg: numbers.stockBaliKg,
    glazing: typeof body.glazing === 'string' ? body.glazing.trim() : '',
    isActive: body.isActive !== false,
  };
}

function databaseError(error: unknown) {
  const message = error instanceof Error ? error.message : '';
  if (message.includes('belum dikonfigurasi')) return 'Supabase belum terhubung. Atur DATABASE_URL pada environment server admin.';
  if ((error as { code?: string })?.code === '23505' || message.includes('409') || message.includes('23505') || message.toLowerCase().includes('duplicate')) return 'Slug atau SKU produk sudah digunakan.';
  console.error('[catalog-api]', message);
  return 'Gagal berkomunikasi dengan database katalog. Periksa migration dan koneksi Supabase.';
}

function validationError(error: unknown) {
  return error instanceof Error && /wajib diisi|tidak valid|harus angka|MOQ minimum/.test(error.message);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const adminMode = searchParams.get('admin') === '1';
  if (adminMode && !await hasAdminSession()) return json({ success: false, error: 'Sesi admin tidak valid.' }, 401);
  try {
    const products = await listProducts(adminMode);
    if (searchParams.get('format') === 'marketplace') {
      const marketplaceData = products.map((product, index) => toMarketplaceProduct(product, index + 1));
      return json({ success: true, data: marketplaceData, count: marketplaceData.length, timestamp: new Date().toISOString() });
    }
    return json({ success: true, data: products, count: products.length, timestamp: new Date().toISOString() });
  } catch (error) {
    return json({ success: false, error: databaseError(error), data: [] }, 503);
  }
}

export async function POST(request: Request) {
  if (!await hasAdminSession()) return json({ success: false, error: 'Sesi admin tidak valid.' }, 401);
  try {
    const input = validateInput(await request.json());
    const product = await createProduct(input);
    return json({ success: true, data: product }, 201);
  } catch (error) {
    return json({ success: false, error: validationError(error) ? (error as Error).message : databaseError(error) }, validationError(error) ? 400 : 500);
  }
}

export async function PATCH(request: Request) {
  if (!await hasAdminSession()) return json({ success: false, error: 'Sesi admin tidak valid.' }, 401);
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) return json({ success: false, error: 'Slug produk tidak ditemukan.' }, 400);
  try {
    const input = validateInput(await request.json());
    const product = await updateProduct(slug, input);
    return json({ success: true, data: product });
  } catch (error) {
    return json({ success: false, error: validationError(error) ? (error as Error).message : databaseError(error) }, validationError(error) ? 400 : 500);
  }
}

export async function DELETE(request: Request) {
  if (!await hasAdminSession()) return json({ success: false, error: 'Sesi admin tidak valid.' }, 401);
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  if (!slug) return json({ success: false, error: 'Slug produk tidak ditemukan.' }, 400);
  try {
    const products = await listProducts(true);
    if (!products.some((product) => product.slug === slug)) return json({ success: false, error: 'Produk tidak ditemukan.' }, 404);
    await deleteProduct(slug);
    return json({ success: true });
  } catch (error) {
    return json({ success: false, error: databaseError(error) }, 503);
  }
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders });
}
