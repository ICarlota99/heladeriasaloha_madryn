import { Link } from 'react-router-dom';
import type { ShopAccent, ShopCategory } from '@/types';

const accentStyles: Record<
  ShopAccent,
  {
    panel: string;
    title: string;
    body: string;
    button: string;
    wave: string;
  }
> = {
  orange: {
    panel: 'bg-brand',
    title: 'text-white',
    body: 'text-white/95',
    button: 'bg-white text-brand hover:bg-cream-soft',
    wave: '#F47821',
  },
  coral: {
    panel: 'bg-coral',
    title: 'text-white',
    body: 'text-white/95',
    button: 'bg-white text-coral-dark hover:bg-cream-soft',
    wave: '#E8897A',
  },
  yellow: {
    panel: 'bg-butter',
    title: 'text-ink',
    body: 'text-ink/80',
    button: 'bg-ink text-white hover:bg-ink/90',
    wave: '#F2D46B',
  },
  teal: {
    panel: 'bg-mint',
    title: 'text-ink',
    body: 'text-ink/80',
    button: 'bg-ink text-white hover:bg-ink/90',
    wave: '#7DB8B0',
  },
};

interface ProductCategoryCardProps {
  category: ShopCategory;
}

export default function ProductCategoryCard({ category }: ProductCategoryCardProps) {
  const styles = accentStyles[category.accent];

  return (
    <Link
      to={category.to}
      aria-label={`${category.label}: ver productos`}
      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white no-underline shadow-[var(--shadow-soft)] transition duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="relative aspect-[5/4] overflow-hidden">
        <img
          src={category.src}
          alt={category.alt}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          loading="lazy"
        />
      </div>

      <div className={`relative flex flex-1 flex-col px-5 pb-6 pt-10 text-center ${styles.panel}`}>
        <svg
          className="pointer-events-none absolute inset-x-0 top-0 h-8 w-full -translate-y-[99%]"
          viewBox="0 0 320 32"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            d="M0 20 C40 8 70 28 110 18 C150 8 180 26 220 16 C260 6 290 22 320 12 L320 32 L0 32 Z"
            fill={styles.wave}
          />
        </svg>

        <span className="absolute left-1/2 top-0 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-xl text-ink shadow-md ring-4 ring-white/70">
          <i className={`fa-solid ${category.icon}`} aria-hidden />
        </span>

        <h3 className={`font-display text-3xl leading-tight ${styles.title}`}>{category.label}</h3>
        <p className={`mt-2 flex-1 text-sm leading-relaxed ${styles.body}`}>{category.description}</p>
        <span
          className={`mt-5 inline-flex min-h-11 items-center justify-center gap-2 self-center rounded-full px-5 py-2.5 text-sm font-bold transition group-hover:gap-3 ${styles.button}`}
        >
          Ver productos
          <i className="fa-solid fa-arrow-right text-xs" aria-hidden />
        </span>
      </div>
    </Link>
  );
}
