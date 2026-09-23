import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import whyus from '../assets/whyus.webp';
import { buttonClass } from '../components/ui/Button';
import AOS from 'aos';
import 'aos/dist/aos.css';

const mapLinkClass =
  'inline-flex rounded-full bg-peach-light px-4 py-2 text-sm font-semibold text-ink no-underline transition hover:bg-brand hover:text-white';

const Whyus = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
    });
  }, []);

  return (
    <section id="whyus" className="mx-auto my-8 grid max-w-7xl items-stretch gap-0 overflow-hidden rounded-[2rem] bg-white shadow-lg lg:grid-cols-2">
      <div data-aos="slide-right" data-aos-delay="300">
        <img src={whyus} alt="Heladería Aloha" className="h-full w-full object-cover" loading="lazy" />
      </div>
      <div data-aos="slide-left" data-aos-delay="300" className="flex flex-col items-center justify-center px-6 py-10 text-center md:px-12">
        <h2 className="font-display text-5xl text-ink">Nosotros</h2>
        <p className="mt-4 leading-relaxed">
          En Heladerías Aloha, somos una familia apasionada por las delicias heladas.
          Con más de 20 años de experiencia, nos enfocamos en combinar el mejor sabor con la innovación constante.
          <span className="mt-3 hidden lg:block">
            Ofrecemos una amplia gama de productos para satisfacer todos los gustos y necesidades dietéticas, incluyendo opciones <strong>Sin TACC</strong>.
            Si estás buscando una experiencia dulce y memorable, Heladerías Aloha es tu lugar.
          </span>
        </p>
        <div className="mt-6 space-y-3">
          <p>
            <strong>Horarios:</strong>
            <br />
            De 12 del mediodía a 12 de la noche
          </p>
          <p className="font-semibold">Dónde encontrarnos</p>
          <div className="flex flex-col items-center gap-2">
            <a className={mapLinkClass} href="https://maps.app.goo.gl/SiwEx7UsUJ7tJw5t5">
              9 de Julio e Hipólito Yrigoyen
            </a>
            <a className={mapLinkClass} href="https://maps.app.goo.gl/9N6YKpCPyGiCABo78">
              España y Lombardo
            </a>
          </div>
          <p className="pt-2">
            Ven y descubre por qué somos la elección preferida de aquellos que buscan la perfección
            en cada bocado. ¡Te esperamos con la heladera llena!
          </p>
        </div>
        <Link to="/about" className={`${buttonClass('primary')} mt-6`}>
          Leer más
        </Link>
      </div>
    </section>
  );
};

export default Whyus;
