import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import AOS from 'aos';
import 'aos/dist/aos.css';

const categoryCopy = {
  cakes: 'Tortas heladas para compartir y celebrar.',
  cones: 'Conos y paletas para llevar y disfrutar al paso.',
  flavors: 'Sabores de helado para armar tu pedido.',
  desserts: 'Postres helados para el final perfecto.',
  pints: 'Pintas y baldes para llevar a casa.',
};

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const categoryToH1 = {
    cakes: 'Tortas Heladas',
    cones: 'Conos y Paletas',
    flavors: 'Sabores de Helados',
    desserts: 'Postres Helados',
    pints: 'Pintas y Baldes',
  };

  const h1Text = categoryToH1[category] || category.replace(/_/g, ' ');

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
    });

    setIsLoading(true);

    fetch('/data/products.json')
      .then((response) => {
        if (!response.ok) throw new Error('Failed to load products');
        return response.json();
      })
      .then((data) => {
        const filteredProducts = data.products
          .filter((product) => product.category_id === getCategoryId(category) && product.in_stock)
          .sort((a, b) => a.name.localeCompare(b.name));
        setProducts(filteredProducts);
      })
      .catch((err) => {
        console.error('Error loading products:', err);
        setError(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [category]);

  const getCategoryId = (categoryName) => {
    const categoryMap = {
      cakes: 1,
      cones: 2,
      desserts: 3,
      flavors: 4,
      pints: 5,
    };
    return categoryMap[categoryName];
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12 text-center">
      <h1 className="font-display text-5xl text-ink">{h1Text}</h1>
      <p className="mx-auto mt-3 max-w-xl text-ink/80">{categoryCopy[category]}</p>
      {error && <p className="mt-4 text-red-600">{error}</p>}

      {isLoading ? (
        <div className="flex min-h-[300px] flex-col items-center justify-center gap-8">
          <div className="relative h-32 w-24">
            <span className="scoop left-5 top-0 bg-peach-light"></span>
            <span className="scoop left-0 top-8 bg-peach [animation-delay:0.2s]"></span>
            <span className="scoop left-5 top-16 bg-brand [animation-delay:0.4s]"></span>
            <span className="cone-shape"></span>
          </div>
          <p className="animate-pulse text-lg text-ink/70">Cargando helados...</p>
        </div>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                data-aos="fade-left"
                data-aos-delay={index * 100}
              />
            ))
          ) : (
            <p className="col-span-full">No hay productos en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
