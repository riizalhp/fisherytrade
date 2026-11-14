import { PRODUCTS } from '../constants.tsx';
import type { Product } from '../types.ts';

export const ADMIN_API_BASE_URL =
  (typeof process !== 'undefined' && process.env?.PUBLIC_ADMIN_API_URL) ||
  import.meta.env?.PUBLIC_ADMIN_API_URL ||
  'http://localhost:4000';

/**
 * Mengambil katalog komoditas & ketersediaan stok fisik riil dari Admin WMS API (Next.js).
 * Memiliki mekanisme fallback otomatis ke data katalog statis jika server admin sedang offline.
 */
export async function getMarketplaceProducts(): Promise<Product[]> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2500);

    const response = await fetch(`${ADMIN_API_BASE_URL}/api/catalog?format=marketplace`, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`[CatalogService] Admin API status ${response.status}. Fallback ke katalog statis.`);
      return PRODUCTS;
    }

    const json = await response.json();
    if (json.success && Array.isArray(json.data) && json.data.length > 0) {
      // Gabungkan data live (stok cold storage & harga) dengan informasi konten kaya (deskripsi masalah/solusi)
      const mergedProducts: Product[] = json.data.map((liveItem: Product) => {
        const fallback = PRODUCTS.find((p) => p.slug === liveItem.slug || p.name === liveItem.name);
        return {
          ...fallback,
          ...liveItem,
          images: liveItem.images && liveItem.images.length > 0 ? liveItem.images : fallback?.images || [liveItem.imageUrl],
          problemTitle: fallback?.problemTitle,
          problemDescription: fallback?.problemDescription,
          productFunction: fallback?.productFunction || liveItem.productFunction,
        };
      });

      return mergedProducts;
    }

    return PRODUCTS;
  } catch {
    // Jika server Next.js admin belum berjalan atau jaringan terputus, fallback dengan aman
    return PRODUCTS;
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
    const response = await fetch(`${ADMIN_API_BASE_URL}/api/rfq`, {
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
