import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Products = () => {
  const { category } = useParams(); // Get the category from the URL
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Map category values to their corresponding h1 text
  const categoryToH1 = {
    cakes: 'Tortas Heladas',
    cones: 'Conos y Paletas',
    desserts: 'Postres',
  };

  // Get the h1 text based on the category, or default to the category name if not found
  const h1Text = categoryToH1[category] || category.replace(/_/g, ' ');

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
    });

    // Fetch products for the selected category
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${category}`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
        setError(null); 
        console.log('Products:', data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    }
    fetchProducts();
  }, [category]);

  return (
    <div className='text-center container-fluid mt-5'>
      <h1>{h1Text}</h1>
      <div className='row pt-4'>
        {products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard 
              className='col-lg-3 col-md-6'
              key={product.id} 
              product={product}
              data-aos='fade-left'
              data-aos-delay={index * 300}
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