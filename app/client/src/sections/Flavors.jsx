import { useEffect } from 'react'
import alfajorMarplatense from '../assets/flavors/alfajor_marplatense.jpg';
import chocorrica from '../assets/flavors/chocorrica.jpg';
import cookiesAndCream from '../assets/flavors/cookies_and_cream.jpg';
import mousseChocolateYFrutilla from '../assets/flavors/mousse_de_chocolate_con_frutilla.jpg';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Flavors = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
    });
  }, [])

  return (
        <section id="flavors" className="container-fluid text-center pt-5">
            <div data-aos="fade-down" data-aos-delay="200">
                <h2>Explorá nuestros sabores más populares</h2>
            </div>

            {/* Carousel */}
            <div 
                id="flavors_carousel" 
                className="carousel slide mb-2"
                data-bs-ride="carousel" 
                data-bs-theme="dark">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="3000">
                        <img className="flavor_img" src={alfajorMarplatense}  alt="Alfajor marplatense"/>
                        <h3>Alfajor marplatense</h3>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img className="flavor_img" src={chocorrica} alt="Chocorrica"/>
                        <h3>Chocorrica</h3>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img className="flavor_img" src={mousseChocolateYFrutilla} alt="Mousse de chocolate con frutilla"/>
                        <h3>Mousse de chocolate con frutilla</h3>
                    </div>
                    <div className="carousel-item" data-bs-interval="3000">
                        <img className="flavor_img" src={cookiesAndCream} alt="Cookies and cream"/>
                        <h3>Cookies and cream</h3>
                    </div>
                </div>

                {/* Carousel buttons */}
                <button className="carousel-control-prev carousel-btn" type="button" data-bs-target="#flavors_carousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next carousel-btn" type="button" data-bs-target="#flavors_carousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>

            <button className="btn btn-lg btn-dark mt-2 hvr-grow-shadow">
                <a href="#">
                    Ver más sabores <i className="fa-solid fa-arrow-right"></i>
                </a>
            </button>
        </section>
  )
}

export default Flavors