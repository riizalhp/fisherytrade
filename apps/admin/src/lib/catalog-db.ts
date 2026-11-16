import { Pool } from 'pg';
import type { Product } from '../../../web/src/types';

export interface CatalogProduct {
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
}

interface DatabaseProduct {
  id: string;
  sku: string;
  slug: string;
  name: string;
  english_name: string;
  scientific_name: string;
  category: string;
  image_url: string;
  images: string[] | null;
  description: string;
  product_function: string;
  problem_title: string | null;
  problem_description: string | null;
  volume: string;
  cut_type: string;
  freeze_method: string;
  grade: string;
  moq_kg: number | string;
  price_per_kg: number | string;
  stock_jakarta_kg: number | string;
  stock_lamongan_kg: number | string;
  stock_bali_kg: number | string;
  glazing: string;
  is_active: boolean;
  updated_at: Date | string;
}

export type CatalogProductInput = Omit<CatalogProduct, 'id' | 'sku' | 'updatedAt'>;

const COLUMNS = 'id, sku, slug, name, english_name, scientific_name, category, image_url, images, description, product_function, problem_title, problem_description, volume, cut_type, freeze_method, grade, moq_kg, price_per_kg, stock_jakarta_kg, stock_lamongan_kg, stock_bali_kg, glazing, is_active, updated_at';
let pool: Pool | undefined;
let poolConnectionString: string | undefined;

function getPool() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) throw new Error('DATABASE_URL belum dikonfigurasi.');
  if (!pool || poolConnectionString !== connectionString) {
    if (pool) void pool.end();
    const rejectUnauthorized = process.env.DB_SSL_REJECT_UNAUTHORIZED === 'true';
    pool = new Pool({
      connectionString,
      ssl: { rejectUnauthorized },
      max: 5,
      idleTimeoutMillis: 30_000,
      connectionTimeoutMillis: 10_000,
    });
    poolConnectionString = connectionString;
  }
  return pool;
}

export function fromDatabase(row: DatabaseProduct): CatalogProduct {
  return {
    id: row.id,
    sku: row.sku,
    slug: row.slug,
    name: row.name,
    englishName: row.english_name,
    scientificName: row.scientific_name,
    category: row.category,
    imageUrl: row.image_url,
    images: row.images || [],
    description: row.description,
    productFunction: row.product_function,
    problemTitle: row.problem_title || '',
    problemDescription: row.problem_description || '',
    volume: row.volume,
    cutType: row.cut_type,
    freezeMethod: row.freeze_method,
    grade: row.grade,
    moqKg: Number(row.moq_kg),
    pricePerKg: Number(row.price_per_kg),
    stockJakartaKg: Number(row.stock_jakarta_kg),
    stockLamonganKg: Number(row.stock_lamongan_kg),
    stockBaliKg: Number(row.stock_bali_kg),
    glazing: row.glazing,
    isActive: row.is_active,
    updatedAt: row.updated_at instanceof Date ? row.updated_at.toISOString() : row.updated_at,
  };
}

export async function listProducts(includeInactive = false): Promise<CatalogProduct[]> {
  const activeFilter = includeInactive ? '' : ' where is_active = true';
  const result = await getPool().query<DatabaseProduct>(`select ${COLUMNS} from public.product_catalog${activeFilter} order by name asc`);
  return result.rows.map(fromDatabase);
}

export async function createProduct(input: CatalogProductInput): Promise<CatalogProduct> {
  const sku = `FT-${input.slug.toUpperCase().replace(/[^A-Z0-9]+/g, '-').slice(0, 24)}`;
  const data = toDatabase(input);
  const entries = Object.entries({ sku, ...data });
  const columns = entries.map(([column]) => column).join(', ');
  const placeholders = entries.map((_, index) => `$${index + 1}`).join(', ');
  const result = await getPool().query<DatabaseProduct>(
    `insert into public.product_catalog (${columns}) values (${placeholders}) returning ${COLUMNS}`,
    entries.map(([, value]) => value),
  );
  return fromDatabase(result.rows[0]);
}

export async function updateProduct(slug: string, input: CatalogProductInput): Promise<CatalogProduct> {
  const entries = Object.entries(toDatabase(input));
  const assignments = entries.map(([column], index) => `${column} = $${index + 1}`).join(', ');
  const result = await getPool().query<DatabaseProduct>(
    `update public.product_catalog set ${assignments} where slug = $${entries.length + 1} returning ${COLUMNS}`,
    [...entries.map(([, value]) => value), slug],
  );
  if (!result.rows[0]) throw new Error('Produk tidak ditemukan.');
  return fromDatabase(result.rows[0]);
}

export async function deleteProduct(slug: string): Promise<void> {
  await getPool().query('delete from public.product_catalog where slug = $1', [slug]);
}

function toDatabase(input: CatalogProductInput) {
  return {
    slug: input.slug,
    name: input.name,
    english_name: input.englishName,
    scientific_name: input.scientificName,
    category: input.category,
    image_url: input.imageUrl,
    images: input.images.length ? input.images : [input.imageUrl],
    description: input.description,
    product_function: input.productFunction,
    problem_title: input.problemTitle || null,
    problem_description: input.problemDescription || null,
    volume: input.volume,
    cut_type: input.cutType,
    freeze_method: input.freezeMethod,
    grade: input.grade,
    moq_kg: input.moqKg,
    price_per_kg: input.pricePerKg,
    stock_jakarta_kg: input.stockJakartaKg,
    stock_lamongan_kg: input.stockLamonganKg,
    stock_bali_kg: input.stockBaliKg,
    glazing: input.glazing,
    is_active: input.isActive,
  };
}

export function toMarketplaceProduct(product: CatalogProduct, id: number): Product {
  const formatStock = (kg: number) => kg <= 0 ? 'Stok Habis' : `${kg.toLocaleString('id-ID')} kg`;
  const total = product.stockJakartaKg + product.stockLamonganKg + product.stockBaliKg;
  return {
    id,
    slug: product.slug,
    name: product.name,
    volume: product.volume,
    imageUrl: product.imageUrl,
    images: product.images.length ? product.images : [product.imageUrl],
    description: product.description,
    category: product.category,
    productFunction: product.productFunction,
    problemTitle: product.problemTitle,
    problemDescription: product.problemDescription,
    scientificName: product.scientificName,
    freezeMethod: product.freezeMethod,
    grade: product.grade,
    moq: `${product.moqKg} kg`,
    pricePerKg: `Rp ${product.pricePerKg.toLocaleString('id-ID')} / kg`,
    priceNumeric: product.pricePerKg,
    stockJakarta: formatStock(product.stockJakartaKg),
    stockLamongan: formatStock(product.stockLamonganKg),
    stockBali: formatStock(product.stockBaliKg),
    totalStock: `${total.toLocaleString('id-ID')} kg`,
    whatsappUrl: `https://wa.me/6282241114959?text=${encodeURIComponent(`Halo FisheryTrade, saya ingin memesan pasokan ${product.name}.`)}`,
    cutType: product.cutType,
    glazing: product.glazing,
  };
}
