import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { useReducedMotion } from 'motion/react';
import ProductCategoryCard from '@/components/ProductCategoryCard';
import type { ShopCategory } from '@/types';

interface CategoryCarouselProps {
  categories: ShopCategory[];
}

export default function CategoryCarousel({ categories }: CategoryCarouselProps) {
  const reduceMotion = useReducedMotion();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'center',
      skipSnaps: false,
      duration: 45,
    },
    reduceMotion
      ? []
      : [
          Autoplay({
            delay: 4800,
            jump: false,
            // Pause while dragging/holding; resume on release
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
          }),
        ],
  );

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
    };
  }, [emblaApi, onSelect]);

  return (
    <div className="relative">
      <div
        className="overflow-hidden"
        ref={emblaRef}
        role="region"
        aria-roledescription="carrusel"
        aria-label="Categorías de productos"
      >
        <div className="flex touch-pan-y">
          {categories.map((category) => (
            <div
              key={category.to}
              className="min-w-0 shrink-0 grow-0 basis-[86%] px-2 sm:basis-[70%]"
            >
              <ProductCategoryCard category={category} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-5 flex items-center justify-center gap-2">
        {categories.map((category, index) => (
          <button
            key={category.to}
            type="button"
            aria-label={`Ir a ${category.label}`}
            aria-current={index === selectedIndex ? 'true' : undefined}
            onClick={() => emblaApi?.scrollTo(index)}
            className={`h-2.5 rounded-full transition-all ${
              index === selectedIndex ? 'w-7 bg-brand' : 'w-2.5 bg-brand/30'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
