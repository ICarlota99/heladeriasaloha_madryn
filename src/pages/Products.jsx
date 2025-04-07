import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import '../styles/Products.css';

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
    
    // Remove the artificial delay and just fetch directly
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
      pints: 5
    };
    return categoryMap[categoryName];
  };

  return (
    <div className='text-center container-fluid mt-5'>
      <h1>{h1Text}</h1>
      {error && <p className="text-danger">{error}</p>}
      
      {isLoading ? (
        <div className="loading-container">
          <div className="ice-cream-loader">
            <div className="scoop scoop-1"></div>
            <div className="scoop scoop-2"></div>
            <div className="scoop scoop-3"></div>
            <div className="cone"></div>
          </div>
          <p>Cargando helados...</p>
        </div>
      ) : (
        <div className='row'>
          {products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard 
                className='col-lg-3 col-md-6'
                key={product.id} 
                product={product}
                data-aos='fade-left'
                data-aos-delay={index * 100}
              />
            ))
          ) : (
            <p>No hay productos en esta categoría.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;