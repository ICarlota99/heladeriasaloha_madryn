import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import conosImg from '../assets/conos.webp';
import pintasImg from '../assets/pintas.webp';
import postresImg from '../assets/postres.webp';
import tortasImg from '../assets/tortas.webp';
import AOS from 'aos';
import 'aos/dist/aos.css';

const categories = [
  { to: '/category/cones', src: conosImg, alt: 'conos y paletas', label: 'Conos y paletas' },
  { to: '/category/desserts', src: postresImg, alt: 'postres', label: 'Postres helados' },
  { to: '/category/pints', src: pintasImg, alt: 'pintas', label: 'Pintas y baldes' },
  { to: '/category/cakes', src: tortasImg, alt: 'tortas heladas', label: 'Tortas heladas' },
];

const Shop = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: 'ease-in-sine',
    });
  }, []);

  return (
    <section id="shop" className="brand-band py-20">
      <div id="products" className="mx-auto max-w-7xl px-6 text-center">
        <div data-aos="slide-down" data-aos-delay="200">
          <h2 className="font-display text-4xl md:text-5xl">Elegí tu helado favorito</h2>
          <p className="mt-2 text-lg">¿Cuál preferís probar hoy?</p>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => (
            <Link
              key={category.to}
              to={category.to}
              className="group text-white no-underline"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <img
                className="mx-auto aspect-square w-4/5 rounded-[2rem] object-cover shadow-lg transition duration-300 group-hover:scale-105 group-hover:shadow-2xl"
                src={category.src}
                alt={category.alt}
                loading="lazy"
              />
              <p className="mt-4 text-lg font-bold">{category.label}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Shop;
