import { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import whyus from '../assets/whyus.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Whyus = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
    });
  }, [])

  return (
    <section id='whyus' className='row container-fluid my-5 py-5 d-flex align-items-stretch'>
      <div data-aos="slide-right" data-aos-delay="300" className='col-lg-6'>
        <img src={whyus} alt="why us image" className='w-100 h-100 object-cover' />
      </div> 
      <div data-aos="slide-left" data-aos-delay="300" className='col-lg-6 px-5 bg-white'>
        <div className='d-flex flex-column align-items-center justify-content-center h-100 py-2'>
          <h1 className='text-center font-lobster py-3'>Nosotros</h1>
          <p className='lh-lg'>
            <span className="d-lg-block d-block">
              En Heladerías Aloha, somos una familia apasionada por las delicias heladas. 
              Con más de 20 años de experiencia, nos enfocamos
              en combinar el mejor sabor con la innovación constante.
            </span>
            <span className="d-lg-block d-none">
              <br />
              Ofrecemos una amplia gama de productos para satisfacer todos los gustos y 
              necesidades dietéticas, incluyendo opciones <strong>Sin TACC</strong>.<br />
              Si estás buscando una experiencia dulce y memorable, Heladerías Aloha es tu lugar.
            </span>
          </p>
          <p className='py-4'>
            <strong>🕔 Horarios:</strong> 
            <br/>De 12 del mediodía a 12 de la noche <br /> <br />
            <strong>🗺️ Dónde encontrarnos:</strong><br/>
            <a className="hvr-black" href="">📍 9 de Julio e Hipólito Yrigoyen</a> <br/>
            <a className="hvr-black" href="">📍 España y Lombardo</a><br /><br /> 
            Ven y descubre por qué somos la elección preferida de aquellos que buscan la perfección 
            en cada bocado. ¡Te esperamos con la heladera llena! 🍦🌴 <br />
          </p>
          <button className='btn btn-lg btn-dark hvr-grow-shadow'>
            <HashLink to="/About#about">LEER MÁS</HashLink>
          </button>
        </div>
      </div>     
    </section>
  )
}

export default Whyus;
