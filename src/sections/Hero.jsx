import { useEffect } from 'react';
import { HashLink } from 'react-router-hash-link';
import heroicecream from '../assets/hero_icecream.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Hero = () => {

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
    });
  }, [])

  return (
    //  Hero Section
    <section id="hero">
        <div className="row align-items-center">
          <div className="col-lg-5" style={{ paddingLeft: '10%' }}>
              <h1 className="mt-5" data-aos="zoom-in" data-aos-delay="200">Cómete un helado <br/>
              <span className='orange-color'>Disfrutá la vida</span>
              </h1>
              <div data-aos="zoom-in" data-aos-delay="300">
                <h3 className='pt-3'>Sabores explosivos y novedosos</h3>
                <h4>Bocados de felicidad</h4>
              </div>
              <div data-aos="slide-up" data-aos-delay="400">
                <button type="button" className="btn btn-lg btn-dark me-4 hvr-grow-shadow mt-2">
                  <HashLink to='/flavors#buckets'>
                    Armá tu balde <i className="fa-solid fa-arrow-right"></i>
                  </HashLink>
                </button>
                <button type="button" className="btn btn-lg btn-light me-4 hvr-grow-shadow mt-2">
                  <HashLink to="/#shop">
                    Ver productos
                  </HashLink>  
                </button>
              </div>
          </div>
          <div
            className="col-lg-7 d-flex justify-content-center"
            style={{ height: '70vh', overflow: 'show' }}
            data-aos="slide-left" data-aos-delay="200"
          >
            <img
              src={heroicecream}
              alt="cono de helado"
              className="mw-100 mh-100"
              style={{ objectFit: 'cover', overflow: 'show', marginRight: '20%'}}
            />
        </div>
      </div>
    </section>
  )
};

export default Hero
