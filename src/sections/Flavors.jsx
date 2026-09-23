import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import SimpleProductCard from '../components/SimpleProductCard';
import { buttonClass } from '../components/ui/Button';
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
    <section id="flavors" className="mx-auto max-w-7xl px-6 pb-16 pt-28 text-center">
      <div className="mb-10" data-aos="fade-down" data-aos-delay="200">
        <h2 className="font-display text-4xl text-ink md:text-5xl">Explorá nuestros sabores más populares</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {flavors.length > 0 ? (
          flavors.map((flavor, index) => (
            <SimpleProductCard
              key={flavor.id}
              product={flavor}
              data-aos="fade-left"
              data-aos-delay={index * 300}
            />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>

      <Link to="/flavors" className={`${buttonClass('primary')} mt-10`}>
        Armá tu balde personalizado <i className="fa-solid fa-arrow-right"></i>
      </Link>
    </section>
  );
};

export default Flavors;
