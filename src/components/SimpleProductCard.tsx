import { useState } from 'react';
import { getFlavorImageSrc } from '@/lib/productImages';
import type { FeaturedFlavor } from '@/types';

interface SimpleProductCardProps {
  product: FeaturedFlavor;
  className?: string;
}

export default function SimpleProductCard({ product, className = '' }: SimpleProductCardProps) {
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const imageSrc = getFlavorImageSrc(product.image);

  return (
    <article
      className={`group flex h-full flex-col overflow-hidden rounded-3xl bg-white text-left shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <button
        type="button"
        className="cursor-pointer text-left"
        onClick={() => setDescriptionOpen((open) => !open)}
        aria-expanded={descriptionOpen}
      >
        <div className="relative aspect-square overflow-hidden bg-peach-light">
          {imageSrc ? (
            <img src={imageSrc} alt={product.name} className="h-full w-full object-cover" loading="lazy" />
          ) : null}
          <i
            className="fa-solid fa-circle-info absolute right-3 top-3 text-2xl text-white drop-shadow-[0_0_2px_#F48D68]"
            aria-hidden
          />
          <div
            className={`absolute inset-x-0 bottom-0 bg-white/85 p-3 text-ink transition duration-300 ${
              descriptionOpen ? 'translate-y-0' : 'translate-y-full group-hover:translate-y-0'
            }`}
          >
            <p className="text-center text-sm font-semibold leading-snug">{product.description}</p>
          </div>
        </div>
        <h3 className="px-4 py-4 text-center text-lg font-bold text-ink">{product.name}</h3>
      </button>
    </article>
  );
}
