import { useEffect, useState } from 'react';
// import { ReactComponent as DarkBg } from '../assets/orange_section_bg.svg';
import conosImg from '../assets/conos.png';
import pintasImg from '../assets/pintas.png';
import postresImg from '../assets/postres.png';
import tortasImg from '../assets/tortas.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Shop = () => {
  const [customHeight, setCustomHeight] = useState({ height: '500px' }); // Default section height
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Initial width

  useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 600,
      easing: 'ease-in-sine',
    });

    const handleResize = () => {
      setWindowWidth(window.innerWidth); // Update the width on resize
    };
    // Listen for resize events
    window.addEventListener('resize', handleResize);
    // Clean up the event listener
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    // Calculate section height based on window width
    if (windowWidth < 768) {
      // Small screens
      setCustomHeight({ height: '1800px' });
    } else if (windowWidth >= 768 && windowWidth < 992) {
      // Medium screens
      setCustomHeight({ height: '1000px' });
    } else {
      // Large screens
      setCustomHeight({ height: '600px' });
    }
  }, [windowWidth]);

  return (
    <div>
      {/* Products Section */}
      <div className='my-5 py-5 dark-container'>
        {/* Render SVG as a React Component */}
        {/* <DarkBg style={{ position: 'absolute', width: '100%', height: '100%' }} /> */}
        <section id="products" className="container-fluid text-center">
          <div>
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
