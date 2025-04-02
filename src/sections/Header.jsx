import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import logo from '../assets/logo.svg';
import { useCart } from '../context/useCart';
import '../styles/Header.css';

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { totalItems } = useCart();
  
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div>
      <nav id="navbar-menu" className="navbar fixed-top navbar-dark navbar-expand-xl dark-container">
        <div className="container-fluid d-flex align-items-center justify-content-between">
          {/* Left Section: Logo */}
          <div className="d-flex align-items-center">
            <img src={logo} alt="logo" className="logo" />
            {!isMobile && (
              <Link to="/" className="navbar-brand sucursal">
                Heladerías Aloha, Madryn
              </Link>
            )}
          </div>

          {/* Right Section (Cart + Toggler) */}
          <div className="d-flex align-items-center">
            {/* Mobile Cart Button (Before Toggler) */}
            {isMobile && (
              <Link to="/cart" className="nav-link position-relative me-3">
                <i className="fas fa-shopping-cart"></i>
                {totalItems > 0 && (
                  <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}

            {/* Toggler Button */}
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#top_navbar"
              aria-controls="top_navbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* Collapsible Menu */}
          <div className="collapse navbar-collapse justify-content-end" id="top_navbar">
            <ul className="navbar-nav menu_list d-flex justify-content-end">
              <li className="nav-item">
                <HashLink to="/#hero" className="nav-link">Inicio</HashLink>
              </li>
              <li className="nav-item dropdown">
                <HashLink to="/#products" className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Productos
                </HashLink>
                <ul className="dropdown-menu dropdown-menu-custom">
                  <li><Link to="category/cones" className="dropdown-item">Conos y paletas</Link></li>
                  <li><Link to="category/desserts" className="dropdown-item">Postres helados</Link></li>
                  <li><Link to="category/pints" className="dropdown-item">Pintas y baldes</Link></li>
                  <li><Link to="category/cakes" className="dropdown-item">Tortas heladas</Link></li>
                </ul>
              </li>
              <li className="nav-item">
                <HashLink to="/#flavors" className="nav-link">Sabores</HashLink>
              </li>
              <li className="nav-item">
                <HashLink to="/#whyus" className="nav-link">Nosotros</HashLink>
              </li>
              <li className="nav-item">
                <HashLink to="/#footer" className="nav-link">Contacto</HashLink>
              </li>

              {/* Desktop Cart Button (Hidden in Mobile) */}
              {!isMobile && (
                <li className="nav-item">
                  <Link to="/cart" className="nav-link position-relative">
                    <i className="fas fa-shopping-cart"></i>
                    {totalItems > 0 && (
                      <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                        {totalItems}
                      </span>
                    )}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;