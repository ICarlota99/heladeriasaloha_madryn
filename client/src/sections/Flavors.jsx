import { useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import alfajorMarplatense from '../assets/flavors/alfajor_marplatense.jpg';
import chocorrica from '../assets/flavors/chocorrica.jpg';
import cookiesAndCream from '../assets/flavors/cookies_and_cream.jpg';
import mousseChocolateYFrutilla from '../assets/flavors/mousse_de_chocolate_con_frutilla.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Flavors = () => {

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
    });
  }, []);

  // Data for popular flavors
  const flavors = [
    {
      id: 1,
      name: 'Alfajor Marplatense',
      description: 'Helado con trozos de alfajor marplatense',
      image: alfajorMarplatense,
      price: 3.50,
    },
    {
      id: 2,
      name: 'Chocorrica',
      description: 'El sabor de la torta más rica',
      image: chocorrica,
      price: 3.50,
    },
    {
      id: 3,
      name: 'Cookies & Cream',
      description: 'Crema de leche helada con galletitas de chocolate',
      image: cookiesAndCream,
      price: 3.50,
    },
    {
      id: 4,
      name: 'Mousse de Chocolate con Frutilla',
      description: 'Crema helada tipo mousse de chocolate con frutilla natural',
      image: mousseChocolateYFrutilla,
      price: 3.50,
    },
  ];

  return (
    <section id="flavors" className="container-fluid text-center pt-5">
      <div className="my-4" data-aos="fade-down" data-aos-delay="200">
        <h2>Explorá nuestros sabores más populares</h2>
      </div>

      <div className='row g-4 pt-4'>
        {flavors.length > 0 ? (
          flavors.map((flavor, index) => (
            <ProductCard
              className="col-lg-3 col-md-6 mb-4"
              key={flavor.id} 
              product={flavor} 
              data-aos='fade-left'
              data-aos-delay={index * 300}
              />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>

      <button className="btn btn-lg btn-dark mt-2 hvr-grow-shadow">
        <a href="#">
          Ver más sabores <i className="fa-solid fa-arrow-right"></i>
        </a>
      </button>
    </section>
  );
};

export default Flavors;