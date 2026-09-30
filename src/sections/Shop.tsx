import conosImg from '@/assets/conos.webp';
import pintasImg from '@/assets/pintas.webp';
import postresImg from '@/assets/postres.webp';
import tortasImg from '@/assets/tortas.webp';
import CategoryCarousel from '@/components/CategoryCarousel';
import ProductCategoryCard from '@/components/ProductCategoryCard';
import Reveal from '@/components/ui/Reveal';
import type { ShopCategory } from '@/types';

const categories: ShopCategory[] = [
  {
    to: '/category/cones',
    src: conosImg,
    alt: 'Conos y paletas',
    label: 'Conos y paletas',
    description: 'El clásico que nunca falla. ¡Crujientes, cremosos y llenos de sabor!',
    accent: 'orange',
    icon: 'fa-ice-cream',
  },
  {
    to: '/category/desserts',
    src: postresImg,
    alt: 'Postres helados',
    label: 'Postres helados',
    description: 'Tortas, postres y helados en una sola experiencia.',
    accent: 'coral',
    icon: 'fa-cookie-bite',
  },
  {
    to: '/category/pints',
    src: pintasImg,
    alt: 'Pintas y baldes',
    label: 'Pintas y baldes',
    description: 'Compartí la felicidad en cada cucharada.',
    accent: 'yellow',
    icon: 'fa-mug-hot',
  },
  {
    to: '/category/cakes',
    src: tortasImg,
    alt: 'Tortas heladas',
    label: 'Tortas heladas',
    description: 'La opción perfecta para celebrar cada momento.',
    accent: 'teal',
    icon: 'fa-cake-candles',
  },
];

const benefits = [
  {
    icon: 'fa-leaf',
    title: 'Ingredientes de calidad',
    subtitle: 'Sabor real, sin vueltas.',
  },
  {
    icon: 'fa-heart',
    title: 'Hechos con pasión',
    subtitle: 'Porque cada helado importa.',
  },
  {
    icon: 'fa-snowflake',
    title: 'Siempre frescos',
    subtitle: 'Directo a tu mesa.',
  },
  {
    icon: 'fa-face-smile',
    title: 'Clientes felices',
    subtitle: 'Nuestra mejor receta.',
  },
] as const;

function TitleRays({ side }: { side: 'left' | 'right' }) {
  return (
    <span
      className={`hidden text-brand sm:inline-flex ${side === 'left' ? 'mr-3 -scale-x-100' : 'ml-3'}`}
      aria-hidden
    >
      <svg width="28" height="36" viewBox="0 0 28 36" fill="none">
        <path d="M4 6 L14 2" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M2 18 L14 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M4 30 L14 34" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </span>
  );
}

export default function Shop() {
  return (
    <section
      id="shop"
      className="relative overflow-hidden bg-cream-soft px-5 py-16 sm:px-6 sm:py-20 lg:py-24"
    >
      <div
        className="pointer-events-none absolute -left-24 -top-16 h-56 w-56 rounded-[45%] bg-brand/20 blur-0 sm:h-72 sm:w-72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-20 -right-16 h-64 w-64 rounded-[48%] bg-brand/15 sm:h-80 sm:w-80"
        aria-hidden
      />

      <div id="products" className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-bold tracking-[0.22em] text-brand uppercase sm:text-sm">
            <span className="hidden h-px w-10 bg-brand/70 sm:block" aria-hidden />
            Nuestros
            <i className="fa-solid fa-ice-cream text-base normal-case tracking-normal" aria-hidden />
            Productos
            <span className="hidden h-px w-10 bg-brand/70 sm:block" aria-hidden />
          </p>

          <h2 className="mt-4 flex items-center justify-center font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            <TitleRays side="left" />
            <span>Elegí tu helado favorito</span>
            <TitleRays side="right" />
          </h2>

          <p className="mt-3 text-base text-ink/75 sm:text-lg">
            Sabores únicos, momentos inolvidables
          </p>

          <svg
            className="mx-auto mt-4 h-3 w-40 text-brand sm:w-48"
            viewBox="0 0 160 12"
            fill="none"
            aria-hidden
          >
            <path
              d="M2 8 C30 2 50 10 80 6 C110 2 130 10 158 5"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </Reveal>

        {/* Mobile / tablet: Embla carousel with slow autoplay + touch pause */}
        <div className="-mx-5 mt-10 sm:-mx-6 lg:hidden">
          <CategoryCarousel categories={categories} />
        </div>

        {/* Desktop: static grid */}
        <div className="mt-12 hidden gap-6 lg:grid lg:grid-cols-2 xl:grid-cols-4 xl:gap-7">
          {categories.map((category, index) => (
            <Reveal key={category.to} delay={Math.min(index * 0.08, 0.24)}>
              <ProductCategoryCard category={category} />
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.15} className="mt-12 sm:mt-16">
          <ul className="grid grid-cols-1 gap-6 rounded-[1.75rem] bg-white/70 px-5 py-8 shadow-sm ring-1 ring-brand/10 sm:grid-cols-2 sm:gap-8 sm:px-8 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-ink/10">
            {benefits.map((benefit) => (
              <li
                key={benefit.title}
                className="flex flex-col items-center gap-2 px-2 text-center lg:px-5"
              >
                <span className="flex h-11 w-11 items-center justify-center text-2xl text-brand">
                  <i className={`fa-solid ${benefit.icon}`} aria-hidden />
                </span>
                <p className="font-bold text-ink">{benefit.title}</p>
                <p className="text-sm text-ink/65">{benefit.subtitle}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
