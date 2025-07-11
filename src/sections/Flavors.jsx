import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SimpleProductCard from '../components/SimpleProductCard';
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
      image: 'flavors/alfajor_marplatense.webp',
    },
    {
      id: 2,
      name: 'Chocorrica',
      description: 'El sabor de la torta más rica',
      image: 'flavors/chocorrica.webp',
    },
    {
      id: 3,
      name: 'Cookies & Cream',
      description: 'Crema de leche helada con galletitas de chocolate',
      image: 'flavors/cookies_and_cream.webp',
    },
    {
      id: 4,
      name: 'Mousse de Chocolate con Frutilla',
      description: 'Crema helada tipo mousse de chocolate con frutilla natural',
      image: 'flavors/mousse_de_chocolate_con_frutilla.webp',
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
            <SimpleProductCard
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
        <Link to='/flavors'>
          Armá tu balde personalizado <i className="fa-solid fa-arrow-right"></i>
        </Link>
      </button>
    </section>
  );
};

export default Flavors;