import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/logo.svg';
import GoogleMaps from '../components/GoogleMapsLink';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
    });
  }, []);

  const linkClass =
    'text-cream no-underline transition hover:text-white hover:underline';

  return (
    <footer
      id="footer"
      className="brand-band mt-16"
      data-aos="zoom-in-up"
      data-aos-delay="300"
    >
      <div className="mx-auto grid max-w-7xl gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <img src={logo} alt="Heladerías Aloha" className="w-44" />
        </div>
        <div>
          <h2 className="mb-3 text-sm font-bold tracking-wide">INFO</h2>
          <GoogleMaps tone="light" />
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="mb-1 text-sm font-bold tracking-wide">CATÁLOGO</h2>
          <Link to="/flavors" className={linkClass}>
            Sabores
          </Link>
          <HashLink to="/#shop" className={linkClass}>
            Productos
          </HashLink>
          <HashLink to="/#whyus" className={linkClass}>
            Sucursales
          </HashLink>
        </div>
        <div className="flex flex-col gap-2">
          <h2 className="mb-1 text-sm font-bold tracking-wide">CONTACTO</h2>
          <p>
            <strong>¿Alguna consulta? Escribinos:</strong>
          </p>
          <a
            className={linkClass}
            href="https://www.facebook.com/profile.php?id=61561618081490&mibextid=ZbWKwL"
          >
            <i className="fa-brands fa-facebook-f"></i> Facebook
          </a>
          <a className={linkClass} href="https://wa.me/+542804881974">
            <i className="fa-brands fa-whatsapp"></i> Whatsapp
          </a>
          <a className={linkClass} href="mailto:">
            <i className="fa-solid fa-envelope"></i> E-mail
          </a>
        </div>
      </div>
      <div className="border-t border-white/25 px-6 py-6 text-center text-sm">
        <p>©{currentYear} ALOSURMORA.SA Todos los derechos reservados</p>
        <p className="mt-1">
          Diseñado y desarrollado por{' '}
          <a className="text-cream underline hover:text-white" href="https://github.com/ICarlota99">
            ICarlota99
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
