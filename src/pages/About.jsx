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
    <section id='about'>
      <img src={banner} alt='banner' className='w-100 text-center' loading='lazy'/>
        <div className='container-fluid mt-5 info row'>
          <div 
            className='col-lg-8' 
            data-aos='zoom-out-right'
            data-aos-delay='200'
          >
            <h1>Heladerías Aloha, Puerto Madryn</h1>
              <p className='mt-4'>
                En Heladerías Aloha, somos una familia apasionada por las delicias heladas. 
                Con más de 20 años de experiencia en el arte de la heladería, nos enfocamos
                en combinar los mejores sabores con la innovación constante.
                Nuestras cremas heladas se elaboran con ingredientes de
                primera calidad que otorgan a cada producto un sabor cremoso e
                irresistible capaz de producir una explosión sensorial única. 
              </p>
              <h3 className='mt-4'><span>Nuestra Historia y Compromiso</span></h3>
              <p>
                Desde nuestros inicios, hemos estado dedicados a ofrecer productos de la más 
                alta calidad. Nuestro compromiso es endulzar cada momento de tu vida con cremas 
                heladas, tortas, postres, alfajores y palitos helados que deleiten el paladar y te 
                lleven al paraíso en cada bocado.
              </p>
              <h3 className='mt-4'><span>¿Por Qué Elegirnos?</span></h3>
              <p>
                <strong>Variedad y Calidad:</strong> <br />
                Ofrecemos una amplia gama de productos para satisfacer todos los gustos y necesidades 
                dietéticas, incluyendo opciones Sin TACC. <br />
                Te ofrecemos una experiencia completa de sabor: Desde los clásicos
                vainilla, chocolate y dulce de leche hasta exóticos y tropicales
                como banana, maracuyá y ananá. <br />
                <strong>Innovación y Tradición:</strong> <br />
                Nuestros productos son el resultado de décadas de perfeccionamiento, asegurando que 
                cada bocado sea una experiencia única. <br />
                <strong>Ambiente Amigable:</strong> <br />
                Nuestros locales son espacios acogedores donde la atención al cliente es nuestra 
                prioridad.
              </p>
          </div>
          <div 
            className='col-lg-4 text-end'
            data-aos='zoom-out-left'
            data-aos-delay='200'
          >
            <img src={localImage} alt='Local de Aloha' className='w-100'loading='lazy'/>
          </div>
        </div>
        <div 
          className='container-fluid info' 
          data-aos='zoom-out-right'
          data-aos-delay='200'
        >
          <h3 className='mt-4'><span>Únete a Nuestra Familia</span></h3>
          <p>
            Si estás buscando una experiencia dulce y memorable, <strong>Heladerías Aloha</strong> es tu lugar. 
            Ven y descubre por qué somos la elección preferida de aquellos que buscan la 
            perfección en cada helado. ¡Te esperamos! 🍦🌴 <br/>
          </p>
          <GoogleMaps />
        </div>
        
    </section>
  );
};

export default About;
