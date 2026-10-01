import { useId, useState } from 'react';
import { useCart } from '@/hooks/useCart';
import { formatPrice } from '@/lib/formatPrice';
import { getProductImageSrc } from '@/lib/productImages';
import type { Product } from '@/types';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export default function ProductCard({ product, className = '' }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [descriptionOpen, setDescriptionOpen] = useState(false);
  const { addToCart } = useCart();
  const imageSrc = getProductImageSrc(product.image);
  const descriptionId = useId();

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-2xl bg-[#F3E6D8] shadow-[0_8px_20px_rgb(42_33_24_/_0.08)] transition duration-300 hover:-translate-y-0.5 sm:rounded-[1.5rem] ${className}`}
    >
      <div className="relative aspect-square overflow-hidden bg-cream-soft">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={product.name}
            className="h-full w-full object-contain p-2 sm:p-3"
            loading="lazy"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-xs text-ink/40">Sin imagen</div>
        )}
        {product.description ? (
          <button
            type="button"
            className="absolute top-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-brand shadow-sm ring-1 ring-ink/5"
            aria-expanded={descriptionOpen}
            aria-controls={descriptionId}
            aria-label={descriptionOpen ? 'Ocultar descripción' : 'Ver descripción'}
            onClick={() => setDescriptionOpen((open) => !open)}
          >
            <i className={`fa-solid ${descriptionOpen ? 'fa-xmark' : 'fa-circle-info'} text-sm`} aria-hidden />
          </button>
        ) : null}
        {descriptionOpen && product.description ? (
          <div
            id={descriptionId}
            className="absolute inset-x-0 bottom-0 bg-[#F6EADF]/95 px-2.5 py-2 text-center text-[11px] leading-snug text-ink/80 sm:text-xs"
          >
            {product.description}
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col bg-gradient-to-b from-[#F6EADF] to-[#EFE0D0] px-2.5 pt-2 pb-2.5 sm:px-3 sm:pt-3 sm:pb-3">
        <h3 className="line-clamp-2 min-h-[2.5rem] text-center font-display text-sm leading-tight text-ink sm:min-h-[2.75rem] sm:text-base">
          {product.name}
        </h3>

        <p className="mt-1 text-center text-sm font-bold text-brand sm:text-base">
          ARS {formatPrice(product.price)}
        </p>

        <div className="mt-auto flex items-center gap-1.5 pt-2 sm:gap-2">
          <div className="flex min-w-0 flex-1 items-center justify-between rounded-full bg-white/85 px-1 py-1 ring-1 ring-ink/5">
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-bold text-brand disabled:opacity-35"
              onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
              disabled={quantity === 1}
              aria-label="Restar"
            >
              −
            </button>
            <span className="min-w-5 text-center text-sm font-bold tabular-nums" aria-label={`Cantidad ${quantity}`}>
              {quantity}
            </span>
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-base font-bold text-brand"
              onClick={() => setQuantity((prev) => prev + 1)}
              aria-label="Sumar"
            >
              +
            </button>
          </div>
          <button
            type="button"
            onClick={handleAddToCart}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand text-white shadow-sm transition hover:bg-brand-dark sm:h-11 sm:w-11"
            aria-label={`Añadir ${product.name} al carrito`}
          >
            <i className="fa-solid fa-cart-plus text-sm sm:text-base" aria-hidden />
          </button>
        </div>
      </div>
    </article>
  );
}
