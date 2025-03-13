import { useEffect } from 'react'
import AOS from 'aos';
import 'aos/dist/aos.css';

const About = () => {
  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
    });
  }, [])

  return (
    <section id="about_us" className="dark-container container-fluid">
        <div className="info">
            <img className="local_front_img" src="images/local.png" alt="Local de Aloha"/>
            <h2 className="sucursal">Heladerías Aloha, Puerto Madryn</h2>
            <p>
                Somos una empresa comprometida con la satisfacción de nuestros
                clientes. Nuestras cremas heladas se elaboran con ingredientes de
                primera calidad que otorgan a cada producto un sabor cremoso e
                irresistible capaz de producir una explosión sensorial única. <br/>
                Te ofrecemos una experiencia única de sabor: Desde sabores clásicos
                como vainilla, chocolate y dulce de leche hasta exóticos y tropicales
                como banana, maracuyá y ananá. Dejate llevar al paraíso en cada
                bocado.
            </p>
            <p><strong>🕔 Horarios:</strong> De 12 del mediodía a 12 de la noche</p>
            <p>
            <strong>🗺️ Dónde encontrarnos:</strong><br/>
            <a href="">📍 9 de Julio e Hipólito Yrigoyen</a> <br/>
            <a href="">📍 España y Lombardo</a>
            </p>
        </div>
    </section>
  )
}

export default About
