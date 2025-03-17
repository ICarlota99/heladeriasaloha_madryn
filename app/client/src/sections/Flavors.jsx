import { useEffect } from 'react'
import styles from '../styles/PopularFlavors.module.css';
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

    // Sample data for popular flavors
    const flavors = [
      {
        id: 1,
        name: 'Alfajor Marplatense',
        description: 'Helado con trozos de alfajor marplatense',
        image: alfajorMarplatense,
      },
      {
        id: 2,
        name: 'Chocorrica',
        description: 'El sabor de la torta más rica',
        image: chocorrica,
      },
      {
        id: 3,
        name: 'Cookies & Cream',
        description: 'Crema de leche helada con galletitas de chocolate',
        image: cookiesAndCream,
      },
      {
        id: 4,
        name: 'Mousse de Chocolate con Frutilla',
        description: 'Crema helada tipo mousse de chocolate con frutilla natural',
        image: mousseChocolateYFrutilla,
      },

    ];
  
    const handleAddToCart = (flavor) => {
      console.log('Added to cart:', flavor.name);
      // Add logic to handle adding to cart here
    };

  return (
        <section id="flavors" className="container-fluid text-center pt-5">
            <div className='my-4' data-aos="fade-down" data-aos-delay="200">
                <h2>Explorá nuestros sabores más populares</h2>
            </div>

            <div className="row pt-4">
                    {flavors.map((flavor, index) => (
                      <div
                      key={flavor.id}
                      className="col-lg-3 col-md-4 mb-4"
                      data-aos="fade-left"
                      data-aos-delay={index * 300}
                    >
                        <div className={`card ${styles.flavorCard}`}>
                          <div className={styles.imageContainer}>
                            <img
                              src={flavor.image}
                              alt={flavor.name}
                              className={`card-img-top ${styles.flavorImage}`}
                            />
                            <div className={styles.overlay}>
                              <p className={styles.description}>{flavor.description}</p>
                            </div>
                          </div>
                          <div className="card-body">
                            <h5 className="card-title">{flavor.name}</h5>
                            <button
                              className="btn btn-dark hvr-grow-shadow"
                              onClick={() => handleAddToCart(flavor)}
                            >
                              Add to Cart
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
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