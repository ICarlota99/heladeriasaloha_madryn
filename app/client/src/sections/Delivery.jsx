import { useEffect, useState } from 'react';
import frame from '../assets/frame.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Delivery = () => {
  const [customDiv, setCustomDiv] = useState({ position: 'absolute', top: '10%', right: '5%', width: '50%' }); // Default div styles
  const [windowWidth, setWindowWidth] = useState(window.innerWidth); // Initial width
  
  useEffect(() => {
    AOS.init({
      offset: 200,
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
    // Determine window width
    if (windowWidth < 900) {
      // Small and medium screens
      setCustomDiv({ width: '100%' });
    // } else if (windowWidth >= 900 && windowWidth < 992) {
    //   // Medium screens
    //   setCustomDiv({ width: '100%' });
    // } else if (windowWidth >= 900 && windowWidth < 1024) {
    //   // Large screens
    //   setCustomDiv({ width: '50%' });
    } else {
      // XL screens
      setCustomDiv({ width: '50%' });
    }
  }, [windowWidth]);

  return (
    <div
      id="delivery"
      className="container-fluid position-relative my-4"
    >
      {/* Image on the left */}
      <div className="position-relative">
        <img
        id='delivery-img'
          data-aos="slide-left"
          data-aos-delay="300"
          src={frame}
          alt="shop image"
          className="position-absolute"
          style={{ zIndex: -1, top: '0%', right: '0%', width: '60%' }}
        />
      </div>

      <div
        className="d-flex flex-column mt-5">
        <div
          data-aos="slide-down"
          data-aos-delay="400"
          className="dark-container py-5 px-3 mt-5"
          style={customDiv}
        >
          <h1 className="font-lobster text-center pt-5">🛒 Tienda Online 🚙</h1>
          <p className="text-center fs-3 mx-4 pb-5">DELIVERY EN TODO MADRYN</p>
        </div>

        <div
          data-aos="slide-up"
          data-aos-delay="400"
          className="px-4 py-4 mt-4 bg-white text-center"
          style={customDiv}
        >
          <h1 className="font-lobster py-2">Helados & Postres</h1>
          <p className="lh-lg">
            Queremos endulzar cada momento de tu vida con nuestras cremas heladas, 
            tortas, postres, alfajores y palitos helados que deleitan el paladar. 
            No te quedes con las ganas.          
            </p>
            <h4 className='py-4'>Pedi <span><strong>DELIVERY</strong></span> 🚚 <br />
            y disfruta de una experiencia inolvidable.</h4>
          <button className="btn btn-lg btn-dark hvr-grow-shadow ">
            <a href="">CONTÁCTANOS</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
