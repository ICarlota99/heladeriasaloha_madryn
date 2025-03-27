import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import AOS from 'aos';
import 'aos/dist/aos.css';
import productsData from '../data/products.json';

const Products = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

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

    // Filter and sort products
    const filteredProducts = productsData.products
      .filter((product) => product.category_id === getCategoryId(category))
      .sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically
    
    setProducts(filteredProducts);
  }, [category]);

  // Helper function to map category names to their IDs
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
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Products;