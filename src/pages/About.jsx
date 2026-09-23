import { useEffect } from 'react';
import banner from '../assets/banner_about.webp';
import localImage from '../assets/local.webp';
import GoogleMaps from '../components/GoogleMapsLink';
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: 'ease-in-sine',
    });
  }, []);

  return (
    <section id="about">
      <img src={banner} alt="Heladerías Aloha" className="h-56 w-full object-cover sm:h-72 md:h-96" loading="lazy" />
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-6 py-12 lg:grid-cols-3">
        <div
          className="space-y-4 text-lg leading-relaxed lg:col-span-2"
          data-aos="zoom-out-right"
          data-aos-delay="200"
        >
          <h1 className="font-display text-4xl text-ink md:text-5xl">Heladerías Aloha, Puerto Madryn</h1>
          <p>
            En Heladerías Aloha, somos una familia apasionada por las delicias heladas.
            Con más de 20 años de experiencia en el arte de la heladería, nos enfocamos
            en combinar los mejores sabores con la innovación constante.
            Nuestras cremas heladas se elaboran con ingredientes de
            primera calidad que otorgan a cada producto un sabor cremoso e
            irresistible capaz de producir una explosión sensorial única.
          </p>
          <h2 className="pt-2 font-display text-3xl">Nuestra Historia y Compromiso</h2>
          <p>
            Desde nuestros inicios, hemos estado dedicados a ofrecer productos de la más
            alta calidad. Nuestro compromiso es endulzar cada momento de tu vida con cremas
            heladas, tortas, postres, alfajores y palitos helados que deleiten el paladar y te
            lleven al paraíso en cada bocado.
          </p>
          <h2 className="pt-2 font-display text-3xl">¿Por Qué Elegirnos?</h2>
          <p>
            <strong>Variedad y Calidad:</strong>
            <br />
            Ofrecemos una amplia gama de productos para satisfacer todos los gustos y necesidades
            dietéticas, incluyendo opciones Sin TACC.
            <br />
            Te ofrecemos una experiencia completa de sabor: Desde los clásicos
            vainilla, chocolate y dulce de leche hasta exóticos y tropicales
            como banana, maracuyá y ananá.
            <br />
            <strong>Innovación y Tradición:</strong>
            <br />
            Nuestros productos son el resultado de décadas de perfeccionamiento, asegurando que
            cada bocado sea una experiencia única.
            <br />
            <strong>Ambiente Amigable:</strong>
            <br />
            Nuestros locales son espacios acogedores donde la atención al cliente es nuestra
            prioridad.
          </p>
        </div>
        <div data-aos="zoom-out-left" data-aos-delay="200">
          <img
            src={localImage}
            alt="Local de Aloha"
            className="w-full rounded-3xl object-cover shadow-lg"
            loading="lazy"
          />
        </div>
      </div>
      <div
        className="mx-auto max-w-6xl px-6 pb-16 text-lg leading-relaxed"
        data-aos="zoom-out-right"
        data-aos-delay="200"
      >
        <h2 className="font-display text-3xl">Únete a Nuestra Familia</h2>
        <p className="mt-4">
          Si estás buscando una experiencia dulce y memorable, <strong>Heladerías Aloha</strong> es tu lugar.
          Ven y descubre por qué somos la elección preferida de aquellos que buscan la
          perfección en cada helado. ¡Te esperamos!
        </p>
        <div className="mt-4">
          <GoogleMaps />
        </div>
      </div>
    </section>
  );
};

export default About;
