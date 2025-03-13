import { useEffect, useState } from 'react';
import frame from '../assets/frame.png';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Delivery = () => {
  const [customDiv, setCustomDiv] = useState({ position: 'absolute', top: '10%', right: '20%', width: '35%' }); // Default div styles
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
    if (windowWidth < 768) {
      // Small screens
      setCustomDiv({ width: '100%' });
    } else if (windowWidth >= 768 && windowWidth < 992) {
      // Medium screens
      setCustomDiv({ width: '100%' });
    } else {
      // Large screens
      setCustomDiv({ position: 'absolute', top: '10%', right: '20%', width: '35%' });
    }
  }, [windowWidth]);

  return (
    <div
      id="delivery"
      className="d-flex flex-md-row flex-lg-row flex-sm-column container-fluid position-relative"
    >
      {/* Image on the left */}
      <div className="position-relative">
        <img
        id='delivery-img'
          data-aos="slide-right"
          data-aos-delay="200"
          src={frame}
          alt="shop image"
          className="w-50"
          style={{ zIndex: -1 }}
        />
      </div>

      <div
        className="d-flex flex-column content-container"
        style={customDiv}
      >
        <div
          data-aos="fade-up-right"
          data-aos-delay="400"
          className="dark-container py-4 px-4 mb-4"
        >
          <h1 className="font-lobster text-center py-2">Tienda Online</h1>
          <p className="text-center fs-3 mx-4">DELIVERY EN TODO MADRYN</p>
        </div>

        <div
          data-aos="fade-up-left"
          data-aos-delay="400"
          className="px-5 py-4 mt-4 bg-white"
        >
          <h1 className="font-lobster text-center py-2">Helados & Postres</h1>
          <p className="lh-lg">
            Nuestros helados se elaboran con ingredientes de 
            primera calidad. No te quedes con las ganas. <br />
            Pedi
            delivery y disfruta de una experiencia inolvidable.
          </p>
          <button className="btn btn-lg btn-dark hvr-grow-shadow">
            <a href="">CONTÁCTANOS</a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Delivery;
