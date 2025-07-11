import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import conosImg from '../assets/conos.webp';
import pintasImg from '../assets/pintas.webp';
import postresImg from '../assets/postres.webp';
import tortasImg from '../assets/tortas.webp';
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
    <div id='shop' className='dark-section'>
      {/* Products Section */}
      <div className="my-5 py-5">
        <section id="products" className="container-fluid text-center">
          <div data-aos="slide-down" data-aos-delay="200">
            <h2>Elegí tu helado favorito</h2>
            <h4>¿Cuál preferís probar hoy?</h4>
          </div>
          {/* Product options */}
          <div className="row position-relative">
            <Link className="col-lg-3 col-md-6" to="/category/cones" data-aos="zoom-in" data-aos-delay="200">
              <img
                className="img-fluid product_img hvr-grow-shadow"
                src={conosImg}
                alt="conos y paletas"
                loading='lazy'
              />
            </Link>
            <Link className="col-lg-3 col-md-6" to="/category/desserts"data-aos="zoom-in" data-aos-delay="200">
              <img
                className="img-fluid product_img hvr-grow-shadow"
                src={postresImg}
                alt="postres"
                loading='lazy'
              />
            </Link>
            <Link className="col-lg-3 col-md-6" to="/category/pints" data-aos="zoom-in" data-aos-delay="200">
              <img
                className="img-fluid product_img hvr-grow-shadow"
                src={pintasImg}
                alt="pintas"
                loading='lazy'
              />
            </Link>
            <Link className="col-lg-3 col-md-6" to="/category/cakes" data-aos="zoom-in" data-aos-delay="200">
              <img
                className="img-fluid product_img hvr-grow-shadow"
                src={tortasImg}
                alt="tortas heladas"
                loading='lazy'
              />
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Shop;
