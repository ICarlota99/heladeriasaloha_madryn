import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '@/components/ProductCard';
import IceCreamLoader from '@/components/ui/IceCreamLoader';
import Reveal from '@/components/ui/Reveal';
import { getCategoryCopy, getCategoryId, getCategoryTitle, isCategorySlug } from '@/lib/category';
import type { Product, ProductsResponse } from '@/types';

export default function Products() {
  const { category } = useParams<{ category: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

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
        const slug = isCategorySlug(category) ? category : null;
        const filtered = slug
          ? data.products
              .filter((product) => product.category_id === getCategoryId(slug) && product.in_stock)
              .sort((a, b) => a.name.localeCompare(b.name, 'es'))
          : [];
        setProducts(filtered);
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
  }, [category]);

  return (
    <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
      <Reveal>
        <h1 className="text-center font-display text-5xl text-ink">{getCategoryTitle(category)}</h1>
        <p className="mx-auto mt-3 max-w-xl text-center text-ink/80">{getCategoryCopy(category)}</p>
      </Reveal>
      {error ? <p className="mt-4 text-center text-red-600">{error}</p> : null}

      {isLoading ? (
        <IceCreamLoader />
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <Reveal key={product.id} delay={Math.min(index * 0.04, 0.24)}>
                <ProductCard product={product} />
              </Reveal>
            ))
          ) : (
            <p className="col-span-full text-center">No hay productos en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
}
