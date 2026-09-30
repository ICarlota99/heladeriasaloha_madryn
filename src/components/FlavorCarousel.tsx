import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { useReducedMotion } from 'motion/react';
import FlavorCard from '@/components/FlavorCard';
import type { FeaturedFlavor } from '@/types';

interface FlavorCarouselProps {
  flavors: FeaturedFlavor[];
}

export default function FlavorCarousel({ flavors }: FlavorCarouselProps) {
  const reduceMotion = useReducedMotion();

  // Duplicate slides so the continuous loop feels like a full gallery
  const track = [...flavors, ...flavors];

  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      dragFree: true,
      skipSnaps: true,
    },
    reduceMotion
      ? []
      : [
          AutoScroll({
            speed: 0.65,
            startDelay: 0,
            stopOnInteraction: false,
            stopOnMouseEnter: true,
            stopOnFocusIn: true,
          }),
        ],
  );

  return (
    <div
      className="overflow-hidden"
      ref={emblaRef}
      role="region"
      aria-roledescription="galería"
      aria-label="Sabores más pedidos"
    >
      <div className="flex touch-pan-y">
        {track.map((flavor, index) => (
          <div
            key={`${flavor.id}-${index}`}
            className="min-w-0 shrink-0 grow-0 basis-[76%] px-2.5 sm:basis-[46%] lg:basis-[30%] xl:basis-[23%]"
          >
            <FlavorCard flavor={flavor} />
          </div>
        ))}
      </div>
    </div>
  );
}
