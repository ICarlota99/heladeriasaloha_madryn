import { useEffect } from 'react';
import conosImg from '../assets/conos.png';
import pintasImg from '../assets/pintas.png';
import postresImg from '../assets/postres.png';
import tortasImg from '../assets/tortas.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Shop = () => {
  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: 'ease-in-sine',
    });
  }, []);

  return (
    <div className='dark-section'>
      {/* Products Section */}
      <div className="my-5 py-5">
        <section id="products" className="container-fluid text-center">
          <div data-aos="slide-down" data-aos-delay="200">
            <h2>Elegí tu helado favorito</h2>
            <h4>¿Cuál preferís probar hoy?</h4>
          </div>
          {/* Product options */}
          <div className="row position-relative">
            <a className="col-lg-3 col-md-6" href="#" data-aos="zoom-in" data-aos-delay="200">
              <img
                className="img-fluid product_img hvr-grow-shadow"
                src={conosImg}
                alt="conos y paletas"
              />
            </a>
            <a className="col-lg-3 col-md-6" href="#" data-aos="zoom-in" data-aos-delay="200">
              <img
                className="img-fluid product_img hvr-grow-shadow"
                src={postresImg}
                alt="postres"
              />
            </a>
            <a className="col-lg-3 col-md-6" href="#" data-aos="zoom-in" data-aos-delay="200">
              <img
                className="img-fluid product_img hvr-grow-shadow"
                src={pintasImg}
                alt="pintas"
              />
            </a>
            <a className="col-lg-3 col-md-6" href="#" data-aos="zoom-in" data-aos-delay="200">
              <img
                className="img-fluid product_img hvr-grow-shadow"
                src={tortasImg}
                alt="tortas heladas"
              />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shop;
