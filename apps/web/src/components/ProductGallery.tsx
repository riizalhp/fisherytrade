import { useEffect, useRef, useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
  illustration?: boolean;
  requestPhotoUrl: string;
}

const ProductGallery = ({ images, name, illustration = false, requestPhotoUrl }: ProductGalleryProps) => {
  const gallery = [...new Set(images.filter(Boolean))];
  const [activeIndex, setActiveIndex] = useState(0);
  const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');
  const imageRef = useRef<HTMLImageElement>(null);
  const activeImage = gallery[activeIndex];

  useEffect(() => {
    const image = imageRef.current;
    setStatus(image?.complete ? (image.naturalWidth > 0 ? 'ready' : 'error') : 'loading');
  }, [activeImage]);

  return (
    <figure className="space-y-4">
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-slate-200 bg-slate-100">
        {activeImage && (
          <img
            ref={imageRef}
            src={activeImage}
            alt={illustration ? `Ilustrasi penyajian ${name}, bukan foto produk yang dijual` : `Foto ${name}, gambar ${activeIndex + 1}`}
            width="900"
            height="675"
            fetchPriority="high"
            onLoad={() => setStatus('ready')}
            onError={() => setStatus('error')}
            className={`h-full w-full ${illustration ? 'object-cover' : 'object-contain'} ${status === 'error' ? 'hidden' : ''}`}
          />
        )}
        {activeImage && status === 'loading' && (
          <span role="status" className="absolute bottom-4 left-4 rounded-lg bg-white px-3 py-2 text-sm text-slate-700">Memuat foto...</span>
        )}
        {(!activeImage || status === 'error') && (
          <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
            <p className="text-lg font-semibold text-aruna-900">{activeImage ? 'Foto belum dapat dimuat' : 'Foto produk belum tersedia'}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-slate-600">Minta foto lot dan kemasan yang tersedia sebelum memesan.</p>
            <a href={requestPhotoUrl} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-11 items-center justify-center rounded-lg border border-aruna-700 bg-white px-4 text-sm font-semibold text-aruna-700 hover:bg-aruna-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aruna-600">Minta foto produk</a>
          </div>
        )}
        {illustration && status !== 'error' && (
          <span className="absolute left-4 top-4 rounded-md bg-white px-3 py-1.5 text-xs font-semibold text-aruna-900">Ilustrasi penyajian</span>
        )}
      </div>
      {gallery.length > 1 && (
        <div role="group" aria-label={`Pilih foto ${name}`} className="flex flex-wrap gap-3">
          {gallery.map((image, index) => (
            <button
              key={image}
              type="button"
              onClick={() => setActiveIndex(index)}
              aria-label={`Lihat gambar ${index + 1} dari ${name}`}
              aria-pressed={activeIndex === index}
              className={`h-16 w-16 overflow-hidden rounded-lg border-2 bg-slate-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-aruna-600 ${activeIndex === index ? 'border-aruna-700' : 'border-transparent hover:border-slate-400'}`}
            >
              <img src={image} alt="" width="64" height="64" loading="lazy" className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
      <figcaption className="text-sm leading-relaxed text-slate-600">
        {illustration ? 'Gambar ini hanya menunjukkan contoh penyajian tuna. Foto loin, kemasan, dan lot aktual dapat diminta ke tim sales.' : gallery.length > 0 ? 'Konfirmasikan foto lot dan kondisi kemasan terbaru dengan tim sales.' : 'Foto akan ditampilkan setelah dokumentasi produk tersedia.'}
      </figcaption>
      {gallery.length > 1 && <p className="sr-only" aria-live="polite">Gambar {activeIndex + 1} dari {gallery.length} ditampilkan.</p>}
    </figure>
  );
};

export default ProductGallery;
