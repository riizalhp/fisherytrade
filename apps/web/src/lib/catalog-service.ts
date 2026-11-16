import { PRODUCTS } from '../constants.tsx';
import type { Product } from '../types.ts';

/**
 * Resolves the URL for calling the Admin WMS API service.
 * 1. Runtime server functions: Uses the Vercel service binding `process.env.ADMIN_URL` via new URL(path, ADMIN_URL).
 * 2. Explicit environment override: PUBLIC_ADMIN_API_URL if configured.
 * 3. Client-side browser execution: Targets the dedicated master-admin subdomain.
 * 4. Fallback: Localhost / standalone dev on http://localhost:4000.
 */
export function getAdminApiUrl(endpoint: string): string {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;

  // 1. Runtime server function: Read the bound service URL injected by Vercel
  const boundServiceUrl = typeof process !== 'undefined' ? process.env?.ADMIN_URL : undefined;
  if (boundServiceUrl) {
    const serviceBase = boundServiceUrl.endsWith('/') ? boundServiceUrl : `${boundServiceUrl}/`;
    return new URL(cleanEndpoint, serviceBase).toString();
  }

  // 2. Explicit public override (e.g. environment variable or custom domain)
  const publicApiUrl =
    (typeof process !== 'undefined' && process.env?.PUBLIC_ADMIN_API_URL) ||
    (typeof import.meta !== 'undefined' && (import.meta as any).env?.PUBLIC_ADMIN_API_URL);
  if (publicApiUrl) {
    const base = publicApiUrl.endsWith('/') ? publicApiUrl : `${publicApiUrl}/`;
    return new URL(cleanEndpoint, base).toString();
  }

  // 3. Client-side browser execution: Route to the master-admin subdomain
  if (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1') {
    const mainHost = window.location.hostname.replace(/^www\./, '');
    const adminHost = mainHost.startsWith('master-admin.') ? mainHost : `master-admin.${mainHost}`;
    const port = window.location.port ? `:${window.location.port}` : '';
    return `${window.location.protocol}//${adminHost}${port}/${cleanEndpoint}`;
  }

  // 4. Local standalone development fallback
  return `http://localhost:4000/${cleanEndpoint}`;
}

export const ADMIN_API_BASE_URL =
  typeof process !== 'undefined' && process.env?.ADMIN_URL
    ? (process.env.ADMIN_URL.endsWith('/') ? process.env.ADMIN_URL.slice(0, -1) : process.env.ADMIN_URL)
    : (typeof process !== 'undefined' && process.env?.PUBLIC_ADMIN_API_URL) ||
      (typeof import.meta !== 'undefined' && (import.meta as any).env?.PUBLIC_ADMIN_API_URL) ||
      'http://localhost:4000';

const getReferenceProducts = (): Product[] =>
  PRODUCTS.map((product) => ({ ...product, catalogSource: 'reference' }));

/**
 * Mengambil katalog komoditas & ketersediaan stok fisik riil dari Admin WMS API (Next.js).
 * Memiliki mekanisme fallback otomatis ke data katalog statis jika server admin sedang offline.
 */
export async function getMarketplaceProducts(): Promise<Product[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const catalogUrl = getAdminApiUrl('api/catalog?format=marketplace');
    const response = await fetch(catalogUrl, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[CatalogService] Admin API status ${response.status}. Fallback ke katalog statis.`);
      return getReferenceProducts();
    }

    const json = await response.json();
    if (json.success && Array.isArray(json.data)) {
      // Gabungkan data live (stok cold storage & harga) dengan informasi konten kaya (deskripsi masalah/solusi)
      const mergedProducts: Product[] = json.data.map((liveItem: Product) => {
        const fallback = PRODUCTS.find((p) => p.slug === liveItem.slug || p.name === liveItem.name);
        return {
          ...fallback,
          ...liveItem,
          images: liveItem.images && liveItem.images.length > 0 ? liveItem.images : fallback?.images || [liveItem.imageUrl],
          problemTitle: liveItem.problemTitle ?? fallback?.problemTitle,
          problemDescription: liveItem.problemDescription ?? fallback?.problemDescription,
          productFunction: liveItem.productFunction ?? fallback?.productFunction ?? '',
          catalogSource: 'live',
          catalogFetchedAt: new Date().toISOString(),
        };
      });

      return mergedProducts;
    }

    return getReferenceProducts();
  } catch {
    // Jika server Next.js admin belum berjalan atau jaringan terputus, fallback dengan aman
    return getReferenceProducts();
  }
}

/**
 * Mengambil detail satu produk berdasarkan slug
 */
export async function getMarketplaceProductBySlug(slug: string): Promise<Product | undefined> {
  const products = await getMarketplaceProducts();
  return products.find((p) => p.slug === slug);
}

/**
 * Mengirimkan data RFQ lead ke Admin Backend API (Next.js)
 */
export async function submitRFQInquiry(payload: {
  buyerName: string;
  buyerPhone: string;
  buyerCompany?: string;
  coldStorageName?: string;
  destinationCity?: string;
  commodityName: string;
  requestedVolumeTons: number;
}): Promise<{ success: boolean; rfqNumber?: string; waLink?: string }> {
  try {
    const rfqUrl = getAdminApiUrl('api/rfq');
    const response = await fetch(rfqUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(`Server returned ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.warn('[CatalogService] Tidak dapat mengirim RFQ ke admin API, dialihkan langsung ke WhatsApp.');
    return { success: false };
  }
}
