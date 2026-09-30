import { useState } from 'react';
import Button from '@/components/ui/Button';
import Stepper from '@/components/ui/Stepper';
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

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setQuantity(1);
  };

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${className}`}
    >
      <div className="relative aspect-square w-full overflow-hidden bg-peach-light/40">
        {imageSrc ? (
          <img src={imageSrc} alt={product.name} className="h-full w-full object-contain" loading="lazy" />
        ) : (
          <div className="flex h-full items-center justify-center text-ink/40">Sin imagen</div>
        )}
        <button
          type="button"
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand shadow"
          aria-expanded={descriptionOpen}
          aria-label={descriptionOpen ? 'Ocultar descripción' : 'Ver descripción'}
          onClick={() => setDescriptionOpen((open) => !open)}
        >
          <i className="fa-solid fa-circle-info text-xl" aria-hidden />
        </button>
        <div
          className={`absolute inset-x-0 bottom-0 bg-white/90 p-3 text-ink transition duration-300 ${
            descriptionOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <p className="text-center text-sm font-semibold leading-snug">
            {product.description ?? 'Sin descripción'}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-4 pb-5 pt-4 text-center">
        <h3 className="text-lg font-bold leading-snug">{product.name}</h3>
        <p className="mt-2 font-display text-3xl text-brand">ARS {formatPrice(product.price)}</p>
        <div className="mt-auto flex flex-col items-center gap-3 pt-4">
          <Stepper
            value={quantity}
            decrementDisabled={quantity === 1}
            onDecrement={() => setQuantity((prev) => Math.max(1, prev - 1))}
            onIncrement={() => setQuantity((prev) => prev + 1)}
          />
          <Button className="w-full" onClick={handleAddToCart}>
            Añadir <i className="fa-solid fa-cart-shopping" aria-hidden />
          </Button>
        </div>
      </div>
    </article>
  );
}
