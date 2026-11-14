import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  name: string;
}

const ProductGallery = ({ images, name }: ProductGalleryProps) => {
  const gallery = images;
  const [displayImage, setDisplayImage] = useState<string | undefined>(gallery[0]);

  return (
    <div className="space-y-4">
      <div className="aspect-square w-full bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm relative group">
        <img
          src={displayImage}
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      {gallery.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {gallery.map((img, idx) => (
            <button
              key={img}
              type="button"
              onClick={() => setDisplayImage(img)}
              className={`aspect-square rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                displayImage === img
                  ? 'border-[#1f6306]'
                  : 'border-transparent hover:border-gray-300'
              }`}
              aria-label={`Lihat gambar ${idx + 1} dari ${name}`}
            >
              <img src={img} alt={`${name} ${idx + 1}`} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
