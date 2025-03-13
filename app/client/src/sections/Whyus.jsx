import { useEffect } from 'react'
import whyus from '../assets/whyus.jpg'
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
    <div id='whyus' className='row container-fluid my-5 py-5'>
      <div data-aos="slide-right" data-aos-delay="200" className='col-lg-6 px-5 py-5'>
        <h1 className='text-center font-lobster py-3'>Nosotros</h1>
        <p className='lh-lg'>
          Somos una empresa comprometida con la satisfacción de nuestros
          clientes. Nuestras cremas heladas se elaboran con ingredientes de
          primera calidad que otorgan a cada producto un sabor cremoso e
          irresistible capaz de producir una explosión sensorial única.
        </p>
        <button className='btn btn-lg btn-dark hvr-grow-shadow'>
          <a href="">LEER MÁS</a>
        </button>
      </div>
      <div data-aos="slide-left" data-aos-delay="200" className='col-lg-6'>
        <img src={whyus} alt="why us image" className='w-100' />
      </div>      
    </div>
  )
}

export default Whyus
