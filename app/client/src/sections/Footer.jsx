import {useEffect} from 'react';
import logo from "../assets/logo.png";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
    useEffect(() => {
      AOS.init({
        offset: 200,
        duration: 600,
        easing: 'ease-in-sine',
      });
    }, [])

  return (
    <div 
      id='footer'
      className='dark-section mt-5'
      data-aos="zoom-in-up" 
      data-aos-delay="300"
    >
      <div className='row container-fluid mt-5'>
        <div className='col-lg-3 col-md-6 col-sm-12 my-4'>
          <img src={logo} alt="logo" className='w-75'/>
        </div>
        <div className='col-lg-3 col-md-6 col-sm-12 my-4'>
          <h5>INFO</h5>
          <p>
            <strong>🕔 Horarios:</strong> 
            <br/>De 12 del mediodía a 12 de la noche <br /> <br />
            <strong>🗺️ Dónde encontrarnos:</strong><br/>
            <a className="light-link pt-1" href="">📍 9 de Julio e Hipólito Yrigoyen</a> <br/>
            <a className="light-link pt-1" href="">📍 España y Lombardo</a><br />
          </p>
        </div>
        <div className='col-lg-3 col-md-6 col-sm-12 my-4'>
          <h5>CATÁLOGO</h5>
          <a className='light-link pt-1' href="">Sabores</a><br />
          <a className='light-link pt-1' href="">Productos</a><br />
          <a className='light-link pt-1' href="">Sucursales</a><br />
        </div>
        <div className='col-lg-3 col-sm-12 my-4'>
        <h5>CONTACTO</h5>
          <p><strong>📲 ¿Alguna consulta? Contactanos en nuestras redes sociales:</strong></p>
              <a className="light-link pt-1" href="https://www.facebook.com/profile.php?id=61561618081490&mibextid=ZbWKwL"><i className="fab fa-facebook-f"></i> Facebook</a><br />
              <a className="light-link pt-1" href="https://wa.me/+542804881974"><i className="fab fa-whatsapp"></i> Whatsapp</a><br />
              <a className="light-link pt-1" href=""> <i className="fas fa-envelope"></i> E-mail</a><br /><br />
        </div>
        <hr/>    
      </div>
      <div className='text-center pt-5 pb-1'>
        <p className="copyright">©2024 ALOSURMORA.SA Todos los derechos reservados</p>
        <p>Diseñado y desarrollado por <a className='light-link' href="">ICarlota99</a></p>
      </div>
    </div>
  )
}

export default Footer
