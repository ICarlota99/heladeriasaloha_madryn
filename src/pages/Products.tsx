import { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import ProductCard from '@/components/ProductCard';
import { buttonClass } from '@/components/ui/Button';
import IceCreamLoader from '@/components/ui/IceCreamLoader';
import Reveal from '@/components/ui/Reveal';
import { getCategoryCopy, getCategoryId, getCategoryTitle, isCategorySlug } from '@/lib/category';
import { PRODUCT_NAV_LINKS } from '@/lib/constants';
import type { Product, ProductsResponse } from '@/types';

export default function Products() {
  const { category } = useParams<{ category: string }>();
  const [catalog, setCatalog] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetch('/data/products.json')
      .then((response) => {
        if (!response.ok) throw new Error('No se pudieron cargar los productos');
        return response.json() as Promise<ProductsResponse>;
      })
      .then((data) => {
        if (cancelled) return;
        const inStock = data.products
          .filter((product) => product.in_stock)
          .sort((a, b) => a.name.localeCompare(b.name, 'es'));
        setCatalog(inStock);
      })
      .catch((err: Error) => {
        if (!cancelled) setError(err.message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const visibleProducts = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (normalized) {
      return catalog.filter(
        (product) =>
          product.name.toLowerCase().includes(normalized) ||
          product.description?.toLowerCase().includes(normalized),
      );
    }

    const slug = isCategorySlug(category) ? category : null;
    if (!slug) return [];
    const categoryId = getCategoryId(slug);
    return catalog.filter((product) => product.category_id === categoryId);
  }, [catalog, category, query]);

  const isSearching = query.trim().length > 0;
  const title = isSearching ? 'Resultados de búsqueda' : getCategoryTitle(category);
  const copy = isSearching
    ? `Mostrando coincidencias en todo el catálogo para “${query.trim()}”.`
    : getCategoryCopy(category);

  return (
    <div className="relative overflow-hidden bg-cream-soft">
      <div
        className="pointer-events-none absolute -left-20 -top-10 h-52 w-52 rounded-[45%] bg-brand/15 sm:h-72 sm:w-72"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 top-40 h-48 w-48 rounded-[48%] bg-coral/15 sm:h-64 sm:w-64"
        aria-hidden
      />

      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:py-16">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-bold tracking-[0.22em] text-brand uppercase sm:text-sm">
            <span className="hidden h-px w-10 bg-brand/70 sm:block" aria-hidden />
            Catálogo
            <span className="hidden h-px w-10 bg-brand/70 sm:block" aria-hidden />
          </p>
          <h1 className="mt-3 font-display text-4xl leading-tight text-ink sm:text-5xl md:text-6xl">
            {title}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base text-ink/75 sm:text-lg">{copy}</p>
        </Reveal>

        <Reveal className="mt-8">
          <div
            className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0 [&::-webkit-scrollbar]:hidden"
            role="navigation"
            aria-label="Categorías de productos"
          >
            {PRODUCT_NAV_LINKS.map((item) => {
              const active = !isSearching && item.to === `/category/${category}`;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setQuery('')}
                  className={`inline-flex shrink-0 items-center rounded-full px-4 py-2.5 text-sm font-bold no-underline transition ${
                    active
                      ? 'bg-brand text-white shadow-sm'
                      : 'bg-white text-ink ring-1 ring-ink/10 hover:bg-peach-light'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </Reveal>

        <Reveal className="mt-5 sm:mt-6">
          <label className="relative mx-auto block max-w-md">
            <span className="sr-only">Buscar en todo el catálogo</span>
            <i
              className="fa-solid fa-magnifying-glass pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-xs text-ink/35"
              aria-hidden
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Buscar en todo el catálogo..."
              className="min-h-9 w-full rounded-full border border-ink/10 bg-white/50 py-2 pr-3 pl-9 text-sm text-ink/80 outline-none transition placeholder:text-ink/35 focus:border-brand/40 focus:bg-white/80 focus:ring-1 focus:ring-brand/20"
            />
          </label>
        </Reveal>

        {error ? (
          <p className="mt-6 rounded-2xl bg-red-50 px-4 py-3 text-center text-sm font-semibold text-red-700 ring-1 ring-red-200">
            {error}
          </p>
        ) : null}

        {isLoading ? (
          <IceCreamLoader />
        ) : visibleProducts.length > 0 ? (
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:mt-8 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            {visibleProducts.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index * 0.02, 0.12)}>
                <ProductCard product={product} />
              </Reveal>
            ))}
          </div>
        ) : (
          <Reveal className="mt-10 rounded-[1.75rem] bg-white/80 px-6 py-12 text-center shadow-sm ring-1 ring-brand/10">
            <p className="font-display text-3xl text-ink">No encontramos productos</p>
            <p className="mt-2 text-ink/70">
              {query
                ? 'Probá con otro nombre o limpiá la búsqueda.'
                : 'Esta categoría no tiene stock disponible por ahora.'}
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              {query ? (
                <button type="button" className={buttonClass('secondary')} onClick={() => setQuery('')}>
                  Limpiar búsqueda
                </button>
              ) : null}
              <HashLink to="/#shop" className={buttonClass('primary')}>
                Ver categorías
              </HashLink>
            </div>
          </Reveal>
        )}

        <Reveal className="mt-12 text-center sm:mt-16">
          <p className="mb-4 text-ink/70">¿Querés armar tu combinación?</p>
          <Link to="/flavors" className={buttonClass('primary')}>
            Armá tu balde
            <i className="fa-solid fa-arrow-right" aria-hidden />
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
