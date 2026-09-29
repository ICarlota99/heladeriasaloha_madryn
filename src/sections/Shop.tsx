import { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import conosImg from '@/assets/conos.webp';
import pintasImg from '@/assets/pintas.webp';
import postresImg from '@/assets/postres.webp';
import tortasImg from '@/assets/tortas.webp';
import Reveal from '@/components/ui/Reveal';
import SectionHeading from '@/components/ui/SectionHeading';
import type { ShopCategory } from '@/types';

const categories: ShopCategory[] = [
  { to: '/category/cones', src: conosImg, alt: 'Conos y paletas', label: 'Conos y paletas' },
  { to: '/category/desserts', src: postresImg, alt: 'Postres helados', label: 'Postres helados' },
  { to: '/category/pints', src: pintasImg, alt: 'Pintas y baldes', label: 'Pintas y baldes' },
  { to: '/category/cakes', src: tortasImg, alt: 'Tortas heladas', label: 'Tortas heladas' },
];

export default function Shop() {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const syncActive = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const cards = [...el.querySelectorAll<HTMLElement>('[data-card]')];
    if (!cards.length) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let best = Infinity;
    cards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const distance = Math.abs(cardCenter - center);
      if (distance < best) {
        best = distance;
        closest = index;
      }
    });
    setActive(closest);
  };

  const scrollToIndex = (index: number) => {
    const el = scrollerRef.current;
    const card = el?.querySelectorAll<HTMLElement>('[data-card]')[index];
    if (!el || !card) return;
    const left = card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2;
    el.scrollTo({ left, behavior: 'smooth' });
  };

  return (
    <section id="shop" className="brand-band pb-20 pt-28">
      <div id="products" className="mx-auto max-w-7xl">
        <Reveal>
          <SectionHeading
            title="Elegí tu helado favorito"
            subtitle="¿Cuál preferís probar hoy?"
            tone="light"
            className="px-6"
          />
        </Reveal>

        <div className="relative mt-10">
          <div
            ref={scrollerRef}
            onScroll={syncActive}
            role="region"
            aria-roledescription="carrusel"
            aria-label="Categorías de productos"
            className="flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-6 px-6 pb-2 [scrollbar-width:none] xl:grid xl:grid-cols-4 xl:gap-8 xl:overflow-visible xl:px-6 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => (
              <Link
                key={category.to}
                to={category.to}
                data-card
                aria-label={category.label}
                className="group relative aspect-[4/5] w-[82%] shrink-0 snap-center overflow-hidden rounded-[1.75rem] text-white no-underline shadow-lg sm:w-[46%] xl:aspect-square xl:w-auto"
              >
                <img
                  className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  src={category.src}
                  alt={category.alt}
                  loading="lazy"
                />
                <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 via-black/35 to-transparent px-4 pb-5 pt-16 text-left text-xl font-bold md:text-2xl">
                  {category.label}
                </span>
              </Link>
            ))}
          </div>

          <button
            type="button"
            aria-label="Categoría anterior"
            onClick={() => scrollToIndex(Math.max(0, active - 1))}
            className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand shadow-md transition hover:bg-white xl:hidden"
          >
            <i className="fa-solid fa-chevron-left" aria-hidden />
          </button>
          <button
            type="button"
            aria-label="Categoría siguiente"
            onClick={() => scrollToIndex(Math.min(categories.length - 1, active + 1))}
            className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-brand shadow-md transition hover:bg-white xl:hidden"
          >
            <i className="fa-solid fa-chevron-right" aria-hidden />
          </button>
        </div>

        <div className="mt-6 flex items-center justify-center gap-2 xl:hidden">
          {categories.map((category, index) => (
            <button
              key={category.to}
              type="button"
              aria-label={`Ir a ${category.label}`}
              aria-current={index === active ? 'true' : undefined}
              onClick={() => scrollToIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === active ? 'w-6 bg-white' : 'w-2 bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
